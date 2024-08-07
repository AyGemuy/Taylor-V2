import {
  spawn
} from "child_process";
const handler = async (m, {
  conn,
  isROwner,
  text
}) => {
  if (!process.send) throw "Dont: node main.js\nDo: node index.js";
  if (conn.user.jid != conn.user.jid) throw "_eeeeeiiittsssss..._";
  m.reply("```R E S T A R T . . .```"), process.send("reset");
};
handler.help = ["restart"], handler.tags = ["owner"], handler.command = /^(res(tart)?)$/i,
  handler.rowner = !0;
export default handler;