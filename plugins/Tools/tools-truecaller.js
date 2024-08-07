import {
  TrueLogin,
  TrueOtp,
  TrueSearch,
  TrueSearchBulk
} from "../../lib/info/truecaller.js";
import chalk from "chalk";
const handler = async (m, {
  conn,
  command,
  usedPrefix,
  text
}) => {
  conn.truecallerIds = conn.truecallerIds || {};
  if (!text) {
    return m.reply(`\nMasukkan query. Contoh: ${usedPrefix + command} login number\nPenggunaan:\n${usedPrefix + command} verify number\n${usedPrefix + command} search number\n${usedPrefix + command} bulk number\n`.trim());
  }
  try {
    let res, message = "";
    const [method, number] = text.split(" ");
    if (method && number) {
      switch (method) {
        case "login":
          res = await TrueLogin(number);
          console.log(res);
          if (res.key) {
            message = `Login berhasil. Key disimpan: ${res.key}`;
            conn.truecallerIds = {
              key: res.key,
              number: number
            };
          } else {
            message = "Gagal melakukan login.";
          }
          break;
        case "verify":
          const user = conn.truecallerIds;
          if (user && user.number || "6282195322106" && user.key || "61980947-c849-4617-8785-0a181e0ddd5c") {
            res = await TrueOtp(user.number, user.key, number);
            console.log(res);
            if (res.token) {
              message = `Verifikasi berhasil. Token: ${res.token}`;
              user.token = res.token;
            } else {
              message = "Gagal melakukan verifikasi.";
            }
          } else {
            message = "Anda harus login terlebih dahulu sebelum melakukan verifikasi.";
          }
          break;
        case "search":
          const userSearch = conn.truecallerIds;
          if (userSearch && userSearch.token || "a1i0i--nfB7ORkBkyt4aqukpbCY3c1tNCde0aXluc9jxmxzeMdUrNQFkZ7JqHyI0") {
            res = await TrueSearch(userSearch.token, number);
            console.log(res);
            message = res ? `${JSON.stringify(res, null, 2)}` : "Gagal melakukan pencarian.";
          } else {
            message = "Anda harus login terlebih dahulu sebelum melakukan pencarian.";
          }
          break;
        case "bulk":
          const userBulk = conn.truecallerIds;
          if (userBulk && userBulk.token || "a1i0i--nfB7ORkBkyt4aqukpbCY3c1tNCde0aXluc9jxmxzeMdUrNQFkZ7JqHyI0") {
            res = await TrueSearchBulk(userBulk.token, number);
            console.log(res);
            message = res ? `${JSON.stringify(res, null, 2)}` : "Gagal melakukan pencarian bulk.";
          } else {
            message = "Anda harus login terlebih dahulu sebelum melakukan pencarian bulk.";
          }
          break;
        default:
          message = "Method tidak valid. Gunakan 'login', 'verify', 'search', atau 'bulk'. ❌";
      }
    } else {
      message = "Format pesan tidak sesuai. Pastikan Anda telah memasukkan method dan nomor dengan benar. ❗";
    }
    m.reply(message);
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.reply(`Error: ${error.message} ❌`);
  }
};
handler.help = ["truecaller"];
handler.tags = ["ai"];
handler.command = /^(truecaller)$/i;
export default handler;