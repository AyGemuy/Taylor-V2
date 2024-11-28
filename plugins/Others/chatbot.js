const handler = async (m, { conn, args }) => {
  const sources = [
    {
      name: "Chatbot",
      jid: "6281295891971@s.whatsapp.net",
    },
    {
      name: "YouChat",
      jid: "15854968266@s.whatsapp.net",
    },
    {
      name: "MobileGPT",
      jid: "27767346284@s.whatsapp.net",
    },
    {
      name: "WizAI",
      jid: "4915151853491@s.whatsapp.net",
    },
    {
      name: "Shmooz",
      jid: "12014166644@s.whatsapp.net",
    },
    {
      name: "GuideGeek",
      jid: "12058922070@s.whatsapp.net",
    },
    {
      name: "Jinni",
      jid: "447457403599@s.whatsapp.net",
    },
    {
      name: "Santa Claus",
      jid: "15855398883@s.whatsapp.net",
    },
    {
      name: "Microsoft Copilot",
      jid: "18772241042@s.whatsapp.net",
    },
    {
      name: "Rose",
      jid: "6281278380339@s.whatsapp.net",
    },
    {
      name: "ChatCit",
      jid: "905376449086@s.whatsapp.net",
    },
    {
      name: "SensiBot",
      jid: "12896353809@s.whatsapp.net",
    },
    {
      name: "YourFriends",
      jid: "15855398706@s.whatsapp.net",
    },
    {
      name: "YatterAi",
      jid: "919811046549@s.whatsapp.net",
    },
    {
      name: "AiShot",
      jid: "918142071795@s.whatsapp.net",
    },
    {
      name: "Photify",
      jid: "17206012206@s.whatsapp.net",
    },
  ];
  const id = m.chat;
  const dbchatbot = db.data.database.chatbot;
  if (args[0] === "set") {
    if (dbchatbot[id] && dbchatbot[id].state !== "WAITING") {
      return await conn.reply(
        m.chat,
        "*Tidak bisa mengatur source karena sedang dalam sesi chatbot chat*",
        m,
      );
    }
    if (args[1] && !isNaN(args[1])) {
      const selectedSourceIndex = parseInt(args[1]) - 1;
      if (selectedSourceIndex >= 0 && selectedSourceIndex < sources.length) {
        const selectedSource = sources[selectedSourceIndex];
        dbchatbot[id] = {
          source: selectedSource.jid,
          user: "",
          state: "WAITING",
        };
        return await conn.reply(
          m.chat,
          `*Source telah diatur sesuai dengan pilihanmu: ${selectedSource.name}*\nGunakan "/chatbot start" untuk memulai sesi chatbot chat`,
          m,
        );
      } else {
        return await conn.reply(
          m.chat,
          "*Pilihan source tidak valid. Gunakan angka urutan source yang tepat*\nContoh: /chatbot set 1",
          m,
        );
      }
    } else {
      const sourceList = sources
        .map((source, index) => `${index + 1}. ${source.name}`)
        .join("\n");
      return await conn.reply(
        m.chat,
        `*Daftar Source:*\n\n${sourceList}\n\nGunakan "/chatbot set [urutan]" untuk mengatur source`,
        m,
      );
    }
  }
  if (args[0] === "start") {
    if (dbchatbot[id] && dbchatbot[id].state === "WAITING") {
      if (!dbchatbot[id].user) {
        dbchatbot[id].user = m.sender;
        dbchatbot[id].state = "CHATTING";
        return await conn.reply(m.chat, "*Percakapan dimulai!*", m);
      } else {
        return await conn.reply(
          m.chat,
          "*Kamu sudah dalam sesi chatbot chat, menunggu partner*",
          m,
        );
      }
    } else {
      return await conn.reply(
        m.chat,
        '*Atur source terlebih dahulu dengan "/chatbot set [urutan]*"',
        m,
      );
    }
  }
  if (args[0] === "stop") {
    if (dbchatbot[id] && dbchatbot[id].state === "CHATTING") {
      delete dbchatbot[id];
      return await conn.reply(m.chat, "*Sesi chatbot chat dihentikan*", m);
    } else {
      return await conn.reply(
        m.chat,
        "*Kamu tidak sedang dalam sesi chatbot chat*",
        m,
      );
    }
  }
  const usage =
    "*Cara Penggunaan:*\n\n/chatbot set [urutan] - Mengatur source sesuai urutan yang tepat\n/chatbot start - Memulai sesi chatbot chat setelah source diatur\n/chatbot stop - Menghentikan sesi chatbot chat";
  return await conn.reply(m.chat, `Input salah. ${usage}`, m);
};
handler.help = ["chatbot set [urutan]", "chatbot start", "chatbot stop"];
handler.tags = ["fun"];
handler.command = ["chatbot"];
handler.private = true;
export default handler;
