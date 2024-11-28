import fetch from "node-fetch";
const winScore = (Math.random() * 5001 + 5e3) | 0;
async function handler(m) {
  let imgr = flaaa.getRandom();
  db.data.game.familygame = db.data.game.familygame
    ? db.data.game.familygame
    : {};
  let id = "family100_" + m.chat;
  if (id in db.data.game.familygame)
    return (
      await conn.reply(
        m.chat,
        "Masih ada kuis yang belum terjawab di chat ini",
        db.data.game.familygame[id].msg,
      ),
      !1
    );
  const json = await family100();
  let caption =
    `\n*Soal:* ${json.soal}\nTerdapat *${json.jawaban.length}* jawaban${json.jawaban.find((v) => v.includes(" ")) ? "\n(beberapa jawaban terdapat spasi)\n" : ""}\n+((Math.random() * 5001 + 5000) | 0) XP tiap jawaban benar\n    `.trim();
  db.data.game.familygame[id] = {
    id: id,
    msg: await this.sendFile(m.chat, imgr + "Family100", "", caption, m),
    ...json,
    terjawab: Array.from(json.jawaban, () => !1),
    winScore: (Math.random() * 5001 + 5e3) | 0,
  };
}
(handler.help = ["family100"]),
  (handler.tags = ["game"]),
  (handler.command = /^family100$/i);
export default handler;
let family100json;
async function family100() {
  if (!family100json) {
    const response = await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json",
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch family100 data: ${response.statusText}`);
    }
    family100json = await response.json();
  }
  const randomIndex = Math.floor(Math.random() * family100json.length);
  return family100json[randomIndex];
}
