const handler = async (m, {
  conn,
  text,
  isOwner
}) => {
  if (!text) return m.reply("_Masukkan Nama Grup!_");
  try {
    m.react(wait);
    let group = await conn.groupCreate(text, [m.sender]),
      url = "https://chat.whatsapp.com/" + await conn.groupInviteCode(group.gid);
    m.reply("_Berhasil Membuat Grup *" + text + "*_\n\n*Nama:* " + text + "\n*ID:* " + group.gid + "\n*Link:* " + url);
  } catch (e) {
    let [namagc, partici] = text.split("|");
    if (!namagc) throw "Format Salah!!!";
    if (!partici) throw "Tag user sebagai member baru!";
    let mem = conn.parseMention(`@${parseInt(m.sender)} ${partici}`),
      ha = await conn.groupCreate(namagc, mem).catch(console.error);
    console.log(JSON.stringify(ha)), m.reply(`*GROUP CREATE*\n\n\`\`\`Group Telah Dibuat @${m.sender.replace(/@.+/, "")}\`\`\`\n\n\n${JSON.stringify(ha.participants)}`),
      conn.groupMakeAdmin(ha.gid, [m.sender]), isOwner || (await conn.modifyChat(ha.gid, "delete", {
        includeStarred: !1
      }).catch(console.error), conn.groupLeave(ha.gid));
  }
};
handler.help = ["creategroup"], handler.tags = ["premium"], handler.command = /^((create|buat)(gc|grup|group))$/,
  handler.owner = !0, handler.premium = !1;
export default handler;