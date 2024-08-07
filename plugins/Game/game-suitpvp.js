let timeout = 6e4,
  poin = 500,
  poin_lose = -100;
const handler = async (m, {
  conn,
  usedPrefix
}) => {
  let who;
  if (who = m.isGroup && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender, conn.suit = conn.suit ? conn.suit : {}, Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(m.sender))) throw "Selesaikan suit sebelumnya terlebih dahulu.";
  if (!who) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya.. Contoh\n\n${usedPrefix}suit @${conn.user.jid.split("@")[0]}`, m.chat, {
    contextInfo: {
      mentionedJid: [conn.user.jid]
    }
  });
  if (Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(who))) throw "Orang yang kamu tantang sedang bermain suit bersama orang lain :(";
  let id = "suit_" + 1 * new Date(),
    caption = `\n_*SUIT PvP*_\n\n@${m.sender.split("@")[0]} menantang @${who.split("@")[0]} untuk bermain suit.\n\nSilahkan @${who.split("@")[0]}.\n\n\n`.trim();
  conn.suit[id] = {
    chat: await conn.reply(m.chat, caption + 'Ketik "terima/ok/gas" untuk memulai suit\nKetik "tolak/gabisa/nanti" untuk menolak.', m, {
      mentions: [m.sender, ...conn.parseMention(caption)]
    }),
    id: id,
    p: m.sender,
    p2: who,
    status: "wait",
    waktu: setTimeout(async () => {
      conn.suit[id] && await conn.reply(m.chat, "_Waktu suit habis_", m), delete conn.suit[id];
    }, timeout),
    poin: poin,
    poin_lose: poin_lose,
    timeout: timeout
  };
};
handler.tags = ["game"], handler.help = ["suitpvp", "suit"].map(v => v + " @tag"),
  handler.command = /^suit(pvp)?$/i, handler.group = !0;
export default handler;