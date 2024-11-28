import fetch from "node-fetch";
import fs from "fs";
export async function all(m) {
  if (!this || m.isBaileys || m.chat?.endsWith("broadcast") || !m.sender)
    return;
  try {
    const stickerFiles = fs
      .readdirSync("./sticker/")
      .filter((file) => file.startsWith("ynkts") && file.endsWith(".webp"));
    const randomStickerIndex = Math.floor(Math.random() * stickerFiles.length);
    const stc = fs.readFileSync(
      `./sticker/${stickerFiles[randomStickerIndex]}`,
    );
    if (
      m.isGroup &&
      /^(what|who|why|when|where|how|apa|dimana|kapan|siapa|mengapa|bagaimana)$/.test(
        m.text.toLowerCase(),
      )
    ) {
      await this.reply(m.chat, stc, m, adReply);
      return;
    }
  } catch (e) {
    console.error(e);
  }
}
