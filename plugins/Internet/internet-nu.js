import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["list", "surah", "tafsir"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.nu search vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("list" === feature) {
      m.react(wait);
      try {
        let teks = (await surahList()).surahList.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 Name: ${item.name}\n🔗 Link: ${item.link}\n📝 No: ${item.number}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("surah" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .nu surah 5\nList: .nu list");
      m.react(wait);
      try {
        let res = await surahList(),
          teks = (await surahAyah(res.surahList[parseInt(inputs) + 1].link)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📖 Arab: ${item.quranTitle}\n🌐 Latin: ${item.quranLatin}\n🌍 Translate: ${item.quranTranslate}\n🔗 Link: ${item.url}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("tafsir" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .nu 2 5\nList: .nu list");
      if (!inputs_) return m.reply("Input query link\nExample: .nu 2 5\nList: .nu list");
      m.react(wait);
      try {
        let res = await surahList(),
          data = await surahAyah(res.surahList[parseInt(inputs) + 1].link),
          item = await surahTafsir(data[parseInt(inputs_) + 1].url),
          teks = `🔍 *[ RESULT ]*\n\n📖 Tafsir Tahlili: ${item.firstText}\n📘 Tafsir Wajiz: ${item.secondText}\n`;
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["nu"], handler.tags = ["internet"], handler.command = /^(nu)$/i;
export default handler;

function isNumberFormat(input) {
  return /^\d+$/.test(input);
}
async function surahList() {
  try {
    const url = "https://quran.nu.or.id/al-fatihah",
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      surahList = $(".flex.justify-center .mr-1 select option").map((index, element) => ({
        name: $(element).val().split("/")[1],
        number: $(element).text().trim().split(".")[0],
        link: "https://quran.nu.or.id" + $(element).val()
      })).get();
    return {
      surahList: surahList,
      ayahList: $("#ayah-select option").map((index, element) => $(element).val()).get()
    };
  } catch (error) {
    return console.log(error), null;
  }
}
async function surahAyah(query) {
  try {
    const url = query,
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      data = [];
    return $('div[id^="ayah"]').each((index, element) => {
      const url = "https://quran.nu.or.id" + $(element).find('a[href^="/"]').attr("href"),
        tafsir = $(element).find('a[href^="/"]').next().text().trim(),
        quranTitle = $(element).find(".text-right.font-omar.text-3xl").text().trim(),
        quranLatin = $(element).find(".font-omar.text-2xl").text().trim(),
        quranTranslate = $(element).find(".font-inter").text().trim();
      data.push({
        url: url,
        tafsir: tafsir,
        quranTitle: quranTitle,
        quranLatin: quranLatin,
        quranTranslate: quranTranslate
      });
    }), data;
  } catch (error) {
    return console.log(error), null;
  }
}
async function surahTafsir(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      firstText = $("#first").find("p.font-inter").text().trim();
    return {
      firstText: firstText,
      secondText: $("#second").find("p.font-inter").text().trim()
    };
  } catch (error) {
    return console.log(error), null;
  }
}