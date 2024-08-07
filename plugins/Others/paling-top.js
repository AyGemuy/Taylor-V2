import fetch from "node-fetch";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
async function handler(m, {
  groupMetadata,
  command,
  conn,
  text,
  usedPrefix
}) {
  if (!text) return m.reply(`Contoh:\n${usedPrefix + command} pengcoli`);
  try {
    let ps = groupMetadata.participants.map(v => v.id),
      randomParticipants = Array.from({
        length: 10
      }, () => ps.getRandom()),
      x = pickRandom(["😨", "😅", "😂", "😳", "😎", "🥵", "😱", "🐦", "🙄", "🐤", "🗿", "🐦", "🤨", "🥴", "😐", "👆", "😔", "👀", "👎"]),
      res = await fetch("https://raw.githubusercontent.com/BadXyz/txt/main/citacita/citacita.json"),
      vn = pickRandom(await res.json()),
      top = `*${x} Top 10 ${text} ${x}*\n\n` + randomParticipants.map((id, index) => `${index + 1}. ${user(id)}`).join("\n");
    m.reply(top, null, {
      contextInfo: {
        mentionedJid: randomParticipants
      }
    });
    await conn.sendFile(m.chat, vn, "error.mp3", null, m, !0, {
      type: "audioMessage",
      ptt: !0
    });
  } catch (error) {
    console.error(error);
    m.reply("❌ Terjadi kesalahan dalam pemrosesan permintaan.");
  }
}

function user(id) {
  return "@" + id.split("@")[0];
}
handler.command = ["top"];
handler.tags = ["fun"];
handler.group = true;
export default handler;