import { somematch } from "../../lib/other-function.js";
const teks =
  "0 - Ya\n1 - Tidak\n2 - Saya Tidak Tau\n3 - Mungkin\n4 - Mungkin Tidak\n5 - Kembali ke pertanyaan sebelumnya";
export async function before(m) {
  if (!db.data.users[m.sender].banned) {
    if (!(m.quoted && m.quoted?.fromMe && m.quoted?.isBaileys && m.text.trim()))
      return !0;
    if (
      ((db.data.game.akinator = db.data.game.akinator || {}),
      db.data.game.akinator[m.sender] &&
        m.quoted?.id == db.data.game.akinator[m.sender].msg.key.id)
    ) {
      try {
        if (!somematch(["0", "1", "2", "3", "4", "5"], m.text.trim()))
          return await this.sendMessage(
            m.chat,
            {
              text: `[!] Jawab dengan angka 1, 2, 3, 4, atau 5\n\n${teks}`,
            },
            {
              quoted: db.data.game.akinator[m.sender].msg,
            },
          );
        if (
          "0" === db.data.game.akinator[m.sender].step &&
          "5" === m.text.trim()
        )
          return m.reply("Anda telah mencapai pertanyaan pertama");
        if ("5" === m.text.trim()) {
          await db.data.game.akinator[m.sender].cancelAnswer();
          let link =
            db.data.game.akinator[m.sender].progress <= 20
              ? "https://id.akinator.com/assets/img/akitudes_670x1096/defi.png"
              : db.data.game.akinator[m.sender].progress <= 50
                ? "https://id.akinator.com/assets/img/akitudes_670x1096/inspiration_legere.png"
                : db.data.game.akinator[m.sender].progress <= 70
                  ? "https://id.akinator.com/assets/img/akitudes_670x1096/serein.png"
                  : db.data.game.akinator[m.sender].progress <= 85
                    ? "https://id.akinator.com/assets/img/akitudes_670x1096/inspiration_forte.png"
                    : db.data.game.akinator[m.sender].progress <= 95
                      ? "https://id.akinator.com/assets/img/akitudes_670x1096/confiant.png"
                      : db.data.game.akinator[m.sender].progress <= 100
                        ? "https://id.akinator.com/assets/img/akitudes_670x1096/mobile.png"
                        : "https://id.akinator.com/assets/img/akitudes_670x1096/defi.png";
          let soal = await this.sendMessage(
            m.chat,
            {
              text: `🎮 *Akinator Back* 🎮\n_step ${db.data.game.akinator[m.sender].step} ( ${db.data.game.akinator[m.sender].progress.toFixed(2)} % )_\n\n@${m.sender.split("@")[0]}\n    ${db.data.game.akinator[m.sender].question}\n\n${teks}`,
              contextInfo: {
                mentionedJid: [m.sender],
              },
            },
            {
              quoted: m,
            },
          );
          (db.data.game.akinator[m.sender].msg = soal),
            (db.data.game.akinator[m.sender].step =
              db.data.game.akinator[m.sender].step),
            (db.data.game.akinator[m.sender].progress =
              db.data.game.akinator[m.sender].progress);
        } else if (
          (await db.data.game.akinator[m.sender].answer(m.text.trim()),
          db.data.game.akinator[m.sender].isWin)
        ) {
          const anu = db.data.game.akinator[m.sender];
          await this.sendMessage(
            m.chat,
            {
              image: {
                url: anu.sugestion_photo,
              },
              caption: `🎮 *Akinator Answer* 🎮\n\nDia adalah *${anu.sugestion_name}*\n_${anu.sugestion_desc}_`,
              contextInfo: {
                mentionedJid: [m.sender],
              },
            },
            {
              quoted: m,
            },
          ),
            delete db.data.game.akinator[m.sender];
        } else {
          let link =
            db.data.game.akinator[m.sender].progress <= 20
              ? "https://id.akinator.com/assets/img/akitudes_670x1096/defi.png"
              : db.data.game.akinator[m.sender].progress <= 50
                ? "https://id.akinator.com/assets/img/akitudes_670x1096/inspiration_legere.png"
                : db.data.game.akinator[m.sender].progress <= 70
                  ? "https://id.akinator.com/assets/img/akitudes_670x1096/serein.png"
                  : db.data.game.akinator[m.sender].progress <= 85
                    ? "https://id.akinator.com/assets/img/akitudes_670x1096/inspiration_forte.png"
                    : db.data.game.akinator[m.sender].progress <= 95
                      ? "https://id.akinator.com/assets/img/akitudes_670x1096/confiant.png"
                      : db.data.game.akinator[m.sender].progress <= 100
                        ? "https://id.akinator.com/assets/img/akitudes_670x1096/mobile.png"
                        : "https://id.akinator.com/assets/img/akitudes_670x1096/defi.png";
          let soal = await this.sendMessage(
            m.chat,
            {
              text: `🎮 *Akinator* 🎮\n_step ${db.data.game.akinator[m.sender].step} ( ${db.data.game.akinator[m.sender].progress.toFixed(2)} % )_\n\n@${m.sender.split("@")[0]}\n    ${db.data.game.akinator[m.sender].question}\n\n${teks}`,
              contextInfo: {
                mentionedJid: [m.sender],
              },
            },
            {
              quoted: m,
            },
          );
          (db.data.game.akinator[m.sender].msg = soal),
            (db.data.game.akinator[m.sender].step =
              db.data.game.akinator[m.sender].step),
            (db.data.game.akinator[m.sender].progress =
              db.data.game.akinator[m.sender].progress);
        }
      } catch (e) {
        m.react(eror);
        console.log(e);
      }
      return !0;
    }
  }
}
