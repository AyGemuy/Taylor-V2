import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["google", "unsplash"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.kapwing google|cars\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("google" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .kapwing google|cars");
      m.react(wait);
      try {
        let outs = Random((await getImageResults(inputs)).google),
          teks = `*[ Name ]*\n${outs.name}\n\n*[ Type ]*\n${outs.type}`;
        await conn.sendFile(m.chat, outs.url, "", teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("unsplash" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .kapwing google|cars");
      m.react(wait);
      try {
        let outs = Random((await getImageResults(inputs)).unsplash),
          teks = `*[ Name ]*\n${outs.name}\n\n*[ Type ]*\n${outs.type}`;
        await conn.sendFile(m.chat, outs.images.large, "", teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["kapwing type query"], handler.tags = ["internet"], handler.command = /^(kapwing)$/i;
export default handler;
async function getImageResults(query) {
  const response = await fetch("https://us-central1-kapwing-181323.cloudfunctions.net/image_search", {
    method: "POST",
    body: JSON.stringify({
      query: query
    }),
    headers: {
      "content-type": "application/json",
      referer: "https://www.kapwing.com/studio/editor/overlay/search",
      origin: "https://www.kapwing.com",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36"
    }
  });
  return await response.json();
}

function Random(array) {
  return array[Math.floor(Math.random() * array.length)];
}