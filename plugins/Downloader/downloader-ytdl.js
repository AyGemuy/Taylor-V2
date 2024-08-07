const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  try {
    if (!args[0]) throw "Link?";
    const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (!youtubeRegex.test(args[0])) {
      throw "Link harus berupa URL YouTube.";
    }
    const sections = [{
      title: "🎙️ Audio",
      rows: [{
        title: "Get Audio",
        rowId: `${usedPrefix}getaud ${args[0]} audio`
      }, {
        title: "Yt Audio",
        rowId: `${usedPrefix}yta ${args[0]}`
      }, {
        title: "Yt Audio Yes",
        rowId: `${usedPrefix}yta ${args[0]} yes`
      }]
    }, {
      title: "🎥 Video",
      rows: [{
        title: "Get Video 1080p",
        rowId: `${usedPrefix}getvid ${args[0]} 1080`
      }, {
        title: "Get Video 720p",
        rowId: `${usedPrefix}getvid ${args[0]} 720`
      }, {
        title: "Get Video 480p",
        rowId: `${usedPrefix}getvid ${args[0]} 480`
      }, {
        title: "Get Video 360p",
        rowId: `${usedPrefix}getvid ${args[0]} 360`
      }, {
        title: "Yt Mp4",
        rowId: `${usedPrefix}ytmp4 ${args[0]}`
      }, {
        title: "Yt Mp4 Yes",
        rowId: `${usedPrefix}ytmp4 ${args[0]} yes`
      }]
    }];
    const listMessage = {
      text: `${htjava}  ᴩʟᴇᴀꜱᴇ ꜱᴇʟᴇᴄᴛ yᴏᴜʀ ᴍᴇᴅɪᴀ ᴛyᴩᴇ...`,
      footer: wm,
      title: " 📥 𝗬𝗧 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥",
      buttonText: "Click Here !",
      sections: sections
    };
    await conn.sendButtonCta(m.chat, [
      [listMessage.text, listMessage.footer, null, null, null, null, [
        [listMessage.buttonText, listMessage.sections]
      ]]
    ], m, {
      contextInfo: {
        mentionedJid: [m.sender]
      }
    });
  } catch (error) {
    m.reply(error);
    console.error(error);
  }
};
handler.help = ["ytd"];
handler.tags = ["downloader"];
handler.command = /^ytd(mp[34]|[av])?$/i;
handler.exp = 3;
export default handler;