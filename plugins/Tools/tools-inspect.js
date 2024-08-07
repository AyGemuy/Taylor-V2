import {
  getUrlFromDirectPath
} from "@whiskeysockets/baileys";
import _ from "lodash";
const handler = async (m, {
  conn,
  command,
  text
}) => {
  try {
    let res = text ? null : await conn.groupMetadata(m.chat);
    if (res) {
      let caption = `*Group Link Inspector*\n- ${res.id || ""}\n*Judul:* ${res.subject || ""}\n*Dibuat* oleh @${res.owner?.split("@")[0] || ""} pada *${formatDate(1e3 * res.creation) || ""}*${res.subjectOwner ? `\n*Judul diubah* oleh @${res.subjectOwner?.split("@")[0]} pada *${formatDate(1e3 * res.subjectTime)}*` : ""}${res.descOwner ? `\n*Deskripsi diubah* oleh @${res.descOwner?.split("@")[0]} pada *${formatDate(1e3 * res.descTime)}*` : ""}\n*Jumlah Member:* ${res.size || ""}\n*Member teratas:* ${res.participants ? "\n" + res.participants.slice(0, 5).map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${"superadmin" === user.admin ? " (superadmin)" : "admin" === user.admin ? " (admin)" : ""}`).join("\n").trim() : "Tidak ada"}${res.participants?.length > 5 ? `\nDan ${res.participants?.length - 5} member lainnya.` : ""}\n${res.desc ? `*Deskripsi:*\n${res.desc}` : "*Tidak ada Deskripsi*"}\n\n*Detail Lengkap Grup*\n\n*Restrict:* ${res.restrict ? "Ya" : "Tidak"}\n*Announce:* ${res.announce ? "Ya" : "Tidak"}\n*Is Community:* ${res.isCommunity ? "Ya" : "Tidak"}\n*Is Community Announce:* ${res.isCommunityAnnounce ? "Ya" : "Tidak"}\n*Join Approval Mode:* ${res.joinApprovalMode ? "Ya" : "Tidak"}\n*Member Add Mode:* ${res.memberAddMode ? "Ya" : "Tidak"}\n*Ephemeral Duration:* ${void 0 !== res.ephemeralDuration ? res.ephemeralDuration + " detik" : "Tidak diketahui"}\n\n`.trim();
      if (caption) {
        let pp;
        try {
          pp = await conn.profilePictureUrl(res?.id);
        } catch (e) {
          pp = thumb;
        }
        pp && await conn.sendMessage(m.chat, {
          image: {
            url: pp
          },
          caption: caption,
          contextInfo: {
            mentionedJid: conn.parseMention(caption)
          }
        }, {
          quoted: m
        });
      }
    } else {
      const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1],
        channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
      if (inviteUrl) {
        let inviteInfo = await conn.groupGetInviteInfo(inviteUrl);
        if (!inviteInfo) throw "Group tidak ditemukan.";
        let caption = `*Group Link Inspector*\n- ${inviteInfo.id || ""}\n*Judul:* ${inviteInfo.subject || ""}\n*Dibuat* oleh @${inviteInfo.owner?.split("@")[0] || ""} pada *${formatDate(1e3 * inviteInfo.creation) || ""}*${inviteInfo.subjectOwner ? `\n*Judul diubah* oleh @${inviteInfo.subjectOwner?.split("@")[0]} pada *${formatDate(1e3 * inviteInfo.subjectTime)}*` : ""}${inviteInfo.descOwner ? `\n*Deskripsi diubah* oleh @${inviteInfo.descOwner?.split("@")[0]} pada *${formatDate(1e3 * inviteInfo.descTime)}*` : ""}\n*Jumlah Member:* ${inviteInfo.size || ""}\n*Member teratas:* ${inviteInfo.participants ? "\n" + inviteInfo.participants.slice(0, 5).map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${"superadmin" === user.admin ? " (superadmin)" : "admin" === user.admin ? " (admin)" : ""}`).join("\n").trim() : "Tidak ada"}${inviteInfo.participants?.length > 5 ? `\nDan ${inviteInfo.participants?.length - 5} member lainnya.` : ""}\n${inviteInfo.desc ? `*Deskripsi:*\n${inviteInfo.desc}` : "*Tidak ada Deskripsi*"}\n\n*Detail Lengkap Grup*\n\n*Restrict:* ${inviteInfo.restrict ? "Ya" : "Tidak"}\n*Announce:* ${inviteInfo.announce ? "Ya" : "Tidak"}\n*Is Community:* ${inviteInfo.isCommunity ? "Ya" : "Tidak"}\n*Is Community Announce:* ${inviteInfo.isCommunityAnnounce ? "Ya" : "Tidak"}\n*Join Approval Mode:* ${inviteInfo.joinApprovalMode ? "Ya" : "Tidak"}\n*Member Add Mode:* ${inviteInfo.memberAddMode ? "Ya" : "Tidak"}\n*Ephemeral Duration:* ${void 0 !== inviteInfo.ephemeralDuration ? inviteInfo.ephemeralDuration + " detik" : "Tidak diketahui"}\n\n`.trim();
        if (caption) {
          let pp;
          try {
            pp = await conn.profilePictureUrl(inviteInfo?.id);
          } catch (e) {
            pp = thumb;
          }
          pp && await conn.sendMessage(m.chat, {
            image: {
              url: pp
            },
            caption: caption,
            contextInfo: {
              mentionedJid: conn.parseMention(caption)
            }
          }, {
            quoted: m
          });
        }
      } else if (channelUrl) {
        let newsletterInfo = await conn.newsletterMetadata("invite", channelUrl);
        if (!newsletterInfo) throw "Newsletter tidak ditemukan.";
        let caption = "*Newsletter Link Inspector*\n";
        const formatValue = (key, value) => {
          switch (key) {
            case "subscribers_count":
              return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Tidak ada";
            case "creation_time":
            case "nameTime":
            case "descriptionTime":
              return formatDate(value);
            case "description":
            case "name":
              return value ? value.text : "Tidak ada";
            default:
              return value !== null && value !== undefined ? value.toString() : "Tidak ada";
          }
        };
        const processObject = (obj, prefix = "") => {
          Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (typeof value === "object" && value !== null) {
              if (Object.keys(value).length > 0) {
                const sectionName = _.startCase(prefix + key.replace(/_/g, " "));
                caption += `\n*\`${sectionName}\`*\n`;
                processObject(value, `${prefix}${key}_`);
              }
            } else {
              const shortKey = prefix ? prefix.split("_").pop() + "_" + key : key;
              const displayValue = formatValue(shortKey, value);
              caption += `- *${_.startCase(shortKey.replace(/_/g, " "))}:* ${displayValue}\n`;
            }
          });
        };
        if (processObject(newsletterInfo), caption = caption.trim(), caption) {
          let pp;
          try {
            pp = getUrlFromDirectPath(newsletterInfo?.thread_metadata.preview.direct_path);
          } catch (e) {
            pp = thumb;
          }
          pp && await conn.sendMessage(m.chat, {
            image: {
              url: pp
            },
            caption: caption,
            contextInfo: {
              mentionedJid: conn.parseMention(caption)
            }
          }, {
            quoted: m
          });
        }
      }
    }
  } catch (e) {
    console.error(e), m.reply(e);
  }
};
handler.help = ["inspect"], handler.tags = ["tools"], handler.command = /^(inspect)$/i;
export default handler;

function formatDate(n, locale = "id", includeTime = true) {
  const date = new Date(n);
  if (isNaN(date)) throw new Error("Tanggal tidak valid");
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...includeTime && {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
}