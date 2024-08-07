import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Example: ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`;
  if (!text.includes("http://") && !text.includes("https://")) return m.reply("url invalid, please input a valid url. Try with add http:// or https://");
  if (!text.includes("tiktok.com")) return m.reply("Invalid Tiktok URL.");
  try {
    let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      anu = await res.json();
    if ("200" != anu.status) throw Error(anu.message);
    if (anu = anu.result, 0 === anu.length) throw Error("Error : no data");
    let c = 0;
    for (let x of anu) 0 === c ? await conn.sendMessage(m.chat, {
      image: {
        url: x
      },
      caption: `Mengirim 1 dari ${anu.length} slide gambar.\n_(Sisanya akan dikirim via chat pribadi.)_`
    }, {
      quoted: m
    }) : await conn.sendMessage(m.sender, {
      image: {
        url: x
      }
    }, {
      quoted: m
    }), c += 1;
  } catch (e) {
    throw console.log(e), "invalid slideshow url / media isn't available.";
  }
};
handler.menu = ["tiktokslide <url>"], handler.tags = ["search"], handler.command = /^((tt|tiktok)slide)$/i,
  handler.premium = !0, handler.limit = !0;
export default handler;