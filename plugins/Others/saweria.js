import { Saweria } from "../../lib/saweria.js";
let handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbbot = db.data.dbbot || {};
  db.data.dbbot.saweria = db.data.dbbot.saweria || {};
  const subCommand = args[0]?.toLowerCase();
  if (db.data.dbbot.saweria[m.sender]?.status === false) {
    return m.reply(
      `*⚠️ Anda masih memiliki sesi deposit yang belum diselesaikan.*\nHarap selesaikan deposit sebelumnya terlebih dahulu dengan membalas pesan sebelumnya dengan *Y* untuk melanjutkan atau *N* untuk membatalkan.`,
    );
  }
  switch (subCommand) {
    case "login": {
      const [_, email, password] = args;
      if (!email || !password) {
        return m.reply(
          `*❌ Format salah!*\n\n*📌 Contoh:* ${usedPrefix + command} login [email] [password]\n\nSilakan masukkan email dan password dengan benar.`,
        );
      }
      try {
        const sawer = new Saweria();
        const hasil = await sawer.login(email, password);
        if (hasil?.status) {
          db.data.dbbot.saweria.id = hasil?.data?.user_id;
          m.reply(
            `*✅ Berhasil Login!*\n\n🎉 Anda telah berhasil login ke Saweria.\n\n*• User ID:* *[ ${hasil.data.user_id} ]*`,
          );
        } else {
          m.reply(`*❌ Error:* ${hasil?.msg}`);
        }
      } catch (e) {
        m.reply(`*❌ Error:* ${e.message}`);
      }
      break;
    }
    case "deposit": {
      if (!db.data.dbbot.saweria.id) {
        return m.reply(
          `*⚠️ Anda belum login ke Saweria. Silakan login terlebih dahulu dengan perintah ${usedPrefix + command} login [email] [password].*`,
        );
      }
      const amount = args[1];
      if (!amount || isNaN(amount) || amount < 1e3 || amount > 1e6) {
        return m.reply(
          `*🚫 Jumlah deposit tidak valid!*\n\n*📌 Contoh:* ${usedPrefix + command} deposit 50000\n\nJumlah deposit harus antara 1.000 dan 1.000.000.`,
        );
      }
      m.reply("*⏳ Sedang memproses deposit Anda...*");
      try {
        const sawer = new Saweria(db.data.dbbot.saweria.id);
        const qris = (await sawer.createQr(amount, "Deposit saldo"))?.data;
        const caption = `*🏦 [ DEPOSIT SALDO ]*
*• Jumlah:* ${Intl.NumberFormat().format(amount)}
*• Mata Uang:* ${qris?.currency}
*• Pesan:* ${qris?.message}
*• ID Deposit:* ${qris?.id}
*• Berlaku hingga:* ${qris?.expired_at}

📷 *Silakan scan QR Code di atas menggunakan e-Wallet Anda.*
✅ *QRIS ini mendukung: DANA, OVO, Gopay, ShopeePay, dll.*

*⚠️ Konfirmasi Deposit:*
Balas dengan *Y* untuk melanjutkan atau *N* untuk membatalkan.`;
        const { key } = await conn.sendMessage(
          m.chat,
          {
            image: Buffer.from(qris?.qr_image?.substring(22), "base64"),
            caption: caption,
          },
          {
            quoted: m,
          },
        );
        db.data.dbbot.saweria[m.sender] = {
          status: false,
          jid: m.sender,
          name: m.name,
          nominal: amount,
          id: qris?.id,
          reply: key,
          timeout: setTimeout(async () => {
            if (!db.data.dbbot.saweria[m.sender]?.status) {
              await conn.sendMessage(m.chat, {
                delete: key,
              });
              await conn.sendMessage(
                m.chat,
                {
                  text: `*❌ SESI KADALUARSA*\nSilakan ketik ulang *${usedPrefix + command} deposit ${amount}* untuk melanjutkan deposit.`,
                },
                {
                  quoted: key,
                },
              );
              delete db.data.dbbot.saweria[m.sender];
            }
          }, 6e5),
        };
      } catch (e) {
        m.reply(`*❌ Error:* ${e.message}`);
      }
      break;
    }
    default:
      m.reply(
        `*❌ Perintah tidak dikenali!*\n\n*📌 Contoh Penggunaan:*\n- ${usedPrefix + command} login [email] [password]\n- ${usedPrefix + command} deposit [jumlah]\n\nPastikan Anda memasukkan perintah dengan benar.`,
      );
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbbot = db.data.dbbot || {};
  db.data.dbbot.saweria = db.data.dbbot.saweria || {};
  if (
    !db.data.dbbot.saweria.id ||
    m.isBaileys ||
    !m.text ||
    !(m.sender in db.data.dbbot.saweria)
  )
    return;
  const input = m.text.trim().toUpperCase();
  const { id, nominal, reply } = db.data.dbbot.saweria[m.sender] || {};
  if (input && m.quoted?.id === reply?.id) {
    if (/^(Y|YES|YEAH|YUP)$/i.test(input)) {
      clearTimeout(db.data.dbbot.saweria[m.sender]?.timeout);
      try {
        const sawer = new Saweria(db.data.dbbot.saweria.id);
        const cek = await sawer.cekPay(id);
        if (cek?.msg === "SUCCESS") {
          db.data.users[m.sender] = {
            ...db.data.users[m.sender],
            saldo: (db.data.users[m.sender]?.saldo || 0) + nominal,
            money: (db.data.users[m.sender]?.money || 0) + nominal,
          };
          db.data.dbbot.saweria[m.sender].status = true;
          const cap = `*✅ [ TRANSAKSI BERHASIL ]*
*Nama:* @${m.sender.split("@")[0]}
*Jumlah:* ${Intl.NumberFormat().format(nominal)}
*ID Deposit:* *[ ${id} ]*

${cek?.url}
Terima kasih atas deposit Anda. Saldo Anda telah diperbarui.`;
          await conn.sendMessage(
            m.chat,
            {
              text: cap,
            },
            {
              quoted: reply,
            },
          );
          setTimeout(() => delete db.data.dbbot.saweria[m.sender], 5e3);
        } else {
          console.log("[ Notifikasi Sistem ] Menunggu Pembayaran");
          await conn.sendMessage(
            m.chat,
            {
              text: `*⚠️ [ Menunggu Pembayaran ]*\nSilakan lakukan pembayaran terlebih dahulu.`,
            },
            {
              quoted: reply,
            },
          );
        }
      } catch (e) {
        console.error(e);
      }
    } else if (/^(N|NO|NOPE)$/i.test(input)) {
      clearTimeout(db.data.dbbot.saweria[m.sender]?.timeout);
      await conn.sendMessage(
        m.chat,
        {
          text: `*❌ [ TRANSAKSI DIBATALKAN ]*\nSilakan coba lagi nanti.`,
        },
        {
          quoted: reply,
        },
      );
      await conn.sendMessage(m.chat, {
        delete: reply,
      });
      delete db.data.dbbot.saweria[m.sender];
    }
  }
};
handler.help = ["saweria"].map(
  (a) => a + " login [email] [password] atau deposit [jumlah]",
);
handler.tags = ["info"];
handler.command = ["saweria"];
export default handler;
