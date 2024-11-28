const handler = async (m, { conn, command, usedPrefix, text, isROwner }) => {
  try {
    command = command.replace(/get/i, "");
    if (!text)
      throw `Uhm... teksnya mana? Gunakan: ${usedPrefix + command} test`;
    let msgs = db.data.msgs;
    msgs = Object.fromEntries(
      Object.entries(msgs).filter(([, msg]) => msg.message),
    );
    if (!(text in msgs)) {
      return await conn.reply(m.chat, `${text} tidak terdaftar!`, m);
    }
    if (msgs[text].locked && !isROwner) {
      throw new Error("Pesan ini dikunci!");
    }
    let _m = conn.serializeM(
      JSON.parse(JSON.stringify(msgs[text]), (_, v) =>
        v !== null &&
        typeof v === "object" &&
        "type" in v &&
        v.type === "Buffer" &&
        "data" in v &&
        Array.isArray(v.data)
          ? Buffer.from(v.data)
          : v,
      ),
    );
    await _m.copyNForward(m.chat, false);
  } catch (error) {
    if (error.message === "Pesan ini dikunci!") {
      m.reply(error.message);
    } else {
      console.error("Error in handler function:", error);
      m.reply("Terjadi kesalahan, coba lagi nanti.");
    }
  }
};
handler.help = [
  "vn",
  "msg",
  "store",
  "video",
  "gif",
  "audio",
  "img",
  "sticker",
].map((v) => "get" + v + " <teks>");
handler.tags = ["database"];
handler.command = /^get(all|vn|msg|store|video|audio|img|stic?ker|gif)$/i;
export default handler;
