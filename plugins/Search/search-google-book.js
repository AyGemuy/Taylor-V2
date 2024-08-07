import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let lister = ["all", "sort", "file"],
    [feature, querys] = text.split(/[^\w\s]/g);
  if (!lister.includes(feature)) return m.reply("*Example:*\n.gbook api\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if (!querys) return m.reply("Input Query!");
    if (m.react(wait), "sort" === feature) {
      let data = await getBookInfo(feature, querys),
        capt = await formatData([data]);
      await conn.reply(m.chat, `*${htki} 📺 Books Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("all" === feature) {
      let data = await getBookInfo(feature, querys),
        capt = await formatData([data]);
      await conn.reply(m.chat, `*${htki} 📺 Books Search 🔎 ${htka}*\n${capt}`, m);
    }
    "file" === feature && await conn.sendFile(m.chat, querys, "Boom nya kak!", "", m, !1, {
      asDocument: !0
    });
  }
};
handler.help = ["gbook"], handler.tags = ["search"], handler.command = /^(gbook)$/i;
export default handler;

function formatData(data) {
  let output = "";
  return data.forEach((item, index) => {
    output += `*[ Result ${index + 1} ]*\n`, Object.keys(item).forEach(key => {
      output += ` *${key}:* `, "object" == typeof item[key] ? Object.keys(item[key]).forEach(subKey => {
        output += `\n *${subKey}:* ${item[key][subKey]}`;
      }) : output += ` ${item[key]}\n`;
    });
  }), output;
}
async function getBookInfo(type, query) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&download=epub&key=AIzaSyAobueeKqov3n13IofqiDWs6b1XsdU8Dr8`),
    data = await response.json();
  if ("sort" === type) {
    const bookInfo = data.items[0]?.volumeInfo;
    return bookInfo;
  }
  if ("all" === type) {
    const items = data.items,
      output = [];
    for (let i = 0; i < items.length; i++) output.push(items[i].volumeInfo);
    return output;
  }
}