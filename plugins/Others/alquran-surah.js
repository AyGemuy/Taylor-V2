import fetch from "node-fetch";
const fetchQuranData = async (surahNumber) => {
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`,
      );
      return (await response.json()).data.ayahs;
    } catch (error) {
      return console.error(error), null;
    }
  },
  handler = async (m, { conn }) => {
    db.data.dbbot.quransData = db.data.dbbot.quransData
      ? db.data.dbbot.quransData
      : {};
    const surahNumber = parseInt(m.text.split(" ")[1]);
    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114)
      return void m.reply(
        "❌ Invalid surah number. Please provide a valid surah number between 1 and 114.",
      );
    const ayahs = await fetchQuranData(surahNumber);
    if (!ayahs) return void m.reply("Failed to fetch Quran data.");
    const formattedList = Object.values(ayahs)
      .map((v) => `*${v.numberInSurah}.* ${v.text}`)
      .join("\n");
    let { key } = m.reply(
      `📖 List of Ayahs in Surah ${surahNumber}:\n${formattedList}\n\nReply to this message with the desired ayah number to receive the audio.`,
    );
    db.data.dbbot.quransData[m.chat] = {
      list: Object.values(ayahs),
      key: key,
      timeout: setTimeout(() => {
        conn.sendMessage(m.chat, {
          delete: key,
        }),
          delete db.data.dbbot.quransData[m.chat];
      }, 6e4),
    };
  };
(handler.before = async (m, { conn }) => {
  if (
    ((db.data.dbbot.quransData = db.data.dbbot.quransData
      ? db.data.dbbot.quransData
      : {}),
    m.isBaileys || !(m.chat in db.data.dbbot.quransData))
  )
    return;
  const input = m.text.trim();
  if (!/^\d+$/.test(input)) return;
  const { list, key } = db.data.dbbot.quransData[m.chat];
  if (!m.quoted || m.quoted?.id !== key.id || !m.text) return;
  const index = parseInt(input);
  if (isNaN(index) || index < 1 || index > list.length)
    m.reply(
      "❌ Invalid ayah number. Please provide a valid ayah number from the list.",
    );
  else {
    const selectedObj = list[index - 1];
    await conn.sendMessage(
      m.chat,
      {
        audio: {
          url: selectedObj.audio,
        },
        mimetype: "audio/mpeg",
        filename: "quran_audio.mp3",
        ptt: !0,
      },
      {
        quoted: m,
      },
    ),
      conn.sendMessage(m.chat, {
        delete: key,
      }),
      clearTimeout(db.data.dbbot.quransData[m.chat].timeout),
      delete db.data.dbbot.quransData[m.chat];
  }
}),
  (handler.help = ["qurans"]),
  (handler.tags = ["search"]),
  (handler.command = /^qurans$/i);
export default handler;
