import connectDb from "@/lib/connectdb";
import Entrymodel from "@/models/Entrymodel";

export async function DELETE(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Entrymodel.findByIdAndDelete(id);
    return new Response(JSON.stringify({ msg: "Deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ msg: "Error" }), { status: 500 });
  }
}
