import {
  stickerLine
} from "@bochilteam/scraper";
const handler = async (m, {
  text,
  args
}) => {
  try {
    if (!text) throw "*Masukkan link*\nExample: https://store.line.me/stickershop/product/2821/en";
    const json = await stickerLine(args[0]),
      listMessage = Object.values(json).map((v, index) => `✨ *Title*: ${index + v.title}\n🔗 *Link*: ${v.sticker}\n`).join("\n");
    m.reply(`*⭐ Sticker Line Search Result ⭐*\n\n${listMessage}`);
  } catch (e) {
    m.reply("Error.");
  }
};
handler.help = ["linestick"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^(s((ti(cker|k)lines|linedl)|ti(cker|k)line)|linesti(ck(dl|er)|k))$/i,
  handler.exp = 0, handler.register = !1, handler.limit = !0;
export default handler;