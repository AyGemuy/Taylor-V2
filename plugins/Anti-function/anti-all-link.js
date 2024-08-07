export async function before(m, {
  isAdmin,
  isBotAdmin,
  isOwner
}) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  const chat = db.data.chats[m.chat];
  const user = db.data.users[m.sender];
  const text = m.text || m.description;
  if (!text) return true;
  const linkTypes = [{
    prop: "antiLinkTik",
    name: "TikTok",
    regex: /tiktok\.com/i
  }, {
    prop: "antiLinkYt",
    name: "YouTube",
    regex: /youtube\.com|youtu\.be/i
  }, {
    prop: "antiLinkTel",
    name: "Telegram",
    regex: /t\.me/i
  }, {
    prop: "antiLinkFb",
    name: "Facebook",
    regex: /facebook\.com|fb\.me/i
  }, {
    prop: "antiLinkIg",
    name: "Instagram",
    regex: /instagram\.com/i
  }, {
    prop: "antiLinkWa",
    name: "WhatsApp",
    regex: /chat\.whatsapp\.com/i
  }, {
    prop: "antiLinkHttp",
    name: "HTTP/HTTPS",
    regex: /https?:\/\//i
  }];
  for (const {
      prop,
      name,
      regex
    }
    of linkTypes) {
    if (chat[prop] && regex.test(text)) {
      let message = `*[⚠️ Link Terdeteksi: ${name} ⚠️]*\nLink yang Anda kirim telah terdeteksi.\n`;
      if (!isBotAdmin) {
        message += "Bot bukan *Admin*, link tidak bisa dihapus.\n";
        await this.reply(m.chat, message, m);
        return true;
      }
      if (isAdmin) {
        message += "Anda adalah *Admin*, link tidak dihapus.\n";
        await this.reply(m.chat, message, m);
        return true;
      }
      user.warn += 1;
      if (!isOwner) user.banned = true;
      await this.sendMessage(m.chat, {
        delete: m.key
      });
      message += `Link telah dihapus.\nPeringatan: ${user.warn}\nStatus: ${user.banned ? "Diblokir" : "Aktif"}`;
      await this.reply(m.chat, message, m);
      return true;
    }
  }
  return true;
}