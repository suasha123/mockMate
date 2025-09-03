import connectDb from "@/lib/connectdb";
import { sessionoptions } from "@/lib/session";
import usermodel from "@/models/usermodel";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
export async function GET(req) {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  if (!session.user) {
    return new Response(JSON.stringify({ msg: "Not logged in" }), {
      status: 404,
    });
  } else {
    await connectDb();
    const user = await usermodel.findById(session.user.id);
    const userInfo = { username: user.username, email: user.email };
    return new Response(JSON.stringify({ msg: "User loggedIn", userInfo }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
