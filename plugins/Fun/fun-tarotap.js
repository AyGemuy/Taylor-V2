import fetch from "node-fetch";
class Tarotap {
  async daily(
    name = "Anonymous",
    locale = "en",
    email = "",
    date = new Date().toISOString().split("T")[0],
  ) {
    const url = "https://tarotap.com/api/fortune-daily";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer: "https://tarotap.com/en/fortune/daily",
    };
    const data = {
      name: name,
      locale: locale,
      email: email,
      date: date,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  async yesno(locale = "en", selectedValue = "one-card", question = "") {
    const url = "https://tarotap.com/api/yes-no";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer: "https://tarotap.com/en/yes-or-no-tarot",
    };
    const data = {
      locale: locale,
      selectedValue: selectedValue,
      question: question,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.tarotap) db.data.dbai.tarotap = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const tarotap = new Tarotap();
    let answer;
    switch (command) {
      case "tarotapdaily": {
        const [name, date] = inputText.split("|");
        const dailyResult = await tarotap.daily(
          name?.trim() || "Anonymous",
          "en",
          "",
          date?.trim() || new Date().toISOString().split("T")[0],
        );
        answer = `✨ ${dailyResult.reading}\nKartu: ${dailyResult.card.name}\nGambar: https://tarotap.com${dailyResult.card.imageUrl}\nTerbalik: ${dailyResult.card.isReversed ? "Ya" : "Tidak"}`;
        break;
      }
      case "tarotapyesno": {
        const yesnoResult = await tarotap.yesno(
          "en",
          "one-card",
          inputText.trim(),
        );
        answer = `Jawaban: ${yesnoResult.answer}\nPenjelasan: ${yesnoResult.explanation}\nKartu: ${yesnoResult.cards[0].name}\nGambar: https://tarotap.com${yesnoResult.cards[0].imageUrl}\nTerbalik: ${yesnoResult.cards[0].isReversed ? "Ya" : "Tidak"}`;
        break;
      }
    }
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.tarotap[m.sender] = {
      key: {
        id: keyId,
      },
      cmd: command,
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.tarotap ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.tarotap)
  )
    return;
  const {
    key: { id: keyId },
    cmd,
  } = db.data.dbai.tarotap[m.sender];
  if (m.quoted?.id === keyId && cmd && m.text.trim()) {
    m.react(wait);
    try {
      const tarotap = new Tarotap();
      let answer;
      switch (cmd) {
        case "tarotapdaily": {
          const [name, date] = m.text.split("|");
          const dailyResult = await tarotap.daily(
            name?.trim() || "Anonymous",
            "en",
            "",
            date?.trim() || new Date().toISOString().split("T")[0],
          );
          answer = `✨ ${dailyResult.reading}\nKartu: ${dailyResult.card.name}\nGambar: https://tarotap.com${dailyResult.card.imageUrl}\nTerbalik: ${dailyResult.card.isReversed ? "Ya" : "Tidak"}`;
          break;
        }
        case "tarotapyesno": {
          const yesnoResult = await tarotap.yesno(
            "en",
            "one-card",
            m.text.trim(),
          );
          answer = `Jawaban: ${yesnoResult.answer}\nPenjelasan: ${yesnoResult.explanation}\nKartu: ${yesnoResult.cards[0].name}\nGambar: https://tarotap.com${yesnoResult.cards[0].imageUrl}\nTerbalik: ${yesnoResult.cards[0].isReversed ? "Ya" : "Tidak"}`;
          break;
        }
      }
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.tarotap[m.sender] = {
        key: {
          id: newKeyId,
        },
      };
      m.react(sukses);
    } catch (error) {
      console.error("Error on before handler:", error);
      m.react(eror);
    }
  }
};
handler.help = ["tarotapdaily", "tarotapyesno"];
handler.tags = ["ai"];
handler.command = /^(tarotapdaily|tarotapyesno)$/i;
export default handler;
