import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    const res = await fetch("https://api.waifu.pics/sfw/waifu");
    if (!res.ok) throw "Error fetching data!";
    const json = await res.json();
    json.url ? await conn.sendButton(m.chat, "- W A I F U -", wm, json.url, [
      ["Next", usedPrefix + command]
    ], m) : await conn.reply(m.chat, "No URL found.", m);
  } catch (err) {
    console.error(err), await conn.reply(m.chat, "An error occurred.", m);
  }
};
handler.help = ["waifu"], handler.tags = ["internet"], handler.command = /^(waifu)$/i;
export default handler;