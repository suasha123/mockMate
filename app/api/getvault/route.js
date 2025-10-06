import connectDb from "@/lib/connectdb";
import Entrymodel from "@/models/Entrymodel";
import { sessionoptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDb();
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionoptions);

    if (!session.user?.id) {
      return new Response(JSON.stringify({ msg: "loggedOut" }), { status: 404 });
    }

    const entries = await Entrymodel.find({ userId: session.user.id });
    return new Response(JSON.stringify({ entries }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ msg: "Error" }), { status: 500 });
  }
}
