const handler = async (m, {
  text,
  conn
}) => {
  try {
    let whoArr = [...m.quoted ? [m.quoted?.sender || m.quoted?.key?.remoteJid] : [], ...text ? conn.parseMention(text) : [], ...m.mentionedJid?.length ? m.mentionedJid : [], ...m.quoted || text || m.mentionedJid?.length || !m.sender ? [] : [m.sender]];
    whoArr = [...new Set(whoArr)];
    const validNumbers = whoArr.map(jid => (jid.match(/\d+/g) || []).join("")).filter(phone => phone.length >= 10 && phone.length <= 15 && parseInt(phone, 10) >= 1e9 && parseInt(phone, 10) <= 999999999999999),
      totalNumbers = validNumbers.length;
    if (!(totalNumbers > 0)) return void await conn.reply(m.chat, "Tidak ada nomor yang valid ditemukan.", m);
    await conn.reply(m.chat, `📊 *Total Number*: *${totalNumbers}*\n\n${validNumbers.map((number, index) => `*${index + 1}.* @${number}`).join("\n")}`, m, {
      mentions: validNumbers.map(v => v + "@s.whatsapp.net")
    });
    for (const who of validNumbers.slice(0, 5)) {
      const profileData = (await conn.onWhatsApp(who + "@s.whatsapp.net")).find(item => item.exists);
      if (profileData) {
        const profileJid = profileData.jid;
        try {
          const response = await conn.profilePictureUrl(profileJid, "image");
          await conn.sendFile(m.chat, response, "profile.jpg", `Profile: @${profileJid.split("@")[0]}`, m, null, {
            mentions: [profileJid]
          });
        } catch (error) {
          console.error(`Error processing profile picture for ${profileJid}`, error);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
handler.command = /^(get(pp|profile))$/i, handler.help = ["getprofile [@users]"],
  handler.tags = ["tools"], handler.group = !0;
export default handler;