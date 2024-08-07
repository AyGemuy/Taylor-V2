import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description) || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    const {
      synonyms,
      antonyms,
      imageLink
    } = await getSynonymsAndAntonyms(text);
    let resultText = "";
    if (command === "sinonim") {
      resultText = `📚 *Sinonim dari "${text}"* 📚\n\n${formatList(synonyms)}`;
    } else if (command === "antonim") {
      resultText = `🔄 *Antonim dari "${text}"* 🔄\n\n${formatList(antonyms)}`;
    }
    await conn.sendMessage(m.chat, {
      image: {
        url: imageLink || thumb
      },
      caption: resultText
    }, {
      quoted: m
    });
  } catch (error) {
    console.error("Error:", error);
    m.reply("Terjadi kesalahan saat memproses permintaan.");
  }
};
handler.help = ["sinonim", "antonim"].map(v => v + " [kata]");
handler.tags = ["kerang"];
handler.command = ["sinonim", "antonim"];
export default handler;
async function getSynonymsAndAntonyms(searchTerm) {
  try {
    const formData = new URLSearchParams({
      q: searchTerm
    });
    const response = await fetch("https://m.persamaankata.com/search.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });
    if (!response.ok) throw new Error("Jaringan bermasalah");
    const html = await response.text();
    const $ = cheerio.load(html);
    const synonyms = $(".thesaurus_group").eq(0).find(".word_thesaurus a").map((_, el) => ({
      word: $(el).text(),
      link: $(el).attr("href")
    })).get();
    const antonyms = $(".thesaurus_group").eq(1).find(".word_thesaurus a").map((_, el) => ({
      word: $(el).text(),
      link: $(el).attr("href")
    })).get();
    const imageLink = $("#visual_synonym_img").attr("src") || "Tidak ada";
    return {
      synonyms: synonyms,
      antonyms: antonyms,
      imageLink: imageLink
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function formatList(words) {
  return words.map(word => `- ${word.word}`).join("\n");
}