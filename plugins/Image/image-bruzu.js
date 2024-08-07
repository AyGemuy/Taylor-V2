import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    let data = await Bruzu(text, m.name),
      apiURL = "https://img.bruzu.com/?" + new URLSearchParams(data).toString();
    await conn.sendFile(m.chat, apiURL, "", "*[ Quotes Maker ]*", m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["bruzu"], handler.tags = ["search"], handler.command = /^(bruzu)$/i;
export default handler;

function getParamsObject(url) {
  const urlParams = new URLSearchParams(url.split("?")[1]),
    paramsObject = {};
  for (const [key, value] of urlParams.entries()) paramsObject[key] = value;
  return paramsObject;
}

function transformData(data, quotes, watermark) {
  const transformedData = {};
  for (const key in data)
    if (data.hasOwnProperty(key)) {
      let newValue = data[key];
      /^[a-z]\.(t|text)$/.test(key) && (newValue = newValue.length < 25 ? watermark : quotes),
        transformedData[key] = newValue;
    }
  return transformedData;
}
async function Bruzu(quotes, watermark) {
  const response = await fetch("https://bruzu.com/templates/"),
    html = await response.text(),
    links = [],
    $ = cheerio.load(html);
  $("div.masonry a").each((index, element) => {
    const link = $(element).attr("href");
    link && links.push(link);
  });
  const src = links.map(link => decodeURIComponent(link)).map(link => getParamsObject(link));
  return transformData(src[Math.floor(Math.random() * src.length)], quotes, watermark);
}