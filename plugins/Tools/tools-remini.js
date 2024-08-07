import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
import {
  remini
} from "../../lib/scraper/scraper-tool.js";
const handler = async (m, {
  conn
}) => {
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    if (!/image/g.test(mime) || /webp/g.test(mime)) return m.reply("Reply dengan gambar");
    const img = await q?.download();
    const out = await uploadImage(img);
    let response = await remini(out, "m3yl4zGsURJtiODuVl4OnGhrwfgMwtTnTlaLmYJHW34UhB02").catch(async () => await widipeRemini(out));
    if (response) {
      await conn.sendFile(m.chat, response, "", "*[ REMINI ]*", m);
    } else {
      return m.reply("Gagal memproses gambar");
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
    m.react(eror);
  }
};
handler.help = ["remini"];
handler.tags = ["tools"];
handler.command = ["remini"];
export default handler;
const widipeRemini = async query => {
  try {
    const res = await fetch(`https://widipe.com/remini?url=${encodeURIComponent(query)}&resolusi=4`);
    const data = await res.json();
    return data.url;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
};