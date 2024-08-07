import {
  Sticker
} from "wa-sticker-formatter";
const handler = async (m, {
  conn,
  args,
  text
}) => {
  const arr = ["atas", "bawah"];
  if (!arr.includes(args[0])) throw "Input atas/bawah";
  const terbang = arr.getRandom(),
    res = "atas" === terbang ? "https://cdn-icons-png.flaticon.com/512/1490/1490832.png" : "https://cdn-icons-png.flaticon.com/512/4315/4315581.png",
    coins = parseInt(Math.floor(1e5 * Math.random())),
    exp = parseInt(Math.floor(1e4 * Math.random())),
    player = db.data.users[m.sender];
  try {
    const stiker = await (async (img, url, packName, authorName, quality) => new Sticker(img || url, {
        type: "full",
        pack: packName,
        author: authorName,
        quality: quality
      }).toBuffer())(!1, res, "atas" === terbang ? "WINNER" : "LOSE", "COINFLIP", 30),
      pesan = `\n*[ ${"atas" === terbang ? "WIN" : "LOSE"} ]*\n\n${"atas" === terbang ? "Anda Mendapatkan:" : "Inventory Berkurang:"}\n${new Intl.NumberFormat("en-US").format(coins)} Money\n${new Intl.NumberFormat("en-US").format(exp)} XP\n`;
    m.reply(stiker).then(async () => {
      setTimeout(async () => {
        await conn.reply(m.chat, pesan, m);
      }, 3e3);
    }), "atas" === terbang ? (player.money += coins, player.exp += exp, db.data.users[m.sender].tiketcoin += 1) : "bawah" === terbang && (player.money -= coins, player.exp -= exp, db.data.users[m.sender].tiketcoin -= 1);
  } catch (error) {
    console.log(error), m.reply("Terjadi kesalahan saat melakukan operasi");
  }
};
handler.help = ["coin", "koin"].map(v => v + "flip"), handler.tags = ["fun"],
  handler.command = /^((coin|koin)?flip)$/i;
export default handler;