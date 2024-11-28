import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  [
    "37i9dQZEVXbObFQZ3JLcXt",
    "37i9dQZEVXbMDoHDwVN2tF",
    "37i9dQZF1DXa2EiKmMLhFD",
    "37i9dQZF1DXdHrK6XFPCM1",
    "3AaKHE9ZMMEdyRadsg8rcy",
    "4mFuArYRh3SO8jfffYLSER",
  ].getRandom();
  let imgr = flaaa.getRandom();
  db.data.game.tebaklagu = db.data.game.tebaklagu ? db.data.game.tebaklagu : {};
  let id = m.chat;
  if (id in db.data.game.tebaklagu)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebaklagu[id][0],
      ),
      !1
    );
  try {
    let ress = await fetch(
        "https://raw.githubusercontent.com/qisyana/scrape/main/tebaklagu.json",
      ),
      data = await ress.json(),
      json = data[Math.floor(Math.random() * data.length)],
      caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Penyanyi nya \`${json.artis}\` sebutkan nama lagu nya.
*Clue:*
- ${"```" + json.judul.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
    (db.data.game.tebaklagu[id] = [
      await conn.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      }),
      json,
      poin,
      setTimeout(async () => {
        db.data.game.tebaklagu[id] &&
          (await conn.reply(
            m.chat,
            `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.judul}*`,
            db.data.game.tebaklagu[id][0],
          )),
          delete db.data.game.tebaklagu[id];
      }, timeout),
    ]),
      await conn.sendMessage(
        m.chat,
        {
          audio: {
            url: json.lagu,
          },
          seconds: fsizedoc,
          ptt: !0,
          mimetype: "audio/mpeg",
          fileName: "vn.mp3",
          waveform: [100, 0, 100, 0, 100, 0, 100],
        },
        {
          quoted: m,
        },
      );
  } catch (e) {
    m.react(eror);
  }
};
(handler.help = ["tebaklagu"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebaklagu/i);
export default handler;
const buttons = [
  ["Hint", "/hlag"],
  ["Nyerah", "menyerah"],
];
