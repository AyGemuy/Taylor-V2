import fetch from "node-fetch";
const artinama_api = [
    ["xteam", "/primbon/artinama", "q", "APIKEY", json => {
      if (!json.status) throw json;
      return `\n*Nama:* ${json.result.nama}\n*Arti:* ${json.result.arti}\n\n*Makna:* ${json.result.maksud}\n`.trim();
    }],
    ["https://scrap.terhambar.com", "/nama", "n", null, json => {
      if (!json.status) throw json;
      return `\n*Arti:* ${json.result.arti}\n`.trim();
    }]
  ],
  handler = async (m, {
    conn,
    usedPrefix,
    args,
    command
  }) => {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    let result = "";
    for (let [origin, pathname, query, apikey, fn] of artinama_api) try {
      let res = await fetch(API(origin, pathname, {
        [query]: text
      }, apikey));
      if (!res.ok) throw res.text();
      let json = await res.json();
      result = await fn(json);
      break;
    } catch (e) {
      m.reply("Load..");
    }
    await conn.reply(m.chat, result, m);
  };
handler.help = ["artinama2"].map(v => v + " [nama]"), handler.tags = ["kerang"],
  handler.command = ["artinama2"];
export default handler;