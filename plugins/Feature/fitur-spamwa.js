const handler = async (m, {
  conn,
  text
}) => {
  let [nomor, pesan, jumlah] = text.split(/[^\w\s]/g);
  if (!nomor) throw "*[ ⚠️ ] Harap masukkan nomor tujuan untuk melakukan spam pesan!*";
  if (!pesan) throw "*[ ⚠️ ] Harap masukkan pesan yang ingin di-spam!*";
  if (jumlah && isNaN(jumlah)) throw "*[ ⚠️ ] Jumlah pesan harus berupa angka!*";
  let fixedNumber = nomor.replace(/[-+<>@]/g, "").replace(/ +/g, "").replace(/^[0]/g, "62") + "@s.whatsapp.net",
    fixedJumlah = jumlah ? 1 * jumlah : 10;
  if (fixedJumlah > 10) throw "*[ ⚠️ ] Terlalu banyak pesan! Jumlah harus kurang dari 10 pesan*️";
  m.reply(`*[❗] Spam pesan ke nomor ${nomor} berhasil dilakukan*\n*Jumlah terkirim: ${fixedJumlah} kali!*`);
  for (let i = fixedJumlah; i > 1; i--) 0 !== i && await conn.reply(fixedNumber, pesan.trim(), m);
};
handler.help = ["spamwa <number>|<message>|<no of messages>"], handler.tags = ["tools"],
  handler.command = /^spam(wa)?$/i, handler.group = !1, handler.premium = !0, handler.private = !0,
  handler.limit = !0;
export default handler;