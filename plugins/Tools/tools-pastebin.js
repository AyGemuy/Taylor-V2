import axios from "axios";
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  try {
    const teks = m.quoted ? m.quoted?.text : text;
    if (!teks) throw "No text found";
    m.react(wait);
    const response = await createPaste(teks.split("|")[0] || "", teks);
    if (0 === response.status) {
      const pesan = `*Pesan Anda berhasil terkirim! 🚀*\n\n*Detail:*\n*Original:* ${response.original}\n*Raw:* ${response.raw}`;
      m.reply(pesan);
    } else m.reply("Pesan Anda gagal terkirim. 🙁");
  } catch (error) {
    console.error(error), m.reply("Terjadi kesalahan dalam pemrosesan permintaan Anda. 🙁");
  }
};
handler.help = ["pastebin <text>"], handler.tags = ["tools"], handler.command = /^(pastebin)$/i;
export default handler;
async function createPaste(title = "", content) {
  const data = new URLSearchParams({
    api_dev_key: "_L_ZkBp7K3aZMY7z4ombPIztLxITOOpD",
    api_paste_name: title,
    api_paste_code: content,
    api_paste_format: "text",
    api_paste_expire_date: "N",
    api_option: "paste"
  });
  try {
    const result = (await axios.post("https://pastebin.com/api/api_post.php", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })).data,
      rawUrl = result.replace(/^(https:\/\/pastebin\.com\/)([a-zA-Z0-9]+)$/, "$1raw/$2");
    return result ? {
      status: 0,
      original: result,
      raw: rawUrl
    } : {
      status: 1,
      original: null,
      raw: null
    };
  } catch (error) {
    console.error("Error:", error);
  }
}