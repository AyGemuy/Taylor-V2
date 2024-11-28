import { sgoredl, ssearchgore, srandomgore } from "../../lib/scraper/scrape.js";
const handler = async (m, { conn, usedPrefix, text, args, command }) => {
  try {
    if ("searchgore" === command) {
      if (!text) {
        m.reply(`Contoh penggunaan ${usedPrefix}${command} japan`);
        return;
      }
      const teks = ((await ssearchgore(text))?.data)
        .map(
          (item, index) =>
            `🔍 *[ HASIL ${index + 1} ]*\n📚 Judul: ${item.title}\n🔗 Link: ${item.link}\n📝 uploader: ${item.uploader}`,
        )
        .filter((v) => v)
        .join("\n\n________________________\n\n");
      m.reply(teks);
    }
    if ("goredl" === command) {
      if (!text) {
        m.reply(`Contoh penggunaan ${usedPrefix}${command} link`);
        return;
      }
      const { data: item } = await sgoredl(text);
      const teksdl = `🔍 *[ HASIL ]*
📚 Judul: ${item.judul}
💬 Komentar: ${item.comment}
👀 Dilihat: ${item.views}`;
      const buffer = (await conn.getFile(item.link)).data;
      await conn.sendMessage(
        m.chat,
        {
          video: buffer,
          caption: teksdl + " 📥",
        },
        {
          quoted: m,
        },
      );
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message} ❌`);
  }
};
handler.help = ["searchgore", "goredl"].map((v) => v + " <query>");
handler.command = ["searchgore", "goredl"];
handler.tags = ["nsfw"];
export default handler;
