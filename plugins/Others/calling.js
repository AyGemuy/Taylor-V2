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
    o = await exec("python3 ./py/call/calling.py " + text);
  } catch (e) {
    o = e;
  } finally {
    let {
      stdout
    } = o;
    await conn.reply(m.chat, stdout, m);
  }
};
handler.help = ["calling"], handler.tags = ["info"], handler.command = ["calling"];
export default handler;