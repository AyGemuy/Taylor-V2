const handler = async (m, {
  conn,
  groupMetadata,
  args,
  usedPrefix,
  command
}) => {
  let text, ids = groupMetadata.participants.filter(p => !p.admin || p.superadmin).map(v => v.id),
    listSections = [];
  const getNamePromises = ids.map(async (id, index) => {
    let name = conn.getName(id);
    listSections.push(["Result [ " + (index + 1) + " ]", [
      ["❌ KICK " + (void 0 === name ? "Unknown" : name), usedPrefix + command + " " + id, ""]
    ]]);
  });
  if (await Promise.all(getNamePromises), args.length >= 1) text = args.join(" ");
  else {
    if (!m.quoted || !m.quoted?.sender) return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, "⚡ Silakan pilih User", author, "☂️ M O D E L ☂️", listSections, m);
    text = m.quoted?.sender;
  }
  if (!ids.includes(text)) throw "Dia Sudah Out";
  return conn.groupParticipantsUpdate(m.chat, [text], "remove");
};
handler.help = ["kick", "-"].map(v => "g" + v + " @user"), handler.tags = ["owner"],
  handler.command = /^g?kick$/i, handler.owner = !0, handler.group = !0, handler.botAdmin = !0;
export default handler;