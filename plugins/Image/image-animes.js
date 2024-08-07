import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix,
  conn
}) => {
  var list_input = ["anna", "asuna-yuki", "ayuzawa", "boruto", "chitoge", "emilia", "erza", "hinata", "inori", "kaga-kouko", "kakashi", "kaori-miyazono", "killua", "kotori-minami", "loli", "luffy", "mikasa", "mikosiba", "minato", "mio-akiyama", "mitsuki", "mizore-sirayuki", "nakiri-alice", "naruto", "natsu", "orochimaru", "rimuru", "riyas-gremori", "sagiri", "sakura", "sanji", "sarada", "sento-isuzu", "shana", "shiina", "shinka", "tanjirou", "ussop", "winry", "yukino", "yuzuki", "zoro"],
    salah_input = "*Example:*\n" + usedPrefix + command + " vietnam \n*[ Daftar animes ]*\n\n" + await ArrClean(list_input);
  if (!list_input.includes(text)) throw salah_input;
  try {
    let res = "https://api.zeeoneofc.my.id/api/anime/" + text + "?apikey=dhmDlD5x";
    m.react(wait), await conn.sendFile(m.chat, res, "result", "Result Anime: *" + text.toUpperCase() + "*", m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["animes"], handler.tags = ["internet"], handler.command = ["animes"];
export default handler;

function ArrClean(str) {
  return str.map((v, index) => ++index + ". " + v).join("\r\n");
}