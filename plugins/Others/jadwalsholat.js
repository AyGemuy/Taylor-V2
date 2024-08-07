import {
  jadwalsholat
} from "@bochilteam/scraper";
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Use example ${usedPrefix}${command} semarang\nAnd ${usedPrefix}${command} semarang|15 (for date)`;
  var ayat = text.split("|");
  if (ayat[0] && ayat[1]) try {
    let resu = await jadwalsholat(ayat[0]);
    m.react(wait), m.reply(`\n${htki} Jadwal Sholat ${htka}\n\n${Object.entries(resu.list[--ayat[1]]).map(([ name, data ]) => `Sholat *${name}* : ${data}`).join("\n").trim()}\n`.trim());
  } catch (e) {
    m.react(eror);
  } else try {
    let res = await jadwalsholat(text);
    m.react(wait), m.reply(`\n${htki} Jadwal Sholat ${htka}\n\n${Object.entries(res.today).map(([ name, data ]) => `Sholat *${name}* : ${data}`).join("\n").trim()}\n`.trim());
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["salat <daerah>"], handler.tags = ["quran"], handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i;
export default handler;