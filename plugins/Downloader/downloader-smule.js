import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `*Usage : ${usedPrefix + command} smule_url_media*\n\nExample :\n${usedPrefix + command} https://www.smule.com/recording/lewis-capaldi-someone-you-loved/2027750707_2937753991`;
  if (!text.includes("http://") && !text.includes("https://")) throw "url invalid, please input a valid url. Try with add http:// or https://";
  try {
    let anu = await fetch(`https://api.lolhuman.xyz/api/smule?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      ini_txt = `*[ PILIH FORMAT MEDIA ]*\n\n_${(await anu.json()).result.title}_\n\nKetik *${usedPrefix}smulemp3* atau *${usedPrefix}smulemp4* apabila tombol tidak muncul/berfungsi.\n`;
    await conn.reply(m.chat, ini_txt, m);
  } catch (e) {
    console.log(e), m.reply("Invalid Smule url.");
  }
};
handler.menu = ["smule <url>"], handler.tags = ["search"], handler.command = /^(smule(play|search)?)$/i,
  handler.limit = !0;
export default handler;