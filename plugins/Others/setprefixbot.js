const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  try {
    if (!text) return m.reply(`🔢 *Pilih angka:*\n- 1 (noprefix)\n- 2 (multiprefix)\n- 3 (singleprefix)\n\n*Contoh:* ${usedPrefix + command} 1 (untuk noprefix)`);
    if (/^[123]$/.test(text)) {
      opts.noprefix = !!(text === "1");
      opts.multiprefix = !!(text === "2");
      opts.singleprefix = !!(text === "3");
      const prefix = opts.noprefix ? "No prefix" : opts.multiprefix ? "Multi prefix" : "Single prefix";
      return m.reply(`✅ *Prefix diubah ke:* ${prefix}`);
    }
    return m.reply(`❌ *Input salah.*\n*Pilih angka:*\n- 1 (noprefix)\n- 2 (multiprefix)\n- 3 (singleprefix)\n\n*Contoh:* ${usedPrefix + command} 1 (untuk noprefix)`);
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.help = ["setprefix [prefix]"];
handler.tags = ["owner"];
handler.command = /^(setprefix)$/i;
handler.rowner = true;
export default handler;