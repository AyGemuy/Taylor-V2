import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) throw "Masukkan teks, Ex. Animal";
  let su = await fetch("https://api.publicapis.org/entries?title=" + text),
    sul = await su.json();
  0 === sul.count && m.react(eror);
  let listSections = [];
  return Object.values(sul.entries).map((v, index) => {
    let des = `\n\n\n*API:* ${v.API}\n*Description:* ${v.Description}\n*Auth:* ${v.Auth}\n*HTTPS:* ${v.HTTPS}\n*Cors:* ${v.Cors}\n*Link:* ${v.Link}\n*Category:* ${v.Category}\n`;
    listSections.push([++index + " " + cmenub + " " + v.API, [
      ["Get Test", usedPrefix + "get " + v.Link, des]
    ]]);
  }), conn.sendList(m.chat, htki + " 📺 Public Api Search 🔎 " + htka, `⚡ Silakan pilih Public Api Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Public Api Search Disini ☂️", listSections, m);
};
handler.help = ["publicapi"], handler.tags = ["internet"], handler.command = /^publicapi$/i;
export default handler;