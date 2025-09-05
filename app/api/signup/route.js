import connectDb from "@/lib/connectdb";
import usermodel from "@/models/usermodel";
import otpmodel from "@/models/otpmodel";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionoptions } from "@/lib/session";
import argon2 from "argon2";

export async function POST(req) {
  try {
    const { userinfo } = await req.json();

    // Check required fields
    if (!userinfo.email || !userinfo.password || !userinfo.otp) {
      return new Response(
        JSON.stringify({ msg: "Email, password, and OTP are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to DB
    await connectDb();
    const userexists = await usermodel.findOne({ email: userinfo.email });
    if (userexists) {
      return new Response(
        JSON.stringify({ msg: "User already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    // Check if OTP exists
    const isOtpexists = await otpmodel.findOne({ email: userinfo.email });
    if (!isOtpexists) {
      return new Response(
        JSON.stringify({ msg: "OTP expired or not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify OTP
    const isOtpcorrect = await argon2.verify(isOtpexists.otp, userinfo.otp);
    if (!isOtpcorrect) {
      return new Response(
        JSON.stringify({ msg: "Wrong OTP" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

  

    // Hash password
    const hashedpassword = await argon2.hash(userinfo.password);

    // Create new user
    const newuser = await usermodel.create({
      email: userinfo.email,
      password: hashedpassword,
      username: userinfo.email.split("@")[0],
    });

    // Set up session
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionoptions);
    session.user = { id: newuser._id };
    await session.save();

    // Return user info
    const userInfo = {
      username: newuser.username,
      email: newuser.email,
      profile: newuser.profile,
    };

    return new Response(JSON.stringify({ success: true, userInfo }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return new Response(
      JSON.stringify({ msg: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
