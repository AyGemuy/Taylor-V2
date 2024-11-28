import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    m.react(wait);
    let url, bodyText;
    if (command === "renungan") {
      url =
        "https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/renungan.json";
      bodyText = "🌼 *RENUNGAN* 🌼\n\n";
    } else if (command === "gombalan") {
      url =
        "https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/gombalan.json";
      bodyText = "💘 *GOMBALAN* 💘\n\n";
    } else {
      return;
    }
    const res = await fetch(url);
    const data = await res.json();
    const json = _.sample(data);
    await conn.ctaButton
      .setBody(bodyText + json)
      .setFooter('Klik "Next" untuk mendapatkan konten lainnya')
      .addReply("Next", usedPrefix + command)
      .run(m.chat, conn, m);
  } catch (error) {
    console.error(error);
    m.react(error);
  }
};
handler.command = handler.help = ["renungan", "gombalan"];
handler.tags = ["fun"];
export default handler;
