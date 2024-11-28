import { performance } from "perf_hooks";
const SPAM_THRESHOLD = 5,
  COOLDOWN_DURATION = 1e4,
  BAN_DURATION = 5e3;
export async function before(m, { isOwner }) {
  const users = db.data.users,
    chats = db.data.chats;
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  if (
    chats[m.chat].antiSpam &&
    !m.isBaileys &&
    !["protocolMessage", "pollUpdateMessage", "reactionMessage"].includes(
      m.mtype,
    ) &&
    m.msg &&
    m.message &&
    m.key.remoteJid === m.chat &&
    !users[m.sender].banned &&
    !chats[m.chat].isBanned
  ) {
    (db.data.database.spam = db.data.database.spam || {}),
      (db.data.database.spam[m.sender] = db.data.database.spam[m.sender] || {
        count: 0,
        lastspam: 0,
      });
    const now = performance.now();
    if (now - db.data.database.spam[m.sender].lastspam < 1e4) {
      if (
        (db.data.database.spam[m.sender].count++,
        db.data.database.spam[m.sender].count >= 5)
      ) {
        if (!isOwner)
          (users[m.sender].banned = !0),
            (db.data.database.spam[m.sender].lastspam = now + 5e3),
            setTimeout(() => {
              (users[m.sender].banned = !1),
                (db.data.database.spam[m.sender].count = 0),
                m.reply(
                  "✅ *Cooldown selesai*\nAnda bisa mengirim pesan lagi.",
                );
            }, 5e3);
        const remainingCooldown = Math.ceil(
            (db.data.database.spam[m.sender].lastspam - now) / 1e3,
          ),
          message =
            m.mtype
              .replace(/message$/i, "")
              .replace("audio", m.msg.ptt ? "PTT" : "audio")
              .replace(/^./, (v) => v.toUpperCase()) || "Unknown";
        return m.reply(
          `❌ *Mohon jangan spam ${message}*\nTunggu setelah ${remainingCooldown} detik`,
        );
      }
    } else db.data.database.spam[m.sender].count = 0;
    db.data.database.spam[m.sender].lastspam = now;
  }
}
