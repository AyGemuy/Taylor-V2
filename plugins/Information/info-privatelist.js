import moment from "moment-timezone";
import PhoneNum from "awesome-phonenumber";
import _ from "lodash";
const regionNames = new Intl.DisplayNames(["en"], {
  type: "region",
});
const handler = async (m, { conn, args, usedPrefix }) => {
  const pc = _.values(conn.chats).filter((v) =>
    v.id.endsWith("@s.whatsapp.net"),
  );
  if (_.isEmpty(args)) {
    const list = _.map(pc, (chat, index) => {
      const messagesCount = _.size(chat.messages);
      return (
        `*📌 [ ${index + 1} ]*\n` +
        `👤 *Name:* ${chat.name || "-"}\n` +
        `📞 *Number:* ${chat.id.split("@")[0] || "-"}\n` +
        `📶 *Presences:* ${chat.presences || "-"}\n` +
        `📩 *Messages:* ${messagesCount}`
      );
    }).join("\n\n");
    const buttons = conn.ctaButton
      .setBody(`📄 *Daftar Kontak Pribadi:*\n\n${list}`)
      .setFooter("Pilih kontak untuk detail:")
      .makeSections("Daftar Kontak", "Pilih Opsi");
    _.forEach(pc, (chat, index) =>
      buttons.makeRow(
        "",
        `👥 ${chat.name || "Kontak Tanpa Nama"}`,
        `Lihat Detail ${chat.name || "Kontak"}`,
        `${usedPrefix}pc ${index + 1}`,
      ),
    );
    await buttons.run(m.chat, conn, m);
  } else if (/^\d+$/.test(args[0])) {
    const i = parseInt(args[0]) - 1;
    if (!pc[i]) return m.reply("❌ *Indeks tidak valid!*");
    const num = pc[i].id;
    if (!(await conn.onWhatsApp(num))[0]?.exists)
      throw "❌ *Pengguna tidak ditemukan!*";
    const img = await conn
        .profilePictureUrl(num, "image")
        .catch(() => "./src/avatar_contact.png"),
      bio = await conn.fetchStatus(num).catch(() => {}),
      name = conn.getName(num),
      business = await conn.getBusinessProfile(num),
      format = PhoneNum(`+${num.split("@")[0]}`),
      country = regionNames
        .of(format.getRegionCode("international"))
        .toUpperCase(),
      formattedNum = format.getNumber("international"),
      statusDate = bio?.setAt
        ? moment(bio.setAt).locale("id").format("LL")
        : "-",
      wea =
        `\n*▾ WHATSAPP ▾*\n\n` +
        `🌍 *Country:* ${country}\n` +
        `📛 *Name:* ${name || "-"}\n` +
        `📶 *Presences:* ${pc[i].presences || "-"}\n` +
        `📱 *Format Number:* ${formattedNum}\n` +
        `🔗 *Url Api:* wa.me/${num.split("@")[0]}\n` +
        `🔖 *Mentions:* @${num.split("@")[0]}\n` +
        `💬 *Status:* ${bio?.status || "-"}\n` +
        `🗓️ *Date Status:* ${statusDate}\n` +
        (business
          ? `\n*▾ INFO BUSINESS ▾*\n\n` +
            `🏢 *BusinessId:* ${business.wid}\n` +
            `🌐 *Website:* ${business.website || "-"}\n` +
            `📧 *Email:* ${business.email || "-"}\n` +
            `🏷️ *Category:* ${business.category}\n` +
            `📍 *Address:* ${business.address || "-"}\n` +
            `🕒 *Timezone:* ${business.business_hours.timezone || "-"}\n` +
            `📝 *Description:* ${business.description || "-"}\n`
          : "*Standard WhatsApp Account*");
    img
      ? await conn.sendMessage(
          m.chat,
          {
            image: {
              url: img,
            },
            caption: wea,
            mentions: [num],
          },
          {
            quoted: m,
          },
        )
      : m.reply(wea);
  } else {
    await m.reply(
      `❗ Format perintah salah. Gunakan "${usedPrefix}listpc" untuk daftar kontak atau "${usedPrefix}listpc [nomor_urut]" untuk informasi kontak tertentu.`,
    );
  }
};
handler.help = ["listpc"];
handler.tags = ["owner"];
handler.command = ["listpc"];
export default handler;
