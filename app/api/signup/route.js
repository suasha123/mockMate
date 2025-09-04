import connectDb from "@/lib/connectdb";
import usermodel from "@/models/usermodel";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionoptions } from "@/lib/session";
export async function POST(req) {
  const { userinfo } = await req.json();
  if (!userinfo.email || !userinfo.password) {
    return new Response(JSON.stringify({ msg: "Credentials required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  await connectDb();
  const userexists = await usermodel.findOne({ email: userinfo.email });
  if (userexists) {
    return new Response(JSON.stringify({ msg: "User already exists" }), {
      status: 404,
    });
  }
  const newuser = await usermodel.create({
    email: userinfo.email,
    password: userinfo.password,
    username: userinfo.email.split("@")[0],
  });
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  session.user = {id : newuser._id};
  await session.save();
  const userInfo = {username : newuser.username , email : newuser.email , profile : newuser.profile};
  return new Response(JSON.stringify({ success: true  , userInfo}), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
