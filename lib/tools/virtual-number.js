import cheerio from "cheerio";
import axios from "axios";
export class smstome {
  async Country() {
    try {
      const {
        data
      } = await axios.get("https://smstome.com"), $ = cheerio.load(data);
      return $(".column.fields ul li").map((_, listItem) => ({
        title: $("a", listItem).text().trim(),
        countryCode: $("a", listItem).attr("href").split("/").pop(),
        countryFlag: "https://smstome.com" + $("img", listItem).attr("src"),
        link: "https://smstome.com" + $("a", listItem).attr("href")
      })).get().filter(entry => Object.values(entry).every(value => void 0 !== value && "" !== value));
    } catch (error) {
      return console.error("Error fetching country page:", error), [];
    }
  }
  async getNumber(country) {
    try {
      const {
        data
      } = await axios.get(`https://smstome.com/country/${country.toLowerCase()}`), $ = cheerio.load(data);
      return $(".numview").map((_, numview) => ({
        phoneNumber: $("a", numview).text().trim(),
        location: $("div.row:nth-child(1) > div > small", numview).text().trim(),
        addedDate: $("div.row:nth-child(2) > small", numview).text().trim(),
        link: $("a", numview).attr("href")
      })).get().filter(entry => Object.values(entry).every(value => void 0 !== value && "" !== value));
    } catch (error) {
      return console.error("Error fetching number page:", error), [];
    }
  }
  async getMessage(url, page) {
    try {
      const {
        data
      } = await axios.get(page ? `${url}?page=${page}` : url), $ = cheerio.load(data);
      return $("table.messagesTable tbody tr").map((_, message) => ({
        from: $("td:nth-child(1)", message).text().trim().replace("\x3c!--sse--\x3e", "").replace("\x3c!--/sse--\x3e", ""),
        received: $("td:nth-child(2)", message).text().trim().replace("\x3c!--sse--\x3e", "").replace("\x3c!--/sse--\x3e", ""),
        content: $("td:nth-child(3)", message).text().trim().replace("\x3c!--sse--\x3e", "").replace("\x3c!--/sse--\x3e", "")
      })).get().filter(entry => Object.values(entry).every(value => void 0 !== value && "" !== value));
    } catch (error) {
      return console.error("Error fetching message page:", error), [];
    }
  }
}
export class sms24 {
  async Country() {
    try {
      const {
        data
      } = await axios.get("https://sms24.me/en/countries"), $ = cheerio.load(data);
      return $(".callout").map((_, callout) => ({
        title: $("span.placeholder.h5", callout).text().trim(),
        link: "https://sms24.me/en/countries/" + $("span.fi", callout).attr("data-flag"),
        countryFlag: $("span.fi", callout).attr("data-flag")
      })).get();
    } catch (error) {
      return console.error("Error fetching country page:", error), [];
    }
  }
  async getNumber(country) {
    try {
      const {
        data
      } = await axios.get(`https://sms24.me/en/countries/${country.toLowerCase()}`), $ = cheerio.load(data);
      return $(".callout").map((_, callout) => ({
        phoneNumber: $(".fw-bold.text-primary", callout).text().trim(),
        country: $("h5", callout).text().trim()
      })).get();
    } catch (error) {
      return console.error("Error fetching number page:", error), [];
    }
  }
  async getMessage(number) {
    try {
      const {
        data
      } = await axios.get(`https://sms24.me/en/numbers/${parseInt(number)}`), $ = cheerio.load(data);
      return $(".shadow-sm.bg-light.rounded.border-start.border-info.border-5").map((_, message) => ({
        from: $("a", message).text().trim().replace("From:", "").trim(),
        content: $("span", message).text().trim()
      })).get();
    } catch (error) {
      return console.error("Error fetching message page:", error), [];
    }
  }
}