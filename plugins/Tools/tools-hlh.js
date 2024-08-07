const handler = async (m, {
  conn,
  command,
  text
}) => {
  try {
    let ter = command?.[1].toLowerCase() || "",
      txt = (m.quoted?.text || text || m.text).replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase());
    await conn.reply(m.chat, txt, m);
  } catch (error) {
    console.error("Error:", error);
  }
};
handler.help = [..."aiueo"].map(v => `h${v}l${v}h <teks>`), handler.tags = ["tools"],
  handler.command = /^h([aiueo])l\1h/i;
export default handler;