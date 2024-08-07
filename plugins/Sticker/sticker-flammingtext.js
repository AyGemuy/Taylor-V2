import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args
}) => {
  const input = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!input) return await conn.reply(m.chat, "❌ Cara Penggunaan:\n1. Untuk menampilkan panduan penggunaan dan contoh, ketik: *flammingtext*\n2. Untuk menampilkan daftar urutan halaman dan contoh, ketik: *flammingtext [query]*\n3. Untuk menampilkan daftar indeks dan contoh, ketik: *flammingtext [query|page]*\n4. Untuk menampilkan hasil terpilih, ketik: *flammingtext [query|page|index]*", m);
  const [query, pageStr, idxStr] = input.split("|"), page = parseInt(pageStr), idx = parseInt(idxStr);
  if (isNaN(page)) return await conn.reply(m.chat, "❌ Nomor halaman tidak valid. Silakan masukkan nomor halaman antara 1 dan 67.", m);
  const searchResults = await getLogosByPage(query, page);
  if (isNaN(idx)) {
    const sortedTitles = searchResults.map((logo, index) => `*${index + 1}.* ${logo.title}`);
    return await conn.reply(m.chat, `❌ Mohon berikan indeks. Contoh: *flammingtext ${query}|${page}|1*.\n\nHasil Pencarian:\n` + sortedTitles.join("\n"), m);
  }
  if (page < 1 || page > 67 || idx <= 0 || idx > searchResults.length) return await conn.reply(m.chat, "❌ Nomor halaman atau indeks tidak valid. Silakan periksa nomor halaman dan indeks yang dimasukkan.", m);
  const selectedLogo = searchResults.find(logo => logo.page === page && logo.index === idx);
  if (!selectedLogo) return await conn.reply(m.chat, "❌ Hasil tidak ditemukan. Pastikan nomor halaman dan indeks yang dimasukkan benar.", m);
  if (selectedLogo) {
    await conn.reply(m.chat, `${wait}\n${selectedLogo.title}`, m);
    const caption = `*Judul:* ${selectedLogo.title}\n*Link:* ${selectedLogo.link}`,
      tag = `@${m.sender.split("@")[0]}`;
    try {
      await conn.sendMessage(m.chat, {
        image: await fetchArrayBufferToBuffer(selectedLogo.linkImage),
        caption: `${caption}\nPermintaan oleh: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } catch (error) {
      return await conn.reply(m.chat, "❌ Terjadi Kesalahan: " + error.message, m);
    }
  }
};
handler.help = ["flammingtext [query|page|index]"], handler.tags = ["pembuat"],
  handler.command = /^(flammingtext)$/i;
export default handler;
async function getLogosByPage(query, page) {
  try {
    if (page < 1 || page > 70) throw new Error("Nomor halaman tidak valid. Silakan masukkan nomor halaman antara 1 dan 70.");
    const baseUrl = 1 === page ? `https://api.flamingtext.com/All-Logos/?text=${query}` : `https://api.flamingtext.com/All-Logos/page${page}?text=${query}`,
      {
        data
      } = await axios.get(baseUrl),
      $ = cheerio.load(data);
    return $(".ft-logo").map((index, element) => {
      const anchor = $(element).find("a"),
        img = $(element).find("img"),
        link = "https://api.flamingtext.com" + anchor.attr("href"),
        linkImage = "https://api.flamingtext.com" + img.attr("logo-src"),
        textParam = new URLSearchParams(linkImage.split("?")[1]).get("script");
      return {
        title: textParam ? textParam.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "",
        link: link,
        linkImage: linkImage,
        page: page,
        index: index + 1
      };
    }).get().filter(url => url.linkImage.includes("api.flamingtext.com/net-fu"));
  } catch (error) {
    return console.error("Terjadi kesalahan:", error.message), [];
  }
}
async function fetchArrayBufferToBuffer(url) {
  try {
    const arrayBuffer = (await axios.get(url, {
      responseType: "arraybuffer"
    })).data;
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(error.message);
  }
}