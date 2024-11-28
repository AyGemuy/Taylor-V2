import fetch from "node-fetch";
async function AsyncTriviaMaker(topic) {
  const url = `https://play.triviamaker.com/questionGenerator.php?topic=${encodeURIComponent(topic)}`;
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://triviamaker.ai/",
  };
  try {
    const response = await fetch(url, {
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.game.triviamaker) db.data.game.triviamaker = {};
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
    const data = await AsyncTriviaMaker(inputText);
    const questions = data.questions;
    if (!questions || questions.length === 0) {
      return m.reply(
        `Tidak dapat menghasilkan soal untuk topik "${inputText}"`,
      );
    }
    if (!db.data.game.triviamaker[m.sender])
      db.data.game.triviamaker[m.sender] = {};
    db.data.game.triviamaker[m.sender].questions = questions;
    db.data.game.triviamaker[m.sender].currentQuestion = 0;
    const currentQuestion =
      questions[db.data.game.triviamaker[m.sender].currentQuestion];
    const options = Object.keys(currentQuestion)
      .filter((key) => key.startsWith("option"))
      .map((key) => currentQuestion[key])
      .filter((opt) => opt);
    const soal = `🧠 *Soal ke-${db.data.game.triviamaker[m.sender].currentQuestion + 1}/${questions.length}*\n*${currentQuestion.question}*\n\n${options.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`).join("\n")}\n\n💡 Ketik huruf untuk memilih jawaban!`;
    const progress = Math.round(
      ((db.data.game.triviamaker[m.sender].currentQuestion + 1) /
        questions.length) *
        100,
    );
    const reward =
      1e4 + db.data.game.triviamaker[m.sender].currentQuestion * 5e3;
    const pesan = `${soal}\n\n📊 *Progres: ${progress}%*\n💰 *Hadiah per soal: ${reward} koin*\n----------------`;
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, pesan, m);
    db.data.game.triviamaker[m.sender].key = {
      id: keyId,
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.game ||
    !db.data.game.triviamaker ||
    m.isBaileys ||
    !(m.sender in db.data.game.triviamaker)
  )
    return;
  const {
    key: { id: keyId },
    questions,
    currentQuestion,
  } = db.data.game.triviamaker[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const jawaban = m.text.trim().toUpperCase();
      if (jawaban === "END") {
        const totalQuestions = questions.length;
        const correctAnswers =
          db.data.game.triviamaker[m.sender].currentQuestion;
        const finalMessage = `⚠️ *Permainan dihentikan!*\nAnda telah menjawab *${correctAnswers}* dari *${totalQuestions}* soal.\nTotal koin yang didapat: *${correctAnswers * 1e4 + ((correctAnswers * (correctAnswers - 1)) / 2) * 5e3} koin*`;
        await conn.reply(m.chat, finalMessage, m);
        delete db.data.game.triviamaker[m.sender];
        return;
      }
      const question = questions[currentQuestion];
      const options = Object.keys(question)
        .filter((key) => key.startsWith("option"))
        .map((key) => question[key])
        .filter((opt) => opt);
      const answerIndex = jawaban.charCodeAt(0) - 65;
      const chosenAnswer = options[answerIndex];
      const correctAnswer = question.correctAnswer;
      if (answerIndex === -1 || !chosenAnswer) {
        return m.reply(
          `Jawaban tidak valid. Silakan pilih huruf opsi yang benar.`,
        );
      }
      const isCorrect = chosenAnswer === correctAnswer;
      const response = `*Jawaban ${isCorrect ? "Benar" : "Salah"}!*\nJawaban yang benar adalah: *${correctAnswer}*`;
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, response, m);
      db.data.game.triviamaker[m.sender].key.id = newKeyId;
      const currentReward =
        1e4 + db.data.game.triviamaker[m.sender].currentQuestion * 5e3;
      if (isCorrect) {
        if (!db.data.users[m.sender]) db.data.users[m.sender] = {};
        if (!db.data.users[m.sender].money) db.data.users[m.sender].money = 0;
        db.data.users[m.sender].money += currentReward;
        db.data.game.triviamaker[m.sender].currentQuestion++;
      } else {
        if (!db.data.users[m.sender]) db.data.users[m.sender] = {};
        if (!db.data.users[m.sender].money) db.data.users[m.sender].money = 0;
        db.data.users[m.sender].money -= 3e3;
      }
      if (
        db.data.game.triviamaker[m.sender].currentQuestion >= questions.length
      ) {
        const totalQuestions = questions.length;
        const correctAnswers =
          db.data.game.triviamaker[m.sender].currentQuestion;
        const endMessage = `🎉 *Selamat!*\nAnda telah menyelesaikan semua soal! Anda mendapatkan *${correctAnswers * 1e4 + ((correctAnswers * (correctAnswers - 1)) / 2) * 5e3} koin*! Total: *${db.data.users[m.sender].money} koin* 🏅`;
        await conn.reply(m.chat, endMessage, m);
        delete db.data.game.triviamaker[m.sender];
      } else {
        const nextQuestion =
          questions[db.data.game.triviamaker[m.sender].currentQuestion];
        const newOptions = Object.keys(nextQuestion)
          .filter((key) => key.startsWith("option"))
          .map((key) => nextQuestion[key])
          .filter((opt) => opt);
        const newSoal = `🧠 *Soal ke-${db.data.game.triviamaker[m.sender].currentQuestion + 1}/${questions.length}*\n*${nextQuestion.question}*\n\n${newOptions.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`).join("\n")}\n\n💡 Ketik huruf untuk memilih jawaban!`;
        const newProgress = Math.round(
          ((db.data.game.triviamaker[m.sender].currentQuestion + 1) /
            questions.length) *
            100,
        );
        const newReward =
          1e4 + db.data.game.triviamaker[m.sender].currentQuestion * 5e3;
        const newPesan = `${newSoal}\n\n📊 *Progres: ${newProgress}%*\n💰 *Hadiah per soal: ${newReward} koin*\n----------------`;
        const {
          key: { id: newKeyId },
        } = await conn.reply(m.chat, newPesan, m);
        db.data.game.triviamaker[m.sender].key.id = newKeyId;
      }
    } catch (error) {
      console.error("Handler error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["triviamaker"];
handler.tags = ["game"];
handler.command = /^(triviamaker)$/i;
export default handler;
