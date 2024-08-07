import cp from "child_process";
import {
  promisify
} from "util";
let exec = promisify(cp.exec).bind(cp);
const handler = async m => {
  let o;
  m.react(wait);
  try {
    o = await exec("df -h");
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
handler.help = ["statserver"], handler.tags = ["info"], handler.command = /^(statserver)$/i;
export default handler;