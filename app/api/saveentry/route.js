import { sessionoptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import connectDb from "@/lib/connectdb";
import Entrymodel from "@/models/Entrymodel";

export async function POST(req) {
  try {
    await connectDb();
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionoptions);

    if (!session.user?.id) {
      return new Response(JSON.stringify({ msg: "loggedOut" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { form } = await req.json();
    console.log("Form received:", form);

    if (!form.title || !form.username || !form.password) {
      return new Response(JSON.stringify({ msg: "Input Required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Session User ID:", session.user.id);

    await Entrymodel.create({
      title: form.title,
      username: form.username,
      password: form.password, 
      notes: form.notes,
      url: form.url,
      userId: session.user.id, 
    });

    return new Response(JSON.stringify({ msg: "Entry Saved" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in saveentry API:", err);
    return new Response(JSON.stringify({ msg: "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
