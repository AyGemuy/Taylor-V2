import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let urut = text.split("|"),
    one = urut[1],
    two = urut[2];
  urut[3];
  if ("animechan" === command) {
    let f = await fetch("https://animechan.vercel.app/api/random"),
      x = await f.json(),
      caption = `*Quotes:* ${x.quote}\n\n*Anime:* ${x.anime}\n*Character:* ${x.character}`;
    await conn.sendButton(m.chat, caption, wm, null, [
      ["Next", `${usedPrefix + command}`]
    ], m);
  }
  if ("isgd" === command) {
    if (!text) throw `Teks Mana?\nContoh: ${usedPrefix + command} https://google.com`;
    let f = await fetch(`https://is.gd/create.php?format=json&url=${text}`),
      caption = `*Shorturl:* ${(await f.json()).shorturl}`;
    await conn.sendButton(m.chat, caption, wm, null, [
      ["Next", `${usedPrefix + command}`]
    ], m);
  }
  if ("resmush" === command) {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime) throw "Fotonya Mana?";
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`;
    let img = await q?.download(),
      url = await uploadImage(img),
      f = await fetch(`http://api.resmush.it/ws.php/?img=${url}`),
      x = await f.json(),
      caption = `*Src:* ${x.src}\n*Size:* ${x.src_size}\n\n*Dest:* ${x.dest}\n*Size:* ${x.dest_size}\n\n*Percent:* ${x.percent}\n*Expires:* ${x.expires}`;
    await conn.sendButton(m.chat, caption, wm, x.dest, [
      ["Get Img", `${usedPrefix}get ${x.dest}`]
    ], m);
  }
  if ("toascii" === command) {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime) throw "Fotonya Mana?";
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`;
    let img = await q?.download(),
      url = await uploadImage(img),
      f = await fetch(`https://process.filestackapi.com/A7lMmfpoSTu3i5i7yBXeQz/ascii=colored:true/${url}`),
      caption = `*Jadikan File HTML*\n\n${await f.text()}`;
    m.reply(caption);
  }
  if ("dlytmp3" === command || "dlytmp4" === command) {
    if (!text) throw "Url Mana?";
    let type = "3" === command.slice(-2) ? "ytmp3" : "ytmp4",
      f = await fetch(`https://api.webraku.xyz/api/${type}?url=${text}&apikey=Nathan`),
      r = (await f.json()).result,
      caption = `*Title:* ${r.title}\n*Size:* ${r.size}\n*View:* ${r.views}\n*Like:* ${r.likes}\n*Dislike:* ${r.dislike}\n*Channel:* ${r.channel}\n*Upload:* ${r.uploadDate}\n*Desc:* ${r.desc}`;
    await conn.sendButton(m.chat, caption, wm, r.thumb, [
      ["Get", `${usedPrefix}get ${r.result}`]
    ], m);
  }
  if ("mcskin" === command) {
    if (!args[0] && !one && !two) throw `Contoh:\n${usedPrefix + command} .mcskin stone |atas|bawah`;
    let res = await mcskin(args[0], one, two);
    await conn.sendFile(m.chat, res, "image.png", "Your Text: \n" + one + " " + two, m);
  }
};
handler.command = handler.help = ["", "readqr", "scanqr", "animechan", "isgd", "resmush", "toascii", "dlytmp3", "dlytmp4", "mcskin"],
  handler.tags = ["tools"];
export default handler;

function mcskin(teks, atas, bawah) {
  let link;
  return "stone" === teks && (link = `https://minecraftskinstealer.com/achievement/20/${atas}/${bawah}`), "grass" === teks && (link = `https://minecraftskinstealer.com/achievement/1/${atas}/${bawah}`), "craftingtable" === teks && (link = `https://minecraftskinstealer.com/achievement/13/${atas}/${bawah}`), "furnace" === teks && (link = `https://minecraftskinstealer.com/achievement/18/${atas}/${bawah}`), "coal" === teks && (link = `https://minecraftskinstealer.com/achievement/31/${atas}/${bawah}`), "iron" === teks && (link = `https://minecraftskinstealer.com/achievement/22/${atas}/${bawah}`), "gold" === teks && (link = `https://minecraftskinstealer.com/achievement/23/${atas}/${bawah}`), "diamond" === teks && (link = `https://minecraftskinstealer.com/achievement/2/${atas}/${bawah}`), "redstone" === teks && (link = `https://minecraftskinstealer.com/achievement/14/${atas}/${bawah}`), "diamond-sword" === teks && (link = `https://minecraftskinstealer.com/achievement/3/${atas}/${bawah}`), "tnt" === teks && (link = `https://minecraftskinstealer.com/achievement/6/${atas}/${bawah}`), "cookie" === teks && (link = `https://minecraftskinstealer.com/achievement/7/${atas}/${bawah}`), "cake" === teks && (link = `https://minecraftskinstealer.com/achievement/10/${atas}/${bawah}`), "creeper" === teks && (link = `https://minecraftskinstealer.com/achievement/4/${atas}/${bawah}`), "pig" === teks && (link = `https://minecraftskinstealer.com/achievement/5/${atas}/${bawah}`), "heart" === teks && (link = `https://minecraftskinstealer.com/achievement/8/${atas}/${bawah}`),
    link;
}