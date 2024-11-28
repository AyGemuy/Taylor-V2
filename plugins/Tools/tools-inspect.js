import { getUrlFromDirectPath } from "@whiskeysockets/baileys";
import _ from "lodash";
const handler = async (m, { conn, command, text }) => {
  try {
    let res = text ? null : await conn.groupMetadata(m.chat);
    const formatValue = (key, value) => {
      switch (key) {
        case "subscribers":
          return value
            ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "Tidak ada";
        case "creation_time":
        case "nameTime":
        case "descriptionTime":
          return formatDate(value);
        case "description":
        case "name":
          return value || "Tidak ada";
        default:
          return value !== null && value !== undefined
            ? value.toString()
            : "Tidak ada";
      }
    };
    const processObject = (obj, prefix = "") => {
      let caption = "";
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
          if (Object.keys(value).length > 0) {
            const sectionName = _.startCase(prefix + key.replace(/_/g, " "));
            caption += `\n*\`${sectionName}\`*\n`;
            caption += processObject(value, `${prefix}${key}_`);
          }
        } else {
          const shortKey = prefix ? prefix.split("_").pop() + "_" + key : key;
          const displayValue = formatValue(shortKey, value);
          caption += `- *${_.startCase(shortKey.replace(/_/g, " "))}:* ${displayValue}\n`;
        }
      });
      return caption.trim();
    };
    if (res) {
      let caption = `*Group Link Inspector*\n- ${res.id || ""}\n*Judul:* ${res.subject || ""}\n*Dibuat* oleh @${res.owner?.split("@")[0] || ""} pada *${formatDate(1e3 * res.creation) || ""}*${res.subjectOwner ? `\n*Judul diubah* oleh @${res.subjectOwner?.split("@")[0]} pada *${formatDate(1e3 * res.subjectTime)}*` : ""}${res.descOwner ? `\n*Deskripsi diubah* oleh @${res.descOwner?.split("@")[0]} pada *${formatDate(1e3 * res.descTime)}*` : ""}\n*Jumlah Member:* ${res.size || ""}\n*Member teratas:* ${
        res.participants
          ? "\n" +
            res.participants
              .slice(0, 5)
              .map(
                (user, i) =>
                  `${i + 1}. @${user.id?.split("@")[0]}${"superadmin" === user.admin ? " (superadmin)" : "admin" === user.admin ? " (admin)" : ""}`,
              )
              .join("\n")
              .trim()
          : "Tidak ada"
      }${res.participants?.length > 5 ? `\nDan ${res.participants?.length - 5} member lainnya.` : ""}\n${res.desc ? `*Deskripsi:*\n${res.desc}` : "*Tidak ada Deskripsi*"}\n\n*Detail Lengkap Grup*\n\n*Restrict:* ${res.restrict ? "Ya" : "Tidak"}\n*Announce:* ${res.announce ? "Ya" : "Tidak"}\n*Is Community:* ${res.isCommunity ? "Ya" : "Tidak"}\n*Is Community Announce:* ${res.isCommunityAnnounce ? "Ya" : "Tidak"}\n*Join Approval Mode:* ${res.joinApprovalMode ? "Ya" : "Tidak"}\n*Member Add Mode:* ${res.memberAddMode ? "Ya" : "Tidak"}\n*Ephemeral Duration:* ${void 0 !== res.ephemeralDuration ? res.ephemeralDuration + " detik" : "Tidak diketahui"}`;
      let pp;
      try {
        pp = await conn.profilePictureUrl(res?.id);
      } catch (e) {
        pp = thumb;
      }
      if (caption) {
        await conn.reply(m.chat, caption, m, {
          contextInfo: {
            mentionedJid: conn.parseMention(caption),
          },
        });
      }
    } else {
      const inviteUrl = text?.match(
        /(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i,
      )?.[1];
      const channelUrl = text?.match(
        /(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i,
      )?.[1];
      if (inviteUrl) {
        let inviteInfo = await conn.groupGetInviteInfo(inviteUrl);
        if (!inviteInfo) return m.reply("Group tidak ditemukan.");
        let caption = `*Group Link Inspector*\n- ${inviteInfo.id || ""}\n*Judul:* ${inviteInfo.subject || ""}\n*Dibuat* oleh @${inviteInfo.owner?.split("@")[0] || ""} pada *${formatDate(1e3 * inviteInfo.creation) || ""}*${inviteInfo.subjectOwner ? `\n*Judul diubah* oleh @${inviteInfo.subjectOwner?.split("@")[0]} pada *${formatDate(1e3 * inviteInfo.subjectTime)}*` : ""}${inviteInfo.descOwner ? `\n*Deskripsi diubah* oleh @${inviteInfo.descOwner?.split("@")[0]} pada *${formatDate(1e3 * inviteInfo.descTime)}*` : ""}\n*Jumlah Member:* ${inviteInfo.size || ""}\n*Member teratas:* ${
          inviteInfo.participants
            ? "\n" +
              inviteInfo.participants
                .slice(0, 5)
                .map(
                  (user, i) =>
                    `${i + 1}. @${user.id?.split("@")[0]}${"superadmin" === user.admin ? " (superadmin)" : "admin" === user.admin ? " (admin)" : ""}`,
                )
                .join("\n")
                .trim()
            : "Tidak ada"
        }${inviteInfo.participants?.length > 5 ? `\nDan ${inviteInfo.participants?.length - 5} member lainnya.` : ""}\n${inviteInfo.desc ? `*Deskripsi:*\n${inviteInfo.desc}` : "*Tidak ada Deskripsi*"}\n\n*Detail Lengkap Grup*\n\n*Restrict:* ${inviteInfo.restrict ? "Ya" : "Tidak"}\n*Announce:* ${inviteInfo.announce ? "Ya" : "Tidak"}\n*Is Community:* ${inviteInfo.isCommunity ? "Ya" : "Tidak"}\n*Is Community Announce:* ${inviteInfo.isCommunityAnnounce ? "Ya" : "Tidak"}\n*Join Approval Mode:* ${inviteInfo.joinApprovalMode ? "Ya" : "Tidak"}\n*Member Add Mode:* ${inviteInfo.memberAddMode ? "Ya" : "Tidak"}\n*Ephemeral Duration:* ${void 0 !== inviteInfo.ephemeralDuration ? inviteInfo.ephemeralDuration + " detik" : "Tidak diketahui"}`;
        let pp;
        try {
          pp = await conn.profilePictureUrl(inviteInfo?.id);
        } catch (e) {
          pp = thumb;
        }
        if (caption) {
          await conn.reply(m.chat, caption, m, {
            contextInfo: {
              mentionedJid: conn.parseMention(caption),
            },
          });
        }
      } else if (channelUrl) {
        let newsletterInfo = await conn.newsletterMetadata(
          "invite",
          channelUrl,
        );
        if (!newsletterInfo) return m.reply("Newsletter tidak ditemukan.");
        let caption = "*Newsletter Link Inspector*\n";
        caption += processObject(newsletterInfo);
        let pp;
        try {
          pp = getUrlFromDirectPath(newsletterInfo.preview);
        } catch (e) {
          pp = thumb;
        }
        if (caption) {
          await conn.reply(m.chat, caption, m, {
            contextInfo: {
              mentionedJid: conn.parseMention(caption),
            },
          });
        }
      }
    }
  } catch (e) {
    console.error(e);
    await m.reply("Terjadi kesalahan.");
  }
};
handler.help = ["inspect"];
handler.tags = ["tools"];
handler.command = /^(inspect)$/i;
export default handler;

function formatDate(n, locale = "id", includeTime = true) {
  const date = new Date(n);
  if (isNaN(date)) return "Tanggal tidak valid";
  return includeTime
    ? date.toLocaleString(locale)
    : date.toLocaleDateString(locale);
}
