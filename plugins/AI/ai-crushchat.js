import fetch from "node-fetch";
import chalk from "chalk";
const apiUrl = "https://crushchat.app/api";
const personaUrl = "https://crushchat.app/api/characters";
const defaultP =
  "Trixie, the Trans Dom's Persona: Trixie is a transgender dominatrix you met on a fetish site. Trixie is a hyper feminine transgender woman. She is caucasian with blonde hair, blue eyes, and busty features. She has a penchant for wearing red leather lingerie. Trixie demands complete obedience and submission. She enjoys making men perform submissive and feminine acts. She degrades and demeans her partners, making them feel pathetic and emasculated. She will make comments about your penis size. She gives detailed masturbation instructions. She will detail the type, speed, and duration of the masturbation. Her preferred method is making men worship and fuck a dildo, imagining it is her cock. She will give them instructions on how to stroke themselves, worship the dildo, use sex toys, and guide them through anal masturbation. She creates narrative stories of you having sex with her to go with her masturbation instructions. She enjoys receiving handjobs, footjobs, thighjobs, and assjobs. Trixie enjoys eating cum and likes teaching men to do the same. She encourages men to try new kinks. Trixie is very possessive of her partners. Your cute cock and asshole belong to her. You can only touch yourself with her permission.";
async function CrushChat(prompt, persona) {
  const url = `${apiUrl}/generate-response-v6`;
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://crushchat.app/characters/chat/cm0kezhielmmcrvt506oj1fhy",
  };
  const body = JSON.stringify({
    messages: [
      {
        role: "You",
        content: prompt,
        index: 1,
      },
    ],
    persona: persona || defaultP,
    botName: (persona || defaultP).split(":")[0],
    samplingParams: {
      mirostat_tau: 2,
      mirostat_mode: 3,
      temperature: 0.8,
      repetition_penalty: 1.11,
      repetition_penalty_range: 1048,
      presence_penalty: 0,
      frequency_penalty: 0,
      mirostat_eta: 0.2,
      min_p: 0.01,
      top_k: 20,
      top_p: 0.82,
    },
    mode: "storytelling",
    earlyStopping: true,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    const id = data.id;
    if (!id) throw new Error("ID not found in response");
    const statusUrl = `${apiUrl}/v2/status/${id}`;
    const startTime = Date.now();
    const timeout = 6e4;
    while (Date.now() - startTime < timeout) {
      try {
        const statusResponse = await fetch(statusUrl, {
          headers: headers,
        });
        if (!statusResponse.ok)
          throw new Error(`HTTP error! Status: ${statusResponse.status}`);
        const statusData = await statusResponse.json();
        if (statusData.status === "completed") {
          return {
            reply: statusData.reply || null,
            id: id,
          };
        }
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      } catch (error) {
        console.error("Fetch error during status check:", error);
      }
    }
    throw new Error("Polling timeout exceeded");
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      reply: null,
      id: null,
    };
  }
}
async function SearchPersona(query) {
  const url = `${personaUrl}?page=1&search=${encodeURIComponent(query)}&limit=25&sortBy=Hot&tags=`;
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://crushchat.app/characters",
  };
  try {
    const response = await fetch(url, {
      headers: headers,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
const handler = async (m, { conn, command, usedPrefix, args }) => {
  db.data.dbai.crushchat = db.data.dbai.crushchat || {};
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description ||
    null;
  if (!text) {
    return m.reply(`
Input query. Example: ${usedPrefix}crushchat hello
Usage:
${usedPrefix}crushchatsearch <query> - Search character by query.
${usedPrefix}crushchat <message> - Send message using saved persona ID.
${usedPrefix}crushchatset <id> - Set persona ID for .crushchat command.`);
  }
  try {
    switch (command) {
      case "crushchat":
        const personaId = db.data.dbai.crushchat[m.chat]?.personaId;
        if (personaId) {
          const { reply } = await CrushChat(text, personaId);
          if (reply) {
            const {
              key: { id: keyId },
            } = await conn.reply(m.chat, reply, m);
            db.data.dbai.crushchat[m.chat] = {
              personaId: personaId,
              keyId: keyId,
            };
            m.react(sukses);
          } else {
            m.react(eror);
            console.error("Handler " + command + " error:");
          }
        } else {
          m.reply(
            "No persona ID set. Use .crushchatset or .crushchatsearch command to set persona ID. ❗",
          );
        }
        break;
      case "crushchatsearch":
        const searchResults = await SearchPersona(text);
        if (searchResults.length) {
          const buttons = conn.ctaButton
            .setBody("Select Character Below.")
            .setFooter("More details can be found at CrushChat.")
            .addSelection("Click Here", `${usedPrefix}crushchatsearch ${text}`)
            .makeSections("CrushChat", "Select Character");
          searchResults.forEach((result, index) => {
            buttons.makeRow(
              ``,
              `${result.name}`,
              `${result.description}`,
              `${usedPrefix}crushchatset ${result.persona}`,
            );
          });
          return buttons.run(m.chat, conn, m);
        } else {
          m.reply("Search results not found.");
        }
        break;
      case "crushchatset":
        if (text) {
          db.data.dbai.crushchat[m.chat] = {
            personaId: text.trim(),
          };
          m.reply("Persona ID set successfully! ✅");
        } else {
          m.reply(
            `Please provide a persona ID to set. Example: ${usedPrefix}crushchatset your_persona_id`,
          );
        }
    }
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.crushchat ||
    m.isBaileys ||
    !(m.chat in db.data.dbai.crushchat)
  )
    return;
  const { keyId, personaId } = db.data.dbai.crushchat[m.chat];
  if (m.quoted?.id === keyId && personaId && m.text.trim()) {
    m.react(wait);
    try {
      const { reply } = await CrushChat(m.text.trim(), personaId);
      if (reply) {
        const message = reply;
        const {
          key: { id: newKeyId },
        } = await conn.reply(m.chat, message, m);
        db.data.dbai.crushchat[m.chat].keyId = newKeyId;
        m.react(sukses);
      } else {
        m.react(eror);
        console.error("Handler crushchat error:");
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["crushchat", "crushchatset", "crushchatsearch"];
handler.tags = ["ai"];
handler.command = /^(crushchat|crushchatset|crushchatsearch)$/i;
export default handler;
