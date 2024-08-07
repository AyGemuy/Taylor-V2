import fetch from "node-fetch";
import axios from "axios";
import {
  FormData
} from "formdata-node";
import cheerio from "cheerio";
import {
  Maker
} from "imagemaker.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    const parts = text.trim().split("|");
    if (parts.length < 2) {
      return conn.reply(m.chat, `❌ *Format input tidak valid.*\n\nGunakan format: *${usedPrefix + command} style|text|more text|index*`, m);
    }
    m.react(wait);
    const [style, query, ...rest] = parts;
    const indexStr = rest.pop();
    const styleIndex = parseInt(indexStr, 10) - 1;
    const moreText = rest.join("|");
    const input = moreText ? moreText.includes("--") || query.includes("|") ? [query, ...moreText.split("--").map(part => part.trim())] : query : query;
    if (!style || !query) {
      return conn.reply(m.chat, `❌ *Masukkan style dan text terlebih dahulu.*\n\nFormat: *${usedPrefix + command} style|text|more text*`, m);
    }
    const searchResults = await searchTheme(style, command);
    if (!searchResults.length) {
      return conn.reply(m.chat, `❌ *Style "${style}" tidak ditemukan.*\n\nFormat: *${usedPrefix + command} style|text|more text*`, m);
    }
    if (isNaN(styleIndex) || styleIndex < 0 || styleIndex >= searchResults.length) {
      const buttons = conn.ctaButton.setBody(`❌ *Input tidak valid.*\n\nPastikan:\n1. Style\n2. Text\n3. Index (1-${searchResults.length})\n\nPilih style dari daftar.`).setFooter("Klik tombol di bawah untuk memilih style.").addSelection("Lihat Style").makeSections("Pilih Style", "Tersedia");
      searchResults.forEach((item, index) => {
        const moreTextPart = moreText ? `|${moreText}` : "";
        buttons.makeRow("", item.title, `Pilih ${item.title}`, `${usedPrefix + command} ${style}|${query}${moreTextPart}|${index + 1}`);
      });
      return buttons.run(m.chat, conn, m);
    }
    const selectedResult = searchResults[styleIndex];
    const maker = new Maker();
    let makerResult;
    switch (command) {
      case "textpro":
        makerResult = await maker.TextPro(selectedResult.link, Array.isArray(input) ? input : [input]);
        break;
      case "ephoto":
        makerResult = await maker.Ephoto360(selectedResult.link, Array.isArray(input) ? input : [input]);
        break;
      case "photooxy":
        makerResult = await maker.PhotoOxy(selectedResult.link, Array.isArray(input) ? input : [input]);
        break;
      default:
        throw new Error("Unknown command");
    }
    if (makerResult.imageUrl.endsWith("undefined")) {
      makerResult = await allMaker(selectedResult.link, Array.isArray(input) ? input : [input]);
    }
    console.log(`Generated image URL: ${makerResult.imageUrl}`);
    const tag = `@${m.sender.replace(/@.+/, "")}`;
    const headResponse = await fetch(makerResult.imageUrl, {
      method: "HEAD"
    });
    const contentType = headResponse.headers.get("content-type");
    console.log(`Content type: ${contentType}`);
    if (contentType.startsWith("image")) {
      await conn.sendMessage(m.chat, {
        image: {
          url: makerResult.imageUrl
        },
        caption: `✨ *Efek ${selectedResult.title}* berhasil diterapkan.\nDiminta oleh: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else if (contentType.startsWith("video")) {
      await conn.sendMessage(m.chat, {
        video: {
          url: makerResult.imageUrl
        },
        caption: `✨ *Efek ${selectedResult.title}* berhasil diterapkan.\nDiminta oleh: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else {
      m.reply(Buffer.rom(contentType));
      m.react(eror);
    }
    m.react(success);
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.help = ["textpro", "ephoto", "photooxy"].map(v => v + " <style|text|more text|index>");
handler.tags = ["maker"];
handler.command = /^(textpro|ephoto|photooxy)$/i;
export default handler;
async function searchTheme(q, type) {
  try {
    const urlMap = {
      textpro: `https://textpro.me/search?q=${encodeURIComponent(q)}`,
      ephoto: `https://en.ephoto360.com/index/search?q=${encodeURIComponent(q)}`,
      photooxy: `https://photooxy.com/search?q=${encodeURIComponent(q)}`,
      textproJson: `https://raw.githubusercontent.com/AyGemuy/Textpro-Theme/master/textprome.json`
    };
    if (!urlMap[type] && type !== "textproJson") throw new Error("Command not supported");
    const response = await fetch(urlMap[type]);
    const body = await response.text();
    let items;
    if (type === "textpro") {
      const $ = cheerio.load(body);
      items = $(".row .col-md-4").map((_, el) => ({
        link: `https://textpro.me${$(el).find(".div-effect a").attr("href") || ""}`,
        title: $(el).find(".title-effect-home").text().trim()
      })).get();
      if (items.length === 0) {
        const jsonResponse = await fetch(urlMap.textproJson);
        const jsonBody = await jsonResponse.json();
        items = jsonBody.map(item => ({
          title: item.title.trim(),
          link: item.url.trim()
        }));
      }
    } else {
      const $ = cheerio.load(body);
      switch (type) {
        case "ephoto":
          items = $(".row .col-md-4").map((_, el) => ({
            link: `https://en.ephoto360.com${$(el).find(".div-effect a").attr("href") || ""}`,
            title: $(el).find(".title-effect-home").text().trim()
          })).get();
          break;
        case "photooxy":
          items = $(".row.col-sm-12").map((_, el) => ({
            link: `https://photooxy.com${$(el).find(".title-effect-home a").attr("href") || ""}`,
            title: $(el).find(".title-effect-home a").text().trim()
          })).get();
          break;
      }
    }
    return items.filter(item => item.link);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
async function allMaker(url, text) {
  if (/https?:\/\/(ephoto360|photooxy|textpro)\/\.(com|me)/i.test(url)) throw new Error("URL Invalid");
  try {
    let a = await axios.get(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        Origin: new URL(url).origin,
        Referer: url,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
      }
    });
    let $ = cheerio.load(a.data);
    let server = $("#build_server").val();
    let serverId = $("#build_server_id").val();
    let token = $("#token").val();
    let submit = $("#submit").val();
    let types = [];
    $('input[name="radio0[radio]"]').each((i, elem) => {
      types.push($(elem).attr("value"));
    });
    let post;
    if (types.length != 0) {
      post = {
        "radio0[radio]": types[Math.floor(Math.random() * types.length)],
        submit: submit,
        token: token,
        build_server: server,
        build_server_id: Number(serverId)
      };
    } else {
      post = {
        submit: submit,
        token: token,
        build_server: server,
        build_server_id: Number(serverId)
      };
    }
    let form = new FormData();
    for (let i in post) {
      form.append(i, post[i]);
    }
    if (typeof text == "string") text = [text];
    for (let i of text) form.append("text[]", i);
    let b = await axios.post(url, form, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        Origin: new URL(url).origin,
        Referer: url,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188",
        Cookie: a.headers.get("set-cookie").join("; ")
      }
    });
    $ = cheerio.load(b.data);
    let out = $("#form_value").first().text() || $("#form_value_input").first().text() || $("#form_value").first().val() || $("#form_value_input").first().val();
    let c = await axios.post(new URL(url).origin + "/effect/create-image", JSON.parse(out), {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: new URL(url).origin,
        Referer: url,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188",
        Cookie: a.headers.get("set-cookie").join("; ")
      }
    });
    return {
      status: c.data?.success,
      imageUrl: server + (c.data?.fullsize_image || c.data?.image || ""),
      session: c.data?.session_id
    };
  } catch (e) {
    throw e;
  }
}