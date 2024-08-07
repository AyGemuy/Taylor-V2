import {
  ImageProcessor
} from "../../lib/tools/imgonline.js";
const convert = new ImageProcessor(),
  handler = async (m, {
    command,
    usedPrefix,
    conn,
    args,
    text
  }) => {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime || !/image\/(png|jpe?g)/.test(mime)) throw "No valid image found";
    if (!text) return m.reply("ℹ️ *Daftar Fungsi Imgonline Link:*\n- 1. autoColorContrast\n- 2. autoColorImage\n- 3. compressImage\n- 4. convertImage\n- 5. createQr\n- 6. distortionImage\n- 7. enlargeImage\n- 8. fairyTaleEffect\n- 9. frameBlurImage\n- 10. frameImage\n- 11. ocrImage\n- 12. replaceBackground\n- 13. resizeImage\n- 14. retouchPhoto\n- 15. scanQr\n- 16. textOnImage\n- 17. tiltImage\n- 18. whirlpoolEffect\n\nGunakan format: .imgonline <urutan>|[order1]|[order2] atau .imgonline <urutan>\nContoh Penggunaan: .imgonline 1|order1|order2 atau .imgonline 1");
    try {
      let [order, order1, order2] = text.includes("|") ? text.split("|") : [text];
      if (!order) throw new Error("ℹ️ Input tidak valid. Gunakan format: .imgonline <urutan>|[order1]|[order2] atau .imgonline <urutan>\n\nℹ️ Contoh Penggunaan: .imgonline 1|order1|order2 atau .imgonline 1");
      const numericOrder = parseInt(order);
      if (isNaN(numericOrder) || numericOrder <= 0 || numericOrder > 18) throw new Error("ℹ️ Urutan fungsi tidak valid. Gunakan nomor fungsi antara 1 dan 18.");
      let output;
      m.reply("*ᴜᴘʟᴏᴀᴅɪɴɢ...*");
      let media = await q?.download();
      1 === numericOrder ? output = await convert.autoColorContrast(media) : 2 === numericOrder ? output = await convert.autoColorImage(media) : 3 === numericOrder ? output = await convert.compressImage(media) : 4 === numericOrder ? output = await convert.convertImage(media, order1 || null, order2 || null) : 5 === numericOrder ? output = await convert.createQr(media) : 6 === numericOrder ? output = await convert.distortionImage(media, order1 || null) : 7 === numericOrder ? output = await convert.enlargeImage(media) : 8 === numericOrder ? output = await convert.fairyTaleEffect(media) : 9 === numericOrder ? output = await convert.frameBlurImage(media, order1 || null) : 10 === numericOrder ? output = await convert.frameImage(media, order1 || null) : 11 === numericOrder ? output = await convert.ocrImage(media) : 12 === numericOrder ? output = await convert.replaceBackground(media, order1 || null) : 13 === numericOrder ? output = await convert.resizeImage(media, order1 || null, order2 || null) : 14 === numericOrder ? output = await convert.retouchPhoto(media) : 15 === numericOrder ? output = await convert.scanQr(media) : 16 === numericOrder ? output = await convert.textOnImage(media, order1 || null) : 17 === numericOrder ? output = await convert.tiltImage(media) : 18 === numericOrder && (output = await convert.whirlpoolEffect(media)),
        output && output.url && output.url.length > 0 ? await conn.sendFile(m.chat, output.url[0], "", "", m) : output && output.text && await conn.reply(m.chat, output.text, m);
    } catch (error) {
      m.reply(`Terjadi kesalahan: ${error.message}`);
    }
  };
handler.help = ["imgonline type"], handler.tags = ["tools"], handler.command = /^(imgonline)$/i;
export default handler;