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
  if (!text) throw "input Nomor";
  if (conn.user.jid != conn.user.jid) return;
  let o;
  m.reply("Waiting...");
  try {
    o = await exec("python3 ./py/call/call.py " + text);
  } catch (e) {
    o = e;
  } finally {
    let {
      stdout
    } = o;
    await conn.reply(m.chat, "*Code:* " + stdout, m);
  }
};
handler.help = ["call"], handler.tags = ["info"], handler.command = ["call"];
export default handler;