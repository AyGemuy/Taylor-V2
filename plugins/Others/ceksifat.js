import fetch from "node-fetch";
const handler = async (m, {
  conn,
  command,
  text
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()),
    name = conn.getName(who);
  if (!text) return await conn.reply(m.chat, "*Masukan Namamu Udin!*", m);
  const getRandomValue = () => Math.floor(100 * Math.random()) + 1,
    getRandomElement = array => array[Math.floor(Math.random() * array.length)];
  getRandomValue();
  let [a, b, e, f, g, h] = Array.from({
    length: 6
  }, getRandomValue), c = getRandomElement(["Baik Hati", "Sombong", "Pelit", "Dermawan", "Rendah Hati", "Rendah Diri", "Pemalu", "Penakut", "Pengusil", "Cengeng"]), d = getRandomElement(["Rajin", "Malas", "Membantu", "Ngegosip", "Jail", "Gak jelas", "Shoping", "Chattan sama Doi", "Chattan di WA karna Jomblo", "Sedih", "Kesepian", "Bahagia"]), cksft = `\n    *📝 Nama:* ${text}\n    *🔶 Ahlak Baik:* ${a}%\n    *🔷 Ahlak Buruk:* ${b}%\n    *🔸 Orang yang:* ${c}\n    *🔹 Selalu:* ${d}\n    *🔺 Kecerdasan:* ${e}%\n    *🔻 Kenakalan:* ${f}%\n    *🚀 Keberanian:* ${g}%\n    *🚧 Ketakutan:* ${h}%\n  `;
  const msdpn = [text + " Anda akan menjadi orang yang Kaya, keluarga yang harmonis, memiliki " + b + " memiliki anak, memiliki " + d + " memiliki kendaraan, memiliki " + b + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang harmonis, memiliki " + c + " memiliki anak, memiliki " + a + " memiliki kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Miskin, keluarga yang Sederhana, memiliki " + a + " anak, tidak memiliki kendaraan, rumah ngontrak", text + " Anda akan menjadi orang yang Sederhana, keluarga yang dicerai, memiliki " + e + " anak, memiliki " + b + " kendaraan, memiliki " + b + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang Sederhana, memiliki " + b + " anak, memiliki " + b + " kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Miskin, keluarga yang dicerai memiliki " + b + " anak, memiliki " + a + " kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Kaya, keluarga yang Sederhana, memiliki " + a + " anak, memiliki " + a + " kendaraan, memiliki " + b + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang Harmonis, memiliki " + a + " anak, memiliki " + c + " kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Miskin, tidak memiliki keluarga (jomblo), tidak memiliki anak, tidak memiliki kendaraan, tidak memiliki rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang Sederhana, memiliki " + d + " anak, memiliki " + a + " kendaraan, memiliki " + b + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang kacau, tidak memiliki anak (Gugur), memiliki " + b + " kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Sangat Kaya, keluarga yang Sangat Harmonis, memiliki " + e + " anak, memiliki " + f + " kendaraan, memiliki " + g + " rumah", text + " Anda akan menjadi orang yang Sangat Miskin, keluarga yang Sederhana, memiliki " + g + " anak, tidak memiliki kendaraan, rumah ngontrak", text + " Anda akan menjadi orang yang Kaya, keluarga yang Pelit, memiliki " + b + " anak, memiliki " + b + " kendaraan, memiliki " + b + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang Pelit, memiliki " + a + " anak, memiliki " + a + " kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang dicerai, memiliki " + b + " anak, memiliki " + a + " kendaraan, rumah ngontrak", text + " Anda akan menjadi orang yang Sangat Sederhana, keluarga yang Sakinah, memiliki " + a + " anak, memiliki " + a + " kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang Sangat Sederhana, memiliki " + a + a + " anak, memiliki " + a + " kendaraan, memiliki " + a + " rumah", text + " Anda akan menjadi orang yang Sederhana, keluarga yang Sangat Sederhana, memiliki " + b + " anak kembar, memiliki " + c + " kendaraan, memiliki " + b + " rumah", text + " Anda akan menjadi orang yang Sederhana keluarga yang Sederhana, memiliki " + b + " anak kembar dan " + a + " anak lagi, memiliki " + a + " kendaraan, memiliki " + a + " rumah"][getRandomValue() % 20];
  "ceksifat" === command && await conn.reply(m.chat, cksft, m, {
    mentions: conn.parseMention(cksft),
    fileLength: fsizedoc,
    seconds: fsizedoc,
    contextInfo: {
      mentionedJid: conn.parseMention(cksft),
      externalAdReply: {
        mediaUrl: sig,
        mediaType: 2,
        description: wm,
        title: "👋 Hai, " + name + " " + ucapan,
        body: botdate,
        thumbnail: await (await conn.getFile(pp)).data,
        sourceUrl: sig
      }
    }
  }), "masadepannya" === command && await conn.reply(m.chat, msdpn, m, {
    mentions: conn.parseMention(msdpn),
    fileLength: fsizedoc,
    seconds: fsizedoc,
    contextInfo: {
      mentionedJid: conn.parseMention(msdpn),
      externalAdReply: {
        mediaUrl: sig,
        mediaType: 2,
        description: wm,
        title: "👋 Hai, " + name + " " + ucapan,
        body: botdate,
        thumbnail: await (await conn.getFile(pp)).data,
        sourceUrl: sig
      }
    }
  });
};
handler.help = ["ceksifat", "masadepannya"].map(v => v + " <nama>"), handler.tags = ["kerang", "fun"],
  handler.command = ["ceksifat", "masadepannya"];
export default handler;