import pkg from "@whiskeysockets/baileys";
const {
  WA_DEFAULT_EPHEMERAL,
  groupToggleEphemeral
} = pkg, options = {
  on: WA_DEFAULT_EPHEMERAL,
  off: 0,
  "1d": 86400,
  "7d": 604800,
  "90d": 7776e3
}, handler = async (m, {
  conn,
  text,
  usedPrefix,
  isAdmin,
  isOwner,
  command
}) => {
  if (!isAdmin && !isOwner) return m.reply("*「ADMIN GROUP ONLY」*");
  const lowercaseText = text.toLowerCase(),
    selectedOption = options[lowercaseText];
  if (void 0 !== selectedOption) {
    conn.groupToggleEphemeral(m.chat, selectedOption);
    const response = 0 === selectedOption ? "matikan." : selectedOption === WA_DEFAULT_EPHEMERAL ? "nyalakan." : `set untuk *${lowercaseText}*`;
    m.reply(`*ephemeral* berhasil di ${response}`);
  } else {
    const usage = `Usage: *${usedPrefix + command} <options>*\nExample: *${usedPrefix + command} 1d*\n\n[ List Options ]\n⭔ *on* ( WA Default )\n⭔ *off* ( disable )\n⭔ *1d* ( 1 hari )\n⭔ *7d* ( 7 hari )\n⭔ *90d* ( 90 hari )`;
    m.reply(usage);
  }
};
handler.help = ["setephemeral"], handler.tags = ["group"], handler.command = /^((set)?ep(hem(eral)?)?|psgc|gcps|(ps|pesan)?sementara)$/i;
export default handler;