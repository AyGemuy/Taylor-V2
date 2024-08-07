import axios from "axios";
import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  text,
  command
}) => {
  let urut = text.split("|"),
    one = urut[0],
    two = urut[1],
    three = urut[2];
  if ("images" === command) {
    if (!Number(args[0])) throw "Insert Input 1\n\n*Example:* .images 500 500\n( Number only )";
    if (!Number(args[1])) throw "Insert Input 2\n\n*Example:* .images 500 500\n( Number only )";
    m.react(wait);
    let lis = ["picsum.photos", "unsplash.it", "random.imagecdn.app"],
      row = Object.keys(lis).map((v, index) => ({
        title: "By " + lis[v],
        description: "Bot " + author,
        rowId: usedPrefix + "imagesget " + lis[v] + "|" + args[0] + "|" + args[1]
      })),
      button = {
        buttonText: "☂️ Tema Disini ☂️",
        description: `⚡ Silakan pilih tema di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("imagesget" === command) try {
    let caption = "*[ Result ]*\n*Width:* " + two + "\n*Height:* " + three;
    "picsum.photos" === one && await conn.sendFile(m.chat, API("https://picsum.photos/" + two + "/" + three), "", caption, m), "unsplash.it" === one && await conn.sendFile(m.chat, API("https://unsplash.it/" + two + "/" + three + "?random"), "", caption, m), "random.imagecdn.app" === one && await conn.sendFile(m.chat, API("https://random.imagecdn.app/" + two + "/" + three), "", caption, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["images"], handler.tags = ["search"], handler.command = /^images(get)?$/i;
export default handler;