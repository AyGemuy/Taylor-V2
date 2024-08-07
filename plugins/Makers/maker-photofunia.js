import fs from "fs";
import {
  photofunSearch,
  photofunEffect,
  photofunUse,
  photofunImg,
  photofunImg2,
  photofunText
} from "../../lib/maker/photofunia.js";
const handler = async (m, {
  conn,
  text
}) => {
  const parts = text.trim().split("|").map(item => item.trim());
  if (parts.length < 1) return void await conn.reply(m.chat, "📚 Contoh penggunaan: *photofunia query|page|part*", m);
  const query = parts[0],
    part = parseInt(parts[1]) || 0,
    input = parts[2];
  try {
    const data = await photofunSearch(query);
    if (data && data.length > 0)
      if (part > 0 && part <= data.length) {
        const result = data[part - 1],
          message = `\n📜 *Title:* ${result.judul}\n💬 *Comments:* ${result.desc}`,
          effect = await photofunEffect(result.link);
        if ("image" === effect[0]?.inputs[0]?.input)
          if (input)
            if (2 === effect[0]?.inputs.length) {
              const buffer = await (await conn.getFile(input.split(" ")[0])).data,
                buffer2 = await (await conn.getFile(input.split(" ")[1])).data,
                imagePath = "./tmp/image.jpg",
                imagePath2 = "./tmp/image2.jpg";
              fs.writeFileSync(imagePath, buffer), fs.writeFileSync(imagePath2, buffer2);
              const output = await photofunImg2(result.link, fs.readFileSync(imagePath), fs.readFileSync(imagePath2));
              await conn.sendFile(m.chat, output.url || result.thumb, "", message, m), fs.unlinkSync(imagePath),
                fs.unlinkSync(imagePath2);
            } else if (1 === effect[0]?.inputs.length) {
          const buffer = await (await conn.getFile(input)).data,
            imagePath = "./tmp/image.jpg";
          fs.writeFileSync(imagePath, buffer);
          const output = await photofunImg(result.link, fs.readFileSync(imagePath));
          await conn.sendFile(m.chat, output.url || result.thumb, "", message, m), fs.unlinkSync(imagePath);
        } else m.reply("Ada yang salah");
        else m.reply("Masukkan " + effect[0]?.inputs.length + " link gambar di akhir dengan pemisah spasi.");
        else if ("text" === effect[0]?.inputs[0]?.input)
          if (input) {
            const output = await photofunText(result.link, input.split("-"));
            await conn.sendFile(m.chat, output.url || result.thumb, "", message, m);
          } else m.reply("Masukkan " + effect[0]?.inputs.length + " teks Anda di akhir dengan pemisah simbol -.");
      } else if (part) await conn.reply(m.chat, "❌ Nomor bagian tidak valid. Harap masukkan nomor bagian yang tepat.\n\n📚 Contoh penggunaan: *photofunia query|page|part*", m);
    else {
      const listMessage = data.map((post, index) => `*${index + 1}.* ${post.judul}`).join("\n"),
        helpMessage = "\n\n📚 Contoh penggunaan: *photofunia query|page|part*";
      await conn.reply(m.chat, listMessage + helpMessage, m);
    } else await conn.reply(m.chat, "📭 Tidak ada hasil yang ditemukan.", m);
  } catch (error) {
    console.error("Terjadi kesalahan:", error), await conn.reply(m.chat, "❌ Terjadi kesalahan saat mengambil data. Pastikan format input benar.\n\n📚 Contoh penggunaan: *photofunia query|page|part*", m);
  }
};
handler.help = ["photofunia"].map(v => v + " query|page|part"), handler.tags = ["maker"],
  handler.command = /^(photofunia)$/i;
export default handler;