const Hercai = await (await import("../../lib/ai/hercai.js")).default;
const client = new Hercai();
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = ["chatv2", "chatbeta", "chatv3-beta", "imagev1", "imagev2", "imagev2-beta", "imagev3", "imagelexica", "imageprodia"];
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]");
  m.react(wait);
  try {
    let data = input_data.map((item, index) => ({
      title: item.replace(/[_-]/g, " ").replace(/\..*/, ""),
      id: item
    }));
    if (!urutan) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1].id;
    if (out === "chatv2") {
      const questionResult = await client.question({
        model: "v2",
        content: tema
      });
      await conn.sendMessage(m.chat, {
        text: questionResult.reply
      }, {
        quoted: m
      });
    } else if (out === "chatbeta") {
      const questionResult = await client.question({
        model: "beta",
        content: tema
      });
      await conn.sendMessage(m.chat, {
        text: questionResult.reply
      }, {
        quoted: m
      });
    } else if (out === "chatv3-beta") {
      const questionResult = await client.question({
        model: "v3-beta",
        content: tema
      });
      await conn.sendMessage(m.chat, {
        text: questionResult.reply
      }, {
        quoted: m
      });
    } else if (out === "imagev1") {
      const imageResult = await client.drawImage({
        model: "v1",
        prompt: tema
      });
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: imageResult.url
        },
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else if (out === "imagev2") {
      const imageResult = await client.drawImage({
        model: "v2",
        prompt: tema
      });
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: imageResult.url
        },
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else if (out === "imagev2-beta") {
      const imageResult = await client.drawImage({
        model: "v2-beta",
        prompt: tema
      });
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: imageResult.url
        },
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else if (out === "imagev3") {
      const imageResult = await client.drawImage({
        model: "v3",
        prompt: tema
      });
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: imageResult.url
        },
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else if (out === "imagelexica") {
      const imageResult = await client.drawImage({
        model: "lexica",
        prompt: tema
      });
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: imageResult.url
        },
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else if (out === "imageprodia") {
      const imageResult = await client.drawImage({
        model: "prodia",
        prompt: tema
      });
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: imageResult.url
        },
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["hercai *[nomor]|[query]*"];
handler.tags = ["ai"];
handler.command = /^(hercai)$/i;
export default handler;