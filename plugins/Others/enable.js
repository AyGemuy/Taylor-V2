const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  const features = ["autodlTiktok", "autodlFacebook", "autodlInstagram", "autodlYoutube", "autolevelup", "antibot", "antiFoto", "antiVideo", "antiAudio", "antiCall", "antiDelete", "antiHidetag", "antiLink", "antiLinkFb", "antiLinkHttp", "antiLinkIg", "antiLinkTel", "antiLinkTik", "antiLinkWa", "antiLinkYt", "antiSatir", "antiSticker", "antiVirtex", "antiToxic", "antibule", "autoBio", "autoChat", "autoAi", "autoGpt", "autochatGpt", "autoJoin", "autoPresence", "autoClose", "autoReply", "autoSticker", "autoVn", "autoGempa", "viewStory", "bcjoin", "detect", "getmsg", "nsfw", "antiSpam", "simi", "alicia", "gptvoice", "characterai", "updateAnime", "updateAnimeNews", "viewonce", "welcome", "autoread", "gconly", "nyimak", "pconly", "self", "antirpg", "swonly", "lastAnime", "latestNews", "wabetainfo"].sort(),
    activeFeatures = ["detect", "getmsg", "lastAnime", "latestNews", "welcome", "antiSpam"],
    isEnable = !/false|disable|(turn)?off|0/i.test(command),
    statusLable = isEnable ? "ON" : "OFF",
    sections = features.map((f, i) => {
      const isActive = ["self", "pconly", "gconly", "swonly", "antirpg", "autoread", "jadibot", "restrict", "autorestart", "autorestart", "antibot"].includes(f) ? activeFeatures.includes(f) ? !db.data.settings[conn.user.jid][f] : db.data.settings[conn.user.jid][f] : activeFeatures.includes(f) ? !db.data.chats[m.chat][f] : db.data.chats[m.chat][f],
        status = isActive ? "ON" : "OFF",
        rows = [{
          ...{
            header: `${(i + 1).toString().padEnd(2)}. ${f.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()).padEnd(18)}`,
            id: `${usedPrefix + command} ${i + 1}`,
            title: `- Switch ${statusLable} ${f.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()).padEnd(18)}\n- *Because*`,
            description: isActive ? "- Feature Is ON" : "- Feature Is OFF"
          },
          highlight_label: status
        }];
      return {
        title: `${htki} ${i + 1} ${htka}`,
        highlight_label: "Switch " + statusLable,
        rows: rows
      };
    }),
    input = args[0],
    featureName = !isNaN(input) ? features[parseInt(input) - 1] : input,
    totalOn = Object.values(db.data.chats[m.chat]).filter(val => !0 === val).length,
    totalOff = Object.values(db.data.chats[m.chat]).filter(val => !1 === val).length,
    listEnab = `🛠️ *DAFTAR FITUR*\n${`- Features: *${features.length}*\n- Total ON: *${totalOn}*\n- Total OFF: *${totalOff}*`}\n*📝 CARA MENGGUNAKAN:*\n→ ${usedPrefix + command} [nomor atau nama fitur]`.trimStart();
  if (!features.includes(featureName)) return sections.length ? await conn.sendButtonCta(m.chat, [
    [listEnab, wm, null, [], null, [],
      [
        [statusLable + " Here", sections]
      ]
    ]
  ], m) : await conn.reply(m.chat, "Daftar fitur kosong", m);
  activeFeatures.includes(featureName) ? db.data.chats[m.chat][featureName] = isEnable : ["autoChat"].includes(featureName) ? (conn.autochat = conn.autochat || {}, conn.autochat.status = isEnable) : ["self", "pconly", "gconly", "swonly", "antirpg", "autoread", "jadibot", "restrict", "autorestart", "autorestart", "antibot"].includes(featureName) ? (db.data.settings[conn.user.jid][featureName] = isEnable, opts[featureName] = isEnable) : db.data.chats[m.chat][featureName] = isEnable, await conn.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? "ON" : "OFF"}*`, m);
};
handler.help = ["en", "dis"].map(v => v + "able <nomor atau nama fitur>"), handler.tags = ["group", "owner"],
  handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff))$/i, handler.owner = !0,
  handler.rowner = !0;
export default handler;