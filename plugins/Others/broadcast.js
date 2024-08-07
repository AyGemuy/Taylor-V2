import {
  randomBytes
} from "crypto";
import _ from "lodash";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  let imgr = flaaa.getRandom(),
    chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0]),
    cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : m);
  text || cc.text;
  await conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m);
  for (let id of chats) {
    await delay(1500);
    if (args[0] === "polling") {
      let a = text?.split(/[\|\n]/).slice(1);
      if (!a?.[1]) throw `Format salah!\n${usedPrefix}${command} pesan | pilihan1 | pilihan2 atau pesan\npilihan1\npilihan2`;
      if (a?.[12]) throw `Terlalu banyak pilihan, maksimal 12.\n${usedPrefix}${command} pesan | pilihan1 | pilihan2 atau pesan\npilihan1\npilihan2`;
      if (checkDuplicate(a)) throw "Ada pilihan yang sama dalam polling!";
      const pollMessage = {
        name: `*Polling Request By* ${m?.name}\n*Pesan:* ${text?.split(/[\|\n]/)[0]}`,
        values: a,
        multiselect: false,
        selectableCount: 1
      };
      await conn.sendMessage(id, {
        poll: pollMessage
      }, {
        quoted: m
      });
    } else if (args[0] === "sharebot") {
      let contactArray = imgr.endsWith("@g.us") ? [
        [conn.user.jid.split("@")[0], conn.getName(conn.user.jid), "🔥 Bot WhatsApp 🐣", "📵 Jangan spam/telpon 😢", "Nothing", "🇮🇩 Indonesia", "🚀 https://s.id/Cerdasin62/", "🤖 Bot yang kadang eror ☺"]
      ] : {
        protocolMessage: {
          type: 11
        }
      };
      await conn.sendContactArray(id, contactArray, m);
    } else {
      await conn.sendFile(id, imgr + "BROADCAST", "", `✨ *BROADCAST* ✨\n\n*Pesan:*\n${text}`, m);
    }
  }
  m.reply("✅ Selesai Broadcast ke Semua Chat :)");
};
handler.help = ["broadcast", "bc"].map(v => v + " <teks>");
handler.tags = ["owner"];
handler.command = /^(broadcast|bc)$/i;
handler.owner = true;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001),
  delay = time => new Promise(res => setTimeout(res, time)),
  randomID = length => randomBytes(Math.ceil(.5 * length)).toString("hex").slice(0, length);

function checkDuplicate(arr) {
  return _.uniq(arr).length !== arr.length;
}