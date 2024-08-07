const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  try {
    const groupMeta = await conn.groupMetadata(m.chat),
      isRestricted = groupMeta.restrict,
      isAnnounced = groupMeta.announce,
      actionDetails = {
        open: {
          target: "not_announcement",
          message: "membuka",
          check: !isRestricted
        },
        close: {
          target: "announcement",
          message: "menutup",
          check: isRestricted && !isAnnounced
        },
        unlock: {
          target: "unlocked",
          message: "membuka",
          check: !isAnnounced
        },
        lock: {
          target: "lock",
          message: "mengunci",
          check: isAnnounced && !isRestricted
        }
      } [args[0] || ""];
    if (!actionDetails) return void await conn.reply(m.chat, `\n*Format salah! Contoh :*\n○ ${usedPrefix + command} close 1menit\n○ ${usedPrefix + command} open 30menit\n○ ${usedPrefix + command} unlock 15menit\n○ ${usedPrefix + command} lock 5menit\n            `.trim(), m);
    if (!actionDetails.check) return void await conn.reply(m.chat, "Grup ini sudah dalam kondisi yang tidak dapat diubah.", m);
    const timeInput = args[1],
      timeMatch = timeInput.match(/^(\d+)([a-zA-Z]+)$/);
    if (!timeMatch || isNaN(timeMatch[1])) return void await conn.reply(m.chat, "Format waktu tidak valid. Gunakan format '1detik/menit/jam/hari'.", m);
    const [timeValue, timeUnit] = [parseInt(timeMatch[1]), timeMatch[2].toLowerCase()], timeUnits = {
      detik: 1e3,
      menit: 6e4,
      jam: 36e5,
      hari: 864e5
    };
    if (!(timeUnit in timeUnits) || timeValue <= 0) return void await conn.reply(m.chat, "Waktu yang dimasukkan tidak valid. Gunakan angka positif untuk waktu.", m);
    const timeInMilliseconds = timeValue * timeUnits[timeUnit],
      actionMessage = actionDetails.message,
      processingMessage = await conn.reply(m.chat, `Sedang ${actionMessage} grup setelah ${timeInput}...`, m);
    setTimeout(async () => {
      await conn.groupSettingUpdate(m.chat, actionDetails.target), await conn.reply(m.chat, `Grup telah ${actionMessage} setelah ${timeInput}`, processingMessage);
    }, timeInMilliseconds);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, "Terjadi kesalahan dalam eksekusi perintah.", m);
  }
};
handler.help = ["group *open / close / unlock / lock* *waktu*"], handler.tags = ["group"],
  handler.command = /^(group|gcsetting|groupset)$/i, handler.admin = !0, handler.botAdmin = !0;
export default handler;