import {
  anoboy
} from "../../lib/scraper/all/anime.js";
import cheerio from "cheerio";
import fetch from "node-fetch";
const search = async query => {
  try {
    const searchResult = await anoboy.search(query);
    return searchResult;
  } catch (error) {
    console.error("Error in search:", error);
    return [];
  }
};
const view = async url => {
  try {
    const data = await anoboy.detail(url);
    return data;
  } catch (error) {
    console.error("Error in view:", error);
    return {
      title: "",
      episode: "",
      upload: "",
      desc: "",
      image: "",
      url: ""
    };
  }
};
const download = async episode_url => {
  try {
    const episode_id = episode_url.split("/")[4];
    const response = await fetch(`https://latipharkat-api.my.id/api/anoboy/view/?data=${episode_id}`);
    const strm = await response.json();
    const stream = strm.data?.stream;
    if (!stream) throw new Error("Stream URL tidak ditemukan");
    const streamResponse = await fetch(stream);
    const data = await streamResponse.text();
    const $ = cheerio.load(data);
    const scriptContent = $("script[type='text/javascript']").eq(0).text();
    const matches = scriptContent.match(/sources:\s*(\[.*?\])/);
    const result = matches ? JSON.parse(matches[1].replace(/'/g, '"'))[0]?.file : scriptContent.match(/'file':'(.*?)'/)?.[1];
    return result;
  } catch (error) {
    console.error("Error in download:", error);
    throw error;
  }
};
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    if (command === "anosearch") {
      if (!text) return m.reply(`Contoh penggunaan: *${usedPrefix + command} Naruto*`);
      const results = await search(text);
      if (!results.length) return m.reply(`Konten dengan judul *${text}* tidak ditemukan!`);
      const anoboyButtons = conn.ctaButton.setBody("Pilih konten di bawah ini.").setImage(results[0].image).addSelection("Klik di sini").makeSections("Anoboy", "rekomendasi");
      for (const result of results) {
        anoboyButtons.makeRow("", result.title, `Dapatkan ${result.title}`, `.anoviewanoboy ${result.url}`);
      }
      anoboyButtons.run(m.chat, conn, m);
    } else if (command === "anoviewanoboy") {
      if (!text) return;
      const details = await view(text);
      const detailMessage = `╭───𖤞 ⧼ *Anoboy* ⧽
│
│⬡ *Judul* : ${details.title}
│⬡ *Episode* : ${details.episode}
│⬡ *Upload* : ${details.upload}
│⬡ *Deskripsi* : ${details.desc}
│
╰─────⪼

Link:
${details.url}`;
      const anoboyDetailButtons = conn.ctaButton.setBody(detailMessage).setImage(details.image).addSelection("Klik di sini").makeSections("Anoboy", "");
      anoboyDetailButtons.run(m.chat, conn, m);
    } else if (command === "anodownload") {
      if (!text) return;
      m.react(wait);
      const url = await download(text);
      await conn.sendFile(m.chat, url, "", "", m);
      m.react(sukses);
    }
  } catch (error) {
    console.error("Error in handler:", error);
    m.reply("Terjadi kesalahan saat memproses permintaan Anda.");
  }
};
handler.command = ["anosearch", "anoviewanoboy", "anodownload"];
handler.help = ["anosearch"];
handler.tags = ["search"];
export default handler;