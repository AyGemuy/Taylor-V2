import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    let anu = await fetch("https://candaan-api.vercel.app/api/image"),
      json = await anu.json(),
      fimg = await fetch(json.data[Math.floor(Math.random() * json.data.length)].url),
      fimgb = Buffer.from(await fimg.arrayBuffer());
    if (Buffer.byteLength(fimgb) < 22e3) throw new e();
    await conn.sendFile(m.chat, fimgb, "", "[ RANDOM - " + command.toUpperCase() + " ]", m);
  } catch (e) {
    try {
      let anu = await fetch("https://candaan-api.vercel.app/api/image/random"),
        json = await anu.json(),
        fimg = await fetch(json.data.url),
        fimgb = Buffer.from(await fimg.arrayBuffer());
      if (Buffer.byteLength(fimgb) < 22e3) throw new e();
      await conn.sendFile(m.chat, fimgb, "", "[ RANDOM - " + command.toUpperCase() + " ]", m);
    } catch (e) {
      try {
        let fimg = await fetch("https://api.lolhuman.xyz/api/meme/memeindo?apikey=" + Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1]),
          fimgb = Buffer.from(await fimg.arrayBuffer());
        if (Buffer.byteLength(fimgb) < 22e3) throw new e();
        await conn.sendFile(m.chat, fimgb, "", "[ RANDOM - " + command.toUpperCase() + " ]", m);
      } catch (e) {
        m.reply("Terjadi kesalahan, coba lagi nanti.");
      }
    }
  }
};
handler.help = ["meme"], handler.tags = ["entertainment"], handler.command = /^((random)?meme)$/i,
  handler.premium = !1, handler.limit = !0;
export default handler;