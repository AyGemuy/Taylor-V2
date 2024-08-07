import {
  getUrlFromDirectPath
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  usedPrefix,
  args
}) => {
  const chs = Object.keys(conn.chats).filter(key => key.endsWith("@newsletter")).map(key => conn.chats[key]);
  if (0 === args.length) {
    const list = chs.map((ch, index) => `*${index + 1}.* ${ch.name}`).join("\n");
    await conn.reply(m.chat, `📋 *Daftar Nama Channel dengan Urutan:*\n\n${list}`, m);
  } else if (1 === args.length && /^\d+$/.test(args[0])) {
    const index = parseInt(args[0]) - 1;
    if (index >= 0 && index < chs.length) {
      const ch = chs[index],
        infoch = await conn.newsletterMetadata("jid", chs[index]?.id),
        info = `📊 *\`Informasi Channel ke-${index + 1}\`*\n\n- *Name:* ${infoch.thread_metadata?.name.text}\n- *ID:* ${infoch.id}\n- *Desc:* ${infoch.thread_metadata?.description.text}\n- *Dibuat:* ${formatTime(infoch.thread_metadata?.creation_time)}\n- *Pengikut:* ${infoch.thread_metadata?.subscribers_count} orang\n- *Verifikasi:* ${infoch.thread_metadata?.verification === "UNVERIFIED" ? "Tidak" : "Ya"}\n- *React:* ${infoch.thread_metadata?.settings.reaction_codes.value === "ALL" ? "Semua orang" : "Hanya admin"}\n\n*\`Link:\`* https://whatsapp.com/channel/${infoch.thread_metadata?.invite}`,
        img = getUrlFromDirectPath(infoch.thread_metadata?.preview.direct_path) || logo;
      await conn.sendFile(m.chat, img, "", info, m);
    } else await conn.reply(m.chat, "❌ Channel dengan urutan tersebut tidak ditemukan.", m);
  } else await conn.reply(m.chat, `❗ Format perintah salah. Gunakan "${usedPrefix}chs" untuk daftar channel atau "${usedPrefix}chs [nomor_urutan]" untuk informasi channel tertentu.`, m);
};
handler.menu = ["chlist"], handler.tags = ["group"], handler.command = /^(chlist)$/i;
export default handler;

function formatTime(timestamp) {
  const date = new Date(1e3 * timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}