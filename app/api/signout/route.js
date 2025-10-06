import { sessionoptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
export async function GET(req) {
  try{
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  if (session.user?.id) {
    session.destroy();
    return new Response(JSON.stringify({ msg: "loggedOut" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ msg: "Error" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
catch(err){
  console.log(err)
}
}
