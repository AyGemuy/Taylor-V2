import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `*Usage : ${usedPrefix + command} smule_url_media*\n\nExample :\n${usedPrefix + command} https://www.smule.com/recording/lewis-capaldi-someone-you-loved/2027750707_2937753991`;
  if (!text.includes("http://") && !text.includes("https://")) throw "url invalid, please input a valid url. Try with add http:// or https://";
  command = command.toLowerCase();
  try {
    let anu = await fetch(`https://api.lolhuman.xyz/api/smule?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      json = await anu.json();
    command.includes("mp3") ? await conn.sendMessage(m.chat, {
      document: {
        url: json.result.audio
      },
      mimetype: "audio/mpeg",
      fileName: `${json.result.title}.mp3`
    }, {
      quoted: m
    }) : await conn.sendMessage(m.chat, {
      audio: {
        url: json.result.audio
      },
      mimetype: "audio/mp4"
    }, {
      quoted: m
    });
  } catch (e) {
    console.log(e), m.reply("Invalid Smule url.");
  }
};
handler.menu = ["smuleaudio <url>"], handler.tags = ["search"], handler.command = /^(smule(mp3|a(udio)?))$/i,
  handler.premium = !0, handler.limit = !0;
export default handler;