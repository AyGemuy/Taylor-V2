import { ImgGen } from "../../lib/tools/imggen.js";
import { isUrl } from "../../lib/other-function.js";
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  const imgGen = new ImgGen();
  const inputList = [
    "upscaleImage",
    "backgroundRemover",
    "removeText",
    "watermarkRemover",
    "retouchPhoto",
    "sharpenPhoto",
    "unblurImage",
    "imageRestoration",
    "colorCorrection",
    "personalizedImage",
    "headshot",
  ];
  m.react(wait);
  try {
    if (!args.length) {
      m.reply(
        `❌ Input tidak ditemukan!\n\n📋 Contoh penggunaan yang benar:\n• ${usedPrefix}${command} 1 (untuk memproses media yang dibalas dengan opsi pertama)\n• ${usedPrefix}${command} teks panjang (untuk membuat gambar berdasarkan teks)`,
      );
      return;
    }
    if (args.length > 1) {
      const result = await imgGen.gen(text);
      if (result?.images?.length) {
        for (const [i, image] of result.images.entries()) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: image,
              },
              caption: `Image *\`${i + 1}\`* of *\`${result.images.length}\`*`,
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
    const result = await imgGen.genImg(media, inputList[index]);
    if (result) {
      const imageUrls = Object.values(result).filter(isUrl);
      if (imageUrls.length) {
        for (const [i, image] of imageUrls.entries()) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: image,
              },
              caption: `Image *\`${i + 1}\`* of *\`${imageUrls.length}\`*`,
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
    } else {
      m.reply("❌ Gagal membuat gambar! Tidak ada gambar yang dihasilkan.");
    }
  } catch (error) {
    console.error(`Error in imggen handler: ${error.message}`);
    m.react(eror);
  }
};
handler.help = ["imggen *[Balas gambar]*"];
handler.tags = ["tool"];
handler.command = /^(imggen)$/i;
export default handler;
