const handler = async (m, { conn, args, usedPrefix }) => {
  try {
    if (!args[0]) {
      return m.reply("Link?");
    }
    const youtubeRegex =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (!youtubeRegex.test(args[0])) {
      return m.reply("Link harus berupa URL YouTube.");
    }
    const sections = [
      {
        title: "🎙️ Audio",
        rows: [
          {
            title: "Get Audio",
            rowId: `${usedPrefix}getaud ${args[0]} audio`,
          },
          {
            title: "Yt Audio",
            rowId: `${usedPrefix}yta ${args[0]}`,
          },
          {
            title: "Yt Audio Yes",
            rowId: `${usedPrefix}yta ${args[0]} yes`,
          },
        ],
      },
      {
        title: "🎥 Video",
        rows: [
          {
            title: "Get Video 1080p",
            rowId: `${usedPrefix}getvid ${args[0]} 1080`,
          },
          {
            title: "Get Video 720p",
            rowId: `${usedPrefix}getvid ${args[0]} 720`,
          },
          {
            title: "Get Video 480p",
            rowId: `${usedPrefix}getvid ${args[0]} 480`,
          },
          {
            title: "Get Video 360p",
            rowId: `${usedPrefix}getvid ${args[0]} 360`,
          },
          {
            title: "Yt Mp4",
            rowId: `${usedPrefix}ytmp4 ${args[0]}`,
          },
          {
            title: "Yt Mp4 Yes",
            rowId: `${usedPrefix}ytmp4 ${args[0]} yes`,
          },
        ],
      },
    ];
    const buttons = conn.ctaButton
      .setBody(`📥 𝗬𝗧 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥\n\nᴩʟᴇᴀꜱᴇ ꜱᴇʟᴇᴄᴛ yᴏᴜʀ ᴍᴇᴅɪᴀ ᴛyᴩᴇ...`)
      .setFooter(wm)
      .addSelection("Click Here !")
      .makeSections("Media Type", "Select Media Type");
    sections.forEach((section) => {
      section.rows.forEach((row) => {
        buttons.makeRow("", row.title, row.title, row.rowId);
      });
    });
    return buttons.run(m.chat, conn, m);
  } catch (error) {
    m.reply("Terjadi kesalahan.");
    console.error(error);
  }
};
handler.help = ["ytd"];
handler.tags = ["downloader"];
handler.command = /^ytd(mp[34]|[av])?$/i;
handler.exp = 3;
export default handler;
