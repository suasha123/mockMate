import connectDb from "@/lib/connectdb";
import Entrymodel from "@/models/Entrymodel";

export async function PUT(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), {
        status: 400,
      });
    }

    const body = await req.json();
    const updated = await Entrymodel.findByIdAndUpdate(id, body, {
      new: true, 
      runValidators: true,
    });

    if (!updated) {
      return new Response(JSON.stringify({ error: "Entry not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error("Error updating entry:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
