import fetch from "node-fetch";
import {
  JSDOM
} from "jsdom";
import _ from "lodash";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks untuk dicari ikon.\nContoh penggunaan:\n*${usedPrefix}${command} contoh*`);
  try {
    m.react(wait);
    const res = await FlatIcon(text);
    if (!res || res.length === 0) {
      return m.reply("Tidak ditemukan ikon.");
    }
    const rdm = _.sample(res);
    await conn.ctaButton.setBody("*[ Hasil Icon ]*").setImage(rdm).setFooter('Klik "Next" untuk mencari lainnya').addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["flaticon"];
handler.tags = ["internet"];
handler.command = /^flaticon$/i;
export default handler;
async function FlatIcon(query) {
  try {
    const res = await fetch(`https://www.flaticon.com/free-icons/${query}`);
    const html = await res.text();
    const collection = new JSDOM(html).window.document.querySelectorAll(".icon--item");
    const img = Array.from(collection).map(element => element.getAttribute("data-png"));
    return img.filter(el => el != null);
  } catch (error) {
    console.error("Error fetching FlatIcon data:", error);
    throw error;
  }
}