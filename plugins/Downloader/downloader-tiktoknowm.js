import fetch from "node-fetch";
import axios from "axios";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  if (!args[0]) throw "Masukkan Link";
  try {
    let listSections = [];
    if (listSections.push(["No. " + ++index, [
        ["Metode A", usedPrefix + command + " " + args[0] + " a", "\n⌚ *By:* " + author],
        ["Metode B", usedPrefix + command + " " + args[0] + " b", "\n⌚ *By:* " + author],
        ["Metode C", usedPrefix + command + " " + args[0] + " c", "\n⌚ *By:* " + author]
      ]]), args[0]) return conn.sendList(m.chat, htki + " 📺 Tiktok Search 🔎 " + htka, `⚡ Silakan pilih Tiktok Search di tombol di bawah...\n*Teks yang anda kirim:* ${args[0]}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Tiktok Search Disini ☂️", listSections, m);
    if ("a" === args[1]) {
      let res = await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${args[0]}`),
        json = await res.json(),
        txt = `🚀 *Link:* ${await (await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)).data}`;
      await conn.sendFile(m.chat, json.result.link, "", txt, m);
    }
    if ("b" === args[1]) {
      let res = await fetch(`https://api.lolhuman.xyz/api/tiktok2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${args[0]}`),
        json = await res.json(),
        txt = `🚀 *Link:* ${await (await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)).data}`;
      await conn.sendFile(m.chat, json.result.link, "", txt, m);
    }
    if ("c" === args[1]) {
      let res = await fetch(`https://api.lolhuman.xyz/api/tiktok3?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${args[0]}`),
        json = await res.json(),
        txt = `🚀 *Link:* ${await (await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)).data}`;
      await conn.sendFile(m.chat, json.result.link, "", txt, m);
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["tiktoknowm"].map(v => v + " <url>"), handler.tags = ["downloader", "premium"],
  handler.command = /^(tiktoknowm)$/i, handler.premium = !1;
export default handler;