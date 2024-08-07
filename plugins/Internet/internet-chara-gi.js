import genshin from "genshin";
const handler = async (m, {
  text
}) => {
  let list = ["amber", "ayaka", "baizhu", "barbara", "beidou", "bennett", "childe", "chongyun", "cyno", "dainsleif", "diluc", "diona", "fischl", "ganyu", "jean", "kaeya", "keqing", "klee", "lisa", "mona", "ningguang", "noelle", "qiqi", "razor", "sucrose", "venti", "xiangling", "xiao", "xingqiu", "xinyan", "zhongli"];
  if (!list.includes(text.toLowerCase())) return m.reply("*List Chara GI:*\n\n" + list.map(v => v).join("\n"));
  let chara = await genshin.characters(text.toLowerCase()),
    {
      name,
      quote,
      cv,
      description,
      image,
      city,
      element,
      weapon,
      rating
    } = chara,
    capt = `\n👤 *Name:* ${name}\n🌏 *CV:* ${cv}\n🏢 *City:* ${city}\n♨️ *Element:* ${element}\n📛 *Weapon:* ${weapon}\n⭐ *Rating:* ${rating}\n📝 *Quote:* ${quote}\n📮 *Description:*\n${description}\n`.trim();
  await conn.sendFile(m.chat, image, "gi.jpg", capt, m);
};
handler.help = ["charagi"], handler.command = /^chara(gi|genshin)?$/i, handler.tags = ["internet"],
  handler.limit = !0;
export default handler;