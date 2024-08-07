import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";
const speech = ["Noun", "Pronoun", "Adjectives", "Numerals", "Verb", "Adverb", "Article", "Preposition", "Conjunction", "Interjection", "Abbreviation"],
  patch = (re, s) => {
    re = new RegExp(re, "ig");
    let k = s.match(re);
    return k ? k.length : 0;
  },
  verify_word = async word => {
    try {
      const data = (await axios.get("https://en.wiktionary.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          format: "json",
          utf8: "",
          srprop: "",
          srsearch: word,
          srwhat: "nearmatch"
        }
      })).data.query.search;
      if (0 === data.length) throw new Error("word does not exist");
      return data[0]?.title;
    } catch (error) {
      throw error;
    }
  }, get_wiki_entry = async word => {
    try {
      const response = await axios.get("https://en.wiktionary.org/w/index.php", {
        params: {
          title: word,
          printable: "yes"
        }
      });
      let dictionary = {
          word: word,
          language: "en",
          definitions: []
        },
        $ = cheerio.load(response.data),
        cnt = 0;
      return $(".toc").find(".toclevel-1").each(function(i, elem) {
        if (0 === i) {
          const text = $(elem).text();
          for (let x in speech) cnt += patch(speech[x], text);
        }
      }), $(".mw-parser-output").find("ol").each(function(i, elem) {
        if (i < cnt) {
          $(elem).find("ul").empty();
          let onedefinition = {
            speech: $(elem).prev().prev().text(),
            lines: []
          };
          $(elem).children().each(function(i1, elem1) {
            let print = $(elem1).text().split("\n"),
              oneline = {
                define: "",
                examples: []
              };
            for (let x in print) 0 === x ? oneline.define = print[x] : print[x] && oneline.examples.push(print[x]);
            onedefinition.lines.push(oneline);
          }), dictionary.definitions.push(onedefinition);
        }
      }), dictionary;
    } catch (error) {
      throw error;
    }
  }, wiktionaryEn = async word => {
    try {
      const word1 = await verify_word(word);
      return await get_wiki_entry(word1);
    } catch (err) {
      throw err;
    }
  }, wiktionaryId = async word => {
    const apiUrl = `https://id.wiktionary.org/w/api.php?action=query&format=json&srlimit=10&srsort=relevance&list=search&srsearch=${word}`;
    try {
      const response = await fetch(apiUrl);
      return await response.json();
    } catch (error) {
      throw new Error("Gagal mengambil data dari API.");
    }
  };
export {
  wiktionaryEn,
  wiktionaryId
};