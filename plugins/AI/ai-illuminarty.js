import { detectText } from "../../lib/other-function.js";
import axios from "axios";
import crypto from "crypto";
import { FormData } from "formdata-node";
const analyzeText = async (input) => {
  const ip = `${Array.from(
    {
      length: 4,
    },
    () => Math.floor(Math.random() * 256),
  ).join(".")}`;
  const formData = new FormData();
  formData.append("text", input);
  try {
    const { data } = await axios.post(
      "https://app.illuminarty.ai/api/analysis/text",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData.boundary}`,
          Cookie: `illuminarty_counter=${crypto.randomInt(1, 100)}`,
          "X-Forwarded-For": ip,
          Origin: "https://app.illuminarty.ai",
        },
      },
    );
    return data;
  } catch {
    throw new Error("❌ *An error occurred:* Unable to process the request.");
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    let res;
    if (command === "ishuman") {
      const result = await detectText(text);
      const {
        isHuman,
        additional_feedback,
        originalParagraph,
        feedback,
        detected_language,
        textWords,
        aiWords,
        fakePercentage,
      } = result.data;
      res =
        isHuman === 100
          ? `🧑‍💻 *Teks ini terdeteksi dibuat oleh Manusia*\n\n*Umpan Balik:* ${feedback}\n*Kalimat Asli:* ${originalParagraph}\n*Bahasa Terdeteksi:* ${detected_language}\n*Jumlah Kata:* ${textWords}\n*Jumlah Kata AI:* ${aiWords}\n*Persentase Palsu:* ${Math.round(fakePercentage * 100) / 100}%`
          : isHuman === 0
            ? `🤖 *Teks ini terdeteksi dibuat oleh Bot*\n\n*Kalimat Asli:* ${originalParagraph}\n*Bahasa Terdeteksi:* ${detected_language}\n*Jumlah Kata:* ${textWords}\n*Jumlah Kata AI:* ${aiWords}\n*Persentase Palsu:* ${Math.round(fakePercentage * 100) / 100}%`
            : `🔍 *Persentase manusia:* ${Math.round(isHuman * 100) / 100}%\n*Umpan Balik:* ${additional_feedback}\n*Kalimat Asli:* ${originalParagraph}\n*Bahasa Terdeteksi:* ${detected_language}\n*Jumlah Kata:* ${textWords}\n*Jumlah Kata AI:* ${aiWords}\n*Persentase Palsu:* ${Math.round(fakePercentage * 100) / 100}%`;
    } else if (command === "illuminarty") {
      const result = await analyzeText(text);
      const probability = result.data.probability;
      res =
        probability >= 0.5
          ? `🤖 *Teks ini terdeteksi dibuat oleh AI (${Math.round(probability * 1e4) / 100}%)*`
          : `🧑‍💻 *Teks ini terdeteksi dibuat oleh Manusia (${Math.round(probability * 1e4) / 100}%)*`;
    }
    m.reply(res);
  } catch {
    m.react(eror);
  }
};
handler.help = ["ishuman", "illuminarty"];
handler.tags = ["ai"];
handler.command = /^(ishuman|illuminarty)$/i;
export default handler;
