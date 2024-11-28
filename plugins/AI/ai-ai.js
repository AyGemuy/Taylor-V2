import { AI } from "../../lib/ai/aichat.js";
import _ from "lodash";
const aiClient = new AI();
const commands = [
  {
    command: "cgtai",
    method: "CgtAi",
    help: "cgtai",
    isJson: false,
  },
  {
    command: "goodyai",
    method: "GoodyAI",
    help: "goodyai",
    isJson: false,
  },
  {
    command: "leptonai",
    method: "leptonAi",
    help: "leptonai",
    isJson: false,
  },
  {
    command: "letmegpt",
    method: "LetmeGpt",
    help: "letmegpt",
    isJson: false,
  },
  {
    command: "thinkany",
    method: "thinkany",
    help: "thinkany",
    isJson: false,
  },
  {
    command: "useadrenaline",
    method: "useadrenaline",
    help: "useadrenaline",
    isJson: false,
  },
  {
    command: "degreeguru",
    method: "degreeguru",
    help: "degreeguru",
    isJson: false,
  },
  {
    command: "ragbot",
    method: "ragbot",
    help: "ragbot",
    isJson: false,
  },
  {
    command: "stoicai",
    method: "stoicai",
    help: "stoicai",
    isJson: false,
  },
  {
    command: "stoicgpt",
    method: "stoicgpt",
    help: "stoicgpt",
    isJson: false,
  },
  {
    command: "alicia",
    method: "alicia",
    help: "alicia",
    isJson: false,
  },
  {
    command: "cairo",
    method: "cairo",
    help: "cairo",
    isJson: false,
  },
  {
    command: "omniplex",
    method: "omniplexAi",
    help: "omniplex",
    isJson: true,
  },
];
const handler = async (m, { args, command, usedPrefix, conn }) => {
  const matchedCommand = _.find(
    commands,
    (cmd) => cmd.command.toLowerCase() === command.toLowerCase(),
  );
  if (!matchedCommand) return;
  if (!db.data.dbai.multiai) db.data.dbai.multiai = {};
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${matchedCommand.help} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const aiResponse = await aiClient[matchedCommand.method](
      encodeURIComponent(text),
    );
    const output = matchedCommand.isJson ? aiResponse.data : aiResponse;
    const snippets = [...output.matchAll(/```([^`]+)```/g)].map((match) =>
      match[1].trim(),
    );
    let result;
    if (snippets.length) {
      const ctaButton = conn.ctaButton.setBody(output);
      let index = 1;
      for (const snippet of snippets) {
        ctaButton.addCopy(`Snippet ${index++}`, snippet);
      }
      result = await ctaButton.run(m.chat, conn, m);
    } else {
      result = await conn.reply(m.chat, output, m);
    }
    const {
      key: { id: keyId },
    } = result;
    db.data.dbai.multiai[m.sender] = {
      key: {
        id: keyId,
      },
      cmd: matchedCommand,
    };
    m.react(sukses);
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.multiai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.multiai)
  )
    return;
  const {
    key: { id: keyId },
    cmd,
  } = db.data.dbai.multiai[m.sender];
  if (m.quoted?.id === keyId && cmd && m.text.trim()) {
    m.react(wait);
    try {
      const aiResponse = await aiClient[cmd.method](
        encodeURIComponent(m.text.trim()),
      );
      const output = cmd.isJson ? aiResponse.data : aiResponse;
      const snippets = [...output.matchAll(/```([^`]+)```/g)].map((match) =>
        match[1].trim(),
      );
      let result;
      if (snippets.length) {
        const ctaButton = conn.ctaButton.setBody(output);
        let index = 1;
        for (const snippet of snippets) {
          ctaButton.addCopy(`Snippet ${index++}`, snippet);
        }
        result = await ctaButton.run(m.chat, conn, m);
      } else {
        result = await conn.reply(m.chat, output, m);
      }
      const {
        key: { id: newKeyId },
      } = result;
      db.data.dbai.multiai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.tags = ["ai"];
handler.command = new RegExp(
  `^(${commands.map((cmd) => cmd.command).join("|")})$`,
  "i",
);
handler.help = commands.map((cmd) => cmd.help);
export default handler;
