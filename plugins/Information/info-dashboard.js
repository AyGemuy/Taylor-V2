const handler = async (m, {
  conn
}) => {
  try {
    const sortedData = Object.entries(db.data?.stats).sort(([, a], [, b]) => b.total - a.total).slice(0, 10);
    const formatNumber = num => {
      const suffixes = ["", " ribu", " juta", " miliar", " triliun"];
      let suffixIndex = 0;
      while (num >= 1e3 && suffixIndex < suffixes.length - 1) num /= 1e3, suffixIndex++;
      return `${Math.round(num)}${suffixes[suffixIndex]}`;
    };
    const formatTime = time => {
      const timeDiff = Math.floor((Date.now() - time) / 1e3);
      const intervals = {
        tahun: 31536e3,
        bulan: 2592e3,
        minggu: 604800,
        hari: 86400,
        jam: 3600,
        menit: 60,
        detik: 1
      };
      for (const [unit, seconds] of Object.entries(intervals))
        if (Math.floor(timeDiff / seconds) > 0) return `${Math.floor(timeDiff / seconds)} ${unit} yang lalu`;
      return "Baru saja";
    };
    const output = sortedData.map(([name, {
      total,
      success,
      last,
      lastSuccess
    }], idx) => `*${idx + 1}). ${name.split("/").pop().replace(".js", "")}*\n   - Total: \`${formatNumber(total)}\`\n   - Success: \`${formatNumber(success)}\`\n   - Last: \`${formatTime(last)}\`\n   - Last Success: \`${formatTime(lastSuccess)}\``).join("\n\n");
    await conn.reply(m.chat, output, m);
  } catch (error) {
    console.error("Error:", error);
    await conn.reply(m.chat, "Terjadi kesalahan dalam memproses permintaan.", m);
  }
};
handler.help = ["dashboard"];
handler.tags = ["info"];
handler.command = /^d(as(hbo(ard?|r)|bo(ard?|r))|b)$/i;
export default handler;