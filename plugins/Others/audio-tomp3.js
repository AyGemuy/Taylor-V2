import { toAudio, toAudio8k } from "../../lib/converter.js";
const handler = async (m, { conn, usedPrefix, command, args }) => {
  try {
    let q = m.quoted || m,
      mime = m.quoted?.mimetype || m.msg.mimetype || "";
    if (!/video|audio/.test(mime))
      return m.reply(
        `Reply video/audio yang ingin dikonversi dengan caption *${usedPrefix + command}*`,
      );
    let media = await q.download();
    if (!media) return m.reply("Tidak bisa mengunduh media");
    let is8k = args[0] === "8k",
      audio;
    audio = await (is8k ? toAudio8k : toAudio)(media, "mp3").catch(
      async () => await (is8k ? toAudio : toAudio8k)(media, "mp3"),
    );
    if (!audio?.data) return m.reply("Konversi gagal dengan kedua metode");
    await conn.sendFile(m.chat, audio.data, "audio.mp3", "", m, false, {
      mimetype: "audio/mp4",
      ptt: false,
    });
  } catch (error) {
    console.error(error);
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};
handler.help = ["toaudio"];
handler.tags = ["audio"];
handler.command = /^to(mp3|a(udio)?)$/i;
export default handler;
