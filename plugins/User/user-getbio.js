import moment from "moment-timezone";
import _ from "lodash";
const handler = async (m, {
  conn
}) => {
  let who = m.isGroup ? _.get(m, "mentionedJid[0]", m.quoted?.sender || m.sender) : m.sender;
  try {
    let bios = await conn.fetchStatus(who);
    bios = _.castArray(bios);
    let messages = _.map(bios, bio => {
      let setAt = moment.utc(bio.setAt, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD") || "";
      return `*User:* ${bio.user?.split("@")[0] || ""}\n*Status:* ${bio.status || ""}\n*Set At:* ${setAt}`;
    }).join("\n\n");
    await conn.reply(m.chat, messages, m, adReply);
  } catch (error) {
    throw `Terjadi kesalahan: ${error.message}`;
  }
};
handler.help = ["getbio <@tag/reply>"];
handler.tags = ["main"];
handler.command = /^(getb?io)$/i;
export default handler;