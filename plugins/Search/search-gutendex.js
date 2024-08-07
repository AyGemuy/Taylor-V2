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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.gutendex api\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if (!querys) return m.reply("Input Query!");
    if (m.react(wait), "sort" === feature) {
      let data = await getBookInfo(feature, querys),
        capt = await formatData([data]);
      await conn.reply(m.chat, `*${htki} 📺 Gutendex Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("all" === feature) {
      let data = await getBookInfo(feature, querys),
        capt = await formatData([data]);
      await conn.reply(m.chat, `*${htki} 📺 Gutendex Search 🔎 ${htka}*\n${capt}`, m);
    }
    "file" === feature && await conn.sendFile(m.chat, querys, "Boom nya kak!", "", m, !1, {
      asDocument: !0
    });
  }
};
handler.help = ["gutendex"], handler.tags = ["search"], handler.command = /^(gutendex)$/i;
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
  const response = await fetch("https://gutendex.com/books/?search=" + query),
    data = await response.json();
  if ("sort" === type) {
    return data.results[0];
  }
  if ("all" === type) {
    const items = data.results,
      output = [];
    for (let i = 0; i < items.length; i++) output.push(items[i]);
    return output;
  }
}