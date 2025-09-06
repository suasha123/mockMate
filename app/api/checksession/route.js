import connectDb from "@/lib/connectdb";
import { sessionoptions } from "@/lib/session";
import roommodel from "@/models/roommodel";
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
    const ifRoomExists = await roommodel.findOne({
      userid: session.user.id,
      endedAt: null,
    });
    const userInfo = {
      username: user.username,
      email: user.email,
      profile: user.profile,
      completed: user.completed,
      avg: user.avg,
      roomid : ifRoomExists?._id
    };
    return new Response(JSON.stringify({ msg: "User loggedIn", userInfo }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
