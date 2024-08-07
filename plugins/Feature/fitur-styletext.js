import fetch from "node-fetch";
import cheerio from "cheerio";
import _ from "lodash";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    let teks = _.trim(text) || _.get(m, "quoted.text", m.text);
    if (teks.includes("|")) {
      let [nama, urutan] = teks.split("|").map(s => s.trim());
      if (/^\d+$/.test(urutan)) {
        let selectedObj = _.get(await stylizeText(nama), parseInt(urutan) - 1);
        return selectedObj ? m.reply(formatSelectedStyle(selectedObj, urutan)) : m.reply("Nomor gaya tidak valid. Silakan coba nomor gaya lain.");
      }
    }
    let caption = await stylizeText(teks);
    return m.reply(formatStyleList(caption));
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["style <teks>"];
handler.tags = ["tools"];
handler.command = /^(style(text)?)$/i;
handler.exp = 0;
export default handler;
const stylizeText = async query => {
  try {
    const response = await fetch(`http://qaz.wtf/u/convert.cgi?text=${encodeURIComponent(query)}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    return _.filter($("table tr").map((i, row) => {
      const cells = $(row).find("td");
      if (cells.length > 1) {
        return {
          name: $(cells[0]).find(".aname").text() || $(cells[0]).text(),
          value: $(cells[1]).html().trim()
        };
      }
      return null;
    }).get(), Boolean);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch and process data");
  }
};
const formatSelectedStyle = (selectedObj, urutan) => {
  return `🎨 *Gaya Terpilih* 🎨\n\n` + `🔢 *Nomor:* [${urutan}]\n` + `📛 *Nama:* ${selectedObj.name}\n` + `📋 *Isi:* ${selectedObj.value}\n\n` + `🎉 Nikmati gaya tersebut! 🎉`;
};
const formatStyleItem = ({
  name,
  value
}, index) => {
  return `${index + 1}. *\`${name}\`*\n- ${value}\n`;
};
const formatStyleList = caption => {
  const styleList = caption.reduce((acc, item, index) => {
    return acc + formatStyleItem(item, index);
  }, "");
  return `📜 *Daftar Gaya* 📜\n\n` + `⚡ Berikut adalah daftar gaya yang tersedia:\n\n` + styleList + `🌟 Pilih gaya dengan menggunakan perintah *style [teks]|[nomor]* 🌟`;
};