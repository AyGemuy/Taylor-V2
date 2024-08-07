const handler = async (m, {
  conn,
  participants,
  groupMetadata
}) => {
  const pp = await conn.profilePictureUrl(m.chat, "image").catch(_ => null) || "./src/avatar_contact.png",
    {
      isBanned,
      welcome,
      detect,
      sWelcome,
      sBye,
      sPromote,
      sDemote,
      antiLink,
      antiDelete,
      antiBot,
      antiVideo,
      antiFoto,
      antiSticker,
      antiToxic,
      simi
    } = db.data.chats[m.chat],
    groupAdmins = participants.filter(p => p.admin),
    listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split("@")[0]}`).join("\n"),
    owner = groupMetadata.owner || groupAdmins.find(p => "superadmin" === p.admin)?.id || m.chat?.split("-")[0] + "@s.whatsapp.net";
  let text = `*「 Group Information 」*\n\n*ID Grup:* \n${groupMetadata.id}\n\n*Nama Grup:* \n${groupMetadata.subject}\n\n*Deskripsi Grup:* \n${groupMetadata.desc?.toString() || "Tidak Ada"}\n\n*Total Member:*\n${participants.length} Member\n\n*Owner Grup:* \n@${owner.split("@")[0]}\n\n*Admin Grup:*\n${listAdmin}\n\n*Pengaturan Group:*\n\nChat Banned: ${isBanned ? "Aktif" : "Nonaktif"}\nWelcome: ${welcome ? "Aktif" : "Nonaktif"}\nSimi: ${simi ? "Aktif" : "Nonaktif"}\nAnti Bot: ${antiBot ? "Aktif" : "Nonaktif"}\nAnti Delete: ${antiDelete ? "Nonaktif" : "Aktif"}\nAnti Link: ${antiLink ? "Aktif" : "Nonaktif"}\nAnti Foto: ${antiFoto ? "Aktif" : "Nonaktif"}\nAnti Video: ${antiVideo ? "Aktif" : "Nonaktif"}\nAnti Sticker: ${antiSticker ? "Aktif" : "Nonaktif"}\nAnti Toxic: ${antiToxic ? "Aktif" : "Nonaktif"}\n`.trim();
  await conn.sendFile(m.chat, pp, "pp.jpg", text, m, !1, {
    mentions: [...groupAdmins.map(v => v.id), owner]
  });
};
handler.help = ["infogrup"], handler.tags = ["group"], handler.command = /^(gro?upinfo|info(gro?up|gc))$/i,
  handler.group = !0;
export default handler;