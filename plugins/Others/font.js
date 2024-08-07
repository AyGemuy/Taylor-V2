import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Input query. Example: ${usedPrefix + command} hello.`);
  try {
    const formattedText = (await stylizeText(text)).map(({
      name,
      value
    }, index) => `🔢 *Nomor:* [${index + 1}]\n📛 *Nama:* ${name}\n📋 *Isi:* ${value}\n\n`).join("");
    await conn.reply(m.chat, `📜 *Daftar Gaya* 📜\n\n${formattedText}🌟 Pilih gaya dengan menggunakan perintah *${usedPrefix + command} [teks]|[nomor]* 🌟`, m);
  } catch (error) {
    m.reply(`Error: ${error.message} ❌`);
  }
};
handler.help = ["font", "styletext"].map(v => v + " <text>"), handler.tags = ["tools"],
  handler.command = /^(font|styletext)$/i, handler.owner = !1, handler.limit = !0;
export default handler;
const stylizeText = async query => {
  try {
    const response = await fetch(`http://qaz.wtf/u/convert.cgi?text=${encodeURIComponent(query)}`),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("table tr").map((i, row) => {
      const cells = $(row).find("td");
      return cells.length > 1 ? {
        name: $(cells[0]).find(".aname").text() || $(cells[0]).text(),
        value: $(cells[1]).html().trim()
      } : null;
    }).get().filter(Boolean);
  } catch (error) {
    throw console.error("Error fetching data:", error), new Error("Failed to fetch and process data");
  }
};