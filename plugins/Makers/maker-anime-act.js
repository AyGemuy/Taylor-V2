import fetch from "node-fetch";
import { sticker } from "../../lib/sticker.js";
const actions = [
  "waifu",
  "neko",
  "shinobu",
  "megumin",
  "bully",
  "cuddle",
  "cry",
  "hug",
  "awoo",
  "kiss",
  "lick",
  "pat",
  "smug",
  "bonk",
  "yeet",
  "blush",
  "smile",
  "wave",
  "highfive",
  "handhold",
  "nom",
  "bite",
  "glomp",
  "slap",
  "kill",
  "kick",
  "happy",
  "wink",
  "poke",
  "dance",
  "cringe",
  "trap",
  "blowjob",
];
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let who;
  if (
    ((who = m.isGroup
      ? m.mentionedJid[0]
        ? m.mentionedJid[0]
        : !!m.quoted && m.quoted?.sender
      : m.chat),
    !who)
  ) {
    m.reply(
      `✳️ Tag or mention someone\n\n📌 Example: ${usedPrefix + command} @tag`,
    );
    return;
  }
  db.data.users[who];
  let name = conn.getName(who),
    name2 = m.name;
  m.react(wait);
  const action = command.replace("anime", "");
  if (!actions.includes(action)) {
    m.reply(`Invalid action. Available: ${actions.join(", ")}`);
    return;
  }
  try {
    let response = await fetch(`https://api.waifu.pics/sfw/${action}`);
    if (!response.ok) {
      m.reply(`Failed to fetch image for action: ${action}`);
      return;
    }
    let { url } = await response.json();
    let stiker = await sticker(null, url, `(${name2}) ${action}`, `${name}`);
    await conn.sendFile(m.chat, stiker, `${action}.webp`, "", m, null, {
      asSticker: true,
    });
    m.reply(`🗡️ ${action} action performed!`);
  } catch (error) {
    m.react(eror);
    console.log(`An error occurred: ${error.message}`);
  }
};
handler.help = actions.map((action) => `anime${action} @tag`);
handler.tags = ["anime"];
handler.command = new RegExp(`^anime(${actions.join("|")})$`, "i");
handler.diamond = true;
handler.group = true;
export default handler;
