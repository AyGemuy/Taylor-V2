import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix,
  conn
}) => {
  var list_input = ["alcakenya", "asupan", "aura", "ayu", "bocil", "bunga", "chika", "delvira", "geayubi", "mama-gina", "mangayutri", "nisa", "rikagusriani", "riri", "santuy", "syania", "syifa", "ukhty", "viona", "yana", "ziva"],
    salah_input = "*Example:*\n" + usedPrefix + command + " santuy \n*[ Daftar Asupans ]*\n\n" + await ArrClean(list_input);
  if (!list_input.includes(text)) throw salah_input;
  try {
    let res = "https://api.zeeoneofc.my.id/api/asupan/" + text + "?apikey=dhmDlD5x";
    m.react(wait), await conn.sendFile(m.chat, res, "result", "Result Asupan: *" + text.toUpperCase() + "*", m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["asupans"], handler.tags = ["internet"], handler.command = ["asupans"];
export default handler;

function ArrClean(str) {
  return str.map((v, index) => ++index + ". " + v).join("\r\n");
}