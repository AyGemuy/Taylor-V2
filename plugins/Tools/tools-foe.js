import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh: ${usedPrefix + command} manusia`;
  m.react(wait);
  try {
    const data = await getSearchResults(text + " pertama kali di dunia");
    data.result && !data.result.includes("�") ? await conn.sendMessage(m.chat, {
      text: data.result
    }, {
      quoted: m
    }) : m.reply(data.result.includes("�") ? "Tidak ada hasil" : "Terjadi kesalahan");
  } catch (error) {
    console.error(error), m.reply("Terjadi kesalahan");
  }
};
handler.help = ["foe *[first on earth]*"], handler.tags = ["tools"], handler.command = ["foe"];
export default handler;
const getSearchResults = async query => {
  const {
    data
  } = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=id`);
  return {
    result: cheerio.load(data)(".Gx5Zad.xpd.EtOod.pkphOe:eq(1) .BNeawe.s3v9rd.AP7Wnd:eq(1)").text().trim() || ""
  };
};