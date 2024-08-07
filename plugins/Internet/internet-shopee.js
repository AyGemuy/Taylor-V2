import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  if (!text) throw `Contoh penggunaan ${usedPrefix}${command} japan`;
  let f = await fetch(`https://api.lolhuman.xyz/api/shopee?apikey=sonelganz&query=${text}`),
    xx = await f.json(),
    str = xx.result.map((v, index) => `${1 + index}. *${v.name}*\n\n💰 *Price:* *RP* ${v.price}\n🛒 *Sold:* ${v.sold}\n📦 *Stock:* ${v.stock}\n📍 *Shop Location:* ${v.shop_loc}\n\n🔗 *Product Link:*\n${v.link_produk}\n🖼️ *Image Cover:*\n${v.image_cover}\n\n📝 *Description:* ${v.desc}\n${cmenua}\n`.trim()).join(`\n\n*${htki} SHOPEE ${htka}*\n\n`);
  await conn.sendFile(m.chat, xx.result[0]?.image_cover, "", str, m);
};
handler.help = ["shopii"].map(v => v + " <app>"), handler.command = ["shopii"],
  handler.tags = ["internet"];
export default handler;