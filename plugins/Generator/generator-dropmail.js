import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  text
}) => {
  conn.dropmail = conn.dropmail ? conn.dropmail : {};
  let id = "dropmail",
    lister = ["create", "message", "delete"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ");
  if (!lister.includes(feature)) return m.reply("*Example:*\n" + usedPrefix + command + " create\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("create" === feature) try {
      let eml = await random_mail(),
        timeDiff = new Date(eml[2]) - new Date();
      conn.dropmail[id] = [m.reply("*EMAIL:*\n" + eml[0] + "\n\n*ID:*\n" + eml[1] + "\n\n*Expired:*\n" + msToTime(timeDiff) + "\n\n_Ketik *" + usedPrefix + command + " message* Untuk mengecek inbox_"), eml[0], eml[1], eml[2]];
    } catch (e) {
      m.react(eror);
    }
    if ("message" === feature) {
      if (!conn.dropmail[id]) return m.reply("Tidak ada pesan, buat email terlebih dahulu\nKetik *" + usedPrefix + command + " create*");
      try {
        let teks = (await get_mails(conn.dropmail[id][2]))[0].map((v, index) => `*EMAIL [ ${index + 1} ]*\n*Dari* : ${v.fromAddr}\n*Untuk* : ${v.toAddr}\n\n*Pesan* : ${v.text}\n*Size* : ${formatSize(v.rawSize)}\n*Header* : ${v.headerSubject}\n*Download* : ${v.downloadUrl}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks || "*KOSONG*\n\n_Ketik *" + usedPrefix + command + " delete* Untuk menghapus email_");
      } catch (e) {
        m.react(eror);
      }
    }
    if ("delete" === feature) {
      if (!conn.dropmail[id]) return m.reply("Tidak ada email yang terpakai");
      try {
        delete conn.dropmail[id], m.reply("Sukses menghapus email");
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["dropmail"], handler.tags = ["misc"], handler.command = /^(dropmail)$/i;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt(duration % 1e3 / 100),
    seconds = Math.floor(duration / 1e3 % 60),
    minutes = Math.floor(duration / 6e4 % 60);
  return `${Math.floor(duration / 36e5 % 24)}h ${minutes}m ${seconds}s ${milliseconds}ms`;
}

function formatSize(sizeInBytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  for (; sizeInBytes >= 1024 && index < units.length - 1;) sizeInBytes /= 1024, index++;
  return sizeInBytes.toFixed(2) + " " + units[index];
}
async function random_mail() {
  try {
    let response = await fetch("https://dropmail.me/api/graphql/web-test-wgq6m5i?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return [data.data.introduceSession.addresses[0].address, data.data.introduceSession.id, data.data.introduceSession.expiresAt];
  } catch (error) {
    console.log(error);
  }
}
async function get_mails(id_) {
  const link = `https://dropmail.me/api/graphql/web-test-wgq6m5i?query=query%20(%24id%3A%20ID!)%20%7Bsession(id%3A%24id)%20%7B%20addresses%20%7Baddress%7D%2C%20mails%7BrawSize%2C%20fromAddr%2C%20toAddr%2C%20downloadUrl%2C%20text%2C%20headerSubject%7D%7D%20%7D&variables=%7B%22id%22%3A%22${id_}%22%7D`;
  try {
    let response = await fetch(link);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let inbox = (await response.json()).data.session.mails;
    return [inbox, inbox.length];
  } catch (error) {
    console.log(error);
  }
}