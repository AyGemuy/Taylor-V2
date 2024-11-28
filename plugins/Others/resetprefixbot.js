const handler = async (m, { conn, command }) => {
  try {
    switch (command) {
      case "resetprefix":
        const prefix = new RegExp(
          "^[" +
            (opts.prefix || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(
              /[|\\{}()[\]^$+*?.\-\^]/g,
              "\\$&",
            ) +
            "]",
        );
        m.reply("Prefix berhasil direset.");
        break;
      case "cekprefix":
        const activePrefixes = [];
        if (opts.singleprefix) activePrefixes.push("Single Prefix");
        if (opts.noprefix) activePrefixes.push("No Prefix");
        if (opts.multiprefix) activePrefixes.push("Multi Prefix");
        const statusMessage =
          activePrefixes.length > 0
            ? `*\`Prefix aktif:\`*\n- ${activePrefixes.join("\n- ")}`
            : "Tidak ada prefix aktif.";
        m.reply(statusMessage);
        break;
      default:
        m.reply(
          "Command tidak dikenali. Gunakan 'resetprefix' atau 'cekprefix'.",
        );
    }
  } catch (error) {
    m.reply("Terjadi kesalahan: " + error.message);
  }
};
handler.help = ["resetprefix", "cekprefix"];
handler.tags = ["owner"];
handler.command = /^(resetprefix|cekprefix)$/i;
handler.rowner = true;
export default handler;
