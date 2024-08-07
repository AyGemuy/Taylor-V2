import {
  fetch as fetchUndici
} from "undici";
import got from "got";
import fetch from "node-fetch";
import axios from "axios";
import {
  format
} from "util";
import userAgent from "fake-useragent";
import {
  sizeFormatter,
  durationFormatter
} from "human-readable";
import {
  createHash
} from "crypto";
import urlRegexSafe from "url-regex-safe";
import {
  delay
} from "@whiskeysockets/baileys";
import {
  FormData
} from "formdata-node";
import _ from "lodash";
const fetchers = [{
  lib: fetchUndici,
  options: {
    redirect: "follow"
  },
  name: "undici"
}, {
  lib: got,
  options: {
    followRedirect: true,
    maxRedirects: 5
  },
  name: "got"
}, {
  lib: fetch,
  options: {
    redirect: "follow"
  },
  name: "node-fetch"
}, {
  lib: axios,
  options: {
    maxRedirects: 5,
    validateStatus: null
  },
  name: "axios"
}];
const formatSize = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  render: (lit, sym) => `${lit} ${sym}B`
});
const formatDuration = durationFormatter({
  allowMultiples: ["d", "h", "m", "s"]
});
const parseOptions = inputText => {
  const options = {
    method: "GET",
    headers: {},
    data: null,
    form: null,
    redirect: "follow",
    cookies: ""
  };
  _.forEach(inputText.split("--").slice(1), opt => {
    const [key, ...values] = opt.trim().split(" ");
    const value = values.join(" ").replace(/(^"|"$)/g, "");
    switch (key) {
      case "method":
      case "m":
        options.method = value.toUpperCase();
        break;
      case "header":
      case "h":
        const [headerKey, headerValue] = value.split(":");
        options.headers[headerKey.trim()] = headerValue.trim();
        break;
      case "data":
      case "d":
        options.data = options.data || {};
        const [dataKey, dataValue] = value.split("=");
        options.data[dataKey.trim()] = dataValue.trim();
        break;
      case "form":
      case "f":
        options.form = options.form || new FormData();
        const [formKey, formValue] = value.split("=");
        options.form.append(formKey.trim(), formValue.trim());
        break;
      case "redirect":
      case "direct":
        options.redirect = "manual";
        break;
      case "cookie":
        options.cookies = value;
        break;
      case "head":
        options.method = "HEAD";
        break;
    }
  });
  return options;
};
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  try {
    const inputText = args.join(" ") || m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!inputText) {
      return m.reply(`⚠️ *Masukkan teks atau balas pesan dengan teks yang ingin diolah.*\nContoh penggunaan:\n*${usedPrefix}${command} <url> [options]*`);
    }
    const totalLinks = _.uniq([...inputText.matchAll(urlRegexSafe())].map(match => match[0]));
    if (_.isEmpty(totalLinks)) {
      return m.reply("🔍 *Tidak ada link yang ditemukan.*");
    }
    const options = parseOptions(inputText);
    let successCount = 0,
      replyCount = 0,
      mediaCount = 0,
      uniqueIdCounter = 1;
    const resultsMap = new Map();
    for (const url of totalLinks) {
      for (const {
          lib,
          options: fetcherOptions
        }
        of fetchers) {
        try {
          const myheaders = {
            "User-Agent": userAgent(),
            Accept: "*/*",
            "Accept-Language": "*/*",
            Referer: url,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Connection: "keep-alive"
          };
          const response = await lib(url, {
            method: options.method,
            headers: {
              ...options.headers,
              ...myheaders,
              Cookie: options.cookies,
              Referer: options.headers.Referer || url
            },
            body: options.form || ["POST", "PUT", "PATCH"].includes(options.method) ? JSON.stringify(options.data) : null,
            redirect: options.redirect
          });
          const contentType = response.headers.get("content-type");
          const contentDisposition = response.headers.get("content-disposition");
          const contentLength = response.headers.get("content-length");
          const txt = lib === got ? response.body : lib === axios ? response.data : await response.text();
          if (!txt.trim()) {
            m.reply(`🔄 *Hasil kosong untuk link:* ${url}`);
            continue;
          }
          const uniqueId = createHash("sha256").update(url + uniqueIdCounter++).digest("hex");
          resultsMap.set(uniqueId, {
            url: url,
            contentType: contentType,
            contentDisposition: contentDisposition,
            contentLength: contentLength,
            txt: txt
          });
          successCount++;
          break;
        } catch (err) {
          console.error(`⚠️ *Terjadi kesalahan saat mengambil link:* ${url}`, err);
        }
      }
    }
    for (const {
        url,
        contentType,
        contentDisposition,
        contentLength,
        txt
      }
      of resultsMap.values()) {
      const finalContentLength = parseInt(contentLength, 10) || txt.length || 0;
      const finalContentType = contentType?.split(";")[0]?.trim() || "";
      const finalContentDisposition = contentDisposition?.match(/filename[^;=\n]*=(["']?)(.*?)\1/)?.[2] || "";
      if (/^(text\/(plain|html|xml)|application\/(json|.*\+xml)|.*\/(javascript|xml|x-www-form-urlencoded))/.test(finalContentType)) {
        if (finalContentLength > 65536) {
          mediaCount++;
          await delay(1024);
          const caption = `🔗 *Link:* ${url}\n📄 *Tipe:* ${finalContentType}\n📊 *Ukuran:* ${formatSize(finalContentLength)}\n*Metode:* \`${options.method}\``;
          await conn.sendFile(m.chat, Buffer.from(txt), finalContentDisposition || finalContentType || "Tidak diketahui", caption, m);
        } else {
          replyCount++;
          await delay(1024);
          let parsedTxt;
          try {
            parsedTxt = format(JSON.parse(txt));
          } catch {
            parsedTxt = txt;
          }
          m.reply(`${parsedTxt.slice(0, 65536)}`);
        }
      } else {
        mediaCount++;
        await delay(1024);
        const caption = `🔗 *Link:* ${url}\n📄 *Tipe:* ${finalContentType}\n📊 *Ukuran:* ${formatSize(finalContentLength)}\n*Metode:* \`${options.method}\``;
        if (finalContentType === "image/gif") {
          await conn.sendMessage(m.chat, {
            document: {
              url: url
            },
            caption: caption,
            mimetype: finalContentType,
            fileName: finalContentDisposition || finalContentType || "Tidak diketahui"
          }, {
            quoted: m
          });
        }
        await conn.sendFile(m.chat, url, finalContentDisposition || finalContentType || "Tidak diketahui", caption, m);
      }
    }
    const elapsedTime = (Date.now() - Date.now()) / 1e3;
    m.reply(`⏱️ *Waktu yang dibutuhkan:* \`${formatDuration(1e3 * elapsedTime)}\`\n✅ *Berhasil diambil:* \`${successCount}\` dari \`${totalLinks.length}\` link.\n- 💬 *Balasan:* \`${replyCount}\`\n- 🎨 *Media:* \`${mediaCount}\`\n*Metode:* \`${options.method}\``);
  } catch (e) {
    m.reply(`⚠️ *Terjadi kesalahan:* \n${e.message}`);
  }
};
handler.help = ["get", "fetch"];
handler.tags = ["tools"];
handler.alias = ["get", "fetch"];
handler.command = ["get", "fetch"];
export default handler;