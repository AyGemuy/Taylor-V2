import fs from "fs";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const sender = m.sender.replace(/@.+/, "");
    const database = db.data.database.menfess;
    if (!text) {
      return conn.reply(
        m.chat,
        `*Cara penggunaan:*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* Nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${sender}|Anonymous|Hai.`,
        m,
      );
    }
    const [rawJid, name, pesan] = text.split(/[^\w\s]/g);
    if (!rawJid || !name || !pesan) {
      return conn.reply(
        m.chat,
        `*Cara penggunaan:*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* Nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${sender}|Anonymous|Hai.`,
        m,
      );
    }
    const jid = `${rawJid.replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    const [data] = await conn.onWhatsApp(jid);
    if (!data?.exists) {
      return conn.reply(m.chat, "Nomor tidak terdaftar di WhatsApp.", m);
    }
    if (jid === m.sender) {
      return conn.reply(
        m.chat,
        "Tidak bisa mengirim pesan menfess ke diri sendiri.",
        m,
      );
    }
    const activeMenfess = Object.values(database).some(
      (mf) => mf.status === true,
    );
    if (activeMenfess) return true;
    const id = Date.now();
    const tek = `*Hai Kak @${data.jid.split("@")[0]},*\n\nKamu menerima pesan manfess nih:\n\n➴ *Pesan:* ${pesan}`;
    const logs = `➯ *Pesan:* ${pesan}`;
    const ssn = `〠 *Dari:* ${name}\n⎙ *Pesan:* ${pesan}`;
    const thumbnail = fs.readFileSync("./thumbnail.jpg");
    await conn.reply(data.jid, tek + "\n\n" + ssn, m, {
      contextInfo: {},
    });
    await conn.reply(
      m.chat,
      `*Berhasil mengirim pesan ke @${jid.replace(/@.+/, "")}*\n\n${logs}`,
      m,
      {
        contextInfo: {},
      },
    );
    database[id] = {
      id: id,
      dari: m.sender,
      nama: name,
      penerima: data.jid,
      pesan: pesan,
      status: false,
    };
    return true;
  } catch (err) {
    console.error(err);
    return conn.reply(
      m.chat,
      "Terjadi kesalahan saat mengirim pesan. Coba lagi nanti.",
      m,
    );
  }
};
handler.tags = ["main"];
handler.help = ["menfess"].map((v) => v + " <nomor|nama|pesan>");
handler.command = /^(menfess)$/i;
handler.private = true;
export default handler;
