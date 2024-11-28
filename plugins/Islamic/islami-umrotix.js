import fetch from "node-fetch";
import * as cheerio from "cheerio";
class Umrotix {
  constructor() {
    this.listSurah = null;
  }
  async fetchHtml(url) {
    const response = await fetch(url);
    return await response.text();
  }
  async alquranList() {
    const html = await this.fetchHtml("https://umrotix.com/alquran-online");
    const $ = cheerio.load(html);
    return $("ul.list-quran li")
      .map((_, el) => ({
        nama: $(el).find("div.css-u41jef").text().trim(),
        link: $(el).find("a").attr("href"),
      }))
      .get();
  }
  async alquran(surat, ayat = null) {
    if (!this.listSurah) this.listSurah = await this.alquranList();
    const selected = this.listSurah.find(
      (el) => el.link.split("/").pop().split("-").pop() === surat.toString(),
    )?.link;
    if (!selected) throw new Error(`Surat ${surat} tidak ditemukan.`);
    const html = await this.fetchHtml(selected);
    const $ = cheerio.load(html);
    const ayatList = $(".quran-uthmani .css-90cpcj")
      .map((_, el) => {
        const teks = $(el)
          .find("p.style-ayah")
          .text()
          .trim()
          .replace(/\d+$/, "")
          .trim();
        const terjemahan = $(el)
          .find("p.translate-text")
          .text()
          .trim()
          .substring(2);
        return {
          teks: teks,
          terjemahan: terjemahan,
        };
      })
      .get()
      .filter((_, idx) => idx > 0);
    return ayat ? ayatList[ayat - 1] : ayatList;
  }
  async jadwalSholat(q) {
    const html = await this.fetchHtml(`https://umrotix.com/jadwal-sholat/${q}`);
    const $ = cheerio.load(html);
    return $("div.times-prays div.main-input.block")
      .map((_, el) => ({
        nama: $(el).find("p:nth-child(1)").text().trim(),
        waktu: $(el).find("p:nth-child(2)").text().trim(),
      }))
      .get();
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.join(" ") || m.quoted?.text || null;
  if (!text)
    return conn.reply(
      m.chat,
      `Masukkan teks atau reply pesan.\nContoh:\n${usedPrefix}${command} jakarta\natau\n${usedPrefix}${command} 1\natau\n${usedPrefix}${command} 2 3`,
      m,
    );
  m.react(wait);
  try {
    const umrotix = new Umrotix();
    const surahInput = text.match(/^\d+/g);
    const ayatInput = text.match(/\d+/g);
    if (surahInput) {
      const surahNumber = surahInput[0];
      const ayatNumber =
        ayatInput && ayatInput.length > 1 ? ayatInput[1] : null;
      const alquran = await umrotix.alquran(surahNumber, ayatNumber);
      const pesanAyat = ayatNumber
        ? `\`${alquran.teks}\`\n- ${alquran.terjemahan}`
        : alquran
            .map((el) => `\`${el.teks}\`\n- ${el.terjemahan}`)
            .join("\n\n");
      conn.reply(
        m.chat,
        `📖 *Al-Quran Surah ${surahNumber}*:\n\n${pesanAyat}`,
        m,
      );
    } else {
      const jadwal = await umrotix.jadwalSholat(text);
      const pesanJadwal = jadwal
        .map((el) => `⏰ *${el.nama}:* ${el.waktu}`)
        .join("\n");
      conn.reply(m.chat, `🕋 *Jadwal Sholat di ${text}*:\n\n${pesanJadwal}`, m);
    }
    m.react(sukses);
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = ["umrotix"];
handler.tags = ["islami"];
handler.command = /^(umrotix)$/i;
export default handler;
