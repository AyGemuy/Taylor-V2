import {
  search
} from "../../lib/scraper/all/search.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "detail"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.steam search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query");
      try {
        let teks = (await search.Steam(inputs)).map((item, index) => `
*[ RESULT ${index + 1} ]*
*Link:* ${item.link}
*Title:* ${item.judul}
*Release Date:* ${item.rilis.trim()}
*Price:* ${item.harga}
*Rating:* ${item.rating}
*Image:* ${item.img}
`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input link");
      try {
        let item = await search.Steam_Detail(inputs);
        let teks = `
*[ McOsu ]*
*Description:* ${item.desc}

*System Requirements:*
${item.system}

*Additional Information:*
${item.info}

*Image:* ${item.img}
`;
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["steam"], handler.tags = ["internet"], handler.command = /^(steam)$/i;
export default handler;