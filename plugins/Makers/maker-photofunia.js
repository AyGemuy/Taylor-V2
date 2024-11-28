import { img, search, txt } from "../../lib/maker/photofunia.js";
const handler = async (m, { conn, args }) => {
  try {
    const [input, indek, oter] = args.join(" ").split("|");
    if (!input)
      return conn.reply(
        m.chat,
        "❌ Please provide the desired effect index.\n\nUsage: *photofunia <effectIndex>*",
        m,
      );
    const effectIndex = parseInt(indek?.trim(), 10);
    const effects = await search(input);
    if (isNaN(effectIndex) || effectIndex < 1 || effectIndex > effects.length) {
      const itemsList = effects
        .map((effect, index) => `${index + 1}. ${effect.judul}`)
        .join("\n");
      return conn.reply(
        m.chat,
        `❌ Invalid effect index. Please provide a valid index.\n\nAvailable options:\n${itemsList}\n\nUsage: *photofunia <effectIndex>*`,
        m,
      );
    }
    const selectedEffect = effects[effectIndex - 1];
    const q = m.quoted || m;
    const buffer = q ? await q.download() : null;
    const tag = `@${m.sender.split("@")[0]}`;
    let photoResult;
    if (buffer) {
      photoResult = await img(
        selectedEffect,
        [buffer],
        ...(oter ? oter.split("-") : []),
      );
    } else {
      photoResult = await txt(selectedEffect, oter ? oter.split("-") : []);
    }
    if (photoResult?.imageUrl) {
      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: photoResult.imageUrl,
          },
          caption: `Result effect *${selectedEffect.judul}*\nRequested by: ${tag}`,
          mentions: [m.sender],
        },
        {
          quoted: m,
        },
      );
    } else {
      await conn.reply(m.chat, "❌ Error: Unable to generate image URL.", m);
    }
  } catch (error) {
    await conn.reply(m.chat, `❌ Error: ${error.message}`, m);
  }
};
handler.help = ["photofunia <effectIndex>"];
handler.tags = ["maker"];
handler.command = /^(photofunia)$/i;
export default handler;
