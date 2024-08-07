import fetch from "node-fetch";
import bo from "dhn-api";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  try {
    m.react(wait);
    const joke = await bo.Darkjokes();
    const message = `*[ DARKJOKE ]*\nPermintaan oleh:\n${m.name}`;
    await conn.ctaButton.setBody(`${message}\nGelap Banget Kek Hidup Kamu`).setFooter('Klik "Next" untuk mendapatkan joke lain').setImage(joke).addReply("Next", usedPrefix + command).run(m.chat, conn, m);
  } catch (err) {
    console.error("Error:", err);
    m.react(eror);
  }
};
handler.help = ["darkjoke"];
handler.tags = ["fun"];
handler.command = /^(darkjoke)$/i;
export default handler;