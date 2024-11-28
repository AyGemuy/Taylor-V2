import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { FormData } from "formdata-node";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const msg = `Input link atau reply link yang ingin di download!\n\n*Contoh:*\n${usedPrefix + command} link`;
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw msg;
    text = m.quoted?.text;
  }
  m.react(wait);
  try {
    const { data } = await SnapSave(text);
    if (0 === data.length) return m.reply("Tidak ada hasil");
    for (let i = 0; i < data.length; i++)
      await conn.sendFile(
        m.chat,
        data[i]?.url,
        "",
        `Dari *(${i + 1}/${data.length})*`,
        m,
        !1,
        {
          mentions: [m.sender],
        },
      );
  } catch (error) {
    m.react(eror);
  }
};
(handler.help = ["snapsave *[link]*"]),
  (handler.tags = ["downloader"]),
  (handler.command = /^(snapsave)$/i);
export default handler;
async function SnapSave(url) {
  try {
    const fbRegex =
      /(https|http):\/\/(?:(?:www\.facebook\.com\/(?:(?:(?:video\.php)||(?:watch\/))\?v=\d+|(?:[0-9a-zA-Z-_.]+\/(?:(?:video|(post))(?:s))\/)(?:[0-9a-zA-Z-_.]+(?:\/\d+)*)))|(?:fb\.watch\/(?:\w|-)+)|(?:www\.facebook\.com\/reel\/\d+)|(?:www\.facebook\.com\/share\/(v|r)\/[a-zA-Z0-9]+\/)\/?)/;
    const igRegex =
      /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|reels|tv|stories)\/([^/?#&]+)).*/g;
    if (!url.match(fbRegex) && !url.match(igRegex))
      return {
        status: false,
        msg: "Link Url not valid",
      };

    function decodeSnapApp(args) {
      let [h, u, n, t, e, r] = args;

      function decode(d, e, f) {
        const g =
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split(
            "",
          );
        const h = g.slice(0, e);
        const i = g.slice(0, f);
        let j = d
          .split("")
          .reverse()
          .reduce(function (a, b, c) {
            if (h.indexOf(b) !== -1)
              return (a += h.indexOf(b) * Math.pow(e, c));
          }, 0);
        let k = "";
        while (j > 0) {
          k = i[j % f] + k;
          j = (j - (j % f)) / f;
        }
        return k || "0";
      }
      r = "";
      for (let i = 0, len = h.length; i < len; i++) {
        let s = "";
        while (h[i] !== n[e]) {
          s += h[i];
          i++;
        }
        for (let j = 0; j < n.length; j++)
          s = s.replace(new RegExp(n[j], "g"), j.toString());
        r += String.fromCharCode(decode(s, e, 10) - t);
      }
      return decodeURIComponent(encodeURIComponent(r));
    }

    function getEncodedSnapApp(data) {
      return data
        .split("decodeURIComponent(escape(r))}(")[1]
        .split("))")[0]
        .split(",")
        .map((v) => v.replace(/"/g, "").trim());
    }

    function getDecodedSnapSave(data) {
      return data
        .split('getElementById("download-section").innerHTML = "')[1]
        .split('"; document.getElementById("inputData").remove(); ')[0]
        .replace(/\\(\\)?/g, "");
    }

    function decryptSnapSave(data) {
      return getDecodedSnapSave(decodeSnapApp(getEncodedSnapApp(data)));
    }
    const formData = new URLSearchParams();
    formData.append("url", url);
    const response = await fetch("https://snapsave.app/action.php?lang=id", {
      method: "POST",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://snapsave.app",
        referer: "https://snapsave.app/id",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      },
      body: formData,
    });
    const html = await response.text();
    const decode = decryptSnapSave(html);
    const $ = cheerio.load(decode);
    const results = [];
    if ($("table.table").length || $("article.media > figure").length) {
      const thumbnail = $("article.media > figure").find("img").attr("src");
      $("tbody > tr").each((_, el) => {
        const $el = $(el);
        const $td = $el.find("td");
        const resolution = $td.eq(0).text();
        let _url =
          $td.eq(2).find("a").attr("href") ||
          $td.eq(2).find("button").attr("onclick");
        const shouldRender = /get_progressApi/gi.test(_url || "");
        if (shouldRender) {
          _url = /get_progressApi\('(.*?)'\)/.exec(_url || "")?.[1] || _url;
        }
        results.push({
          resolution: resolution,
          thumbnail: thumbnail,
          url: _url,
          shouldRender: shouldRender,
        });
      });
    } else {
      $("div.download-items__thumb").each((_, tod) => {
        const thumbnail = $(tod).find("img").attr("src");
        $("div.download-items__btn").each((_, ol) => {
          let _url = $(ol).find("a").attr("href");
          if (!/https?:\/\//.test(_url || ""))
            _url = `https://snapsave.app${_url}`;
          results.push({
            thumbnail: thumbnail,
            url: _url,
          });
        });
      });
    }
    if (!results.length)
      return {
        status: false,
        msg: "Blank data",
      };
    return {
      status: true,
      data: results,
    };
  } catch (error) {
    return {
      status: false,
      data: error,
    };
  }
}
