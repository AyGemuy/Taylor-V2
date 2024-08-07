import fetch from "node-fetch";
import {
  Sticker
} from "wa-sticker-formatter";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who)),
    urut = text.split("|");
  urut[0], urut[1];
  if ("nhentai" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} 344253`;
    try {
      let gas = await fetch(`https://api.lolhuman.xyz/api/nhentai/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
        json = await gas.json(),
        hasil = json.result.image,
        row = Object.keys(hasil).map((v, index) => ({
          title: index + json.result.title_native,
          description: `\n*Color:* ${json.result.title_romaji}\n*Slug:* ${json.result.read}\n*Description:* ${Array.from(json.result.tags)}\n*Image:* ${hasil[v]}`,
          rowId: usedPrefix + "get " + hasil[v]
        })),
        button = {
          buttonText: `☂️ ${command} Disini ☂️`,
          description: `⚡ ${name} Silakan pilih ${command} di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
          footerText: wm
        };
      return await conn.sendList(m.chat, button, row);
    } catch (e) {
      return m.reply("Error kan");
    }
  }
  if ("nhentaipdf" === command) {
    if (!text) throw "Masukkan Kode Hentai";
    let tobat = "https://pdf.lolhuman.xyz/download/" + text + ".pdf";
    await conn.sendMessage(m.chat, {
      document: {
        url: tobat
      },
      mimetype: "application/pdf",
      fileName: `${text}.pdf`
    }, {
      quoted: fakes
    });
  }
  if ("gosearch" === command) {
    let url = "https://ddg-webapp-aagd.vercel.app/search?max_results=1&q=" + text,
      res = await fetch(url),
      json = await res.json();
    m.reply(`*Judul:*\n${json.title}\n\n${json.body}\n\n*Sumber:*\n${json.href}`);
  }
  if ("wikisearch" === command) {
    let res = await fetch("https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + text + "&format=json"),
      json = await res.json(),
      results = Object.values(json.query.search).map(v => `*Title:*\n${v.title}\n*Snippet:*\n${v.snippet}\n*Time:*\n${v.timestamp}`);
    m.reply(results.join("\n"));
  }
};
handler.command = handler.help = ["nhentaipdf", "gosearch", "wikisearch"], handler.tags = ["internet"];
export default handler;