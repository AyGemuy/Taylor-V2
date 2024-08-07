import {
  spawn
} from "child_process";
import path from "path";
import emojiRegex from "emoji-regex";
const fontPath = path.resolve("src/font/Zahraaa.ttf");
const inputPathL = path.resolve("src/kertas/folio/bl.jpg");
const inputPathR = path.resolve("src/kertas/folio/br.jpg");
const settings = {
  bl: {
    date: {
      x: "(w-text_w-180)",
      y: 88,
      lineSpacing: 6,
      fontSize: 25
    },
    day: {
      x: "(w-text_w-180)",
      y: 60,
      lineSpacing: 6,
      fontSize: 25
    },
    page: {
      x: 70,
      y: 120,
      lineSpacing: 6,
      fontSize: 25
    },
    content: {
      x: 155,
      y: 172,
      lineSpacing: 6,
      fontSize: 23,
      maxCharsPerLine: 85,
      maxLines: 40
    }
  },
  br: {
    date: {
      x: "(w-text_w-155)",
      y: 88,
      lineSpacing: 6,
      fontSize: 25
    },
    day: {
      x: "(w-text_w-155)",
      y: 60,
      lineSpacing: 6,
      fontSize: 25
    },
    page: {
      x: 90,
      y: 120,
      lineSpacing: 6,
      fontSize: 25
    },
    content: {
      x: 155,
      y: 172,
      lineSpacing: 6,
      fontSize: 23,
      maxCharsPerLine: 78,
      maxLines: 40
    }
  }
};
const divideArray = (arr, chunkSize) => Array.from({
  length: Math.ceil(arr.length / chunkSize)
}, (_, index) => arr.slice(index * chunkSize, (index + 1) * chunkSize));
const chunkString = (str, size) => str.match(new RegExp(`.{1,${size}}`, "g"));
const quote = xs => {
  const regex = emojiRegex();
  return xs.map(function(s) {
    s = s.replace(/([#!"$&'()*+,:;<=>?@[\\\]^`{|}~])/g, "\\$1");
    s = s.replace(regex, match => `\\${match}`);
    if (/["\s]/.test(s) && !/'/.test(s)) {
      return "'" + s.replace(/(['\\])/g, "\\$1") + "'";
    }
    if (/["'\s]/.test(s)) {
      return '"' + s.replace(/(["\\$`!])/g, "\\$1") + '"';
    }
    return s;
  }).join(" ");
};
const handler = async (m, {
  conn,
  text,
  command
}) => {
  const d = new Date();
  const tgl = d.toLocaleDateString("id-ID");
  const hari = d.toLocaleDateString("id-ID", {
    weekday: "long"
  });
  text = (text || m.quoted?.text || "").trim();
  if (!text) return await conn.reply(m.chat, "Tidak ada teks.", m);
  let fontColor = "black";
  if (command === "foliomerah") fontColor = "red";
  if (command === "foliohijau") fontColor = "green";
  if (command === "foliobiru") fontColor = "blue";
  try {
    const paragraphs = text.split("\n");
    const pages = {
      bl: divideArray(paragraphs.flatMap(p => chunkString(p.trim(), settings.bl.content.maxCharsPerLine) || []), settings.bl.content.maxLines),
      br: divideArray(paragraphs.flatMap(p => chunkString(p.trim(), settings.br.content.maxCharsPerLine) || []), settings.br.content.maxLines)
    };
    const totalPages = Math.max(pages.bl.length, pages.br.length);
    for (let i = 0; i < totalPages; i++) {
      const isBl = i % 2 === 0;
      const setting = isBl ? settings.bl : settings.br;
      const pageText = (pages[isBl ? "bl" : "br"][Math.floor(i / 2)] || []).join("\n");
      const pageNumber = `Page *${i + 1}* of *${totalPages}*`;
      const bufs = [];
      const dayArgs = [`fontfile=${fontPath}`, `text=${quote([ hari ])}`, `fontcolor=black`, `fontsize=${setting.day.fontSize}`, `x=${setting.day.x}`, `y=${setting.day.y}`, `line_spacing=${setting.day.lineSpacing}`].join(":");
      const dateArgs = [`fontfile=${fontPath}`, `text=${quote([ tgl ])}`, `fontcolor=black`, `fontsize=${setting.date.fontSize}`, `x=${setting.date.x}`, `y=${setting.date.y}`, `line_spacing=${setting.date.lineSpacing}`].join(":");
      const pageArgs = [`fontfile=${fontPath}`, `text=${quote([ `No. ${i + 1}` ])}`, `fontcolor=black`, `fontsize=${setting.page.fontSize}`, `x=${setting.page.x}`, `y=${setting.page.y}`, `line_spacing=${setting.page.lineSpacing}`].join(":");
      const contentArgs = [`fontfile=${fontPath}`, `text=${quote([ pageText ])}`, `fontcolor=${fontColor}`, `fontsize=${setting.content.fontSize}`, `x=${setting.content.x}`, `y=${setting.content.y}`, `line_spacing=${setting.content.lineSpacing}`].join(":");
      const ffmpegArgs = ["-i", isBl ? inputPathL : inputPathR, "-vf", [`drawtext=${dayArgs}`, `drawtext=${dateArgs}`, `drawtext=${pageArgs}`, `drawtext=${contentArgs}`].join(","), "-q:v", "2", "-f", "image2pipe", "pipe:1"];
      const ffmpegProcess = spawn("ffmpeg", ffmpegArgs);
      ffmpegProcess.stdout.on("data", chunk => bufs.push(chunk));
      await new Promise((resolve, reject) => {
        ffmpegProcess.on("error", reject).on("close", async () => {
          if (bufs.length) {
            await conn.sendFile(m.chat, Buffer.concat(bufs), `folio_page_${i + 1}.jpg`, `${pageNumber}\n- Tulisan Bot Lebih Bagus Daripada Tulisanmu`, m);
          } else {
            await conn.reply(m.chat, "Tidak ada hasil.", m);
          }
          resolve();
        });
      });
    }
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, "Terjadi kesalahan saat memproses permintaan Anda.", m);
  }
};
handler.help = ["folio <teks>", "foliomerah <teks>", "foliohijau <teks>", "foliobiru <teks>"];
handler.tags = ["nulis", "tools"];
handler.command = /^(folio|foliomerah|foliohijau|foliobiru)$/i;
handler.register = true;
handler.limit = true;
export default handler;