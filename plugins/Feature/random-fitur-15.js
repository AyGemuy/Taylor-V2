import fetch from "node-fetch";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  sticker
} from "../../lib/sticker.js";
import fs from "fs";
import jimp from "jimp";
import {
  youtubedl,
  youtubedlv2
} from "@bochilteam/scraper";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command,
  isPrems,
  isOwner
}) => {
  wm,
  author,
  snh,
  fs.readFileSync("./thumbnail.jpg"),
  flaaa.getRandom();
  let urut = text.split("|"),
    one = urut[1],
    two = urut[2],
    three = urut[3];
  if ("brainfuck" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} blablabla`);
    let res = await fetch(`https://tools.helixs.id//API/brainfuck.php?encode&text=${text}`),
      caption = `*Result:*\n\n${(await res.json()).result}`;
    m.reply(caption);
  }
  if ("heliximage" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} blablabla`);
    let res = await fetch(`https://tools.helixs.id//API/random-image?data=${text}`),
      v = await res.json(),
      gett = await (await fetch(v.result.getRandom())).arrayBuffer();
    await conn.sendFile(m.chat, gett, "", "Url:\n" + v.result.getRandom(), m);
  }
  if ("htmlesc" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} blablabla`);
    let res = await fetch(`https://tools.helixs.id//API/html-escape.php?text=${text}`),
      caption = `*Result:*\n\n${(await res.json()).text}`;
    m.reply(caption);
  }
  if ("imglink" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} https://google.com`);
    let res = await fetch(`https://tools.helixs.id//API/images.php?url=${text}`),
      v = await res.json(),
      caption = `*Result:*\n\n${Array.from(v.result)}`;
    m.reply(caption);
  }
  if ("shortenlink" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} https://google.com`);
    let res = await fetch(`https://tools.helixs.id//API/shorten-link.php?url=${text}`),
      caption = `*Result:*\n${(await res.json()).result}\n`;
    m.reply(caption);
  }
  if ("akuari" === command) {
    if (!args[0]) throw `Contoh:\n${usedPrefix + command} latest\n\n*List:*\n• alquran\n• likeedl\n• storysad\n• textpro\n• textpro2\n• ephoto\n• ephoto2\n• asupan\n• rimage\n• alpha\n• konachan\n`;
    if ("alquran" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |9`);
      let res = await fetch(`https://api.akuari.my.id/islami/alquran?query=${one}`),
        x = await res.json(),
        v = x.result.verses,
        listSections = [];
      return Object.values(v).map((v, index) => {
        let cp = `*Number:* ${v.number}\n*English:* ${v.translation_en}\n*Indonesia:* ${v.translation_id}\n`;
        listSections.push(["Num. " + ++index, [
          [x.result.recitations[0]?.name + "\n\n", usedPrefix + "get " + x.result.recitations[0]?.audio_url, cp],
          [x.result.recitations[1].name + "\n\n", usedPrefix + "get " + x.result.recitations[1].audio_url, cp],
          [x.result.recitations[2].name + "\n\n", usedPrefix + "get " + x.result.recitations[2].audio_url, cp]
        ]]);
      }), conn.sendList(m.chat, htki + " 🗒️ List Ayat " + htka, "⚡ Silakan pilih ayat dari " + x.result.name + " ( " + x.result.name_translations.ar + " )", author, "[ Ayat ]", listSections, m);
    }
    if ("likeedl" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |https://likee.video/@vicky_marpaung/video/7006676628722311449`);
      let res = await fetch(`https://api.akuari.my.id/downloader/likeedl?link=${text}`),
        v = await res.json(),
        caption = `*Result:*\n*title:* ${v.url}\n*title:* ${v.title}\n*duration:* ${v.duration}\n*source:* ${v.source}\n*medias:* ${v.medias[0]?.url}\n*quality:* ${v.medias[0]?.quality}\n*extension:* ${v.medias[0]?.extension}\n*size:* ${v.medias[0]?.size}\n*formattedSize:* ${v.medias[0]?.formattedSize}\n`;
      await conn.sendFile(m.chat, v.medias[0]?.url, "", caption, m);
    }
    if ("storysad" === args[0]) {
      let res = "https://api.akuari.my.id/downloader/storysad",
        caption = "*Result:*\n";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("textpro" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|link`);
      let res = await fetch(`https://api.akuari.my.id/textpro/scraper-1?text=${one}&link=${two}`),
        v = await res.json(),
        caption = `*Result:*\n*respon:* ${v.respon}\n`;
      await conn.sendFile(m.chat, v.respon, "", caption, m);
    }
    if ("textpro2" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|teks|link`);
      let res = await fetch(`https://api.akuari.my.id/textpro/scraper-2?text=${one}&text2=${two}&link=${three}`),
        v = await res.json(),
        caption = `*Result:*\n*respon:* ${v.respon}\n`;
      await conn.sendFile(m.chat, v.respon, "", caption, m);
    }
    if ("ephoto" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|link`);
      let res = await fetch(`https://api.akuari.my.id/ephoto/scraper-1?text=${one}&link=${two}`),
        v = await res.json(),
        caption = `*Result:*\n*respon:* ${v.respon}\n`;
      await conn.sendFile(m.chat, v.respon, "", caption, m);
    }
    if ("ephoto2" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|teks|link`);
      let res = await fetch(`https://api.akuari.my.id/ephoto/scraper-2?text=${one}&text2=${two}&link=${three}`),
        v = await res.json(),
        caption = `*Result:*\n*respon:* ${v.respon}\n`;
      await conn.sendFile(m.chat, v.respon, "", caption, m);
    }
    if ("asupan" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |bocil\n\n*List:*\n• bocil\n• cecan\n• ghea\n• hijab\n• rika\n• santuy\n• ukhty\n`);
      let res = await fetch(`https://api.akuari.my.id/asupan/${one}`),
        v = await res.json(),
        caption = "*Result:*\n";
      await conn.sendFile(m.chat, v.respon, "", caption, m);
    }
    if ("rimage" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |darkmeme17\n\n*List:*\n• darkmeme17\n• darkjokes1\n• harley\n`);
      let res = `https://api.akuari.my.id/randomimage/${one}`,
        caption = "*Result:*\n";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("alpha" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |genshin`);
      let res = `https://api.akuari.my.id/search/alphacoders?query=${one}`,
        caption = "*Result:*\n";
      await conn.sendButton(m.chat, caption, wm, res, [
        ["Menu", `${usedPrefix}menu`],
        ["Next", `${usedPrefix + command} ${args[0]} |${one}`]
      ], fakes, adReply);
    }
    if ("konachan" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |azur_lane`);
      let res = `https://api.akuari.my.id/search/konachan?query=${one}`,
        caption = "*Result:*\n";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
  }
  if ("impact" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} amber`;
    let f = await fetch(`https://impact.moe/api/characters/${text}`),
      x = await f.json(),
      caption = `*birthday:* ${x.birthday}\n*chineseVA:* ${x.chineseVA}\n*constellation:* ${x.constellation}\n*description:* ${x.description}\n*element:* ${x.element}\n*englishVA:* ${x.englishVA}\n*faction:* ${x.faction}\n*icon:* ${x.icon}\n*id:* ${x.id}\n*image:* ${x.image}\n*japaneseVA:* ${x.japaneseVA}\n*koreanVA:* ${x.koreanVA}\n*name:* ${x.name}\n*quote:* ${x.quote}\n*rarity:* ${x.rarity}\n*region:* ${x.region}\n*squareCard:* ${x.squareCard}\n*tier:* ${x.tier}\n*title:* ${x.title}\n*weapon:* ${x.weapon}\n`;
    await conn.sendFile(m.chat, x.image, "", caption, m);
  }
  if ("ytreels" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://youtube.com/shorts/68dfq9ine1k`;
    let f = await fetch(`https://api.lolhuman.xyz/api/ytreels?apikey=327a6596e4c4baa20c756132&url=${text}`),
      x = await f.json(),
      caption = `*title:* ${x.result.title}\n*size:* ${x.result.size}\n`;
    await conn.sendFile(m.chat, x.result.link, "", caption, m);
  }
};
handler.command = handler.help = ["akuari", "brainfuck", "heliximage", "htmlesc", "imglink", "shortenlink", "impact", "ytreels"],
  handler.tags = ["info"];
export default handler;