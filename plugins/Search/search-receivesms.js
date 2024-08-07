import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["country", "number", "code"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.receivesms search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("country" === feature) try {
      let teks = (await listCountry()).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Name:* ${item.name}\n*Link:* ${item.link}\n`).filter(v => v).join("\n\n________________________\n\n");
      m.reply(teks);
    } catch (e) {
      m.react(eror);
    }
    if ("number" === feature) {
      if (!inputs) return m.reply("Input query");
      try {
        let teks = (await listNumber(inputs, inputs_ = "")).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Name:* ${item.name}\n*Link:* ${item.link}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("code" === feature) {
      if (!inputs) return m.reply("Input query");
      try {
        let teks = (await listCode(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Title:* ${item.title}\n*Time:* ${item.time}\n*Message:* ${item.message}\n*Code:* ${item.code}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["receivesms"], handler.tags = ["internet"], handler.command = /^(receivesms)$/i;
export default handler;
async function listCountry() {
  try {
    const response = await fetch("https://receive-sms.cc/Countries/"),
      body = await response.text(),
      $ = cheerio.load(body);
    return $(".row.mt-auto").map((index, element) => ({
      link: "https://receive-sms.cc" + $(element).find("a").attr("href").trim(),
      name: ("https://receive-sms.cc" + $(element).find("a").attr("href").trim()).split("/")[3].split("-")[0]
    })).get();
  } catch (error) {
    console.error(error);
  }
}
async function listNumber(url, page = "") {
  "" !== page && (url += `/Page/${page}`);
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $(".row.mt-auto").map((index, element) => ({
      link: "https://receive-sms.cc" + $(element).find("a").attr("href").trim(),
      name: ("https://receive-sms.cc" + $(element).find("a").attr("href").trim()).split("/")[3].split("-")[0]
    })).get();
  } catch (error) {
    console.error(error);
  }
}
async function listCode(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    result = [];
  return $(".row.border-bottom.border-temps.table-hover.bg-messages").each((index, element) => {
    const row = $(element),
      item = {
        title: row.find(".col-xs-12.col-md-2 a").text() || "Nothing",
        time: row.find(".col-xs-0.col-md-2.mobile_hide").text() || "Nothing",
        message: row.find(".col-xs-12.col-md-8").text().trim() || "Nothing",
        code: row.find(".col-xs-12.col-md-8 .btn1 b").text() || "Nothing"
      };
    result.push(item);
  }), result;
}