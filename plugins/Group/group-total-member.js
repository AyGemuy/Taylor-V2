import {
  parsePhoneNumber
} from "awesome-phonenumber";
import _ from "lodash";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    const chat = conn.chats[m.chat];
    const member = chat?.metadata?.participants;
    if (!member) {
      return m.reply("🚫 *No participants found.*");
    }
    const groupName = chat.metadata.subject;
    const participants = member.map(participant => {
      try {
        const regionCode = parsePhoneNumber("+" + participant.id).regionCode;
        return {
          id: participant.id,
          regionName: regionCode ? new Intl.DisplayNames(["id"], {
            type: "region"
          }).of(regionCode) : "Unknown",
          regionCode: regionCode || "Unknown",
          highlight_label: participant.admin ? "Admin" : "Member"
        };
      } catch {
        return {
          id: participant.id,
          regionName: "Unknown",
          regionCode: "Unknown",
          highlight_label: participant.admin ? "Admin" : "Member"
        };
      }
    });
    const groupedByRegion = _.groupBy(participants, "regionName");
    const sections = Object.keys(groupedByRegion).map((region, regionIndex) => {
      const sortedParticipants = _.sortBy(groupedByRegion[region], ["highlight_label", p => conn.getName(p.id)]);
      const rows = sortedParticipants.map((participant, index) => ({
        id: `${usedPrefix}wastalk @${participant.id.split("@")[0]}`,
        title: `${index + 1}. ${conn.getName(participant.id)}`,
        description: `Lebih lengkap \nwa.me/${participant.id.split("@")[0]}\n🌆 Region: ${region}`
      }));
      const highlight_label = sortedParticipants.some(p => p.highlight_label === "Admin") ? "Admin" : "Member";
      return {
        title: `🌟 ${regionIndex + 1}. ${region} - ${groupedByRegion[region].length} Members`,
        highlight_label: `🔖 TOP: ${highlight_label}`,
        rows: rows
      };
    });
    const totalUsers = participants.length;
    const totalRegions = _.size(groupedByRegion);
    const listMember = `┌─⭓ *TOTAL MEMBER*\n│ *• Group:* ${groupName}\n│ *• Total Members:* ${totalUsers}\n│ *• Total Regions:* ${totalRegions}\n└───────────────⭓`;
    await conn.sendButtonCta(m.chat, [
      [listMember, wm, null, [], null, [],
        [
          ["📋 Lihat Anggota", sections]
        ]
      ]
    ], m);
  } catch (error) {
    console.error("Error in handler:", error);
    return m.reply("⚠️ Terjadi kesalahan dalam mengolah data.");
  }
};
handler.help = ["totalmem", "totalmember"];
handler.tags = ["group"];
handler.command = /^(totalmem|totalmember)$/i;
handler.group = true;
export default handler;