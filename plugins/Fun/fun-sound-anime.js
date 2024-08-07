import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  command
}) => {
  const args = text.trim().split(/\s+/);
  if (!args[0]) {
    const voices = await voiceV1(),
      message = 0 === voices.length ? "❓ Daftar suara kosong." : `🔊 *Daftar Suara:*\n${voices.map((voice, index) => `*${index + 1}.* ${voice.name}`).join("\n")}`;
    return m.reply(message);
  }
  const linkIndex = parseInt(args[0], 10) - 1;
  if (1 === args.length && /^\d+$/.test(args[0])) {
    const voices = await voiceV1();
    if (linkIndex >= 0 && linkIndex < voices.length) {
      const listVoices = await ListVoice(voices[linkIndex].link),
        message = 0 === listVoices.length ? "❓ Daftar suara kosong." : `🔊 *Daftar Suara dari Link ${linkIndex + 1}:*\n${listVoices.map((voice, index) => `*${index + 1}.* ${voice.name}`).join("\n")}`;
      return m.reply(message);
    }
    return m.reply("❌ Indeks link tidak valid. Harap pilih indeks link yang valid.\nContoh penggunaan: *voice 1*");
  }
  if (2 === args.length && /^\d+$/.test(args[0]) && /^\d+$/.test(args[1])) {
    const voiceIndex = parseInt(args[1], 10) - 1,
      voices = await voiceV1();
    if (linkIndex >= 0 && linkIndex < voices.length) {
      const listVoices = await ListVoice(voices[linkIndex].link);
      return voiceIndex >= 0 && voiceIndex < listVoices.length ? await conn.sendFile(m.chat, listVoices[voiceIndex].link, "", m, null, adReply) : m.reply("❌ Indeks suara tidak valid. Harap pilih indeks suara yang valid.\nContoh penggunaan: *voice 1 1*");
    }
    return m.reply("❌ Indeks link tidak valid. Harap pilih indeks link yang valid.\nContoh penggunaan: *voice 1 1*");
  }
  if (1 === args.length && "v2" === args[0]?.toLowerCase()) {
    const voices = await voiceV2(),
      message = 0 === voices.length ? "❓ Daftar suara kosong." : `🔊 *Daftar Suara dari voiceV2():*\n${voices.map((voice, index) => `*${index + 1}.* ${voice.text}`).join("\n")}`;
    return m.reply(message);
  }
  if (2 === args.length && "v2" === args[0]?.toLowerCase() && /^\d+$/.test(args[1])) {
    const voiceIndex = parseInt(args[1], 10) - 1,
      voices = await voiceV2();
    return voiceIndex >= 0 && voiceIndex < voices.length ? await conn.sendFile(m.chat, voices[voiceIndex].link, "", m, null, adReply) : m.reply("❌ Indeks suara tidak valid. Harap pilih indeks suara yang valid.\nContoh penggunaan: *voice v2 1*");
  }
  if ("v3" === args[0]?.toLowerCase() && args[1]) {
    const soundLink = {
      ara: "https://andgyk.is-a.dev/anime-soundboard/audio/ara-ara.mp3",
      ganbare: "https://andgyk.is-a.dev/anime-soundboard/audio/ganbare-ganbare-senpai.mp3",
      konichiwa: "https://andgyk.is-a.dev/anime-soundboard/audio/hashira-konichiwa.mp3",
      nani: "https://andgyk.is-a.dev/anime-soundboard/audio/nani.mp3",
      rikka: "https://andgyk.is-a.dev/anime-soundboard/audio/rikka-ow.mp3",
      ultra: "https://andgyk.is-a.dev/anime-soundboard/audio/ultra-instinct.mp3",
      ahh: "https://andgyk.is-a.dev/anime-soundboard/audio/yemete-kudasai-ah.mp3",
      yemete: "https://andgyk.is-a.dev/anime-soundboard/audio/yemete-kudasai.mp3",
      yuno: "https://andgyk.is-a.dev/anime-soundboard/audio/yuno-yukki.mp3"
    } [args[1].toLowerCase()];
    return soundLink ? await conn.sendFile(m.chat, soundLink, args[1] + ".mp3", "", fakes, null, adReply) : m.reply("❌ Suara v3 tidak valid. Harap pilih suara yang valid.\nContoh penggunaan: *voice v3 ara*");
  }
  return m.reply("❌ Perintah tidak valid. Harap gunakan format yang benar.\nContoh penggunaan: *voice v1*, *voice 1*, *voice 1 1*, *voice v2*, *voice v2 1*, *voice v3 ara*");
};
handler.help = ["voice"], handler.command = ["voice"], handler.tags = ["music"];
export default handler;
async function voiceV1() {
  try {
    const url = "https://www.nonstick.com/soundsource/",
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.column.two-third.column_column table tbody tr").map((index, element) => ({
      name: $(element).find("td a").text().trim(),
      link: $(element).find("td a").attr("href")
    })).get().filter(({
      name,
      link
    }) => "" !== name && void 0 !== link);
  } catch (error) {
    return console.error("Error fetching and parsing data:", error), [];
  }
}
async function voiceV2() {
  try {
    const url = "https://www.nonstick.com/sound-archive/",
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.column.one.column_column").map((index, element) => $(element).parent().find("a").map((i, el) => ({
      link: $(el).attr("href"),
      name: $(element).text().trim(),
      quality: $(el).next("b").text().trim(),
      text: $(el).text().trim()
    })).get()).get().flat();
  } catch (error) {
    return console.error("Error fetching and parsing data:", error), [];
  }
}
async function ListVoice(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.column.one.column_column table tbody tr").map((index, element) => ({
      link: $(element).find("td a").attr("href"),
      name: $(element).find("td a b").text().trim(),
      quality: $(element).find("td b").last().text().trim()
    })).get().filter(({
      name,
      link,
      quality
    }) => "" !== name && void 0 !== link && "" !== quality);
  } catch (error) {
    return console.error("Error fetching and parsing data:", error), [];
  }
}