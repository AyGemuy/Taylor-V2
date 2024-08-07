import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  await conn.sendMessage(m.chat, {
    react: {
      text: "⏳",
      key: m.key
    }
  });
  let anime = ["9anime", "animefox", "animepahe", "bilibili", "crunchyroll", "enime", "gogoanime", "zoro"],
    books = ["libgen"],
    comics = ["getComics"],
    lightnovels = ["readlightnovels"],
    manga = ["managreader", "mangadex", "mangahere", "mangakakalot", "mangapark", "mangapill", "mangasee123"],
    meta = ["anilist-manga", "anilist", "mal", "tmdb"],
    movies = ["dramacool", "flixhq", "viewasian"],
    urut = text.split("|"),
    one = urut[0];
  urut[1], urut[2];
  if ("anime" === args[0]) {
    let listSections = [];
    return Object.keys(anime).map((v, index) => {
      let url = "https://api.consumet.org/anime/" + anime[v] + "/" + one;
      listSections.push(["Model [ " + ++index + " ]", [
        [anime[v], usedPrefix + command + " consumetget " + url, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("books" === args[0]) {
    let listSections = [];
    return Object.keys(books).map((v, index) => {
      let url = "https://api.consumet.org/books/" + books[v] + "/" + one;
      listSections.push(["Model [ " + ++index + " ]", [
        [books[v], usedPrefix + command + " consumetget " + url, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("comics" === args[0]) {
    let listSections = [];
    return Object.keys(comics).map((v, index) => {
      let url = "https://api.consumet.org/comics/" + comics[v] + "/" + one;
      listSections.push(["Model [ " + ++index + " ]", [
        [comics[v], usedPrefix + command + " consumetget " + url, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("lightnovels" === args[0]) {
    let listSections = [];
    return Object.keys(lightnovels).map((v, index) => {
      let url = "https://api.consumet.org/light-novels/" + lightnovels[v] + "/" + one;
      listSections.push(["Model [ " + ++index + " ]", [
        [lightnovels[v], usedPrefix + command + " consumetget " + url, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("manga" === args[0]) {
    let listSections = [];
    return Object.keys(manga).map((v, index) => {
      let url = "https://api.consumet.org/manga/" + manga[v] + "/" + one;
      listSections.push(["Model [ " + ++index + " ]", [
        [manga[v], usedPrefix + command + " consumetget " + url, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("meta" === args[0]) {
    let listSections = [];
    return Object.keys(meta).map((v, index) => {
      let url = "https://api.consumet.org/meta/" + books[v] + "/" + one;
      listSections.push(["Model [ " + ++index + " ]", [
        [meta[v], usedPrefix + command + " consumetget " + url, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("movies" === args[0]) {
    let listSections = [];
    return Object.keys(movies).map((v, index) => {
      let url = "https://api.consumet.org/movies/" + movies[v] + "/" + one;
      listSections.push(["Model [ " + ++index + " ]", [
        [movies[v], usedPrefix + command + " consumetget " + url, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("consumetget" === args[0]) {
    let jso = await fetch(args[1]),
      res = await jso.json();
    if (res.error) throw res.error;
    throw "*Result :*\n\n• " + Object.values(res.results[0] ? res.results[0] : res.results).join("\r\n• ").replace("[object Object]", "") + "\n\n" + author;
  }
};
handler.help = ["consumet"].map(v => v + " query"), handler.tags = ["tools"],
  handler.command = /^consumet$/i, handler.limit = !0;
export default handler;