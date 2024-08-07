import PhoneNumber from "awesome-phonenumber";
import {
  Saweria
} from "../../lib/saweria.js";

function formatter(value) {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculatePPN(value) {
  return .1 * value;
}

function removeItem(array, item) {
  return array.filter(elem => !(elem.jid === item.jid && elem.state === item.state));
}
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  conn.saweria = conn.saweria || "", conn.gateway = conn.gateway || [];
  const Pay = new Saweria(conn.saweria);
  if ("payment" === args[0] || "unban" === args[0] || "unblock" === args[0]) {
    const itemName = args[0]?.toUpperCase(),
      price = 5e3,
      pending = conn.gateway.find(v => v.jid === m.sender && "PENDING" === v.state),
      process = conn.gateway.find(v => v.jid === m.sender && "PROCESS" === v.state);
    if (pending || process) return m.reply(`🚩 Selesaikan terlebih dahulu proses sebelumnya atau kirim *${usedPrefix}saweria n* untuk membatalkan.`);
    const formattedPrice = formatter(price),
      formattedPPN = formatter(calculatePPN(price));
    let teks = `Anda akan melakukan pembelian ${itemName} dengan rincian sebagai berikut:\n\n`;
    teks += `• Nomor: ${PhoneNumber("+" + m.sender.split("@")[0]).getNumber("international")}\n`,
      teks += `• Harga: Rp. ${formattedPrice},-\n`, teks += `• PPN: Rp. ${formattedPPN},-\n\n`,
      teks += `Kirim *${usedPrefix}saweria y* untuk melanjutkan proses pembayaran atau kirim *${usedPrefix}saweria n* untuk membatalkan.`,
      m.reply(teks).then(() => {
        conn.gateway.push({
          state: "PENDING",
          jid: m.sender,
          amount: price,
          admin: calculatePPN(price),
          package: itemName,
          created_at: Date.now(),
          receipt: ""
        });
      });
  } else if ("y" === args[0]) {
    const gateway = conn.gateway.find(v => v.jid === m.sender && "PENDING" === v.state);
    if (!gateway) return;
    m.reply("Menghasilkan QR Code pembayaran...");
    const total = parseInt(gateway.amount) + parseInt(gateway.admin),
      json = await Pay.createPayment(total, gateway.package);
    if (!json.status) return m.reply(`Terjadi kesalahan saat menghasilkan pembayaran:\n${json.msg}`);
    let teks = "Info Pembayaran\n\n";
    teks += `Pembayaran sebelum ${json.data.expired_at} WIB\n\n`, teks += `• ID Pembayaran: ${json.data.id}\n`,
      teks += `• Total Pembayaran: Rp. ${formatter(json.data.amount_raw)},-\n\n`, teks += "Catatan:\n",
      teks += "- Kode QR hanya valid untuk 1 kali transfer.\n", teks += `- Setelah pembayaran, tunggu sebentar lalu kirim *${usedPrefix}saweria check* untuk cek status pembayaran.\n`,
      teks += "- Jika pembayaran berhasil, status akan diperbarui otomatis\n", teks += `- Untuk bantuan lebih lanjut, hubungi *${usedPrefix}owner*`,
      await conn.sendFile(m.chat, Buffer.from(json.data.qr_image.split(",")[1], "base64"), "qr.png", teks, m).then(() => {
        gateway.state = "PROCESS", gateway.receipt = json.data.id;
      });
  } else if ("n" === args[0]) {
    const pending = conn.gateway.find(v => v.jid === m.sender && "PENDING" === v.state),
      process = conn.gateway.find(v => v.jid === m.sender && "PROCESS" === v.state);
    if (!pending && !process) return m.reply("🚩 Pembelian berhasil dibatalkan.");
    m.reply("🚩 Pembelian berhasil dibatalkan."), pending && (conn.gateway = removeItem(conn.gateway, pending)),
      process && (conn.gateway = removeItem(conn.gateway, process));
  } else if ("check" === args[0]) {
    const gateway = conn.gateway.find(v => v.jid === m.sender && "PROCESS" === v.state);
    if (!gateway) return;
    m.reply("Memeriksa status pembayaran...");
    const json = await Pay.checkPayment(gateway.receipt);
    if (!json.status) return m.reply(`Terjadi kesalahan saat memeriksa status pembayaran:\n${json.msg}`);
    m.reply(`Status Pembayaran: ✅ ${json.msg}`).then(() => {
      let data = db.users.find(v => v.jid === gateway.jid);
      "PREMIUM" === gateway.package ? (data.limit += 5e3, data.expired += data.premium ? 2592e6 : Date.now() + 2592e6, data.premium = !0) : "UNBAN" === gateway.package ? (data.banned = !1, data.banTemp = 0, data.banTimes = 0) : "UNBLOCK" === gateway.package ? conn.updateBlockStatus(gateway.jid, "unblock") : "DEPOSITO" === gateway.package && (data.balance += gateway.amount),
        conn.gateway = removeItem(conn.gateway, gateway);
    });
  } else if ("login" === args[0]) {
    if (!isOwner) return m.reply("Hanya owner yang dapat menggunakan perintah ini.");
    if (!args[1] || !args[2]) return m.reply("Penggunaan: *" + usedPrefix + "login email@mail.com password*");
    let email = args[1],
      password = args[2];
    m.reply("Sedang login...");
    const json = await Pay.login(email, password);
    if (!json.status) return m.reply(`Terjadi kesalahan saat login:\n${json.msg}`);
    m.reply(`✅ Login Sukses : ${json.data.user_id}`).then(() => {
      conn.saweria = json.data.user_id;
    });
  } else m.reply(`Penggunaan:\n• *${usedPrefix}saweria payment* - Memulai pembelian\n• *${usedPrefix}saweria unban* - Membuka banned\n• *${usedPrefix}saweria unblock* - Membuka block\n• *${usedPrefix}saweria y* - Melanjutkan pembayaran\n• *${usedPrefix}saweria n* - Membatalkan pembelian\n• *${usedPrefix}saweria check* - Memeriksa status pembayaran\n• *${usedPrefix}saweria login email@mail.com password* - Login ke akun Saweria`);
};
handler.help = ["saweria"], handler.tags = ["tools"], handler.command = /^(saweria)$/i;
export default handler;