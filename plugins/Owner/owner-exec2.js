import cp, {
  exec as _exec
} from "child_process";
import {
  promisify
} from "util";
let exec = promisify(_exec).bind(cp);
const handler = async (m, {
  conn,
  isOwner,
  command,
  text
}) => {
  if (conn.user.jid != conn.user.jid) return;
  let o;
  m.reply("Executing...");
  try {
    o = await exec(command.trimStart() + " " + text.trimEnd());
  } catch (e) {
    o = e;
  } finally {
    let {
      stdout,
      stderr
    } = o;
    stdout.trim() && m.reply(stdout), stderr.trim() && m.reply(stderr);
  }
};
handler.customPrefix = /^[$] /, handler.command = new RegExp(), handler.rowner = !0;
export default handler;