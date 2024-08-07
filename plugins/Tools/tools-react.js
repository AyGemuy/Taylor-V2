import emojiRegex from "emoji-regex";
const handler = async (m, {
  conn,
  usedPrefix: _p,
  args,
  text,
  usedPrefix
}) => {
  try {
    const defaultEmojis = emojis;
    const regex = emojiRegex();
    const result = regex.test(text) && text.length <= 2 ? text : null;
    if (!result) return m.reply(`📍 Contoh Penggunaan :\n${usedPrefix}react ${defaultEmojis}`);
    m.quoted?.react(result || defaultEmojis) ?? m.react(result || defaultEmojis);
  } catch (error) {
    console.error("Error handling reaction:", error);
  }
};
handler.help = ["react <emoji>"];
handler.tags = ["tools"];
handler.command = /^(reac(tions|(t(ion)?)?)|addreact)$/i;
export default handler;