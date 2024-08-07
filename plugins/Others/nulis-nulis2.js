import {
  format
} from "util";
import {
  spawn
} from "child_process";

function divideArray(arr) {
  const chunkSize = 28;
  return Array.from({
    length: Math.ceil(arr.length / chunkSize)
  }, (_, index) => arr.slice(index * chunkSize, (index + 1) * chunkSize));
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const handler = async (m, {
  conn,
  command,
  args,
  text
}) => {
  if (!support.convert && !support.magick && !support.gm) return handler.disabled = true;
  let inputPath = "src/kertas/buku/bl.jpg";
  let folioal = "src/kertas/folio/al.jpg";
  let folioar = "src/kertas/folio/ar.jpg";
  let foliobl = "src/kertas/folio/bl.jpg";
  let foliobr = "src/kertas/folio/br.jpg";
  let bukual = "src/kertas/buku/al.jpg";
  let bukuar = "src/kertas/buku/ar.jpg";
  let bukubl = "src/kertas/buku/bl.jpg";
  let bukubr = "src/kertas/buku/br.jpg";
  let fontPath = "src/font/Zahraaa.ttf";
  let d = new Date();
  let tgl = d.toLocaleDateString("id-Id");
  let hari = d.toLocaleDateString("id-Id", {
    weekday: "long"
  });
  text = (text ? text : m.quoted?.text ? m.quoted?.text : "").trim().match(/.{0,65}/g);
  if (text[0] === "") throw `Mau nulis apa ?`;
  text = await divideArray(text).reverse();
  let teks = text;
  if (command === "nuliskiri") {
    for (let i = 0; i < teks.length; i++) {
      let bufs = [];
      const [_spawnprocess, ..._spawnargs] = [...support.gm ? ["gm"] : support.magick ? ["magick"] : [], "convert", bukual, "-font", fontPath, "-size", "960x1280", "-pointsize", "22", "-interline-spacing", "2", "-annotate", "+140+153", hari, "-font", fontPath, "-size", "1024x784", "-pointsize", "18", "-interline-spacing", "1", "-annotate", "+806+102", tgl, "-font", fontPath, "-size", "1024x784", "-pointsize", "20", "-interline-spacing", "-7.5", "-annotate", "+344+142", teks[i], "jpg:-"];
      spawn(_spawnprocess, _spawnargs).on("error", e => m.reply(format(e))).on("close", async () => {
        await delay(1e3);
        await conn.sendFile(m.chat, Buffer.concat(bufs), "", `Bagian ${i + 1} dari ${teks.length}`, m);
      }).stdout.on("data", chunk => bufs.push(chunk));
    }
  }
  if (command === "nuliskanan") {
    for (let i = 0; i < teks.length; i++) {
      let bufs = [];
      const [_spawnprocess, ..._spawnargs] = [...support.gm ? ["gm"] : support.magick ? ["magick"] : [], "convert", bukuar, "-font", fontPath, "-size", "960x1280", "-pointsize", "23", "-interline-spacing", "2", "-annotate", "+128+129", hari, "-font", fontPath, "-size", "1024x784", "-pointsize", "18", "-interline-spacing", "1", "-annotate", "+806+102", tgl, "-font", fontPath, "-size", "1024x784", "-pointsize", "20", "-interline-spacing", "-7.5", "-annotate", "+344+142", teks[i], "jpg:-"];
      spawn(_spawnprocess, _spawnargs).on("error", e => m.reply(format(e))).on("close", async () => {
        await delay(1e3);
        await conn.sendFile(m.chat, Buffer.concat(bufs), "", `Bagian ${i + 1} dari ${teks.length}`, m);
      }).stdout.on("data", chunk => bufs.push(chunk));
    }
  }
  if (command === "foliokanan") {
    for (let i = 0; i < teks.length; i++) {
      let bufs = [];
      const [_spawnprocess, ..._spawnargs] = [...support.gm ? ["gm"] : support.magick ? ["magick"] : [], "convert", folioal, "-font", fontPath, "-size", "1720x1280", "-pointsize", "23", "-interline-spacing", "4", "-annotate", "+48+185", hari, "-font", fontPath, "-size", "1024x784", "-pointsize", "18", "-interline-spacing", "1", "-annotate", "+806+102", tgl, "-font", fontPath, "-size", "1024x784", "-pointsize", "20", "-interline-spacing", "-7.5", "-annotate", "+344+142", teks[i], "jpg:-"];
      spawn(_spawnprocess, _spawnargs).on("error", e => m.reply(format(e))).on("close", async () => {
        await delay(1e3);
        await conn.sendFile(m.chat, Buffer.concat(bufs), "", `Bagian ${i + 1} dari ${teks.length}`, m);
      }).stdout.on("data", chunk => bufs.push(chunk));
    }
  }
  if (command === "foliokanan") {
    for (let i = 0; i < teks.length; i++) {
      let bufs = [];
      const [_spawnprocess, ..._spawnargs] = [...support.gm ? ["gm"] : support.magick ? ["magick"] : [], "convert", folioar, "-font", fontPath, "-size", "960x1280", "-pointsize", "23", "-interline-spacing", "3", "-annotate", "+89+190", hari, "-font", fontPath, "-size", "1024x784", "-pointsize", "18", "-interline-spacing", "1", "-annotate", "+806+102", tgl, "-font", fontPath, "-size", "1024x784", "-pointsize", "20", "-interline-spacing", "-7.5", "-annotate", "+344+142", teks[i], "jpg:-"];
      spawn(_spawnprocess, _spawnargs).on("error", e => m.reply(format(e))).on("close", async () => {
        await delay(1e3);
        await conn.sendFile(m.chat, Buffer.concat(bufs), "", `Bagian ${i + 1} dari ${teks.length}`, m);
      }).stdout.on("data", chunk => bufs.push(chunk));
    }
  }
};
handler.help = ["nuliskiri", "nuliskanan", "foliokiri", "foliokanan"].map(v => v + " <teks>");
handler.tags = ["maker"];
handler.command = /^(foliok(anan|iri)|nulisk(anan|iri))$/i;
export default handler;