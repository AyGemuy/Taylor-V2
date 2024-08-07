import axios from "axios";
import cheerio from "cheerio";
const listsurah = async () => {
  try {
    const {
      data
    } = await axios.get("https://litequran.net/"), $ = cheerio.load(data);
    return {
      listsurah: $("main > ol.list > li > a").map((_, element) => $(element).text()).get()
    };
  } catch (error) {
    return console.error(error), {
      error: error.message
    };
  }
}, surah = async surahName => {
  try {
    surahName = surahName.toLowerCase().replace(/\s/g, "-");
    const {
      data
    } = await axios.get(`https://litequran.net/${surahName}`), $ = cheerio.load(data);
    return $("main > article > ol.surah > li").map((_, element) => ({
      arab: $(element).find("p.arabic").text() || "",
      latin: $(element).find("p.translate").text() || "",
      translate: $(element).find("p.meaning").text() || ""
    })).get();
  } catch (error) {
    return console.error(error), {
      error: error.message
    };
  }
}, tafsirsurah = async surahName => {
  try {
    surahName = surahName.toLowerCase().replace(/\s/g, "-");
    const {
      data
    } = await axios.get(`https://tafsirq.com/topik/${surahName}`), $ = cheerio.load(data);
    return {
      tafsirList: $("div.panel.panel-default").map((_, element) => {
        const heading = $(element).find("div.panel-heading.panel-choco > div.row > div.col-md-12"),
          body = $(element).find("div.panel-body.excerpt");
        return {
          surah: heading.find("a.title-header").text() || "",
          tafsir: body.text().trim() || "",
          type: heading.find("span.label").text() || "",
          source: heading.find("a.title-header").attr("href") || ""
        };
      }).get()
    };
  } catch (error) {
    return console.error(error), {
      error: error.message
    };
  }
};
export {
  listsurah,
  surah,
  tafsirsurah
};