import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import * as cheerio from "cheerio";
async function Lens(imgUrl) {
  try {
    const imageData = Buffer.from(await (await fetch(imgUrl)).arrayBuffer());
    const form = new FormData();
    form.append("image_url", imgUrl);
    form.append("sbisrc", "Chromium 98.0.4725.0 Windows");
    form.append(
      "encoded_image",
      new Blob([imageData], {
        type: "image/png",
      }),
      "image.png",
    );
    const uploadResponse = await fetch(
      `https://lens.google.com/v3/upload?s=4&re=df&stcs=${imgUrl}`,
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4725.0 Safari/537.36",
        },
        body: form,
      },
    );
    const htmlContent = await uploadResponse.text();
    const searchStart = htmlContent.indexOf("Abrf");
    if (searchStart === -1)
      throw new Error("Search start not found in response");
    const partAfterSearch = htmlContent.substring(searchStart);
    const start = partAfterSearch.indexOf("Abrf");
    const end = partAfterSearch.indexOf("\\", start);
    const searchUrl =
      "https://lens.google.com/search?ep=subb&re=df&s=4&p=" +
      partAfterSearch.substring(start, end);
    const searchHtml = await (await fetch(searchUrl)).text();
    const $ = cheerio.load(searchHtml);
    const scriptContent = $("script.ds\\:0").html();
    if (scriptContent) {
      const str = scriptContent.split("AF_initDataCallback")[1];
      const jsonData = `[${str?.slice(str.indexOf("["), str.lastIndexOf("]") + 1) || "[]"}]`;
      const dataArray =
        JSON.parse(jsonData)[0]?.[1]?.[0]?.[1]?.[8]?.[8]?.[0] || [];
      return dataArray
        .flatMap((item) =>
          Array.isArray(item)
            ? item.flatMap((subItem) =>
                Array.isArray(subItem) &&
                subItem[3] &&
                subItem[7] &&
                subItem[0]?.[0] &&
                subItem[5] &&
                subItem[11] &&
                subItem[14]
                  ? [
                      {
                        title: subItem[3] || "",
                        domain: subItem[7] || "",
                        thumbnail: subItem[0]?.[0] || "",
                        imgres: subItem[5] || "",
                        link: subItem[11] || "",
                        source: subItem[14] || "",
                        pcnt: subItem[1] || "",
                      },
                    ]
                  : [],
              )
            : [],
        )
        .filter((item) => item.thumbnail);
    }
    return "Script element not found";
  } catch (error) {
    return `Error fetching or processing data: ${error}`;
  }
}
export { Lens };
