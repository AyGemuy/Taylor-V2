import fetch from "node-fetch";
import axios from "axios";
import * as cheerio from "cheerio";
import { readFileSync } from "fs";
const hxz = await (await import("hxz-api")).default;
import { PinterestDownloader } from "../../lib/download/pinterest.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  let res1, res2, res3, res4, res5, res6;
  let tag = `@${m.sender.split("@")[0]}`;
  try {
    let pinterest = new PinterestDownloader();
    let data = await pinterest.searchPinterest(query);
    let res6 = data.map((v) => v.images_url);
    if (res6 && res6.length > 0) {
      let v6img = res6.getRandom();
      let isImagev6 = await detectImage(v6img);
      if (isImagev6) {
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: v6img,
            },
            caption: `🔍 *[ RESULT V6 ]*\nRequest by: ${tag}`,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        return;
      }
    }
  } catch (error1) {
    try {
      let res2 = await bochilPinterestImages(text);
      if (res2 && res2.length > 0) {
        let v2img = res2.getRandom();
        let isImagev2 = await detectImage(v2img);
        if (isImagev2) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: v2img,
              },
              caption: `🔍 *[ RESULT V2 ]*\nRequest by: ${tag}`,
              mentions: [m.sender],
            },
            {
              quoted: m,
            },
          );
          return;
        }
      }
    } catch (error2) {
      try {
        let res4 = await hxzPinterestImages(text);
        if (res4 && res4.length > 0) {
          let v4img = res4.getRandom();
          let isImagev4 = await detectImage(v4img);
          if (isImagev4) {
            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: v4img,
                },
                caption: `🔍 *[ RESULT V4 ]*\nRequest by: ${tag}`,
                mentions: [m.sender],
              },
              {
                quoted: m,
              },
            );
            return;
          }
        }
      } catch (error3) {
        try {
          let res1 = await searchPinterest(text);
          if (res1 && res1.result.length > 0) {
            let v1img = res1.result.getRandom();
            let isImagev1 = await detectImage(v1img);
            if (isImagev1) {
              await conn.sendMessage(
                m.chat,
                {
                  image: {
                    url: v1img,
                  },
                  caption: `🔍 *[ RESULT V1 ]*\nRequest by: ${tag}`,
                  mentions: [m.sender],
                },
                {
                  quoted: m,
                },
              );
              return;
            }
          }
        } catch (error5) {
          try {
            let response = await fetch(
              "https://api.lolhuman.xyz/api/pinterest2?apikey=" +
                Object.entries(APIKeys).find(([key]) =>
                  key.includes("lolhuman"),
                )?.[1] +
                "&query=" +
                text,
            );
            let res5 = await response.json();
            if (res5 && res5.result.length > 0) {
              let v5img = res5.result.getRandom();
              let isImagev5 = await detectImage(v5img);
              if (isImagev5) {
                await conn.sendMessage(
                  m.chat,
                  {
                    image: {
                      url: v5img,
                    },
                    caption: `🔍 *[ RESULT V5 ]*\nRequest by: ${tag}`,
                    mentions: [m.sender],
                  },
                  {
                    quoted: m,
                  },
                );
                return;
              }
            }
          } catch (error4) {
            console.error(error4);
          }
        }
      }
    }
  }
};
handler.help = ["pint"];
handler.tags = ["image"];
handler.command = /^(pint)$/i;
export default handler;
async function detectImage(url) {
  try {
    const response = await axios.head(url);
    const contentType = response.headers["content-type"];
    return contentType.startsWith("image/");
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    return false;
  }
}
async function bochilPinterestImages(query) {
  const result = (await pinterest(query))
    .filter((v) => v !== undefined)
    .map((v) => v.replace("236x", "originals"))
    .filter((url) => url.includes("/originals/"));
  return [...new Set(result)];
}
async function hxzPinterestImages(query) {
  const result = (await hxz.pinterest(query))
    .filter((v) => v !== undefined)
    .map((v) => v.replace("736x", "originals"))
    .filter((url) => url.includes("/originals/"));
  return [...new Set(result)];
}
async function searchPinterest(querry) {
  let HASIL = [];
  await axios
    .request(`https://id.pinterest.com/search/pins/?rs=typed&q=` + querry, {
      method: "GET",
      url: "https://id.pinterest.com/search/pins/?rs=typed&q=" + querry,
      headers: {
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        "sec-ch-ua-mobile": "?0",
        "upgrade-insecure-requests": "1",
        cookie:
          'csrftoken=ebe0be3a93cea6072be18633add953a2; _b="AVezvd6F4UtE24FUsA6INxipyZZDoSpyCc5vaJK4QDYXmExosVEc4h6WkiKhlVtQ430="; cm_sub=denied; fba=True; _ga=GA1.2.862909259.1620474446; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZ0VEZqZmdDSlJYaGU5REIvNklIcVlnMjE5b0ZraTE5REJVQ0JiMUwxTkZZaGFoVk1sRDVhOFlwQzhkQnQ0YkMwRlNyV0lIWUFlK0ZVTkVxYUhKNmlvZ0R1UXlQYTBRRVVhMU1yYkpmcXpHK3UyNjNhckRqUFFOYVJVa3RnVmJtVzd2MmRGaHFMZUpLNVhtaHptTDhWSnBSdXhZY0FhRnRTN3J1S0V4cGtsVTBxeE54NkF2blVNSFV3R0NTQTR1bVVNRURGVGdnYlN5UjdBbk9YcHVGbGI3a1kwd1dEZDgrZVM1SDc3V0pJMm00OWxKUDVNQjBLVlFocTB4Mjg1M1RnbGxBaFAxbS9MTnVzei91cEQvcjBtakp6N0ZnU2t1Y3NxWW1DRDV1Q3h0ankvQ3FEWGh3MXczcXBHNXJpYVNCMHB6dUoxMGF6ZzVxN2VqQVBoSElSd0tiQk41ZVRPQXlOaGNpNzVQMWJSeVZJbCtYYVMxQ1ZRUFUwalU3eGVzMGRySlNzdWo1NG5uaXNFM3ZpT0o0TkZHR1daUXlwaXFQclMwa04raW9xVnVaTTRSVGEzTE03TVlZcmZYVDd5UmVPd2lZaGw4aE9VMHJBd0tidEsrcHdPWk96RlFMekVLTzY3VU1PL0tIYUdwUE1IWVdJNnJXalBkU09Sb3dEaHlQVVR1T1RqNW5Sc2FRdmVkZmhkMk9HNHBCL0ZpZ3NMdmZvVW9ReVltTFBCTlNLWHpray9LNWJ2UTNvTlBzVm9aZjRvYWRvRFhla0dBNzdveWJVYXZmVFp2cnFFNU5DYUVwSHhxeDlIajNIVTlHaEVYdGptWm5mSGVSRmtIMmQwVVVVZlVCVEh6UHB3TnBtdWV0b2l6L3VTc3pXMXFGN3lHS3ZJM3BwL0NrWVJDMm1HY2tROGxuQVFRNS9OUW45R3dtSk8zeFJidVFSTG1qTG5PelAvKzd3T3lrN1NoKzBHVGNTY1pGSEY0bW8xcGVmc3NtclBhTWE2QUMxOXNpQWUwRmo4UHl0ZGpwUzhUQXVhbjYwT0ZJeHhHai8yOWFUVTA1Wkx2czN4VSttLzMvbkFVQ2svWnZvNC9xZ3E4VkhYSFZ5elo4TzhtU0o5c3ZDcEJyYjE3QVI1WHlmTTFhWThvWHQ1T0tSTWRsWnI3a1lpU245dEVLd1lZSXRremtkTUZmcVA2YUg0c1UrSk1JOWJVRzZpcWd3T0NVaFZkdUh3UUdURi9sbDBqT2pBZVV2ZnlTQzc5ZnBMYkFMQ1ZsWjdIYWcmaDc1Uk5kK2I4MjFMUXBaVUthci9rVHpCUWRvPQ==; _pinterest_cm="TWc9PSYxZnpkMS9XN29Rd2R0TnpBN0RzVktja1J4NUtINUJqRzNGODFXS0xES1pndWlNVm52a0d3V0JocmVIS3p5eDdnNXNZa0hGelNQNDBSTFRId3ZhTFFIQjRGOW1lNlJZMzFiVlg1MHhSOFpmMGhRZUoySUpJZDIyWlVYMjRXNHRaL1lodFl4eW1jWjNyTklpbytYbHZyd29nRm5DY0pQOGgyUWpDdk9zQ1craXR5VEZoNHV4ZzRnOXV4SUFFSStYZCsmT08zMFI1bktXa3pwSDFtK3NNRWpxWWNpQzNzPQ=="; _routing_id="595f24cd-7f4c-4495-aa67-37212d099cd8"; sessionFunnelEventLogged=1',
      },
    })
    .then((res) => {
      const $ = cheerio.load(res.data);
      let hasil = [];
      $(
        "body > div > div > div > div > div > div > div > div > div > div > div",
      ).each(function (a, b) {
        $(b)
          .find("div")
          .each(function (c, d) {
            let Link = $(d)
              .find("div > div > div > div > a")
              .find("img")
              .attr("src");
            hasil.push(Link);
          });
      });
      const output = hasil
        .filter((v) => v !== undefined)
        .map((v) => v.replace("236x", "originals"))
        .filter((url) => url.includes("/originals/"));
      const result = {
        status: res.status,
        creator: "Raku",
        result: [...new Set(output)],
      };
      HASIL.push(result);
    });
  return HASIL[0];
}
async function pinterest(query) {
  const response = await fetch(
    `https://id.pinterest.com/search/pins/?autologin=true&q=${encodeURIComponent(query)}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        Cookie:
          '_auth=1; _b="AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg="; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0',
      },
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  const data = await response.text();
  const $ = cheerio.load(data);
  const results = [];
  $("img").each(function () {
    results.push($(this).attr("src"));
  });
  return results;
}
