import { File } from "megajs";
import { fileTypeFromBuffer } from "file-type";

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    return m.reply(
      `*Contoh Penggunaan:*\n${usedPrefix + command} https://mega.nz/file/0FUA2bzb#vSu3Ud9Ft_HDz6zPvfIg_y62vE1qF8EmoYT3kY16zxo\n\n*Perhatian:*\nUkuran file maksimal 1GB`,
    );
  }

  m.react(wait);
  try {
    const file = File.fromURL(text);
    await file.loadAttributes();

    if (file.size >= 1e9) {
      return m.reply(`*Error:* Ukuran file terlalu besar (Ukuran Max: 1GB)`);
    }

    const caption = `*Mohon tunggu beberapa menit...*\n- *Nama File:* ${file.name}\n- *Ukuran File:* ${(file.size / 1e6).toFixed(2)} MB`;
    const infoReply = {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    };
    await conn.reply(m.chat, caption, m, infoReply);

    const data = await file.downloadBuffer();
    const { mime, ext } = await fileTypeFromBuffer(data);

    if (!mime) {
      return m.reply(`*Error:* Tipe file tidak dapat ditentukan`);
    }

    await conn.sendMessage(
      m.chat,
      {
        document: data,
        mimetype: mime,
        fileName: file.name,
      },
      { quoted: m },
    );

    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.log(e);
  }
};

handler.help = ["mega"];
handler.tags = ["downloader"];
handler.command = /^(mega(js)?)$/i;

export default handler;
