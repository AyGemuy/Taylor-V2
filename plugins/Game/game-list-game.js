const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  const ktx = ["Mungkin menu ini bermanfaat?", "Terimakasih sudah menggunakan bot ini", "Semoga gak erorr", "Jika lama kemungkiman erorr atau delay", "Menampilkan menu", "Wait...", "Dua tiga kucing berlari", "Bentar bang akan kutampilkan menunya", "Prosess..."].getRandom();
  const actions = ["adventure", "bansos", "buy", "berburu", "berdagang", "berkebon", "bet", "build", "casino", "cek", "chop", "collect", "cook", "cooldown", "craft", "daily", "duel", "dungeon", "eat", "feed", "heal", "hourly", "hunt", "inventory", "kandang", "kerja", "koboy", "kolam", "leaderboard", "mancing", "mentransfer", "merampok", "mining", "mission", "monthly", "nabung", "nambang", "nebang", "ngocok", "nguli", "ojek", "open-crate", "open", "pasar", "petstore", "pointxp", "profile", "ramuan", "repair", "rob", "roket", "sell", "shopfish", "shop", "slect-skill", "slot", "tarik", "taxy", "toko", "transfer", "upgrade", "use", "weekly", "work"];
  const nonRpgActions = ["asahotak", "caklontong", "family100", "fight", "gombal", "math", "siapakahaku", "slot", "suitpvp", "susunkata", "tebakan", "tebakanime", "tebakbendera", "tebakchara", "tebakgambar", "tebakjenaka", "tebakkabupaten", "tebakkalimat", "tebakkata", "tebakkimia", "tebaklagu", "tebaklirik", "tebaklogo", "tebaksiapa", "tebakumur", "tekateki", "tictactoe"];
  const createButtons = (title, actions) => {
    const buttons = conn.ctaButton.setBody("Pilih konten di bawah ini.").addSelection("Klik di sini").makeSections(title, "rekomendasi");
    actions.forEach((action, index) => {
      const rowIndex = Math.floor(index / 2);
      buttons.makeRow("", `${emojis} ${action}`.toUpperCase(), ktx, `${usedPrefix}${action}`, rowIndex);
    });
    return buttons;
  };
  const allButtons = createButtons("Game Menu", [...actions, ...nonRpgActions]);
  allButtons.run(m.chat, conn, m);
};
handler.help = ["game"];
handler.tags = ["rpg"];
handler.command = /^gam(es|ing|e)$/i;
export default handler;