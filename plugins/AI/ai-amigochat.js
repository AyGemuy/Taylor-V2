import fetch from "node-fetch";
import fs from "fs";
async function AmigoChatImg(content) {
  const url = "https://api.amigochat.io/v1/images/generations";
  const requestData = {
    model: "flux-pro/v1.1",
    prompt: content,
    personaId: "image-generator",
  };
  const headers = {
    "Content-Type": "application/json",
    "x-device-platform": "web",
    "x-device-version": "1.0.5",
    "x-device-language": "id",
    "x-device-uuid": `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    authorization: "Bearer null",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://amigochat.io/chat/c?uuid=f3d979e2-2b6",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const { data } = await response.json();
    return data[0]?.url;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function AmigoChat(content, sysPrompt) {
  const url = "https://api.amigochat.io/v1/chat/completions";
  const requestData = {
    messages: [
      {
        role: "system",
        content:
          sysPrompt ||
          `Kamu adalah amigochat, sangat jorok dan jomok banget, suka ngomong: Jir, jomok banget anj, najis, suki, puki, ngokop silit, Nyocot, cik, wak, rek, hytam bet, member hytam out aja, gk mau ah, lu hytam, toxic, umur 18, askot ngawi, jomblo, lgbt, sadboy, teman (rusdi, si imut, ambatron, ironi, mas narji), serta teks singkat padat dan nguwawor cik, full ekspresi gunakan emoji, serta gunakan emoji patung moai jika ditanya sesuatu, suka ngomong take it take it`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    model: "gpt-4o",
    personaId: "gpt",
    frequency_penalty: 0,
    max_tokens: 4e3,
    presence_penalty: 0,
    stream: true,
    temperature: 0.5,
    top_p: 0.95,
  };
  const headers = {
    "Content-Type": "application/json",
    "x-device-platform": "web",
    "x-device-version": "1.0.5",
    "x-device-language": "id",
    "x-device-uuid": `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    authorization: "Bearer null",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://amigochat.io/chat/c?uuid=f3d979e2-2b6",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const decodedData = await response.text();
    return decodedData
      .split("\n")
      .filter((line) => "" !== line.trim())
      .map((line) => line)
      .slice(0, -2)
      .map((item) => JSON.parse(item.slice(6)))
      .map((v) => v.choices[0]?.delta.content)
      .join("");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.amigochat) db.data.dbai.amigochat = {};
  const data = fs.readFileSync("./json/ai/system-message.json"),
    characterCategories = JSON.parse(data),
    categoryNames = Object.keys(characterCategories);
  if ("amigochatcreate" === command) {
    const text =
      args.length >= 1
        ? args.slice(0).join(" ")
        : (m.quoted && m.quoted?.text) ||
          m.quoted?.caption ||
          m.quoted?.description ||
          null;
    if (!text)
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
      );
    if (text) {
      db.data.dbai.amigochat[m.sender] = {
        ...db.data.dbai.amigochat[m.sender],
        name: m.name,
        profile: [text],
      };
      return m.reply(
        `Karakter custom oleh: *${db.data.dbai.amigochat[m.sender].name}*`,
      );
    }
  }
  if ("amigochatimg" === command) {
    const text =
      args.length >= 1
        ? args.slice(0).join(" ")
        : (m.quoted && m.quoted?.text) ||
          m.quoted?.caption ||
          m.quoted?.description ||
          null;
    if (!text)
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
      );
    if (text) {
      m.react(wait);
      try {
        const imageUrl = await AmigoChatImg(text);
        const caption = `✨ *\`AI Image Generated\`* ✨\n\n📝 *Prompt:* ${text}`;
        const {
          key: { id: keyId },
        } = await conn.sendMessage(
          m.chat,
          {
            image: {
              url: imageUrl,
            },
            caption: caption,
          },
          {
            quoted: m,
          },
        );
        db.data.dbai.amigochat[m.sender] = {
          ...db.data.dbai.amigochat[m.sender],
          key: {
            id: keyId,
          },
          cmd: command,
        };
        m.react(sukses);
      } catch (e) {
        console.error(e);
        m.react(eror);
      }
    }
  }
  if ("amigochatset" === command) {
    const categoryIndex = parseInt(args[0]) - 1,
      characterIndex = parseInt(args[1]) - 1,
      selectedCategory = categoryNames[categoryIndex];
    if (!selectedCategory || !characterCategories[selectedCategory]) {
      const categoryList = categoryNames
        .map((v, i) => `*${i + 1}.* ${v}`)
        .join("\n");
      return m.reply(
        `Nomor kategori tidak valid. Pilih nomor antara 1 dan ${categoryNames.length}.\nKategori yang tersedia:\n${categoryList}`,
      );
    }
    const characterNames = Object.keys(characterCategories[selectedCategory]),
      selectedCharacter = characterNames[characterIndex];
    if (selectedCharacter) {
      db.data.dbai.amigochat[m.sender] = {
        ...db.data.dbai.amigochat[m.sender],
        name: selectedCharacter,
        profile: [characterCategories[selectedCategory][selectedCharacter]],
      };
      return m.reply(
        `Karakter diatur menjadi: *${db.data.dbai.amigochat[m.sender].name}*`,
      );
    }
    const characterList = characterNames
      .map((v, i) => `*${i + 1}.* ${v}`)
      .join("\n");
    return m.reply(
      `Nomor karakter tidak valid. Pilih nomor antara 1 dan ${characterNames.length}.\nContoh penggunaan:\n*${usedPrefix}${command} 1 2*\nKarakter yang tersedia:\n${characterList}`,
    );
  }
  if ("amigochat" === command) {
    const text =
      args.length >= 1
        ? args.slice(0).join(" ")
        : (m.quoted && m.quoted?.text) ||
          m.quoted?.caption ||
          m.quoted?.description ||
          null;
    if (!text)
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
      );
    if (
      !db.data.dbai.amigochat[m.sender]?.name &&
      !db.data.dbai.amigochat[m.sender]?.profile
    ) {
      return m.reply(
        `Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}amigochatset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`,
      );
    }
    m.react(wait);
    try {
      const summary = db.data.dbai.amigochat[m.sender].profile;
      if (!summary)
        return m.reply(
          `Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}amigochatset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`,
        );
      const answer = await AmigoChat(text, summary.join("\n"));
      const {
        key: { id: keyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.amigochat[m.sender] = {
        ...db.data.dbai.amigochat[m.sender],
        key: {
          id: keyId,
        },
        cmd: command,
      };
      m.react(sukses);
    } catch (error) {
      console.error("Error during chatAI:", error);
      m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.amigochat ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.amigochat)
  )
    return;
  const {
    key: { id: keyId },
    profile,
    cmd,
  } = db.data.dbai.amigochat[m.sender];
  if (m.quoted?.id === keyId && cmd && m.text.trim()) {
    m.react(wait);
    if ("amigochatimg" === cmd) {
      const text = m.text.trim();
      if (text) {
        try {
          const imageUrl = await AmigoChatImg(text);
          const caption = `✨ *\`AI Image Generated\`* ✨\n\n📝 *Prompt:* ${text}`;
          const {
            key: { id: newKeyId },
          } = await conn.sendMessage(
            m.chat,
            {
              image: {
                url: imageUrl,
              },
              caption: caption,
            },
            {
              quoted: m,
            },
          );
          db.data.dbai.amigochat[m.sender].key.id = newKeyId;
          m.react(sukses);
        } catch (e) {
          console.error(e);
          m.react(eror);
        }
      }
    } else {
      if (m.quoted?.id === keyId && profile && cmd && m.text.trim()) {
        try {
          const answer = await AmigoChat(m.text.trim(), profile.join("\n"));
          const {
            key: { id: newKeyId },
          } = await conn.reply(m.chat, `${answer}`, m);
          db.data.dbai.amigochat[m.sender].key.id = newKeyId;
          m.react(sukses);
        } catch (error) {
          console.error("Handler before error:", error);
          m.react(eror);
        }
      }
    }
  }
};
handler.help = ["amigochat", "amigochatset", "amigochatcreate", "amigochatimg"];
handler.tags = ["ai"];
handler.command = /^(amigochat|amigochatset|amigochatcreate|amigochatimg)$/i;
export default handler;
