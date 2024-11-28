let handler = (m) => m;
import { clockString } from "../../lib/other-function.js";
handler.all = async function (m) {
  let setting = db.data.settings[this.user.jid];
  if (db.data.chats[m.chat].autoBio && 1 * new Date() - setting.status > 1e3) {
    let bio = `🚀 Aktif selama ${clockString(1e3 * process.uptime())}\n${htjava} Mode: ${opts.self || setting.self ? "Private" : opts.gconly ? "Hanya Grup" : "Publik"}\n${htjava} 🥀 By ${author}\n${cmenuf}`;
    await this.updateProfileStatus(bio).catch((_) => _),
      (setting.status = 1 * new Date());
  }
};
export default handler;
