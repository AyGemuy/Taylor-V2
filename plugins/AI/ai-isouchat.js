import fetch from "node-fetch";
async function iSouChat(
  query,
  model = "gpt-4o-mini",
  mode = "simple",
  categories = ["general"],
  engine = "SEARXNG",
  locally = false,
  reload = false,
) {
  const validModels = [
    "gpt-4o-mini",
    "gpt-4o",
    "gpt-3.5-turbo",
    "yi-34b-chat-0205",
    "deepseek-chat",
    "deepseek-coder",
  ];
  if (!["simple", "deep"].includes(mode))
    return console.log("Mode hanya tersedia: 'simple', 'deep'");
  if (!["general", "science"].includes(categories[0]))
    return console.log("Kategori hanya tersedia: 'general', 'science'");
  if (!validModels.includes(model))
    return console.log(
      `Model tidak valid. Pilih dari: ${validModels.join(", ")}`,
    );
  try {
    const res = await fetch(
      `https://isou.chat/api/search?q=${encodeURIComponent(query)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: `https://isou.chat/search?q=${encodeURIComponent(query)}`,
        },
        body: JSON.stringify({
          stream: true,
          model: model,
          mode: mode,
          language: "all",
          categories: categories,
          engine: engine,
          locally: locally,
          reload: reload,
        }),
      },
    );
    const data = (await res.text())
      .split("\n")
      .filter((line) => line.trim())
      .reduce(
        (result, line) => {
          const { image, context, answer, related } =
            JSON.parse(JSON.parse(line.slice(line.indexOf("{"))).data) || {};
          image
            ? result.image.push(image)
            : context
              ? result.context.push(context)
              : answer
                ? (result.answer += answer)
                : related
                  ? (result.related += related)
                  : null;
          return result;
        },
        {
          image: [],
          context: [],
          answer: "",
          related: "",
        },
      );
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.isouchat) db.data.dbai.isouchat = {};
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
    const answer = await iSouChat(inputText);
    let formattedAnswer = "🔍 *Hasil Pencarian:*\n\n";
    formattedAnswer += answer.answer
      ? `✨ *Answer:*\n${answer.answer.replace(/\[\[citation:\d+\]\]/g, "")}\n\n`
      : "";
    formattedAnswer += answer.context.length
      ? `📜 *Context:*\n${answer.context.map((ctx, index) => `🔍 ${index + 1}. *${ctx.name}*\n   🌐 [Link](${ctx.url})\n   📝 ${ctx.snippet || "Tidak ada snippet."}`).join("\n")}\n\n`
      : "";
    formattedAnswer += answer.image.length
      ? `🖼️ *Image:*\n${answer.image.map((img, index) => `🖼️ ${index + 1}. *${img.name}*\n   🗞️ ${img.source}\n   🌐 [View Image](${img.url})\n   ![Thumbnail](${img.thumbnail})\n   📝 ${img.snippet || "Tidak ada snippet."}`).join("\n")}\n\n`
      : "";
    formattedAnswer += answer.related ? `🔗 *Related:*\n${answer.related}` : "";
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, formattedAnswer.trim(), m);
    db.data.dbai.isouchat[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.isouchat ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.isouchat)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.isouchat[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await iSouChat(m.text.trim());
      let formattedAnswer = "🔍 *Hasil Pencarian:*\n\n";
      formattedAnswer += answer.answer
        ? `✨ *Answer:*\n${answer.answer.replace(/\[\[citation:\d+\]\]/g, "")}\n\n`
        : "";
      formattedAnswer += answer.context.length
        ? `📜 *Context:*\n${answer.context.map((ctx, index) => `🔍 ${index + 1}. *${ctx.name}*\n   🌐 [Link](${ctx.url})\n   📝 ${ctx.snippet || "Tidak ada snippet."}`).join("\n")}\n\n`
        : "";
      formattedAnswer += answer.image.length
        ? `🖼️ *Image:*\n${answer.image.map((img, index) => `🖼️ ${index + 1}. *${img.name}*\n   🗞️ ${img.source}\n   🌐 [View Image](${img.url})\n   ![Thumbnail](${img.thumbnail})\n   📝 ${img.snippet || "Tidak ada snippet."}`).join("\n")}\n\n`
        : "";
      formattedAnswer += answer.related
        ? `🔗 *Related:*\n${answer.related}`
        : "";
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, formattedAnswer.trim(), m);
      db.data.dbai.isouchat[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["isouchat"];
handler.tags = ["ai"];
handler.command = /^(isouchat)$/i;
export default handler;
