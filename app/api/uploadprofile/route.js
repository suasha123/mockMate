import { cloudinary } from "@/lib/cloudinaryconfig";
import { sessionoptions } from "@/lib/session";
import usermodel from "@/models/usermodel";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
export async function POST(req) {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionoptions);
  if (!session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("profilepic");
    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadRes = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      {
        folder: "mockMate",
        transformation: [{ gravity: "face", zoom: 1.9, crop: "thumb" }],
      }
    );
    await usermodel.findByIdAndUpdate(session.user.id , {
        profile : uploadRes.secure_url
    });
    return Response.json({msg : "Update success"  , newPicUrl: uploadRes.secure_url} , {status : 200});
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
