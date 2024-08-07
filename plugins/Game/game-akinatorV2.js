import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if (m.isGroup) return;
  let aki = db.data.users[m.sender].akinator;
  if ("end" === text) {
    if (!aki.sesi) return m.reply("Anda tidak sedang dalam sesi Akinator ( V2 )");
    aki.sesi = !1, aki.soal = null, m.reply("Berhasil keluar dari sesi Akinator ( V2 ).");
  } else {
    if (aki.sesi) return await conn.reply(m.chat, "Anda masih berada dalam sesi Akinator ( V2 )", aki.soal);
    try {
      let res = await fetch(`https://api.lolhuman.xyz/api/akinator/start?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
        anu = await res.json();
      if (200 !== anu.status) throw Error("Emror");
      let {
        server,
        frontaddr,
        session,
        signature,
        question,
        progression,
        step
      } = anu.result;
      aki.sesi = !0, aki.server = server, aki.frontaddr = frontaddr, aki.session = session,
        aki.signature = signature, aki.question = question, aki.progression = progression,
        aki.step = step;
      let txt = `🎮 *Akinator ( V2 )* 🎮\n\n@${m.sender.split("@")[0]}\n${question}\n\n`;
      txt += "0 - Ya\n", txt += "1 - Tidak\n", txt += "2 - Saya Tidak Tau\n", txt += "3 - Mungkin\n",
        txt += "4 - Mungkin Tidak\n\n", txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator ( V2 )`;
      let soal = await conn.sendMessage(m.chat, {
        text: txt,
        mentions: [m.sender]
      }, {
        quoted: m
      });
      aki.soal = soal;
    } catch (e) {
      console.log(e), m.reply("Fitur Error!");
    }
  }
};
handler.menu = ["akinatorv2"], handler.tags = ["game"], handler.command = /^(akinatorv2)$/i,
  handler.limit = !0;
export default handler;