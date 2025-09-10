import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import whisper from "whisper-node";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
ffmpeg.setFfmpegPath(ffmpegPath);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempWebmPath = path.join(os.tmpdir(), file.name);
    await writeFile(tempWebmPath, buffer);
    const wavPath = path.join(os.tmpdir(), "converted.wav");

    await new Promise((resolve, reject) => {
      ffmpeg(tempWebmPath)
        .outputOptions(["-ar 16000", "-ac 1"])
        .toFormat("wav")
        .save(wavPath)
        .on("end", resolve)
        .on("error", reject);
    });
    const transcript = await whisper(wavPath, {
      modelName: "base.en",
      whisperOptions: { language: "en" },
    });
    return new Response(JSON.stringify({ transcript }), { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
