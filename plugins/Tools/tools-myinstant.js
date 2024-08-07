import {
  MyInstant
} from "../../lib/tools/ai-gen.js";
const handler = async (m, {
  conn,
  usedPrefix: _p,
  args,
  command
}) => {
  if (!args[0]) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${_p}${command} Hai, apa kabar?*`);
  try {
    const myInstant = new MyInstant();
    let results;
    switch (args[0]) {
      case "home":
        results = await myInstant.home();
        break;
      case "best":
        results = await myInstant.best();
        break;
      case "recent":
        results = await myInstant.recent();
        break;
      case "category":
        const category = args[1];
        results = await myInstant.category(category);
        break;
      case "new":
        results = await myInstant.new();
        break;
      case "fav":
        results = await myInstant.fav();
        break;
      case "search":
        const query = args.slice(1).join(" ");
        results = await myInstant.search(query);
        break;
      default:
        return m.reply(`Invalid command. Case yang tersedia:\n1. home\nContoh penggunaan: ${_p}${command} home\n\n2. best\nContoh penggunaan: ${_p}${command} best\n\n3. recent\nContoh penggunaan: ${_p}${command} recent\n\n4. category\nContoh penggunaan: ${_p}${command} category NAMA_KATEGORI\n\n5. new\nContoh penggunaan: ${_p}${command} new\n\n6. fav\nContoh penggunaan: ${_p}${command} fav\n\n7. search\nContoh penggunaan: ${_p}${command} search KATA_KUNCI`);
    }
    const [bestItem, ...moreItems] = results, videoItems = moreItems, formattedData = {
      title: `*[ MyInstant Sound ]*\n*Best Match:* ${bestItem.title}\n*Total Search:* ${results.length}\n\n`,
      rows: [{
        title: "Best",
        highlight_label: "Best match",
        rows: [{
          header: bestItem.title,
          id: `${_p}get ${bestItem.soundLink}`,
          title: bestItem.pageLink,
          description: ""
        }]
      }, {
        title: "More",
        rows: videoItems.map(({
          title,
          soundLink,
          pageLink
        }, index) => ({
          header: `${index + 1}). ${title}`,
          id: `${_p}get ${soundLink}`,
          title: pageLink,
          description: ""
        }))
      }]
    };
    return await conn.sendButtonCta(m.chat, [
      [formattedData.title, wm, null, [], null, [],
        [
          ["Result Here", formattedData.rows]
        ]
      ]
    ], m);
  } catch (error) {
    throw console.error("Error:", error), error;
  }
};
handler.help = ["myinstant"], handler.tags = ["tools"], handler.command = /^(myinstant)$/i;
export default handler;