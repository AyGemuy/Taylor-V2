import crypto from "crypto";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
const Doods = async (url) => {
  try {
    const proxyLink =
      "https://rv.lil-hacker.workers.dev/proxy?mirror=dood&url=";
    const headers = {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      Referer: "https://d000d.com/",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
    };
    const idm = url.match(/\/[de]\/([a-zA-Z0-9]+)/);
    if (!idm) {
      throw new Error(
        "Link nya gak bisa diproses bree, ganti link yang baru aja",
      );
    }
    const id = idm[1];
    const base = "https://dood.li/d/";
    const doodstreamUrl = `${proxyLink}https://d000d.com/e/${id}`;
    await new Promise((resolve) => setTimeout(resolve, 14e3));
    let response = await fetch(`${base}${id}`);
    let data = await response.text();
    let $ = cheerio.load(data);
    if ($("#os_player iframe").length === 0) {
      return {};
    }
    const result = {
      title: $(".title-wrap h4").text().trim(),
      duration: $(".length").text().trim(),
      size: $(".size").text().trim(),
      uploadDate: $(".uploadate").text().trim(),
    };
    response = await fetch(doodstreamUrl, {
      headers: headers,
    });
    if (!response.ok)
      return `Error: Unable to fetch Doodstream page, status code: ${response.status}`;
    let text = await response.text();
    const urlInsideGet = text.match(
      /\$.get\('([^']+)',\s*function\(data\)/,
    )?.[1];
    if (!urlInsideGet)
      return "Error: Unable to find URL inside the initial response.";
    const lastValue = urlInsideGet.match(/\/([^/]+)$/)?.[1];
    const newUrl = `${proxyLink}https://d000d.com${urlInsideGet}`;
    response = await fetch(newUrl, {
      headers: headers,
    });
    if (!response.ok)
      return "Error: Unable to fetch contents of the secondary URL.";
    const part1 = await response.text();
    const randomString = Array.from(crypto.randomFillSync(new Uint8Array(10)))
      .map(
        (x) =>
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
            x % 62
          ],
      )
      .join("");
    result.finalLink = `${proxyLink}${part1}${randomString}?token=${lastValue}&expiry=${Date.now()}`;
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: "Terjadi kesalahan saat scraping...",
    };
  }
};
export { Doods };
