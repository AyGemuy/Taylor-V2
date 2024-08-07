import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["country", "number", "msg"],
    [feature, inputs, inputs_] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.num search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("country" === feature) try {
      let teks = (await getCountry()).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n*Name:* ${item.name}\n*Link:* ${item.link}`).filter(v => v).join("\n\n________________________\n\n");
      await conn.reply(m.chat, teks, m);
    } catch (e) {}
    if ("number" === feature) {
      if (!inputs) return m.reply(`Input query link\nExample: ${usedPrefix + command} number|link`);
      try {
        let teks = (await getCountryNumber(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n*Name:* ${item.name}\n*Link:* ${item.link}\n*Phone Number:* ${item.phoneNumber}\n*Time:* ${item.time}`).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m);
      } catch (e) {}
    }
    if ("msg" === feature) {
      if (!inputs) return m.reply(`Input query link\nExample: ${usedPrefix + command} msg|link|opt\n( opt is all/first/number )`);
      try {
        let teks = (await checkMessages(inputs, inputs_)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n*Sender:* ${item.sender}\n*Time:* ${item.time}\n*Message:* ${item.message}`).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m);
      } catch (e) {}
    }
  }
};
handler.help = ["tmpnum"], handler.tags = ["internet"], handler.command = /^(tmpnum)$/i;
export default handler;
async function getCountry() {
  try {
    const response = await fetch("https://temporary-phone-number.com/countrys/"),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.col-sm-6.col-md-4.col-lg-3.col-xs-12 a.info-box").map((_, el) => ({
      name: $(el).find("span.info-box-number").text().trim(),
      link: $(el).attr("href")
    })).get();
  } catch (error) {
    throw console.error(error), new Error("Failed to fetch countries.");
  }
}
async function getCountryNumber(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.col-sm-6.col-md-4.col-lg-3.col-xs-12 a.info-box").map((_, el) => ({
      name: $(el).find(".info-box-text").text().trim(),
      phoneNumber: $(el).find(".info-box-number").text().trim(),
      link: $(el).attr("href"),
      time: $(el).find(".info-box-time .text-primary").text().trim()
    })).get();
  } catch (error) {
    throw console.error(error), new Error("Failed to fetch country numbers.");
  }
}
async function checkMessages(url, option = 0) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      chatMessages = "all" === option ? $("div.direct-chat-msg") : $("div.direct-chat-msg").eq("first" === option ? 0 : option);
    if (!chatMessages.length) throw new Error("No chat messages found.");
    return chatMessages.map((_, el) => ({
      sender: $(el).find(".direct-chat-info .pull-right").text().trim(),
      time: $(el).find(".direct-chat-info time.timeago").text().trim(),
      message: $(el).find(".direct-chat-text").text().trim()
    })).get();
  } catch (error) {
    throw console.error(error), new Error("Failed to fetch messages.");
  }
}