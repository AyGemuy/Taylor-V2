let handler = m => m;
handler.all = async function(m) {
  let setting = db.data.settings[this.user.jid];
  if (db.data.chats[m.chat].autoBio && 1 * new Date() - setting.status > 1e3) {
    let bio = `🚀 Aktif selama ${clockString(1e3 * process.uptime())}\n${htjava} Mode: ${opts.self || setting.self ? "Private" : opts.gconly ? "Hanya Grup" : "Publik"}\n${htjava} 🥀 By ${author}\n${cmenuf}`;
    await this.updateProfileStatus(bio).catch(_ => _), setting.status = 1 * new Date();
  }
};
export default handler;

function clockString(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " Hari ️", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " Jam ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " Menit ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " Detik "].map(v => v.toString().padStart(2, 0)).join("");
}