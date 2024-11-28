import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
import { remini } from "../../lib/scraper/scraper-tool.js";
const handler = async (m, { conn }) => {
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    if (!/image/g.test(mime) || /webp/g.test(mime))
      return m.reply("*Balas gambar yang valid*");
    const img = await q?.download();
    const out = await uploadImage(img);
    let response, caption;
    try {
      response = await remini(
        out,
        "m3yl4zGsURJtiODuVl4OnGhrwfgMwtTnTlaLmYJHW34UhB02",
      );
      caption = `✨ Diproses oleh: *\`Remini\`*`;
    } catch {
      try {
        response = await widipeRemini(out);
        caption = `✨ Diproses oleh: *\`Widipe\`*`;
      } catch (error) {
        try {
          response = await kenlieRemini(out);
          caption = `✨ Diproses oleh: *\`Kenlie\`*`;
        } catch (error) {
          console.error(`Widipe Error: ${error.message}`);
          return m.reply(
            "*Gagal memproses gambar menggunakan Widipe. Coba lagi nanti.*",
          );
        }
      }
    }
    if (response) {
      await conn.sendFile(m.chat, response, "", caption, m);
    } else {
      m.reply("*Gagal memproses gambar. Coba gambar lain.*");
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
    m.react(eror);
    m.reply("*Terjadi kesalahan saat memproses gambar. Silakan coba lagi.*");
  }
};
handler.help = ["remini"];
handler.tags = ["tools"];
handler.command = ["remini"];
export default handler;
const widipeRemini = async (query) => {
  try {
    const res = await fetch(
      `https://widipe.com/remini?url=${encodeURIComponent(query)}&resolusi=4`,
    );
    const { url } = await res.json();
    return url;
  } catch (error) {
    console.error(`Widipe Error: ${error.message}`);
    throw error;
  }
};
const kenlieRemini = async (query) => {
  try {
    const res = await fetch(
      `https://api.kenliejugarap.com/reminibymarjhun/?url=${encodeURIComponent(query)}`,
    );
    const { image_data: url } = await res.json();
    return url;
  } catch (error) {
    console.error(`Widipe Error: ${error.message}`);
    throw error;
  }
};
