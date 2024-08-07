import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  const [from, to] = text.split(/[^\w\s]/g);
  if (!from || !to) throw `Contoh: ${usedPrefix + command} jakarta|bandung`;
  m.react(wait);
  try {
    const data = await jarak(from, to);
    data.img ? await conn.sendMessage(m.chat, {
      image: data.img,
      caption: data.desc + "\n\n" + data.rute
    }, {
      quoted: m
    }) : m.reply(data.desc);
  } catch (error) {
    console.error(error), m.react(eror);
  }
};
handler.help = ["jarak *[from]|[to]*"], handler.tags = ["tools"], handler.command = ["jarak"];
export default handler;
async function jarak(from, to) {
  try {
    const query = `jarak ${from} ke ${to}`,
      {
        data
      } = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=id`),
      $ = cheerio.load(data),
      img = $('script:contains("var s=\'")').text().match(/var s='(.*?)'/)?.[1] || "",
      imgData = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split(",")[1], "base64") : null,
      [desc, rute] = $("div.kCrYT > span > div.BNeawe.deIvCb.AP7Wnd, div.kCrYT > span > div.BNeawe.tAd8D.AP7Wnd").toArray().map(el => $(el).text().trim());
    return {
      img: imgData,
      desc: desc.replace(/(Dari:|Ke:)/g, "- *$1*"),
      rute: rute
    };
  } catch (error) {
    throw console.error(error), "Terjadi kesalahan dalam menghitung jarak.";
  }
}