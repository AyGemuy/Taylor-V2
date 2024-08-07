import {
  fetch
} from "undici";
import cheerio from "cheerio";
import FakeUserAgent from "fake-useragent";
async function getRandomUserAgent() {
  return {
    "User-Agent": FakeUserAgent()
  };
}
async function getInfo() {
  try {
    const response = await fetch("https://snaptwitter.com", {
        headers: await getRandomUserAgent()
      }),
      $ = cheerio.load(await response.text()),
      formInputs = $("form#get_video input[name]");
    return Object.fromEntries(formInputs.get().map(element => [$(element).attr("name"), $(element).attr("value")]).filter(([name]) => name));
  } catch (error) {
    throw new Error(`Error fetching info: ${error.message}`);
  }
}
async function scrapeTwitterMedia(url) {
  const headers = await getRandomUserAgent();
  try {
    const response = await fetch("https://snaptwitter.com/action.php", {
        method: "POST",
        headers: {
          ...headers,
          "sec-ch-ua": '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
          "sec-ch-ua-platform": '"Windows"',
          "sec-ch-ua-mobile": "?0"
        },
        body: new URLSearchParams({
          token: (await getInfo()).token,
          url: url
        })
      }),
      $ = cheerio.load((await response.json()).data.toString());
    return Promise.all($(".videotikmate").map(async (index, element) => ({
      linkMedia: $(element).find("img, video, audio").attr("src"),
      username: $(element).find("h1 a").text()
    })).get());
  } catch (error) {
    throw new Error(`Error scraping Twitter media: ${error.message}`);
  }
}
export {
  scrapeTwitterMedia
};