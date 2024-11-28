import fetch from "node-fetch";
import chalk from "chalk";
import { v4 as uuidv4 } from "uuid";
const apiUrl = "https://cai.shannmoderz.xyz/v1/completions";
const characters = {
  usiilspp875cj9s: "Uzumaki Naruto",
  "7ekkv9slpkskoc7": "Monkey D. Luffy",
  u78jlsp55whcin: "Elaina",
  vuki09sl452nk1c: "Asuna Yuuki",
  cgu623jcl09aw8: "Killua Zoldyck",
  jo8su26vl0dn: "Ohto Ai",
  xc68dko29e0e: "Nezuko Kamado",
  udk79eke83k: "Hoshino Takanashi",
  uoksp726cj93: "Senku Ishigami",
  ju7e9kfbw67c: "Nakano Itsuki",
  nsl9ejnc73u: "Nakano Nino",
  hs7738hei8: "Furina",
  "8ejjd8eb7w7": "Fenrys",
  jdkis07e8wu8: "Conan Edogawa",
};
async function Caishann(message, characterId, sessionName) {
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
  };
  const body = JSON.stringify({
    message: message,
    characterId: characterId,
    sessionName: sessionName,
  });
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
}
const handler = async (m, { conn, command, usedPrefix, args }) => {
  db.data.dbai.caishann = db.data.dbai.caishann || {};
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description ||
    null;
  if (!text) {
    return m.reply(`
Input query. Example: ${usedPrefix}caishann hello
Usage:
${usedPrefix}caishann <message> - Send message using saved character ID.
${usedPrefix}caishannset <index> - Set character ID by index. If no index, display character list.`);
  }
  try {
    switch (command) {
      case "caishann":
        const characterId = db.data.dbai.caishann[m.sender]?.characterId;
        const sessionName =
          db.data.dbai.caishann[m.sender]?.sessionName || uuidv4();
        if (characterId) {
          const { answer } = await Caishann(text, characterId, sessionName);
          if (answer) {
            await conn.reply(m.chat, answer, m);
            db.data.dbai.caishann[m.sender] = {
              characterId: characterId,
              sessionName: sessionName,
            };
            m.react(sukses);
          } else {
            m.react(eror);
          }
        } else {
          m.reply(
            "No character ID set. Use .caishannset command to set a character ID. ❗",
          );
        }
        break;
      case "caishannset":
        if (text) {
          const index = parseInt(text.trim(), 10);
          if (
            !isNaN(index) &&
            index >= 1 &&
            index <= Object.keys(characters).length
          ) {
            const characterId = Object.keys(characters)[index - 1];
            db.data.dbai.caishann[m.sender] = {
              characterId: characterId,
              sessionName: uuidv4(),
            };
            m.reply(
              `Character ID set to ${characters[characterId]} successfully! ✅`,
            );
          } else {
            const buttons = conn.ctaButton
              .setBody("Select Character Below.")
              .setFooter("More details can be found at CaiShann.")
              .addSelection("Click Here", `${usedPrefix}caishannset`)
              .makeSections("CaiShann", "Select Character");
            Object.keys(characters).forEach((key, index) => {
              buttons.makeRow(
                ``,
                `${characters[key]}`,
                `Character ID: ${key}`,
                `${usedPrefix}caishannset ${index + 1}`,
              );
            });
            return buttons.run(m.chat, conn, m);
          }
        } else {
          m.reply(
            `Please provide an index to set the character ID. Example: ${usedPrefix}caishannset 1`,
          );
        }
        break;
    }
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbai.caishann = db.data.dbai.caishann || {};
  if (
    !db.data.dbai.caishann ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.caishann)
  )
    return;
  const { characterId, sessionName } = db.data.dbai.caishann[m.sender];
  if (
    m.quoted?.id === db.data.dbai.caishann[m.sender]?.keyId &&
    characterId &&
    m.text.trim()
  ) {
    m.react(wait);
    try {
      const { answer } = await Caishann(
        m.text.trim(),
        characterId,
        sessionName,
      );
      if (answer) {
        const message = answer;
        const {
          key: { id: newKeyId },
        } = await conn.reply(m.chat, message, m);
        db.data.dbai.caishann[m.sender].keyId = newKeyId;
        m.react(sukses);
      } else {
        m.react(eror);
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["caishann", "caishannset"];
handler.tags = ["ai"];
handler.command = /^(caishann|caishannset)$/i;
export default handler;
