import cp, {
  exec as _exec
} from "child_process";
import {
  promisify
} from "util";
import fs from "fs";
let exec = promisify(_exec).bind(cp);
const handler = async (m, {
  conn,
  isOwner,
  command,
  text
}) => {
  if (conn.user.jid != conn.user.jid) return;
  m.reply("Executing...");
  if (fs.existsSync("node_modules.tar.gz")) m.reply("node_modules.tar.gz already exists, skipping creation...");
  else try {
    await exec("tar -czf node_modules.tar.gz node_modules"), m.reply("Successfully created node_modules.tar.gz!");
  } catch (e) {
    return void m.reply("Failed to create node_modules.tar.gz");
  }
  if (fs.existsSync("node_modules.tar.gz")) {
    const compressedData = fs.readFileSync("node_modules.tar.gz");
    await conn.sendMessage(m.chat, {
      document: compressedData,
      mimetype: "application/gz",
      fileName: "node_modules.tar.gz"
    }, {
      quoted: m
    });
  } else m.reply("File not found. Compression may have failed.");
};
handler.help = ["modules"], handler.tags = ["owner"], handler.command = /^(modules)$/i,
  handler.rowner = !0;
export default handler;