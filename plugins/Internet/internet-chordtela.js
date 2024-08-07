import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["search", "list", "chord"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.chordtela search|adel\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .chordtela artist|adelle");
      m.react(wait);
      try {
        let repack = inputs,
          input = await getChordUrl(repack),
          teks = (await fetchChordData(input, repack)).map((v, index) => `*[ ${index + 1} ]*\n🔖 *Title* : ${v.name}\n🔗 *Link* : ${v.url}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("list" === feature) {
      if (!validateURL(inputs)) return m.reply("Input query link\nExample: .chordtela list|https://www.chordtela.com/chord/adella");
      m.react(wait);
      try {
        const teks = (await getList(inputs)).map((v, index) => `*[ ${index + 1} ]*\n*Label:* ${v.title}\n*Link:* ${v.href}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("chord" === feature) {
      if (!validateURL(inputs)) return m.reply("Input query link\nExample: .chordtela chord|https://www.chordtela.com/2016/06/adele-rolling-in-deep.html");
      m.react(wait);
      try {
        let teks = await getChord(inputs);
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["chordtela type query"], handler.tags = ["internet"], handler.command = /^(chordtela)$/i;
export default handler;

function getChordUrl(input) {
  let huruf = input.charAt(0).toLowerCase(),
    chordtela = "https://www.chordtela.com/chord-gitar-";
  return huruf >= "a" && huruf <= "b" ? chordtela + "a-b" : huruf >= "c" && huruf <= "d" ? chordtela + "c-d" : huruf >= "e" && huruf <= "f" ? chordtela + "e-f" : huruf >= "g" && huruf <= "h" ? chordtela + "g-h" : huruf >= "i" && huruf <= "j" ? chordtela + "i-j" : huruf >= "k" && huruf <= "l" ? chordtela + "k-l" : huruf >= "m" && huruf <= "n" ? chordtela + "m-n" : huruf >= "o" && huruf <= "p" ? chordtela + "o-p" : huruf >= "q" && huruf <= "r" ? chordtela + "q-r" : huruf >= "s" && huruf <= "t" ? chordtela + "s-t" : huruf >= "u" && huruf <= "v" ? chordtela + "u-v" : huruf >= "w" && huruf <= "x" ? chordtela + "w-x" : huruf >= "y" && huruf <= "z" ? chordtela + "y-z" : null;
}
async function fetchChordData(url, input) {
  try {
    return await fetch(url).then(response => response.text()).then(body => {
      const $ = cheerio.load(body),
        artists = [];
      return $("tbody tr td span.name").each((index, element) => {
        const artistName = $(element).text(),
          artistUrl = $(element).parent().attr("href");
        artistName.toLowerCase().includes(input.toLowerCase()) && artists.push({
          name: artistName,
          url: artistUrl
        });
      }), artists;
    });
  } catch (error) {
    return console.error("Error fetching chord data:", error), null;
  }
}
async function getList(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      resultList = [];
    return $("ul.archive-list li").each((index, element) => {
      const title = $(element).find("a").text(),
        href = $(element).find("a").attr("href");
      resultList.push({
        title: title,
        href: href
      });
    }), resultList;
  } catch (error) {
    return console.log(error), [];
  }
}
async function getChord(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    result = {};
  return $("div").each((index, element) => {
    const divId = $(element).attr("id"),
      divText = $(element).text();
    result[divId] = divText;
  }), result.main;
}

function validateURL(url) {
  return /^https:\/\/www\.chordtela\.com\/(?:chord\/[a-zA-Z0-9-]+|20[0-9]{2}\/[0-9]{2}\/[a-zA-Z0-9-]+\.html)$/.test(url);
}