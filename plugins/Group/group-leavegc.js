const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args,
  isOwner
}) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  let chat = Object.keys(conn.chats).filter(v => v.endsWith("g.us")),
    groups = Object.keys(conn.chats).filter(key => key.endsWith("@g.us")).map(key => conn.chats[key]);
  !args[0] || "all" !== args[0]?.toLowerCase() && "semua" !== args[0]?.toLowerCase() ? (() => {
    try {
      if (!args[0] || isNaN(args[0])) {
        let usageMessage = `⚠️ *Invalid input.* Harap berikan nomor grup yang valid.\n\nCara Penggunaan: ${usedPrefix + command} <nomor grup>`,
          listMessage = "*List Grup:*\n" + groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join("\n");
        return m.reply(usageMessage + "\n\n" + listMessage);
      }
      let i = parseInt(args[0]);
      if (i <= 0 || i > groups.length) {
        let listMessage = "*⚠️ Invalid input.* Harap gunakan nomor grup yang valid.\n\n" + groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join("\n");
        return m.reply(listMessage);
      }
      let groupIndex = i - 1,
        str = `${[ i ]}\n*Nama Grup :* ${groups[groupIndex].metadata.subject} \n*Owner :* ${groups[groupIndex].metadata.owner ? "@" + groups[groupIndex].metadata.owner.split("@")[0] : "Tidak Diketahui"}\n*Subject Owner :* ${groups[groupIndex].metadata.subjectOwner ? "@" + groups[groupIndex].metadata.subjectOwner.split("@")[0] : "Tidak Diketahui"}\n*ID :* ${groups[groupIndex].metadata.id}\n*Restrict :* ${groups[groupIndex].metadata.restrict}\n*Announce :* ${groups[groupIndex].metadata.announce}\n*Ephemeral :* ${new Date(1e3 * groups[groupIndex].metadata.ephemeralDuration).toDateString()}\n*Desc ID :* ${groups[groupIndex].metadata.descId}\n*Description :* ${groups[groupIndex].metadata.desc?.toString().slice(0, 10) + "..." || "Tidak Diketahui"}\n*Admins :* ${groups[groupIndex].metadata.participants.filter(p => p.admin).map((v, i) => `\n${i + 1}. @${v.id.split("@")[0]}`).join(" [admin]")}\n${isOwner ? `*Participants :* ${groups[groupIndex].metadata.participants.length}` : ""}\n${isOwner ? `*isBotAdmin :* [ ${!!groups[groupIndex].metadata.participants.find(v => v.id === conn.user.jid).admin} ]` : ""}\n*Created :* ${new Date(1e3 * groups[groupIndex].metadata.subjectTime).toDateString()}\n*Creation :* ${new Date(1e3 * groups[groupIndex].metadata.creation).toDateString()}\n*Size :* ${groups[groupIndex].metadata.size}\n`;
      return m.reply(str).then(() => conn.groupLeave(groups[groupIndex].metadata.id)).then(() => delay(2e3)).then(() => m.reply("*Success!* Grup " + groups[groupIndex].metadata.subject + " telah di-leave!"));
    } catch (err) {
      return m.reply("*Error!* Terjadi kesalahan.").then(() => console.error(err));
    }
  })() : await Promise.all(chat.map(async id => {
    await conn.groupLeave(id), await delay(2e3);
  })).then(() => m.reply("*Success!* Semua grup telah di-leave."));
};
handler.help = ["leave", "leavegc"].map(v => v + " <nomor grup>"), handler.tags = ["group"],
  handler.command = /^leave(g(c|ro?up))?$/i, handler.rowner = !0, handler.owner = !0,
  handler.premium = !0;
export default handler;