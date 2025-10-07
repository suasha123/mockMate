import connectDb from "@/lib/connectdb";
import { sessionoptions } from "@/lib/session";
import usermodel from "@/models/usermodel";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "https://safe-vault-li5g.vercel.app/api/auth/google/callback",
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const profile = await userRes.json();
  await connectDb();
  const ifuserExists = await usermodel.findOne({ googleId: profile.sub });
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  let newuser;
  if (ifuserExists) {
    session.user = { id: ifuserExists._id };
  } else {
    const ifmanualexits = await usermodel.findOne({email : profile.email});
    if(ifmanualexits){
      return  Response.redirect(new URL("/signin?error=email_registered", req.url));
    }
    newuser = await usermodel.create({
      email: profile.email,
      username: profile.email.split("@")[0],
      googleId: profile.sub,
      profile: profile.picture,
    });
    session.user = { id: newuser._id };
  }

  await session.save();
  return Response.redirect(new URL("/", req.url));

}
