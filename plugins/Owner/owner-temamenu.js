const handler = async (m, { conn, command, text }) => {
  db.data.dbbot.temamenu = db.data.dbbot.temamenu
    ? db.data.dbbot.temamenu
    : {
        id: 0,
      };
  let themes = {
    0: "Buttons",
    1: "Normal",
    2: "AdReply Small",
    3: "AdReply Large",
    4: "Document",
    5: "Document with AdReply Small",
    6: "Document with AdReply Large",
    7: "Payment",
    8: "Gif",
    9: "CTA Document with AdReply",
    10: "CTA Document with AdReply",
    11: "CTA with Button AdReply",
    12: "CTA with Url AdReply",
  };
  if (text) {
    let themeIndex = parseInt(text);
    if (isNaN(themeIndex) || !themes[themeIndex])
      return void (await conn.reply(
        m.chat,
        "Input tidak valid. Silakan pilih tema dari daftar berikut:\n" +
          Object.entries(themes)
            .map(([id, theme]) => `*${id}.* ${theme}`)
            .join("\n"),
        m,
      ));
    (db.data.dbbot.temamenu = {
      id: themeIndex,
    }),
      await conn.reply(
        m.chat,
        "Tema berhasil diatur\n" + themes[themeIndex],
        m,
      );
  } else
    await conn.reply(
      m.chat,
      "Input tidak valid. Silakan pilih tema dari daftar berikut:\n" +
        Object.entries(themes)
          .map(([id, theme]) => `*${id}.* ${theme}`)
          .join("\n"),
      m,
    );
};
(handler.help = ["temamenu"]),
  (handler.tags = ["owner"]),
  (handler.command = /^(temamenu)$/i),
  (handler.owner = !0);
export default handler;
