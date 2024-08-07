import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let lister = ["a", "aa", "b", "bb", "c", "cc", "d", "dd", "e", "ee", "f", "ff", "g", "gg", "h", "hh", "i", "ii", "j", "jj", "k", "kk", "l", "ll", "m", "mm", "n", "nn", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    [feature, querys, equerys] = text.split(/[^\w\s]/g);
  if (!lister.includes(feature)) return m.reply("*Example:*\n.quransearch api\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if (!querys) return m.reply("Input Query!");
    if (m.react(wait), "a" === feature) {
      let data = await aQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("aa" === feature) {
      let data = await aaQuran(querys, equerys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("b" === feature) {
      let data = await bQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("bb" === feature) {
      let data = await bbQuran(querys, equerys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("c" === feature) {
      let data = await cQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("cc" === feature) {
      let data = await ccQuran(querys, equerys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("d" === feature) {
      let data = await dQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("dd" === feature) {
      let data = await ddQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("e" === feature) {
      let data = await eQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("ee" === feature) {
      let data = await eeQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("f" === feature) {
      let data = await fQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("ff" === feature) {
      let data = await ffQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("g" === feature) {
      let data = await gQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("gg" === feature) {
      let data = await ggQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("h" === feature) {
      let data = await hQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("hh" === feature) {
      let data = await hhQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("i" === feature) {
      let data = await iQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("ii" === feature) {
      let data = await iiQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("j" === feature) {
      let data = await jQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("jj" === feature) {
      let data = await jjQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("k" === feature) {
      let data = await kQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("kk" === feature) {
      let data = await kkQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("l" === feature) {
      let data = await lQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("ll" === feature) {
      let data = await llQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("m" === feature) {
      let data = await mQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("mm" === feature) {
      let data = await mmQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("n" === feature) {
      let data = await nQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("nn" === feature) {
      let data = await nnQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("o" === feature) {
      let data = await oQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("p" === feature) {
      let data = await pQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("q" === feature) {
      let data = await qQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("r" === feature) {
      let data = await rQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("s" === feature) {
      let data = await sQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("t" === feature) {
      let data = await tQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("u" === feature) {
      let data = await uQuran(),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("v" === feature) {
      let data = await vQuran(querys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("w" === feature) {
      let data = await wQuran(querys, equerys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("x" === feature) {
      let data = await xQuran(querys, equerys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("y" === feature) {
      let data = await yQuran(querys, equerys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
    if ("z" === feature) {
      let data = await zQuran(querys, equerys),
        capt = await formatData(data);
      await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*\n${capt}`, m);
    }
  }
};
handler.help = ["quransearch"], handler.tags = ["search"], handler.command = /^(quransearch)$/i;
export default handler;

function formatData(data) {
  let output = "";
  return (Array.isArray(data) ? data : [data]).forEach((item, index) => {
    output += `*[ Result ${index + 1} ]*\n`, Object.keys(item).forEach(key => {
      output += ` *${key}:* `, "object" == typeof item[key] && null !== item[key] ? Object.keys(item[key]).forEach(subKey => {
        output += `\n *${subKey}:* ${item[key][subKey]}`;
      }) : output += ` ${item[key]}\n`;
    });
  }), output;
}
async function aQuran() {
  const response = await fetch("https://api.quran.com/api/v4/chapters?language=id");
  return await response.json();
}
async function bQuran(id) {
  const response = await fetch(`https://api.quran.com/api/v4/chapters/${id}?language=id`);
  return await response.json();
}
async function cQuran(chapter_id) {
  const response = await fetch(`https://api.quran.com/api/v4/chapters/${chapter_id}/info?language=id`);
  return await response.json();
}
async function dQuran(chapter_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${chapter_number}?language=id`);
  return await response.json();
}
async function eQuran(page_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_page/${page_number}?language=id`);
  return await response.json();
}
async function fQuran(juz_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_juz/${juz_number}?language=id`);
  return await response.json();
}
async function gQuran(hizb_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_hizb/${hizb_number}?language=id`);
  return await response.json();
}
async function hQuran(rub_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_rub/${rub_number}?language=id`);
  return await response.json();
}
async function iQuran(verse_key) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_key/${verse_key}?language=id`);
  return await response.json();
}
async function jQuran() {
  const response = await fetch("https://api.quran.com/api/v4/verses/random?language=id");
  return await response.json();
}
async function kQuran() {
  const response = await fetch("https://api.quran.com/api/v4/juzs");
  return await response.json();
}
async function lQuran() {
  const response = await fetch("https://api.quran.com/api/v4/quran/verses/indopak");
  return await response.json();
}
async function mQuran() {
  const response = await fetch("https://api.quran.com/api/v4/quran/verses/uthmani");
  return await response.json();
}
async function nQuran() {
  const response = await fetch("https://api.quran.com/api/v4/quran/verses/uthmani_simple");
  return await response.json();
}
async function oQuran() {
  const response = await fetch("https://api.quran.com/api/v4/quran/verses/uthmani_tajweed");
  return await response.json();
}
async function pQuran() {
  const response = await fetch("https://api.quran.com/api/v4/quran/verses/imlaei");
  return await response.json();
}
async function qQuran(recitation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/quran/recitations/${recitation_id}`);
  return await response.json();
}
async function rQuran(translation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translation_id}`);
  return await response.json();
}
async function sQuran(tafsir_id) {
  const response = await fetch(`https://api.quran.com/api/v4/quran/tafsirs/${tafsir_id}`);
  return await response.json();
}
async function tQuran() {
  const response = await fetch("https://api.quran.com/api/v4/quran/verses/code_v1");
  return await response.json();
}
async function uQuran() {
  const response = await fetch("https://api.quran.com/api/v4/quran/verses/code_v2");
  return await response.json();
}
async function vQuran(id) {
  const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${id}?language=id`);
  return await response.json();
}
async function wQuran(id, chapter_number) {
  const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${id}/${chapter_number}`);
  return await response.json();
}
async function xQuran(recitation_id, chapter_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_chapter/${chapter_number}`);
  return await response.json();
}
async function yQuran(recitation_id, juz_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_juz/${juz_number}`);
  return await response.json();
}
async function zQuran(recitation_id, page_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_page/${page_number}`);
  return await response.json();
}
async function aaQuran(recitation_id, rub_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_rub/${rub_number}`);
  return await response.json();
}
async function bbQuran(recitation_id, hizb_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_hizb/${hizb_number}`);
  return await response.json();
}
async function ccQuran(recitation_id, ayah_key) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_ayah/${ayah_key}`);
  return await response.json();
}
async function ddQuran(recitation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/resources/recitations/${recitation_id}/info`);
  return await response.json();
}
async function eeQuran() {
  const response = await fetch("https://api.quran.com/api/v4/resources/translations");
  return await response.json();
}
async function ffQuran(translation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/resources/translations/${translation_id}/info`);
  return await response.json();
}
async function ggQuran() {
  const response = await fetch("https://api.quran.com/api/v4/resources/tafsirs?language=id");
  return await response.json();
}
async function hhQuran(tafsir_id) {
  const response = await fetch(`https://api.quran.com/api/v4/resources/tafsirs/${tafsir_id}/info`);
  return await response.json();
}
async function iiQuran() {
  const response = await fetch("https://api.quran.com/api/v4/resources/recitation_styles");
  return await response.json();
}
async function jjQuran() {
  const response = await fetch("https://api.quran.com/api/v4/resources/languages");
  return await response.json();
}
async function kkQuran() {
  const response = await fetch("https://api.quran.com/api/v4/resources/chapter_infos");
  return await response.json();
}
async function llQuran() {
  const response = await fetch("https://api.quran.com/api/v4/resources/verse_media");
  return await response.json();
}
async function mmQuran() {
  const response = await fetch("https://api.quran.com/api/v4/resources/chapter_reciters?language=id");
  return await response.json();
}
async function nnQuran(q) {
  const response = await fetch(`https://api.quran.com/api/v4/search?q=${q}&language=id`);
  return await response.json();
}