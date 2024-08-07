import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  var flag_list = await (await fetch("https://raw.githubusercontent.com/maisans-maid/country-flags/master/countries.json")).json(),
    flag_img = Array.from(Object.keys(flag_list).map(v => v)),
    flag_name = Array.from(Object.values(flag_list).map(o => o));
  let listSections = [];
  return Object.keys(flag_img, flag_name).map((v, index) => {
    listSections.push(["Model [ " + ++index + " ]", [
      [flag_name[v], usedPrefix + "get https://raw.githubusercontent.com/maisans-maid/country-flags/master/png1000px/" + flag_img[v].toLowerCase() + ".png", "➥"]
    ]]);
  }), conn.sendList(m.chat, "[ LIST OF FLAGS ]", "⚡ Silakan pilih di bawah...", author, "F L A G S", listSections, m);
};
handler.help = ["flags"], handler.command = ["flags"];
export default handler;