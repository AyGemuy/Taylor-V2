import axios from "axios";
import cheerio from "cheerio";
import {
  otakudesu
} from "../../lib/scraper/all/anime.js";
const search = async query => {
  try {
    const searchResult = await otakudesu.search(query);
    const result = searchResult;
    return result;
  } catch (error) {
    console.error("Error in search:", error);
    return {
      creator: "otaku",
      result: []
    };
  }
};
const view = async url => {
  try {
    const data = await otakudesu.detail(url);
    const result = data;
    return result;
  } catch (error) {
    console.error("Error in view:", error);
    return {
      creator: "otaku",
      img: "",
      sinopsis: ""
    };
  }
};
const download = async episode_url => {
  try {
    const episode_id = episode_url.split("/")[4];
    const {
      data: strm
    } = await axios.get(`https://latipharkat-api.my.id/api/otakudesu/view/?data=${episode_id}`);
    const stream = strm.data?.stream;
    if (!stream) throw new Error("Stream URL tidak ditemukan");
    const {
      data
    } = await axios.get(stream);
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
    if (command === "otasearch") {
      if (!text) return m.reply(`Contoh penggunaan: *${usedPrefix + command} tensura*`);
      const anu = await search(text);
      if (!anu.length) return m.reply(`Anime dengan judul *${text}* tidak ditemukan!`);
      const otaku = conn.ctaButton.setBody("Pilih anime di bawah ini.").setImage(anu[0].thumbnail).addSelection("Klik di sini").makeSections("Otakudesu", "rekomendasi");
      for (const v of anu) {
        otaku.makeRow("", v.title, `Dapatkan ${v.title}`, `.otaviewotaku ${v.link}`);
      }
      otaku.run(m.chat, conn, m);
    } else if (command === "otaviewotaku") {
      if (!text) return;
      const anu = await view(text);
      const teks = `╭───𖤞 ⧼ *Otakudesu* ⧽
│
│⬡ *Judul* : ${anu.judul}
│⬡ *Japanese* : ${anu.japanese}
│⬡ *Rate* : ${anu.skor}
│⬡ *Produser* : ${anu.produser}
│⬡ *Tipe* : ${anu.tipe}
│⬡ *Status* : ${anu.status}
│⬡ *Episode* : ${anu.total_episode}
│⬡ *Durasi* : ${anu.durasi}
│⬡ *Rilis* : ${anu.tanggal_rilis}
│⬡ *Studio* : ${anu.studio}
│⬡ *Genre* : ${anu.genre}
│⬡ *Batch* : ${anu.batch}
│
╰─────⪼

Sinopsis:
${anu.sinopsis}`;
      const otaku = conn.ctaButton.setBody(teks).setImage(anu.image).addSelection("Klik di sini").makeSections("Otakudesu", "");
      for (const v of anu.episode) {
        otaku.makeRow("", v.judul, `Dapatkan ${v.judul}`, `.otagetotaku ${v.link}`);
      }
      otaku.run(m.chat, conn, m);
    } else if (command === "otagetotaku") {
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
handler.command = ["otasearch", "otaviewotaku", "otagetotaku"];
handler.help = ["otasearch"];
handler.tags = ["search"];
export default handler;