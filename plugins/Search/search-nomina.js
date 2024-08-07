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
  if (!text) return m.reply("Input query");
  try {
    let item = await search.Nomina(text);
    let teks = `
*Lemma:* ${item.lema}
*Nomina:* ${item.nomina.join(", ")}
*Length:* ${item.length}
`;
    m.reply(teks);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["nomina"], handler.tags = ["internet"], handler.command = /^(nomina)$/i;
export default handler;