import fetch from "node-fetch";
import * as cheerio from "cheerio";
const handler = async (m, { text, usedPrefix, command }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  await conn.profilePictureUrl(who).catch((_) => hwaifu.getRandom()),
    conn.getName(who);
  if (!text) throw `Example use ${usedPrefix}${command} halo`;
  try {
    let caption = `\n${(await kbbi(text))
      .map(
        (v) =>
          `\n*📌${v.title}*\n\n${v.means.map((v) => "- " + v).join("\n`")}\n`,
      )
      .join("\n")
      .trim()}\n\nNote:\np = Partikel: kelas kata yang meliputi kata depan, kata sambung, kata seru, kata sandang, ucapan salam\nn = Nomina: kata benda\n`.trim();
    await conn.reply(m.chat, caption, m);
  } catch {
    m.react(eror);
  }
};

(handler.help = ["kbbi <teks>"]),
  (handler.tags = ["internet"]),
  (handler.command = /^kbbi$/i);

export default handler;

async function kbbi(words) {
  const response = await fetch(`
        https: //kbbi.kemdikbud.go.id/entri/${encodeURIComponent(words)}`);
  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  const html = await response.text();
  const $ = cheerio.load(html);
  const isExist = !/tidak ditemukan/i.test(
    $('body > div.container.body-content > h4[style="color:red"]').text(),
  );
  if (!isExist) {
    throw new Error(`${words} does not exist!`);
  }
  const results = [];
  let isContent = false;
  let lastTitle;
  $("body > div.container.body-content")
    .children()
    .each((_, el) => {
      const tag = el.tagName;
      const elem = $(el);
      if (tag === "hr") {
        isContent = !isContent && !results.length;
      }
      if (tag === "h2" && isContent) {
        const index = elem.find("sup").text().trim();
        const title = elem.text().trim();
        results.push({
          index: parseInt(index) || 0,
          title: title,
          means: [],
        });
        lastTitle = title;
      }
      if ((tag === "ol" || tag === "ul") && isContent && lastTitle) {
        elem.find("li").each((_, el) => {
          const li = $(el).text().trim();
          const index = results.findIndex(({ title }) => title === lastTitle);
          if (index !== -1) {
            results[index].means.push(li);
          } else {
            console.log(li, lastTitle);
          }
        });
        lastTitle = "";
      }
    });
  if (results.length === 0) {
    throw new Error(`${words} does not exist!\n\n${html}`);
  }
  return results;
}
