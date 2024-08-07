import {
  execSync
} from "child_process";
import fs from "fs";
const handler = async (m, {
  conn,
  text,
  isROwner
}) => {
  if (!text) throw "Masukkan Link Repo Github Bot Ini";
  if (conn.user.jid == conn.user.jid) {
    let stdout = execSync("git remote set-url origin " + text + " && git pull " + (text ? " " + text : ""));
    isROwner && fs.readdirSync("plugins").map(v => reload("", v)), m.reply(stdout.toString());
  }
};
handler.help = ["update"], handler.tags = ["host"], handler.command = /^update$/i,
  handler.owner = !0, handler.mods = !1, handler.premium = !1, handler.group = !1,
  handler.private = !1, handler.admin = !1, handler.botAdmin = !1, handler.fail = null,
  handler.exp = 0;
export default handler;