import connectDb from "@/lib/connectdb";

export default async function TestPage() {
  await connectDb();

  return (
    <div>
      <h1>MongoDB connected ✅</h1>
    </div>
  );
}
