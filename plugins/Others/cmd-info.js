import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text
}) => {
  let hash = text;
  if (m.quoted && m.quoted?.fileSha256 && (hash = m.quoted?.fileSha256.toString("hex")), !hash) return void await conn.reply(m.chat, "❌ Hash not found", m);
  let sticker = db.data.sticker[hash];
  if (!sticker) return void await conn.reply(m.chat, "❌ Sticker not in the database", m);
  const [creatorName, mentionedNames] = await Promise.all([conn.getName(sticker.creator), Promise.all(sticker.mentionedJid.map(async v => conn.getName(v)))]);
  let cmdMentions = sticker.mentionedJid.map((v, i) => `No. *${i + 1}*:\n*Mention Name:* ${mentionedNames[i]} ${v === m.sender ? "👈" : "👤"}\n*Mention Number:* ${splitM(v)}\n*Mention Jid:* ${v}`).join("\n\n"),
    lockedEmoji = sticker.locked ? "🔒" : "🔓",
    str = `\n📎 *fileSha256:* ${hash}\n💬 *Text:* ${sticker.text}\n⏰ *Time Create:* ${sticker.at}\n${sticker.locked ? "🔐" : "🔓"} *Locked:* ${lockedEmoji}\n👤 *Creator Name:* ${creatorName}\n☎️ *Creator Number:* ${splitM(sticker.creator)}\n🆔 *Creator Jid:* ${sticker.creator}\n${sticker.mentionedJid.length > 0 ? `👥 *Cmd Mention:*\n${cmdMentions}` : ""}`.trim();
  await conn.reply(m.chat, str, m);
};
handler.help = ["infocmd"], handler.tags = ["database"], handler.command = ["infocmd"];
export default handler;

function splitM(jid) {
  return jid.split("@")[0];
}