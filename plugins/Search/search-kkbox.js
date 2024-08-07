import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  command
}) => {
  const lister = ["album", "article", "artist", "lyrics", "playlist", "song", "user"];
  const [feature, query] = text.split(/[^\w\s]/g);
  if (!lister.includes(feature)) {
    return m.reply(`*Contoh:*\n${usedPrefix}${command} kkbox|query\n\n*Pilih tipe yang tersedia:*\n${lister.map(v => `  ○ ${v}`).join("\n")}`);
  }
  if (!query) {
    return m.reply("Masukkan query pencarian!");
  }
  m.react(wait);
  try {
    const data = await KKBOX(feature, query);
    const formattedData = await formatData(data);
    m.reply(`*🎵 KKBOX Search 🎧*\n${formattedData}`);
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["kkbox"];
handler.tags = ["fun"];
handler.command = /^(kkbox)$/i;
export default handler;
async function formatData(data) {
  let output = "";
  data.forEach((item, index) => {
    output += `*[Result ${index + 1}]*\n`;
    _.forEach(item, (value, key) => {
      output += `*${key}:* `;
      if (_.isObject(value)) {
        _.forEach(value, (subValue, subKey) => {
          output += `\n*${subKey}:* ${subValue}`;
        });
      } else {
        output += `${value}\n`;
      }
    });
    output += "\n";
  });
  return output.trim();
}
async function KKBOX(type, query) {
  const url = `https://www.kkbox.com/api/search/${type}?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    return json.data.result;
  } catch (error) {
    throw new Error(`Failed to fetch data from KKBOX API: ${error.message}`);
  }
}