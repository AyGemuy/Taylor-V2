import cp from "child_process";
import {
  promisify
} from "util";
let exec = promisify(cp.exec).bind(cp);
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let teks = m.quoted ? m.quoted?.text : text;
  if (!teks) throw `Encode teks apa?\n\ncontoh:\n${usedPrefix + command} ea`;
  m.react(wait);
  let o, textb64 = Buffer.from(teks, "utf-8").toString("base64");
  try {
    o = await exec(`php php/ROT.php --text ${textb64}`);
  } catch (e) {
    o = e;
  } finally {
    let {
      stdout,
      stderr
    } = o;
    stdout.trim() && m.reply(stdout);
  }
};
handler.help = ["rot <text>"], handler.tags = ["tools", "php"], handler.command = /^(rot)$/i;
export default handler;