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
    if (!userinfo.email || !userinfo.password || !userinfo.otp) {
      return new Response(
        JSON.stringify({ msg: "Email, password, and OTP are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    await connectDb();
    const userexists = await usermodel.findOne({ email: userinfo.email });
    if (userexists) {
      return new Response(JSON.stringify({ msg: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    const isOtpexists = await otpmodel.findOne({ email: userinfo.email });
    if (!isOtpexists) {
      return new Response(JSON.stringify({ msg: "OTP expired or not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const isOtpcorrect = await argon2.verify(isOtpexists.otp, userinfo.otp);
    if (!isOtpcorrect) {
      return new Response(JSON.stringify({ msg: "Wrong OTP" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const hashedpassword = await argon2.hash(userinfo.password);
    const newuser = await usermodel.create({
      email: userinfo.email,
      password: hashedpassword,
      username: userinfo.email.split("@")[0],
    });
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionoptions);
    session.user = { id: newuser._id };
    await session.save();
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
    return new Response(JSON.stringify({ msg: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
