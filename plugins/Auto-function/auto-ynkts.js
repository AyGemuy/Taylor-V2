import fetch from "node-fetch";
import fs from "fs";
export async function all(m) {
  if (this && !m.isBaileys && !m.chat?.endsWith("broadcast") && m.sender) try {
    let pp = await this.profilePictureUrl(m.sender, "image").catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png"),
      stc = await fs.promises.readFile(`./sticker/ynkts${pickRandom(1, 9)}.webp`);
    /^(what|who|why|when|where|how|apa|dimana|kapan|siapa|mengapa|bagaimana)$/i.test(m.text) && m.isGroup && await this.reply(m.chat, stc, m, adReply);
  } catch (e) {
    console.error(e);
  }
}

function pickRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}