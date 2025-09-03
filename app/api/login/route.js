import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import connectDb from "@/lib/connectdb";
import usermodel from "@/models/usermodel";
import { sessionoptions } from "@/lib/session";

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
   const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  session.user = { id: userexists._id };
  await session.save();

  return new Response(JSON.stringify({ msg: "Login successful" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
