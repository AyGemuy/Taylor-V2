const handler = async (m, {
  usedPrefix,
  command,
  text,
  args
}) => {
  if (!args || !["add", "remove"].includes(args[0]?.toLowerCase())) throw `\n*Penggunaan:* ${usedPrefix + command} <add|remove> nomor,nomor,...,nomor\n*Contoh:*\n${usedPrefix + command} add 6281111111111,12345678901,0\n${usedPrefix + command} remove 6281111111111,12345678901,0\n`.trim();
  let type = "add" === args[0]?.toLowerCase(),
    users = text.replace(args[0], "").trim().split(",").map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
  for (let who of users) {
    let user = db.data.users[who];
    user || (user = db.data.users[who] = {}), user.whitelist = type;
  }
  m.reply(`Berhasil ${type ? "menambah" : "menghapus"} whitelist ${users.length} pengguna`);
};
handler.help = ["whitelist"].map(v => v + " nomor,nomor"), handler.tags = ["owner"],
  handler.command = ["whitelist"], handler.owner = !0;
export default handler;