import fetch from "node-fetch";
import fs from "fs";
const handler = async (
  m,
  { conn, groupMetadata, usedPrefix, text, args, command },
) => {
  let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender,
    name =
      (await conn.profilePictureUrl(who).catch((_) => hoppai.getRandom()),
      conn.getName(who));
  flaaa.getRandom();
  if ("createqr" === command) {
    if (!text) throw `Contoh:\n${usedPrefix + command} Teks`;
    let res = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${text}`;
    await conn.sendFile(m.chat, res, "image.png", "Your Text: \n" + text, m);
  }
  if ("catboys" === command) {
    if ("img" === args[0]) {
      let f = await fetch("https://api.catboys.com/img"),
        x = await f.json();
      await conn.sendFile(m.chat, x.url, "image.png", wm, m);
    }
    if ("8ball" === args[0]) {
      let f = await fetch("https://api.catboys.com/8ball"),
        x = await f.json();
      await conn.sendFile(m.chat, x.url, "image.png", wm, m);
    }
    if ("dice" === args[0]) {
      let f = await fetch("https://api.catboys.com/dice"),
        x = await f.json();
      await conn.sendFile(m.chat, x.url, "image.png", wm, m);
    }
    if ("catboy" === args[0]) {
      let f = await fetch("https://api.catboys.com/catboy"),
        x = await f.json();
      await conn.sendButton(
        m.chat,
        "*Pencet untuk mendengar hasil:*",
        wm,
        null,
        [["Awkawk", `${usedPrefix}tts ${x.response}`]],
        fakes,
        adReply,
      );
    }
    await conn.sendButton(
      m.chat,
      `*Silahkan pilih di bawah:*\n${usedPrefix + command} img\n${usedPrefix + command} 8ball\n${usedPrefix + command} catboy\n`,
      wm,
      null,
      [
        ["IMG", `${usedPrefix + command} img`],
        ["8BALL", `${usedPrefix + command} 8ball`],
      ],
      fakes,
      adReply,
    );
  }
  if ("nekos" === command) {
    if (!args[0])
      throw `Contoh:\n${usedPrefix + command} baka\n\n*List:*\n• kitsune\n• neko\n• waifu\n• baka\n• bite\n• blush\n• bored\n• cry\n• cuddle\n• dance\n• facepalm\n• feed\n• handhold\n• happy\n• highfive\n• hug\n• kick,kiss\n• laugh\n• pat\n• poke\n• pout\n• punch\n• shoot\n• shrug\n• slap\n• sleep\n• smile\n• smug\n• stare\n• think\n• thumbsup\n• tickle\n• wave\n• wink\n`;
    let f = await fetch(`https://nekos.best/api/v2/${args[0]}`),
      x = await f.json();
    "neko" === args[0] &&
      (await conn.sendFile(
        m.chat,
        x.results[0]?.url,
        "",
        x.results[0]?.anime_name,
        m,
      )),
      "waifu" === args[0] &&
        (await conn.sendFile(
          m.chat,
          x.results[0]?.url,
          "",
          x.results[0]?.anime_name,
          m,
        )),
      "kitsune" === args[0] &&
        (await conn.sendFile(
          m.chat,
          x.results[0]?.url,
          "",
          x.results[0]?.anime_name,
          m,
        ));
    try {
      await conn.sendFile(
        m.chat,
        x.results[0]?.url,
        "",
        x.results[0]?.anime_name,
        !1,
        {
          mimetype: "image/gif",
          thumbnail: Buffer.alloc(0),
        },
      );
    } catch (e) {
      await conn.sendFile(
        m.chat,
        x.results[0]?.url,
        "",
        x.results[0]?.anime_name,
        m,
      );
    }
  }
  if ("avatar" === command) {
    if (!text)
      throw `Contoh:\n${usedPrefix + command} 853c80ef3c3749fdaa49938b674adae6`;
    let nm = ["🪄 avatars", "🗿 head", "🦧 body", "🥷 skins", "🐦 capes"],
      av = [
        "https://crafatar.com/avatars/",
        "https://crafatar.com/renders/head/",
        "https://crafatar.com/renders/body/",
        "https://crafatar.com/skins/",
        "https://crafatar.com/capes/",
      ],
      row = Object.keys(av, nm).map((v, index) => ({
        title: nm[v],
        description: "By: " + wm,
        rowId: usedPrefix + "get " + av[v] + args[0],
      })),
      button = {
        buttonText: "☂️ Avatar Disini ☂️",
        description: `⚡ Silakan pilih Avatar di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm,
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("randomuser" === command) {
    let ft = await fetch("https://randomuser.me/api/"),
      v = (await ft.json()).results[0],
      cp = `\nv.gender:* ${v.gender}\n*name.title:* ${v.name.title}\n*name.first:* ${v.name.first}\n*name.last:* ${v.name.last}\n*location.street.name:* ${v.location.street.name}\n*login.uuid:* ${v.login.uuid}\n*login.username:* ${v.login.username}\n*login.password:* ${v.login.password}\n*login.salt:* ${v.login.salt}\n*login.md5:* ${v.login.md5}\n*login.sha1:* ${v.login.sha1}\n*login.sha256:* ${v.login.sha256}\n*registered.date:* ${v.registered.date}\n*cell:* ${v.cell}\n*picture.large:* ${v.picture.large}\n`;
    conn.sendButton(
      m.chat,
      cp,
      wm,
      v.picture.large,
      [["Get Avatar", `${usedPrefix}avatar ${v.login.uuid}`]],
      fakes,
      adReply,
    );
  }
  if ("karakter" === command) {
    if (!text) throw "Masukkan query!";
    let res = await fetch(`https://api.jikan.moe/v4/anime?q=${text}`),
      kar = (await res.json()).data,
      row = Object.values(kar).map((v, index) => ({
        title: ++index + dmenub + " " + v.title,
        description:
          "\n*ID* " +
          v.mal_id +
          "\n💭 *Synopsis* " +
          v.synopsis +
          "\n🔗 *Link* " +
          v.url,
        rowId: usedPrefix + "get " + v.images.jpg.image_url,
      })),
      button = {
        buttonText: `☂️ ${command} Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm,
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
};
(handler.command = handler.help =
  ["createqr", "catboys", "nekos", "avatar", "randomuser", "karakter"]),
  (handler.tags = ["random"]);
export default handler;

function formatDate(n, locale = "id") {
  return new Date(n).toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
