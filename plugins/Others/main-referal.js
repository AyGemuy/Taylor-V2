import crypto from "crypto";
const xp_first_time = 2500,
  xp_link_creator = 15e3,
  xp_bonus = {
    5: 4e4,
    10: 1e5,
    20: 25e4,
    50: 1e6,
    100: 1e7
  },
  handler = async (m, {
    conn,
    usedPrefix,
    text
  }) => {
    let users = db.data.users;
    if (text) {
      if ("ref_count" in users[m.sender]) throw "Tidak bisa menggunakan kode referal!";
      let link_creator = (Object.entries(users).find(([, {
        ref_code
      }]) => ref_code === text.trim()) || [])[0];
      if (!link_creator) throw "Kode referal tidak valid";
      let count = users[link_creator].ref_count++,
        extra = xp_bonus[count] || 0;
      users[link_creator].exp += 15e3 + extra, users[m.sender].exp += 2500, users[m.sender].ref_count = 0,
        m.reply("\nSelamat!\n+2500 XP\n".trim()), m.reply(`\nSeseorang telah menggunakan kode referal kamu\n+${15e3 + extra} XP\n`.trim(), link_creator);
    } else {
      let code = users[m.sender].ref_code = users[m.sender].ref_code || new Array(11).fill().map(() => [..."0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"][crypto.randomInt(62)]).join("");
      users[m.sender].ref_count = users[m.sender].ref_count ? users[m.sender].ref_count : 0;
      let command_text = `${usedPrefix}ref ${code}`,
        command_link = `wa.me/${conn.user.jid.split("@")[0]}?text=${encodeURIComponent(command_text)}`,
        share_text = `\nDapatkan 2500 XP untuk yang menggunakan link/kode referal dibawah ini\n\nReferal Code: *${code}*\n\n${command_link}\n`.trim();
      m.reply(`\nDapatkan 15000 XP untuk setiap pengguna baru yang menggunakan kode referal kamu\n${users[m.sender].ref_count} orang telah menggunakan kode referal kamu\n\nKode referal kamu: ${code}\n\nBagikan link kepada teman: ${command_link}\n\natau kirim pesan kepada teman wa.me/?text=${encodeURIComponent(share_text)}\n\n${Object.entries(xp_bonus).map(([ count, xp ]) => `${count} Orang = Bonus ${xp} XP`).join("\n")}\n`.trim());
    }
  };
handler.help = ["ref"], handler.tags = ["main", "xp"], handler.command = ["ref"],
  handler.register = !0;
export default handler;