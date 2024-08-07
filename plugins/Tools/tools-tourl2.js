import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
const handler = async m => {
  try {
    const q = m.quoted || m,
      mime = q.mediaType || "";
    if (!/image|video|audio|sticker|document/.test(mime)) throw "No media found";
    const media = await q?.download(!0),
      fileSizeInBytes = fs.statSync(media).size;
    if (0 === fileSizeInBytes) return m.reply("File kosong"), void await fs.promises.unlink(media);
    if (fileSizeInBytes > 1073741824) return m.reply("File terlalu besar, maksimal ukuran adalah 1 GB"),
      void await fs.promises.unlink(media);
    const {
      files
    } = await uploadUguu(media), caption = `📮 *Link:*\n${files[0]?.url}`;
    m.reply(caption);
  } catch (e) {
    m.reply(`Error: ${e}`);
  }
};
handler.help = ["tourl2"], handler.command = /^(tourl2)$/i;
export default handler;
const uploadUguu = async path => {
  try {
    const form = new FormData();
    form.append("files[]", fs.createReadStream(path));
    const res = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        headers: form.getHeaders(),
        body: form
      }),
      json = await res.json();
    return await fs.promises.unlink(path), json;
  } catch (e) {
    return await fs.promises.unlink(path), "Upload failed";
  }
};