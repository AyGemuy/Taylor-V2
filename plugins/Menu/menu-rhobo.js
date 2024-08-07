const handler = async (m, {
  usedPrefix,
  command,
  text,
  args
}) => {
  let arr = ["loli", "shota", "akira", "akiyama", "asuna", "ayuzawa", "boruto", "chiho", "chitoge", "deidara", "eba", "elaina", "emilia", "erza", "gremory", "hestia", "hinata", "inori", "isuzu", "itachi", "itori", "kaga", "kagura", "kaori", "keneki", "kotori", "kurumi", "madara", "megumin", "mikasa", "miku", "minato", "naruto", "nezuko", "onepiece", "rize", "sagiri", "sakura", "sasuke", "shina", "shinka", "shinomia", "shizuka", "tejina", "toukachan", "tsunade", "yotsuba", "yuki", "yumeko", "yuri", "nsfwloli", "nsfw/hentai", "nsfw/pussy", "nsfw/panties", "nsfw/glasses", "oppai", "bleach", "fairytail", "asupan"];
  if (!arr.includes(tex)) return await conn.reply(m.chat, "Harap Masukan Text\n\n" + arr.split(" "), m);
  try {
    const rhobo = "http://nsfw.rhobot.my.id/" + text;
    await conn.sendFile(m.chat, rhobo, "", "*[ RESULT ]*", m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["rhobo"].map(v => v + " <id>"), handler.tags = ["internet"],
  handler.command = ["rhobo"];
export default handler;