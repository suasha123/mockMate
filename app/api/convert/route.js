import OpenAI from "openai";
const apiKey = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey });

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    console.log("file hai", file);

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: "en",
    });

    console.log("Transcription:", transcription);

    return new Response(JSON.stringify({ transcription }), { status: 200 });
  } catch (err) {
    console.error("Whisper error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
