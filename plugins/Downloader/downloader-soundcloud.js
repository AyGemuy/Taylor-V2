import SoundCloud from "soundcloud-scraper";
const client = new SoundCloud.Client();
import fetch from "node-fetch";
import util from "util";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  try {
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
      pp = await conn.getProfilePicture(who),
      name = conn.getName(who);
    if (!args[0]) throw new Error(`Gunakan contoh ${usedPrefix}${command} link`);
    const hasil = await client.getSongInfo(args[0]);
    await conn.sendFile(m.chat, hasil.streams?.hls, `${command}.mp3`, "", m, null, {
      mimetype: "audio/mpeg",
      seconds: 120,
      contextInfo: {
        externalAdReply: {
          mediaUrl: hasil.url,
          mediaType: 2,
          description: hasil.description,
          title: `👋 Hai, ${name} ucapan`,
          body: "Botdate Anda",
          thumbnail: await fetch(pp).then(res => res.arrayBuffer()),
          sourceUrl: hasil.url
        }
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
handler.help = ["soundcloud"].map(v => `${v} <url>`), handler.tags = ["downloader"],
  handler.command = /^s(oundcloud(d(own|l)2|2)|cd(own|l)2)$/i;
export default handler;