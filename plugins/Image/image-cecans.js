import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix,
  conn
}) => {
  var list_input = ["china", "indonesia", "japan", "jiso", "korea", "lisa", "malaysia", "rose", "thailand", "vietnam"],
    salah_input = "*Example:*\n" + usedPrefix + command + " vietnam \n*[ Daftar Cecans ]*\n\n" + await ArrClean(list_input);
  if (!list_input.includes(text)) throw salah_input;
  try {
    let res = "https://api.zeeoneofc.my.id/api/cecan/" + text + "?apikey=dhmDlD5x";
    m.react(wait), await conn.sendFile(m.chat, res, "result", "Result Cecan: *" + text.toUpperCase() + "*", m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["cecans"], handler.tags = ["internet"], handler.command = ["cecans"];
export default handler;

function ArrClean(str) {
  return str.map((v, index) => ++index + ". " + v).join("\r\n");
}