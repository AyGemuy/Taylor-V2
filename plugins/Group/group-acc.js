const handler = async (m, { conn, args }) => {
  const groupId = m.chat,
    [subCommand, options] = args,
    joinRequestList = await conn.groupRequestParticipantsList(groupId),
    reply = async (text) => await conn.reply(m.chat, text, m, adReplyS);
  switch (subCommand) {
    case "list":
      reply(
        `*Daftar Permintaan Bergabung:*\n\n${
          joinRequestList.length > 0
            ? joinRequestList
                .map((request, i) => {
                  return `*${i + 1}.*\n• Nomor: ${request.jid.split("@")[0]}\n• Metode Permintaan: ${request.request_method}\n• Waktu Permintaan: ${
                    ((timestamp = request.request_time),
                    new Intl.DateTimeFormat("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(1e3 * timestamp)))
                  }\n\n`;
                  var timestamp;
                })
                .join("")
            : "Tidak ada permintaan bergabung yang tertunda."
        }`,
      );
      break;
    case "reject":
    case "approve":
      if ("all" === options) {
        for (const request of joinRequestList)
          await conn.groupRequestParticipantsUpdate(
            groupId,
            [request.jid],
            subCommand,
          ),
            console.log(
              `Meng-${subCommand} participant dengan JID: ${request.jid}`,
            );
        reply(
          `*${"approve" === subCommand ? "Menyetujui" : "Menolak"} semua permintaan bergabung.*`,
        );
      } else {
        const participants = options
          .split("|")
          .map((action) => action.trim())
          .map((action) => joinRequestList[parseInt(action) - 1])
          .filter((request) => request);
        if (participants.length > 0) {
          let formattedResponse = "";
          for (const request of participants) {
            const response = await conn.groupRequestParticipantsUpdate(
                groupId,
                [request.jid],
                subCommand,
              ),
              status = "success" === response[0]?.status ? "Gagal" : "Berhasil";
            (formattedResponse += `*${participants.indexOf(request) + 1}.*\n• Status: ${status}\n• Nomor: ${request.jid.split("@")[0]}\n\n`),
              console.log(
                `Meng-${subCommand} participant dengan JID: ${request.jid}`,
              );
          }
          reply(
            `*${"approve" === subCommand ? "Menyetujui" : "Menolak"} Permintaan Bergabung:*\n\n${formattedResponse}`,
          );
        } else reply("Tidak ada anggota yang cocok untuk reject/approve.");
      }
      break;
    default:
      reply(
        "*Perintah tidak valid.*\nGunakan:\n- *acc list*\n- *acc approve [number]*\n- *acc reject [number]*\n- *acc reject [JID]*\n- *acc reject/approve all* untuk menolak/menyetujui semua permintaan bergabung.",
      );
  }
};
(handler.help = ["acc *option*"]),
  (handler.tags = ["group"]),
  (handler.command = /^(acc)$/i),
  (handler.group = !0),
  (handler.admin = !0),
  (handler.botAdmin = !0),
  (handler.fail = null);
export default handler;
