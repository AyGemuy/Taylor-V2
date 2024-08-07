import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    if (!text) throw `\n*${usedPrefix}${command} <nama hewan>*\nContoh:\n*${usedPrefix}${command} dog*\n\nDaftar Hewan:\n- dog\n- cat\n- panda\n- fox\n- red_panda\n- koala\n- birb\n- raccoon\n- kangaroo\n`.trim();
    if (!["dog", "cat", "panda", "fox", "red_panda", "koala", "birb", "raccoon", "kangaroo"].includes(text)) throw "Nama hewan tidak valid. Silakan gunakan salah satu opsi yang tersedia.";
    let res = await fetch(API("https://some-random-api.com", "/animal/" + text, {}));
    if (!res.ok) throw `${res.status} ${res.statusText}`;
    let json = await res.json();
    if (!json.image) throw json;
    await conn.sendFile(m.chat, json.image, "", `${json.fact}`, m);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, "Terjadi kesalahan dalam memproses perintah.", m);
  }
};
handler.help = ["animal"].map(v => v + " <nama_hewan>"), handler.tags = ["internet"],
  handler.command = /^(animal|animalfact)$/i;
export default handler;