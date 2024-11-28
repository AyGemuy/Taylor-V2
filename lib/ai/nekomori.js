import fetch from "node-fetch";
import * as cheerio from "cheerio";
import crypto from "crypto";
class Nekomori {
  constructor() {
    this.baseUrl = "https://nekomori.space";
    this.defaultHeaders = {
      "User-Agent": "Postify/1.0.0",
      Accept: "*/*",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      "Upgrade-Insecure-Requests": "1",
      Origin: "https://nekomori.space",
      Referer: "https://nekomori.space/",
      "Sec-Ch-Ua": '"Not-A.Brand";v="99", "Chromium";v="58"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "X-Requested-With": "XMLHttpRequest",
    };
  }
  randomIP() {
    return Array.from(
      {
        length: 4,
      },
      () => crypto.randomInt(0, 256),
    ).join(".");
  }
  async search(query, useTags = false) {
    try {
      const searchQuery = encodeURI(query);
      const linkSearch = useTags
        ? query
        : `${this.baseUrl}/?searchQuery=${searchQuery}`;
      const response = await fetch(linkSearch, {
        headers: this.defaultHeaders,
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      return $(".assistant-holder")
        .map((index, element) => ({
          title: $(element).find("h3").text(),
          description: $(element)
            .find(".assistant-place-btn div.text-white")
            .eq(1)
            .text(),
          image: $(element).find("img").attr("src"),
          link:
            `${this.baseUrl}/en/chat/model/` +
            $(element).attr("href").split("/").pop(),
        }))
        .get();
    } catch (error) {
      return [];
    }
  }
  async chat(message = "Hello", assistantId = 286) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1.1/messages`, {
        method: "POST",
        headers: {
          ...this.defaultHeaders,
          "Content-Type": "application/json",
          "X-Forwarded-For": this.randomIP(),
        },
        body: JSON.stringify({
          message: message,
          assistantId: assistantId,
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return {
        error:
          "There was an error, return to the home page and continue to enjoy the conversation",
      };
    }
  }
  async tags(tagIndex = 0, byIndex = 5) {
    try {
      const tags = [
        "Demon Slayer",
        "Spy family",
        "Jojo bizzare adventure",
        "Naruto",
        "My hero academia",
        "One piece",
        "Attack on titan",
        "Shimoneta",
        "Evangelion",
        "Isekai Meikyuu de Harem wo",
        "A Girl & Her Guard Dog",
        "Kaguya-sama: Love Is War",
        "Jujutsu Kaisen",
        "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san",
        "Chainsaw man",
        "Mushoku Tensei",
        "Itadaki Seieki",
        "Hypnosis Sex Guidance",
        "Vinland Saga",
        "Drabon Ball",
        "Blue Archive",
        "Shikanoko nokonoko koshitantan",
        "re:zero",
        "FUTURE DIARY",
        "OREIMO",
        "BOCCHI THE ROCK!",
        "The Quintessential Quintuplets",
        "Fate",
        "Jujutsu Kaisen",
        "TOMO-CHAN WA ONNANOKO",
        "HIGHSCHOOL OF THE DEAD",
        "Don't Toy with Me, Miss Nagatoro",
        "BLACK CLOVER",
        "Uzaki-chan Wants to Hang Out!",
        "MUSHOKU TENSEI",
        "Pokémon",
        "Teen titans",
        "One punch man",
        "SONO BISQUE DOLL WA KOI WO SURU",
        "Dandadan",
        "Bleach",
        "Nier: Automata",
        "DARLING IN THE FRANXX",
        "SWORD ART ONLINE",
        "Holo no Graffiti",
        "Monster Musume no Iru Nichijou",
        "Oshi no Ko",
        "Ookami to Koushinryou",
        "Too Many Losing Heroines",
        "Danganronpa",
        "Rurouni Kenshin",
        "Haiyore! Nyaruko",
        "Symphogear",
        "Guilty Crown",
        "Tokyo Ghoul",
        "Cardcaptor Sakura",
        "Haikyuu!!",
        "Inuyasha",
        "Haiyore! Nyaruko",
        "Oregairu",
        "Kenshi Yonezu",
        "Kill la Kill",
        "Gurren Lagann",
        "Gintama",
        "Fullmetal Alchemist",
        "Fire Force",
        "Junji Ito Collection",
        "Kemono Jihen",
      ];
      const filterBy = ["Trend", "My", "Telegram", "Popularity", "Date"];
      const selectedTag = tags[tagIndex - 1];
      const sortByValue = filterBy[byIndex - 1];
      const url = new URL(`${this.baseUrl}/`);
      url.searchParams.append("tags", selectedTag);
      url.searchParams.append("sfwFilter", "All");
      url.searchParams.append("sortBy", sortByValue);
      return await this.search(url.toString(), true);
    } catch (error) {
      return "Error generating URL";
    }
  }
  async getId(link) {
    try {
      const response = await fetch(link, {
        headers: this.defaultHeaders,
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      const assistantId = $(".message-wrapper .reaction[data-assistant]")
        .first()
        .data("assistant");
      return assistantId || "No assistant ID found";
    } catch (error) {
      return "Error fetching assistant ID";
    }
  }
}
export const nekomori = new Nekomori();
