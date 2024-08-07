import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, {
  conn,
  args,
  command,
  usedPrefix
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    const res = await FreePik(text);
    if (!res || !res.data || res.data.length === 0) {
      return m.reply("Not found...");
    }
    const randomItem = _.sample(res.data);
    await conn.ctaButton.setBody(`*[ RESULT ]*\n${randomItem.title || randomItem.filename}`).setImage(randomItem.url).setFooter('Klik "Next" untuk mencari lainnya').addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["freepik"];
handler.tags = ["internet"];
handler.command = /^freepik$/i;
export default handler;
async function FreePik(term) {
  try {
    const freePikUrl = `https://api.freepik.com/v1/resources?locale=id-ID&limit=10&order=latest&term=${term}`;
    const response = await fetch(freePikUrl, {
      headers: {
        "X-Freepik-API-Key": _.sample(["FPSX57a44ddb3d984db48bbdefd5965cc978", "FPSX7f2f0ad461c54eeab3e477a4e85443e2"])
      }
    });
    return await response.json();
  } catch (e) {
    console.error("Error fetching FreePik data:", e);
    throw e;
  }
}