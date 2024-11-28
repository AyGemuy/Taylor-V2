const handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply("Balas pesannya!");
  try {
    let q = (await m.getQuotedMessage()) || (await m.getQuotedObj());
    if (!q?.quoted)
      return m.reply("Pesan yang Anda reply tidak mengandung reply!");
    await q.quoted.copyNForward(m.chat, true);
  } catch {
    m.reply("Terjadi kesalahan saat memproses pesan.");
  }
};
handler.help = ["q"];
handler.tags = ["tools"];
handler.command = /^q$/i;
export default handler;
