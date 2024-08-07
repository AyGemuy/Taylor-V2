import fetch from "node-fetch";
const handler = async (m, {
  usedPrefix,
  command
}) => {
  try {
    let res = await fetch("https://raw.githubusercontent.com/hamidamaulana/bacaan-sholat-main/main/assets/data/bacaanshalat.json"),
      bacaan = (await res.json()).map((v, i) => `${i + 1}. ${v.name}\n↳ ${v.arabic}\n↳ ${v.latin}\n↳ ${v.terjemahan}`).join("\n\n");
    m.reply(bacaan);
  } catch (e) {
    throw "_*Error!*_";
  }
};
handler.help = ["bacaanshalat"], handler.tags = ["islam"], handler.command = /^(bacaansh?(a|o)lat)$/i;
export default handler;