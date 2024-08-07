import {
  FontList,
  FontListV2
} from "../../lib/fancy-text.js";
const handler = async (m, {
  conn,
  command,
  text
}) => {
  if (conn.temafont = conn.temafont || null, text) {
    const themeIndex = parseInt(text);
    if (isNaN(themeIndex)) {
      const fontList = await getFontList();
      return void await conn.sendMessage(m.chat, {
        text: `Input tidak valid. Silakan pilih tema dari daftar berikut:\n${fontList.map((v, i) => `*${i + 1}.* ${v.text} - ${v.name}`).join("\n")}`
      }, {
        quoted: m
      });
    }
    conn.temafont = 0 === themeIndex ? null : themeIndex, await conn.reply(m.chat, `Tema berhasil diatur\n${themeIndex}`, m);
  } else {
    const fontList = await getFontList();
    await conn.sendMessage(m.chat, {
      text: `Input tidak valid. Silakan pilih tema dari daftar berikut:\n${fontList.map((v, i) => `*${i + 1}.* ${v.text} - ${v.name}`).join("\n")}`
    }, {
      quoted: m
    });
  }
};
handler.help = ["temafont"], handler.tags = ["owner"], handler.command = /^(temafont)$/i,
  handler.owner = !0;
export default handler;
const getFontList = async () => {
  try {
    return await FontListV2();
  } catch (error) {
    try {
      return await FontList("Example");
    } catch (error) {
      console.log("Error");
    }
  }
};