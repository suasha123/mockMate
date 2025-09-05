import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import connectDb from "@/lib/connectdb";
import usermodel from "@/models/usermodel";
import { sessionoptions } from "@/lib/session";
import argon2 from "argon2";
export async function POST(req) {
  await connectDb();
  const { userinfo } = await req.json();
  if (!userinfo.email || !userinfo.password) {
    return new Response(JSON.stringify({ msg: "Credentials required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userexists = await usermodel.findOne({ email: userinfo.email });

  if (!userexists) {
    return new Response(JSON.stringify({ msg: "User doesn't exist" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const isgoogleuser = userexists.googleId;
  if(isgoogleuser){
    return new Response(JSON.stringify({ msg: "Login with google" }), { status: 400 });
  }
  const isPcorrect = await argon2.verify(userexists.password , userinfo.password);
  if(!isPcorrect){
     return new Response(JSON.stringify({ msg: "Wrong Password" }), { status: 400 });
  }
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  session.user = { id: userexists._id };
  await session.save();
  const userInfo = {
    username: userexists.username,
    email: userexists.email,
    profile: userexists.profile,
  };
  return new Response(JSON.stringify({ msg: "Login successful", userInfo }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
