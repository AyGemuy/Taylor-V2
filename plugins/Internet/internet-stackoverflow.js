import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "detail"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.stackover search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .stackover search|vpn");
      m.react(wait);
      try {
        let teks = (await searchStackover(inputs)).map((item, index) => `🔍 *[ HASIL ${index + 1} ]*\n\n🆔️ ID: ${item.id}\n👍 Jumlah Suara: ${item.vote}\n💬 Jumlah Komentar: ${item.answer}\n👀 Jumlah Dilihat: ${item.views}\n🔗 Tautan: ${item.link}\n📚 Judul: ${item.title}\n📝 Konten: ${item.content}\n👤 Pengguna: ${item.userInfo.username}\n⌚ Waktu: ${item.time}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .stackover app|link");
      m.react(wait);
      try {
        let item = await detailStackover(inputs),
          cap = `🔍 *[ HASIL ]*\n\n🔗 Tautan: ${item.link}\n📚 Judul: ${item.title}\n🖼️ Gambar: ${item.image}\n📝 Konten: ${item.content}\n⌚ Waktu: ${item.time}\n👤 Penulis: ${item.author}\n🏷️ Tag: ${item.questions}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["stackover"], handler.tags = ["internet"], handler.command = /^(stackover)$/i;
export default handler;
const BaseLinks = "https://stackoverflow.com";
async function searchStackover(q) {
  const url = BaseLinks + "/questions/tagged/" + q;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".s-post-summary").map((index, element) => ({
      id: $(element).attr("data-post-id"),
      vote: parseInt($(element).find(".s-post-summary--stats-item__emphasized .s-post-summary--stats-item-number").text()),
      answer: parseInt($(element).find(".s-post-summary--stats-item:eq(1) .s-post-summary--stats-item-number").text()),
      views: parseInt($(element).find(".s-post-summary--stats-item:eq(2) .s-post-summary--stats-item-number").text()),
      link: BaseLinks + $(element).find(".s-post-summary--content-title a").attr("href"),
      title: $(element).find(".s-post-summary--content-title a").text().trim(),
      content: $(element).find(".s-post-summary--content-excerpt").text().trim(),
      tags: $(element).find(".s-post-summary--meta-tags a.js-tagname").toArray().map(tagElement => $(tagElement).text()),
      userInfo: {
        username: $(element).find(".s-user-card--info a").text().trim(),
        reputation: parseInt($(element).find(".s-user-card--info .s-user-card--rep span").text()),
        image: $(element).find(".s-user-card--info img.s-avatar--image").attr("src")
      },
      time: $(element).find(".s-user-card--time .relativetime").attr("title")
    })).get();
  } catch (error) {
    return console.log("Error:", error), [];
  }
}
async function detailStackover(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      title = $("#question-header .fs-headline1 a").text(),
      link = BaseLinks + $("#question-header .fs-headline1 a").attr("href"),
      image = $('link[itemprop="image"]').attr("href"),
      content = $(".js-post-body").text().trim(),
      time = $('time[itemprop="dateCreated"]').text(),
      author = $(".user-details a").text(),
      questions = [];
    return $(".post-taglist .post-tag").each((index, element) => {
      const question = $(element).text();
      questions.push(question);
    }), {
      title: title,
      link: link,
      image: image,
      content: content,
      time: time,
      author: author,
      questions: questions
    };
  } catch (error) {
    console.log("Error:", error);
  }
}