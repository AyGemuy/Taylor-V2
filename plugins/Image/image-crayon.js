import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  }
  try {
    m.react(wait);
    const images = await CraYon(text);
    const base64Data = ("data:image/webp;base64," + pickRandom(images)).replace(/^data:image\/webp;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    await conn.ctaButton.setBody(`*[ Result ]*\n${text}`).setImage(buffer).setFooter('Klik "Next" untuk mencoba lagi').addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    console.error("Error:", e);
    m.react(eeor);
  }
};
handler.help = ["crayon"];
handler.tags = ["internet"];
handler.command = /^crayon$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
async function CraYon(query) {
  try {
    const res = await fetch(`${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}${encodeURIComponent("https://backend.craiyon.com/generate")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: query
      })
    });
    if (!res.ok) throw new Error("Network response was not ok.");
    const json = await res.json();
    return json.images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}