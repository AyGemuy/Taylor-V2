import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    m.react(wait);
    const res = await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/renungan.json");
    const data = await res.json();
    const json = _.sample(data);
    await conn.ctaButton.setBody("🌼 *RENUNGAN* 🌼\n\n" + json).setFooter('Klik "Next" untuk mendapatkan renungan lainnya').addReply("Next", usedPrefix + command).run(m.chat, conn, m);
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.command = handler.help = ["renungan"];
handler.tags = ["fun"];
export default handler;