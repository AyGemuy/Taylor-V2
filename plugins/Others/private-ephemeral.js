import pkg from "@whiskeysockets/baileys";
const {
  WA_DEFAULT_EPHEMERAL
} = pkg, options = {
  on: WA_DEFAULT_EPHEMERAL,
  off: 0,
  "1d": 86400,
  "7d": 604800,
  "90d": 7776e3
}, handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (2 !== args.length) {
    const usage = `Usage: *${usedPrefix + command} Number <options>*\nExample: *${usedPrefix + command} 628383770933 1d*\n\n[ List Options ]\n⭔ *on* ( WA Default )\n⭔ *off* ( disable )\n⭔ *1d* ( 1 hari )\n⭔ *7d* ( 7 hari )\n⭔ *90d* ( 90 hari )`;
    return m.reply(usage);
  }
  let jid = formatJid(args[0]);
  if (!((await conn.onWhatsApp(jid))[0] || {}).exists) throw "Nomor tidak terdaftar di WhatsApp!";
  const lowercaseText = args[1].toLowerCase(),
    selectedOption = options[lowercaseText];
  if (void 0 !== selectedOption) {
    await conn.sendMessage(jid, {
      disappearingMessagesInChat: selectedOption
    });
    const response = 0 === selectedOption ? "dimatikan" : selectedOption === WA_DEFAULT_EPHEMERAL ? "diaktifkan" : `disetel untuk *${lowercaseText}*`;
    return m.reply(`*Ephemeral messages* berhasil ${response}.`);
  } {
    const usage = `Usage: *${usedPrefix + command} Number <options>*\nExample: *${usedPrefix + command} 628383770933 1d*\n\n[ List Options ]\n⭔ *on* ( WA Default )\n⭔ *off* ( disable )\n⭔ *1d* ( 1 hari )\n⭔ *7d* ( 7 hari )\n⭔ *90d* ( 90 hari )`;
    return m.reply(usage);
  }
};
handler.help = ["disappearing"], handler.tags = ["main"], handler.command = /^(disappearing)$/i;
export default handler;

function formatJid(input) {
  return (input = input.replace(/[^0-9]/g, "")).startsWith("0") ? "62" + input.substring(1) + "@s.whatsapp.net" : input.startsWith("+62") ? "62" + input.substring(3) + "@s.whatsapp.net" : (input.startsWith("62"), input + "@s.whatsapp.net");
}