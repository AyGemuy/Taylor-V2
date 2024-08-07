import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["detail", "search"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.azmto search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .azmto search|vpn");
      m.react(wait);
      try {
        let teks = (await searchAzm(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 Link: ${item.posterLink}\n🖼️ Img: ${item.posterImg}\n📺 Title: ${item.posterTitle}\n📅 Year: ${item.posterYear}\n⏰ Duration: ${item.posterDuration}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .azmto search|vpn");
      m.react(wait);
      try {
        let item = await detailAzm(inputs),
          serverLinks = item.serverLinks.map(item => `🌐 label: ${item.label}\n🔗 link: ${item.link}`).filter(v => v).join("\n"),
          teks = `🔍 *[ RESULT ]*\n\n🔍 breadcrumbs: ${item.breadcrumbs}\n🖼️ posterImg: ${item.posterImg}\n📺 title: ${item.title}\n⭐ rating: ${item.rating}\n📅 year: ${item.year}\n⏰ duration: ${item.duration}\n🎥 genres: ${item.genres}\n📜 overview: ${item.overview}\n🔗 serverLinks: ${serverLinks}\n`;
        await conn.sendFile(m.chat, item.posterImg || logo, "", teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["azmto"], handler.tags = ["internet"], handler.command = /^(azmto)$/i;
export default handler;
async function searchAzm(query) {
  const url = "https://azm.to/search/" + query,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return $(".col-3.col-tb-4.col-p-6.col-md-2.poster-col").map((index, element) => {
    const $element = $(element);
    return {
      posterLink: "https://azm.to" + $element.find(".poster").attr("href"),
      posterImg: $element.find(".poster__img").attr("data-src"),
      posterTitle: $element.find(".poster__title").text().trim(),
      posterYear: $element.find(".poster__year .badge").text().trim(),
      posterDuration: $element.find(".poster__year .has-icon").text().trim()
    };
  }).get();
}
async function detailAzm(query) {
  const url = query,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    details = {};
  return details.breadcrumbs = $(".container.row.details .col-12.breadcrumbs.has-icon a").map((_, el) => $(el).text().trim()).get(),
    details.posterImg = $(".container.row.details .col-3.hide-on-tab-port.details__poster img").attr("src"),
    details.title = $(".container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__heading").text().trim(),
    details.rating = $(".container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__rating span").text().trim(),
    details.year = $(".container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__metadata span:first-child").text().trim(),
    details.duration = $(".container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__metadata span:last-child").text().trim(),
    details.genres = $(".container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__genre a").map((_, el) => $(el).text().trim()).get(),
    details.overview = $(".container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__overview").text().trim(),
    details.serverLinks = $(".container.row.details .col-12.m-children-bottom-1.flex.flex-between.col-12.mt-1.player__server-wrapper .details__genre a").map((_, el) => ({
      link: $(el).attr("value"),
      label: $(el).find("span").text().trim()
    })).get(), details;
}