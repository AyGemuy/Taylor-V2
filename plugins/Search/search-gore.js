import {
  dekuai
} from "../../lib/ai/ai-dekuai.js";
import {
  sgoredl,
  ssearchgore,
  srandomgore
} from "../../lib/scraper/scrape.js";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  try {
    if ("searchgore" === command) {
      if (!text) {
        m.reply(`Contoh penggunaan ${usedPrefix}${command} japan`);
        return;
      }
      const teks = ((await dekuai.api("api/sgore", {
        q: text
      }))?.result?.data || (await ssearchgore(text))?.data).map((item, index) => `🔍 *[ HASIL ${index + 1} ]*\n📚 Judul: ${item.title}\n🔗 Link: ${item.link}\n📝 uploader: ${item.uploader}`).filter(v => v).join("\n\n________________________\n\n");
      m.reply(teks);
    }
    if ("randomgore" === command) {
      const {
        result: item
      } = await dekuai.api("api/randgre", {});
      const teksdl = `🔍 *[ HASIL ]*
📚 Judul: ${item.title}
🔗 Sumber: ${item.source}
📝 Deskripsi: ${item.description}
🏷️ Tag: ${item.tag}
📅 Diunggah: ${item.upload}
👤 Penulis: ${item.author}
💬 Komentar: ${item.comment}
⭐ Rating: ${item.vote}
👀 Dilihat: ${item.view}`;
      const buffer = (await conn.getFile(item.video1)).data || (await conn.getFile(item.video2)).data;
      await conn.sendMessage(m.chat, {
        video: buffer,
        caption: teksdl + " 📥"
      }, {
        quoted: m
      });
    }
    if ("goredl" === command) {
      if (!text) {
        m.reply(`Contoh penggunaan ${usedPrefix}${command} link`);
        return;
      }
      const {
        data: item
      } = await sgoredl(text);
      const teksdl = `🔍 *[ HASIL ]*
📚 Judul: ${item.judul}
💬 Komentar: ${item.comment}
👀 Dilihat: ${item.views}`;
      const buffer = (await conn.getFile(item.link)).data;
      await conn.sendMessage(m.chat, {
        video: buffer,
        caption: teksdl + " 📥"
      }, {
        quoted: m
      });
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message} ❌`);
  }
};
handler.help = ["searchgore", "randomgore", "goredl"].map(v => v + " <query>");
handler.command = ["searchgore", "randomgore", "goredl"];
handler.tags = ["nsfw"];
export default handler;