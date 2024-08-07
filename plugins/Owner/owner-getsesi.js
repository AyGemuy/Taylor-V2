import {
  exec as _exec
} from "child_process";
import {
  promisify
} from "util";
import fs from "fs";
const exec = promisify(_exec),
  handler = async (m, {
    conn,
    isOwner,
    text
  }) => {
    if ("single" === text) {
      m.reply("Tunggu Sebentar, Sedang mengambil file sesi mu");
      try {
        const sesi = await fs.readFileSync("./session.data.json", "utf8");
        conn.sendMessage(m.chat, {
          document: Buffer.from(sesi),
          mimetype: "application/json",
          fileName: "session.data.json"
        }, {
          quoted: m
        });
      } catch (e) {
        m.reply("Failed to read session data file.");
      }
    } else if ("multi" === text)
      if (isOwner) {
        m.reply("Executing...");
        const compressedFilePath = "TaylorSession.tar.gz";
        try {
          await exec("rm -rf TaylorSession.tar.gz && tar -czf TaylorSession.tar.gz TaylorSession"),
            m.reply("Successfully created TaylorSession.tar.gz!");
        } catch (e) {
          m.reply("Failed to create TaylorSession.tar.gz");
        }
        if (fs.existsSync(compressedFilePath)) {
          const compressedData = fs.readFileSync(compressedFilePath);
          conn.sendMessage(m.chat, {
            document: Buffer.from(compressedData),
            mimetype: "application/gz",
            fileName: "TaylorSession.tar.gz"
          }, {
            quoted: m
          });
        } else m.reply("File not found. Compression may have failed.");
      } else m.reply("Permission denied. You are not the owner.");
    else m.reply("Masukkan input single/multi");
  };
handler.help = ["getsessi"], handler.tags = ["owner"], handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i,
  handler.rowner = !0;
export default handler;