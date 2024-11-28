import { clockString } from "../../lib/other-function.js";
const handler = async (m, { conn, command, args }) => {
  if ("listpremium" === command) {
    let prem = prems
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .filter((v) => v !== conn.user.jid);
    if (prem && 0 !== prem.length) {
      let teks =
        "▢ *Pengguna Premium*\n─────────────\n" +
        prem.map((v) => "• @" + v.replace(/@.+/, "")).join("\n");
      m.reply(teks, null, {
        mentions: conn.parseMention(teks),
      });
    } else m.reply("Tidak ada user premium");
  } else {
    let users = Object.entries(db.data.users)
      .filter(([key, value]) => value.premiumTime)
      .map(([key, value]) => ({
        ...value,
        jid: key,
      }));
    if (!users || 0 === users.length)
      return void m.reply("Tidak ada user premium");
    let premiumTime = db.data.users[m.sender]?.premiumTime || 0,
      prem = db.data.users[m.sender]?.premium || !1,
      waktu = clockString(premiumTime - new Date().getTime()),
      sortedP = users.sort((a, b) => b.premiumTime - a.premiumTime),
      len =
        args[0] && args[0].length > 0
          ? Math.min(100, Math.max(parseInt(args[0]), 10))
          : Math.min(10, sortedP.length),
      myName = conn.getName(m.sender),
      names = await Promise.all(
        sortedP
          .slice(0, len)
          .map(async ({ jid, registered }) =>
            registered ? db.data.users[jid].name : conn.getName(jid),
          ),
      ),
      myPrem = `┌✦ *⚕️My Premium Time⚕️*\n┊• *👤Nama:* ${myName}\n┊• *PremiumTime:* ${prem ? waktu : "Expired 🚫"}\n╚┈┈┈┈┈┈┈┈┈✧\n`,
      allPrem =
        "–––『 𝗔𝗟𝗟 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 』–––\n\n" +
        sortedP
          .slice(0, len)
          .map(
            ({ jid, premiumTime }, i) =>
              `┌✦ ( ${i + 1} )\n┊👤 Nama: ${names[i]}\n┊☎ Nomor: ${jid.split("@")[0]}\n┊ *Link:* wa.me/${jid.split("@")[0]}\n┊ *Waktu Premium:* ${premiumTime > new Date().getTime() ? clockString(premiumTime - new Date().getTime()) : "Expired 🚫"}\n╚┈┈┈┈┈┈┈┈┈✧`,
          )
          .join("\n"),
      capt = myPrem + "\n" + allPrem;
    m.reply(capt, null, {
      mentions: conn.parseMention(capt),
    });
  }
};
(handler.help = ["premlist [angka]"]),
  (handler.tags = ["info"]),
  (handler.command = ["listprem", "premlist", "listpremium"]);
export default handler;

function sort(property, ascending = !0) {
  return (a, b) => (ascending ? 1 : -1) * (a[property] - b[property]);
}
