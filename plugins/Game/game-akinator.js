import {
  Aki
} from "aki-api";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if (conn.akinator = conn.akinator || {}, "end" === text) {
    if (!conn.akinator[m.sender]) return m.reply("Anda tidak sedang dalam sesi Akinator");
    delete conn.akinator[m.sender], m.reply("Berhasil keluar dari sesi Akinator.");
  } else if ("start" === text) {
    if (conn.akinator[m.sender]) return await conn.reply(m.chat, "Anda masih berada dalam sesi Akinator", conn.akinator[m.sender].msg);
    try {
      conn.akinator[m.sender] = new Aki({
        region: "id",
        childMode: !1,
        proxy: void 0
      }), await conn.akinator[m.sender].start();
      let txt = `🎮 *Akinator* 🎮\n\n@${m.sender.split("@")[0]}\n${conn.akinator[m.sender].question}\n\n`;
      txt += "0 - Ya\n", txt += "1 - Tidak\n", txt += "2 - Saya Tidak Tau\n", txt += "3 - Mungkin\n",
        txt += "4 - Mungkin Tidak\n\n", txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator`;
      let soal = await conn.sendMessage(m.chat, {
        text: txt,
        mentions: [m.sender]
      }, {
        quoted: m
      });
      conn.akinator[m.sender].msg = soal;
    } catch (e) {
      console.log(e), m.react(eror);
    }
  } else m.reply("Contoh: .akinator start/end");
};
handler.menu = ["akinator"], handler.tags = ["game"], handler.command = /^(akinator)$/i,
  handler.limit = !0;
export default handler;