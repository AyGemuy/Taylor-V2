import {
  toDataURL,
  toBuffer
} from "qrcode";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  let text;
  try {
    if (text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || "", !text) throw "Input teks atau reply teks yang ingin dijadikan QR!";
    m.reply("Menunggu...");
    const generate = await generateQRCode(text.slice(0, 2048)),
      caption = "Balas gambar ini untuk membaca QR. Ketik *.readqrcode* ";
    await conn.sendFile(m.chat, generate.buffer, "qrcode.png", caption, m);
  } catch (error) {
    m.reply("Terjadi kesalahan saat membuat QR code");
  }
};
handler.help = ["", "code"].map(v => "qr" + v + " <teks>"), handler.tags = ["tools"],
  handler.command = ["qr", "qrcode"];
export default handler;
const generateQRCode = async text => {
  try {
    const options = {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        quality: .3,
        margin: 1,
        color: {
          dark: "#010599FF",
          light: "#FFBF60FF"
        }
      },
      qrCodeBuffer = await toBuffer(text, options);
    return {
      buffer: qrCodeBuffer,
      base64: await toDataURL(text, options)
    };
  } catch (error) {
    throw console.error(error), new Error("Gagal membuat QR code");
  }
};