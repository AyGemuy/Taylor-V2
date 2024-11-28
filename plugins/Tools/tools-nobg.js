import uploadImage from "../../lib/uploadImage.js";
import { webp2png } from "../../lib/webp2mp4.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || "";
  const keyList = [
    "wYj4CmzTa1CJX2YVsCZdnsZq",
    "hz99DPWitBbRAgnjTrtG3rEF",
    "aGSQ7rF4TnnUeytKEbX72fSN",
  ];
  const nobgKey = keyList[Math.floor(Math.random() * keyList.length)];
  console.log("Processing started...");
  m.react(wait);
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    const methods = [
      async () => {
        console.log("Trying Photiu method...");
        const img = await q.download();
        const imageBuffer = new Uint8Array(img);
        const url = "https://www.photiu.ai/api/rmb";
        const formData = new FormData();
        formData.append(
          "upfile",
          new Blob([imageBuffer], {
            type: "image/jpeg",
          }),
        );
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await response.arrayBuffer();
        if (data.byteLength < 1024)
          throw new Error("Ukuran gambar kurang dari 1KB");
        await conn.sendFile(
          m.chat,
          Buffer.from(data),
          "removebg.png",
          `*✨ Latar belakang berhasil dihapus!*\n*Dibuat oleh:* Photiu`,
          m,
        );
        console.log("Photiu method succeeded.");
      },
      async () => {
        console.log("Trying Remove.bg method...");
        const img = await q.download();
        const formData = new FormData();
        formData.append("size", "auto");
        formData.append(
          "image_file",
          new Blob([new Uint8Array(img)], {
            type: "image/png",
          }),
        );
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          body: formData,
          headers: {
            "X-Api-Key": nobgKey,
          },
        });
        const buffer = await response.arrayBuffer();
        if (buffer.byteLength < 1024)
          throw new Error("Ukuran gambar kurang dari 1KB");
        await conn.sendFile(
          m.chat,
          Buffer.from(buffer),
          "",
          `*✨ Latar belakang berhasil dihapus!*\n*Dibuat oleh:* Remove.bg`,
          m,
        );
        console.log("Remove.bg method succeeded.");
      },
      async () => {
        console.log("Trying Lolhuman method...");
        const img = await webp2png(await q.download());
        const url = API(
          "lolhuman",
          "/api/removebg",
          {
            img: img,
          },
          "apikey",
        );
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        if (buffer.byteLength < 1024)
          throw new Error("Ukuran gambar kurang dari 1KB");
        await conn.sendFile(
          m.chat,
          Buffer.from(buffer),
          "removebg.png",
          `*✨ Latar belakang berhasil dihapus!*\n*Dibuat oleh:* Lolhuman`,
          m,
        );
        console.log("Lolhuman method succeeded.");
      },
    ];
    for (const method of methods) {
      try {
        await method();
        m.react(sukses);
        return;
      } catch (e) {
        console.log(`Method failed: ${e.message}`);
        if (e.message === "Ukuran gambar kurang dari 1KB") {
          m.react(eror);
          m.reply(
            "Gambar yang dihasilkan kurang dari 1KB, tidak dapat menghapus latar belakang.",
          );
          return;
        }
        continue;
      }
    }
    m.react(eror);
    m.reply("Semua metode gagal untuk memproses gambar. Silakan coba lagi.");
    console.log("All methods failed.");
  } else {
    m.react(eror);
    m.reply(
      `Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`,
    );
    console.log("No valid image detected.");
  }
};
handler.help = ["removebg"];
handler.tags = ["tools"];
handler.command = /^(no|remove)bg$/i;
export default handler;
