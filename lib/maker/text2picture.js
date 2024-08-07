import cheerio from "cheerio";
import fetch from "node-fetch";
async function ttp(text) {
  try {
    const response = await fetch("https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          Cookie: "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
        },
        body: new URLSearchParams({
          TextToRender: text,
          FontSize: "100",
          Margin: "30",
          LayoutStyle: "0",
          TextRotation: "0",
          TextColor: "ffffff",
          TextTransparency: "0",
          OutlineThickness: "3",
          OutlineColor: "000000",
          FontName: "Lekton",
          ResultType: "view"
        }).toString()
      }),
      bodyText = await response.text(),
      $ = cheerio.load(bodyText),
      results = [];
    return $('form[name="MyForm"]').each((index, formElement) => {
      const resultFile = $(formElement).find("#idResultFile").attr("value"),
        refTS = $(formElement).find("#idRefTS").attr("value");
      results.push({
        url: "https://www.picturetopeople.org" + resultFile,
        title: refTS
      });
    }), results;
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
async function attp(text) {
  try {
    const getidResponse = await fetch("https://id.bloggif.com/text"),
      getidText = await getidResponse.text(),
      id = cheerio.load(getidText)("#content > form").attr("action"),
      options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
        },
        body: new URLSearchParams({
          target: 1,
          text: text,
          glitter_id: Math.floor(2821 * Math.random()),
          font_id: "lucida_sans_demibold_roman",
          size: 100,
          bg_color: "FFFFFF",
          transparent: 1,
          border_color: "000000",
          border_width: 2,
          shade_color: "000000",
          shade_width: 1,
          angle: 0,
          text_align: "center"
        })
      },
      response = await fetch(`https://id.bloggif.com${id}`, options),
      bodyText = await response.text(),
      $ = cheerio.load(bodyText),
      entries = [];
    return $("div.box.center a").each((index, element) => {
      const title = $(element).text(),
        url = $(element).attr("href");
      entries.push({
        title: title,
        url: "https://id.bloggif.com" + url
      });
    }), entries;
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
async function raterian(text) {
  try {
    return `https://raterian.sirv.com/New%20Project.png?text.0.text=${text}&text.0.position.y=-35%25&text.0.color=ffffff&text.0.font.family=Poppins&text.0.font.weight=800&text.0.outline.color=000000&text.0.outline.width=1`;
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
export {
  ttp,
  raterian,
  attp
};