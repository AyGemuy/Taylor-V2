import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "list"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.radiobox search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .radiobox search|vpn");
      m.react(wait);
      try {
        let teks = (await searchRadiobox(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.title}\n🌐 *url:* ${item.href}\n🖼️ *logo:* ${item.logo}\n🔖 *tags:* ${item.tags}\nℹ️ *info:* ${item.info}\n🎧 *listeners:* ${item.metric.listeners}\n📊 *chart:* ${item.metric.chart}\n🌊 *stream:* ${item.stream}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("list" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .radiobox search|vpn");
      m.react(wait);
      try {
        let teks = (await playlistRadiobox(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.trackTitle}\n🌐 *url:* ${item.trackHref}\n🎧 *time:* ${item.time}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["radiobox"], handler.tags = ["internet"], handler.command = /^(radiobox)$/i;
export default handler;
async function searchRadiobox(q) {
  try {
    const response = await fetch("https://onlineradiobox.com/search?q=" + q),
      body = await response.text(),
      $ = cheerio.load(body);
    return $("#stations .stations__station").map((index, element) => {
      const tags = $(element).find(".stations__station__tags a").map((index, tagElement) => $(tagElement).text()).get();
      return {
        href: "https://onlineradiobox.com" + $(element).find(".stations__station__title a").attr("href"),
        title: $(element).find(".station__title__name").text(),
        logo: "https:" + $(element).find(".station__title__logo").attr("src"),
        tags: tags,
        info: $(element).find(".stations__station__info").text().trim().split("\n"),
        metric: {
          listeners: parseInt($(element).find(".stations__station__metric .i-listeners").text()),
          chart: parseInt($(element).find(".stations__station__metric .i-chart").text())
        },
        stream: $(element).find("button.b-play").attr("stream")
      };
    }).get();
  } catch (error) {
    return console.log(error), [];
  }
}
async function playlistRadiobox(url) {
  const response = await fetch(url.endsWith("/playlist") ? url : url + "/playlist"),
    html = await response.text(),
    $ = cheerio.load(html),
    results = [];
  return $("section.playlist table.tablelist-schedule tbody tr").each((index, element) => {
    const time = $(element).find(".tablelist-schedule__time .time--schedule").text(),
      trackLink = $(element).find(".track_history_item a.ajax"),
      resultObj = {
        time: time,
        trackHref: "https://onlineradiobox.com" + trackLink.attr("href"),
        trackTitle: trackLink.text()
      },
      filteredResultObj = Object.fromEntries(Object.entries(resultObj).filter(([_, value]) => null !== value && "" !== value && void 0 !== value));
    Object.keys(filteredResultObj).length > 0 && results.push(filteredResultObj);
  }), results;
}