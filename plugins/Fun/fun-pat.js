import {
  sticker
} from "../../lib/sticker.js";
import fetch from "node-fetch";
const handler = async (m, {
  conn
}) => {
  try {
    m.quoted?.sender && m.mentionedJid.push(m.quoted?.sender), m.mentionedJid.length || m.mentionedJid.push(m.sender);
    let res = await fetch("https://api.waifu.pics/sfw/pat"),
      json = await res.json(),
      {
        url
      } = json,
      stiker = await sticker(null, url, `+${m.sender.split("@")[0]} patted on ${m.mentionedJid.map(user => user === m.sender ? "alguien " : `+${user.split("@")[0]}`).join(", ")}`);
    await conn.sendFile(m.chat, stiker, null, {
      asSticker: !0
    });
  } catch (e) {}
};
handler.command = /^(pat)$/i;
export default handler;