import fetch from "node-fetch";
import cheerio from "cheerio";
const WikiquoteApi = (() => {
  const wqa = {},
    API_URL = "https://id.wikiquote.org/w/api.php",
    makeRequest = async url => {
      const response = await fetch(url);
      return await response.json();
    };
  return wqa.queryTitles = async titles => {
    try {
      const pages = (await makeRequest(`${API_URL}?format=json&action=query&titles=${titles}&redirects=''`)).query.pages;
      let pageId = -1;
      for (const p in pages) {
        const page = pages[p];
        if (!("missing" in page)) {
          pageId = page.pageid;
          break;
        }
      }
      if (pageId > 0) return pageId;
      throw new Error(`No results for: ${titles}`);
    } catch (error) {
      throw error;
    }
  }, wqa.getSectionsForPage = async pageId => {
    try {
      const data = await makeRequest(`${API_URL}?format=json&action=parse&prop=sections&pageid=${pageId}`),
        sectionArray = data.parse.sections.filter(s => "1" === s.number.split(".")[0]).map(s => s.index);
      return 0 === sectionArray.length && sectionArray.push("1"), {
        titles: data.parse.title,
        sections: sectionArray
      };
    } catch (error) {
      throw error;
    }
  }, wqa.getQuotesForSection = async (pageId, sectionIndex) => {
    try {
      const data = await makeRequest(`${API_URL}?format=json&action=parse&noimages=''&pageid=${pageId}&section=${sectionIndex}`),
        quotes = data.parse.text["*"],
        $ = cheerio.load(quotes),
        quoteArray = [];
      return $("li:not(li li)").each(function() {
        $(this).find("sup").remove(), $(this).find("a").each(function() {
          $(this).attr("href", "http://it.wikipedia.org" + $(this).attr("href"));
        }), quoteArray.push($(this).html());
      }), {
        titles: data.parse.title,
        quotes: quoteArray
      };
    } catch (error) {
      throw error;
    }
  }, wqa.openSearch = async titles => {
    try {
      const response = await fetch(`${API_URL}?format=json&action=opensearch&namespace=0&suggest=&search=${titles}`);
      return (await response.json())[1];
    } catch (error) {
      throw error;
    }
  }, wqa.getRandomQuote = async titles => {
      try {
        const getQuotes = async (pageId, sections) => {
          const randomNum = Math.floor(Math.random() * sections.sections.length);
          return await wqa.getQuotesForSection(pageId, sections.sections[randomNum]);
        }, getSections = async pageId => {
          const sections = await wqa.getSectionsForPage(pageId);
          return await getQuotes(pageId, sections);
        }, pageId = await wqa.queryTitles(titles);
        return await getSections(pageId);
      } catch (error) {
        throw error;
      }
    }, wqa.capitalizeString = input => input.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
    wqa;
})();
export default WikiquoteApi;