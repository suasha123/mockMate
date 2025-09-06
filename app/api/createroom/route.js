import { sessionoptions } from "@/lib/session";
import roommodel from "@/models/roommodel";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(req) {
  const { ivinfo } = await req.json();
  if (!ivinfo) {
    return new Response(JSON.stringify({ msg: "Cannot create room" }), {
      status: 404,
    });
  }
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  if (!session.user) {
    return new Response(JSON.stringify({ msg: "Log In again" }), {
      status: 404,
    });
  }
  console.log(session.user.id);
  const ifRoomExists = await roommodel.findOne({
    userid: session.user.id,
    endedAt: null, 
  });
  console.log(ifRoomExists);
  if(ifRoomExists){
    return new Response(JSON.stringify({id: ifRoomExists._id}) , {status : 200});
  }
  const newRoom = await roommodel.create({
    role : ivinfo.role,
    round : ivinfo.round,
    userid : session.user.id
  });
   return new Response(JSON.stringify({id: newRoom._id}) , {status : 200});
}
