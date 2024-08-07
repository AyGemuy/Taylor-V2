import fetch from "node-fetch";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command
}) => {
  let chat = db.data.chats[m.chat];
  var arrlist = ["aesthetic", "ahegao", "akira", "akiyama", "ana", "anjing", "ass", "asuna", "ayuzawa", "bdsm", "blackpink", "blowjob", "boneka", "boruto", "cecan", "cecan2", "cecan3", "cecan4", "cecan5", "chiho", "china", "chitoge", "cogan", "cogan2", "cosplay", "cosplayloli", "cosplaysagiri", "cuckold", "cum", "cyberspace", "deidara", "doraemon", "eba", "elaina", "emilia", "ero", "erza", "femdom", "foot", "gangbang", "gifs", "glasses", "gremory", "hekel", "hentai", "hestia", "hinata", "inori", "Islamic", "isuzu", "itachi", "itori", "jahy", "jeni", "jiso", "justina", "kaga", "kagura", "kakasih", "kaori", "kartun", "katakata", "keneki", "kotori", "kpop", "kucing", "kurumi", "lisa", "loli", "madara", "manga", "masturbation", "megumin", "mikasa", "miku", "minato", "mobil", "montor", "mountain", "naruto", "neko", "neko2", "nekonime", "nezuko", "nsfwloli", "onepiece", "orgy", "panties", "pentol", "pokemon", "ppcouple", "programing", "profilwa", "pubg", "pussy", "rize", "rose", "ryujin", "sagiri", "sakura", "sasuke", "satanic", "shina", "shinka", "shinomiya", "shizuka", "shota", "tatasurya", "tejina", "technology", "tentacles", "thighs", "toukachan", "tsunade", "waifu", "waifu2", "wallhp", "yotsuba", "yuki", "yulibocil", "yumeko", "yuri", "zettai"],
    listnya = arrlist.map((v, index) => `[ ${++index} ] ${usedPrefix + command} ${v}`).join("\n");
  let nah = `${htki} *L I S T* ${htka}\n_Example: ${usedPrefix + command} yulibocil_\n\n${listnya}`;
  if (!arrlist.includes(text)) throw nah;
  if (chat.nsfw) try {
    let ani = await fetch("https://raw.githubusercontent.com/AyGemuy/RESTAPI/master/data/" + text + ".json"),
      mek = await ani.json();
    await conn.sendFile(m.chat, mek.getRandom(), "", `Nih kak ${m.name}`, m);
  } catch {
    m.react(eror);
  } else m.reply("❗ ᴏᴘᴛɪᴏɴs ɴsғᴡ ᴅɪᴄʜᴀᴛ ɪɴɪ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴏʟᴇʜ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ\n\nᴇɴᴀʙʟᴇ: *.on nsfw*");
};
handler.command = handler.help = ["foto"], handler.tags = ["anime"];
export default handler;