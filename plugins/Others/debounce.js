import {
  spawn
} from "child_process";
const handler = async (m, {
  conn
}) => {
  if (!process.send) throw "Dont: node main.js\nDo: node index.js";
  if (conn.user.jid != conn.user.jid) throw "Error. Tempat run tidak mendukung fitur debounce.";
  m.reply("Sedang merestart bot..."), await db.write(), process.send("reset");
};
handler.help = ["debounce" + (process.send ? "" : " (Tidak Bekerja)")], handler.tags = ["host"],
  handler.command = /^debounce$/i, handler.owner = !0;
export default handler;