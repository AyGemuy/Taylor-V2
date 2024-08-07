import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  text
}) => {
  conn.secmail = conn.secmail ? conn.secmail : {};
  let id = "secmail",
    lister = ["create", "message", "delete"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ");
  if (!lister.includes(feature)) return m.reply("*Example:*\n" + usedPrefix + command + " create\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("create" === feature) try {
      let eml = await random_mail(),
        info = eml[0]?.split("@");
      conn.secmail[id] = [m.reply("*EMAIL:*\n" + eml[0] + "\n\n*Login:*\n" + info[0] + "\n\n*Domain:*\n" + info[1] + "\n\n_Ketik *" + usedPrefix + command + " message* Untuk mengecek inbox_"), eml[0], info[0], info[1]];
    } catch (e) {
      m.react(eror);
    }
    if ("message" === feature) {
      if (!conn.secmail[id]) return m.reply("Tidak ada pesan, buat email terlebih dahulu\nKetik *" + usedPrefix + command + " create*");
      try {
        let teks = (await get_mails(conn.secmail[id][2], conn.secmail[id][3])).map((v, index) => `*EMAIL [ ${index + 1} ]*\n*ID* : ${v.id}\n*Dari* : ${v.from}\n\n*Subjek* : ${v.subject}\n*Date* : ${v.date}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks || "*KOSONG*\n\n_Ketik *" + usedPrefix + command + " delete* Untuk menghapus email_");
      } catch (e) {
        m.react(eror);
      }
    }
    if ("delete" === feature) {
      if (!conn.secmail[id]) return m.reply("Tidak ada email yang terpakai");
      try {
        delete conn.secmail[id], m.reply("Sukses menghapus email");
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["secmail"], handler.tags = ["misc"], handler.command = /^(secmail)$/i;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt(duration % 1e3 / 100),
    seconds = Math.floor(duration / 1e3 % 60),
    minutes = Math.floor(duration / 6e4 % 60);
  return `${Math.floor(duration / 36e5 % 24)}h ${minutes}m ${seconds}s ${milliseconds}ms`;
}

function formatBytes(sizeInBytes) {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let size = sizeInBytes,
    unitIndex = 0;
  for (; size >= 1024 && unitIndex < units.length - 1;) size /= 1024, unitIndex++;
  return size.toFixed(2) + " " + units[unitIndex];
}
async function random_mail() {
  try {
    let response = await fetch("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
async function get_mails(id, domain) {
  const link = `https://www.1secmail.com/api/v1/?action=getMessages&login=${id}&domain=${domain}`;
  try {
    let response = await fetch(link);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}