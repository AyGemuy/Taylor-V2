import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text =
    args.length >= 1
      ? args.slice(0).join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    m.reply(
      `Masukkan input. Contoh penggunaan: ${usedPrefix + command} en Halo dunia`,
    );
    return;
  }
  try {
    let res;
    switch (command) {
      case "mrbeast":
        res = await fetchAudioBuffer(
          "https://sandipbaruwal.onrender.com/beast?text=",
          text,
          m,
        );
        break;
      case "mrbeastv2":
        res = await fetchAudioJSON(
          "https://www.api.vyturex.com/beast?query=",
          text,
          m,
        );
        break;
      case "snoop":
        res = await fetchAudioBuffer(
          "https://sandipbaruwal.onrender.com/snoop?text=",
          text,
          m,
        );
        break;
      case "jane":
        res = await fetchAudioBuffer(
          "https://sandipbaruwal.onrender.com/jane?text=",
          text,
          m,
        );
        break;
      default:
        m.reply("Perintah tidak ditemukan.");
        return;
    }
    if (res) {
      await conn.sendFile(m.chat, res, "audio.mp3", "", m, !0, {
        mimetype: "audio/mp4",
        ptt: !0,
        waveform: [100, 0, 100, 0, 100, 0, 100],
        contextInfo: {
          ...adReply.contextInfo,
          mentionedJid: [m.sender],
        },
      });
    }
  } catch (e) {
    m.reply("Terjadi kesalahan saat memproses permintaan."),
      console.error("An error occurred:", e);
  }
};
handler.help = [
  "mrbeast <teks>",
  "mrbeastv2 <teks>",
  "snoop <teks>",
  "jane <teks>",
];
handler.tags = ["tools"];
handler.command = /^(mrbeast|mrbeastv2|snoop|jane)$/i;
export default handler;
async function fetchAudioBuffer(baseUrl, query, m) {
  try {
    let res = await fetch(baseUrl + encodeURIComponent(query));
    if (!res.ok) {
      m.reply("Gagal mendapatkan audio.");
      return null;
    }
    return await res.arrayBuffer();
  } catch (e) {
    m.reply("Terjadi kesalahan saat menghubungi server.");
    console.error("An error occurred:", e);
    return null;
  }
}
async function fetchAudioJSON(baseUrl, query, m) {
  try {
    let res = await fetch(baseUrl + encodeURIComponent(query));
    if (!res.ok) {
      m.reply("Gagal mendapatkan audio.");
      return null;
    }
    let json = await res.json();
    if (!json.audio) {
      m.reply("Respon tidak valid.");
      return null;
    }
    return json.audio;
  } catch (e) {
    m.reply("Terjadi kesalahan saat menghubungi server.");
    console.error("An error occurred:", e);
    return null;
  }
}
