import { ImgLarger } from "../../lib/tools/imglarger.js";
import { isUrl } from "../../lib/other-function.js";
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  const imgLarger = new ImgLarger();
  const inputList = ["2x", "4x"];
  m.react(wait);
  try {
    if (!args.length) {
      m.reply(
        `❌ Input tidak ditemukan!\n\n📋 Contoh penggunaan yang benar:\n• ${usedPrefix}${command} 1 (untuk memproses media yang dibalas dengan opsi pertama)`,
      );
      return;
    }
    if (args.length > 1) {
      const result = await imgLarger.processImage(text, parseInt(args[0], 10));
      if (result?.code === 200 && result?.data?.downloadUrls?.length) {
        for (const [i, image] of result.data.downloadUrls.entries()) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: image,
              },
              caption: `Image *\`${i + 1}\`* of *\`${result.data.downloadUrls.length}\`*`,
            },
            {
              quoted: m,
            },
          );
        }
        m.react(sukses);
      } else {
        m.reply("❌ Gagal membuat gambar! Tidak ada gambar yang dihasilkan.");
      }
      return;
    }
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    if (!mime) {
      m.reply(
        `❌ Media tidak ditemukan!\n\n📋 Balas sebuah gambar dengan mengetik:\n${usedPrefix}${command} 1 (atau nomor lainnya untuk memilih opsi)`,
      );
      return;
    }
    const media = await q.download();
    if (!media) {
      m.reply(
        "❌ Gagal mengunduh media! Silakan coba lagi atau gunakan media lain.",
      );
      return;
    }
    const index = parseInt(args[0], 10) - 1;
    if (isNaN(index) || index < 0 || index >= inputList.length) {
      m.reply(
        `❌ Indeks tidak valid!\n\n📋 Pilih nomor antara 1 hingga ${inputList.length}:\n${inputList.map((type, i) => `${i + 1}. ${type}`).join("\n")}`,
      );
      return;
    }
    const scale = parseInt(inputList[index], 10);
    const result = await imgLarger.processImage(media, scale);
    if (result?.code === 200 && result?.data?.downloadUrls?.length) {
      for (const [i, image] of result.data.downloadUrls.entries()) {
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: image,
            },
            caption: `Image *\`${i + 1}\`* of *\`${result.data.downloadUrls.length}\`*`,
          },
          {
            quoted: m,
          },
        );
      }
      m.react(sukses);
    } else {
      m.reply("❌ Gagal membuat gambar! Tidak ada gambar yang dihasilkan.");
    }
  } catch (error) {
    console.error(`Error in imgLarger handler: ${error.message}`);
    m.react(eror);
  }
};
handler.help = ["imglarger *[Balas gambar]*"];
handler.tags = ["tool"];
handler.command = /^(imglarger)$/i;
export default handler;
