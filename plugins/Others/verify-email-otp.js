import fetch from "node-fetch";
let timeout = 12e4;
let poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    m.react(wait);
    if (!db.data.dbbot.regmail) db.data.dbbot.regmail = {};
    let id = m.chat;
    if (id in db.data.dbbot.regmail) {
      return (
        await conn.reply(
          m.chat,
          "*❗ Selesaikan registrasi email ini terlebih dahulu!*",
          db.data.dbbot.regmail[id][0],
        ),
        false
      );
    }
    if (!text) {
      return await conn.reply(
        m.chat,
        `*Contoh*: ${usedPrefix}${command} email@gmail.com | pesan (opsional)`,
        m,
      );
    }
    let [email, message] = text.trim().split(/\s*\|\s*/);
    if (!isValidEmail(email)) {
      return await conn.reply(
        m.chat,
        `Contoh: ${usedPrefix + command} email@gmail.com | pesan (opsional)`,
        m,
      );
    }
    let generateOTP = (Math.floor(9e3 * Math.random()) + 1e3).toString();
    let avatar = await conn
      .profilePictureUrl(m.sender, "image")
      .catch(() => "https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg");
    let emailMessage =
      `
      Verifikasi Kode OTP

      Halo ${m.name},

      Kode OTP Anda adalah: ${generateOTP}

      Masukkan kode OTP di atas untuk verifikasi.

      Terima kasih!`.trim() + (message ? `\n\nPesan Anda: ${message}` : "");
    let res = await sendEmail(namebot, nameown, emailMessage, email);
    if (res.success) {
      m.react(sukses);
      let caption = `*${command.toUpperCase()}*\nReply pesan ini dan masukkan kode OTP yang dikirim ke email ${email}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hotp untuk menampilkan OTP`;
      let mesOtp = await conn.reply(m.chat, caption, m);
      db.data.dbbot.regmail[id] = [
        mesOtp,
        {
          jawaban: generateOTP,
        },
        poin,
        setTimeout(async () => {
          if (db.data.dbbot.regmail[id]) {
            await conn.reply(
              m.chat,
              `*❌ Kode verifikasi Anda telah kedaluwarsa.*\nOTP *${generateOTP}*`,
              db.data.dbbot.regmail[id][0],
            );
            await conn.sendMessage(m.chat, {
              delete: db.data.dbbot.regmail[id][0].key,
            });
            delete db.data.dbbot.regmail[id];
          }
        }, timeout),
      ];
    } else {
      m.react(eror);
      await conn.reply(m.chat, "Gagal mengirim email. Silakan coba lagi.", m);
    }
  } catch (error) {
    m.react(eror);
    await conn.reply(m.chat, "Terjadi kesalahan. Silakan coba lagi nanti.", m);
  }
};
handler.help = ["regmail"];
handler.tags = ["game"];
handler.command = /^regmail/i;
export default handler;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
async function sendEmail(botName, ownName, Message, Mail) {
  try {
    const response = await fetch("https://api.proxynova.com/v1/send_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://www.proxynova.com/tools/send-anonymous-email/",
      },
      body: new URLSearchParams({
        to: Mail,
        from: `📩 Activation by ${botName}`,
        subject: `🌟 Verifikasi Kode OTP`,
        message: Message,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error,
    };
  }
}
