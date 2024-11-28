import { fetch } from "undici";
export async function before(m) {
  db.data.dbai.autodeepenglish = db.data.dbai.autodeepenglish || {};
  const chat = db.data.chats[m.chat];
  if (m.isBaileys || !m.text || !chat.deepenglish) return !1;
  m.text;
  try {
    if (chat.deepenglish) {
      if (
        db.data.dbai.autodeepenglish[m.chat] || {
          first: !0,
        }
      ) {
        if (!(m.quoted && m.quoted?.fromMe && m.quoted?.isBaileys && m.text))
          return !0;
        if (
          ((db.data.dbai.autodeepenglish = db.data.dbai.autodeepenglish || {}),
          !db.data.dbai.autodeepenglish[m.chat] ||
            m.quoted?.id != db.data.dbai.autodeepenglish[m.chat].msg.key.id)
        )
          return;
        let txt =
          m.msg && m.msg.selectedDisplayText
            ? m.msg.selectedDisplayText
            : m.text
              ? m.text
              : "";
        const result = await Deepenglish(txt);
        if (result) {
          let soal = await this.sendMessage(
            m.chat,
            {
              text: result,
              mentions: [m.sender],
            },
            {
              quoted: m,
            },
          );
          (db.data.dbai.autodeepenglish[m.chat].msg = soal),
            (db.data.dbai.autodeepenglish[m.chat].first = !1) &&
              (await this.sendMessage(m.chat, {
                delete: db.data.dbai.autodeepenglish[m.chat].msg.key.id,
              })),
            (db.data.dbai.autodeepenglish[m.chat].first = !1);
        }
      }
    }
  } catch {}
}
export const disabled = !1;
async function Deepenglish(input) {
  const messages = [
    {
      role: "assistant",
      content:
        "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
    },
    {
      role: "user",
      content: input,
    },
  ];
  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      },
    );
    return (await response.json()).answer;
  } catch (error) {
    throw (
      (console.error("An error occurred during data fetching:", error), error)
    );
  }
}
