const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args,
  isOwner,
  isAdmin,
  isROwner
}) => {
  const changelogData = conn.changelog || [],
    reply = async pesan => {
      await conn.reply(m.chat, pesan, m);
    };
  if (0 === args.length || "help" === args[0]) reply(`📝 *Perintah Changelog:*\n\n🔹 ${usedPrefix}changelog add|nama_fitur\n🔹 ${usedPrefix}changelog del|indeks\n🔹 ${usedPrefix}changelog list\n🔹 ${usedPrefix}changelog help`);
  else {
    const [action, ...rest] = args.join(" ").split("|");
    switch (action.trim().toLowerCase()) {
      case "add":
        if (0 === rest.length) reply("Mohon berikan nama fitur yang ingin ditambahkan.");
        else {
          const featureName = rest.join("|").trim();
          changelogData.push(featureName), conn.changelog = changelogData, reply(`✅ Fitur "${featureName}" telah ditambahkan ke changelog.`);
        }
        break;
      case "del":
        if (0 === rest.length) reply("Mohon berikan indeks fitur yang ingin dihapus.");
        else {
          const indexToDelete = parseInt(rest[0]) - 1;
          if (indexToDelete >= 0 && indexToDelete < changelogData.length) {
            const deletedFeature = changelogData.splice(indexToDelete, 1)[0];
            conn.changelog = changelogData, reply(`❌ Fitur "${deletedFeature}" telah dihapus dari changelog.`);
          } else reply("Indeks tidak valid. Mohon berikan indeks yang valid untuk dihapus.");
        }
        break;
      case "list":
        if (0 === changelogData.length) reply("Changelog saat ini kosong.");
        else {
          let changelogMessage = "📜 *Changelog:*\n\n";
          changelogData.forEach((feature, index) => {
            changelogMessage += `${index + 1}. ${feature}\n`;
          }), reply(changelogMessage);
        }
        break;
      default:
        reply("Perintah tidak valid. Gunakan " + usedPrefix + "changelog help untuk melihat perintah yang tersedia.");
    }
  }
};
handler.help = ["changelog"], handler.tags = ["group", "owner"], handler.command = /^(changelog)$/i;
export default handler;