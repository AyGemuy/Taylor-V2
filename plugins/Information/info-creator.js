import fetch from "node-fetch";
import PhoneNumber from "awesome-phonenumber";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who);
  if ("creator" === command) {
    let vcard = "BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;Saya Owner Taylor;Bot;;Md\nFN:Saya Owner Taylor Bot WhatsApp, Md\nNICKNAME:👑 Owner Taylor Bot\nORG:Wudy\nTITLE:soft\nitem1.TEL;waid=6282195322106:+62 821-9532-2106\nitem1.X-ABLabel:📞 Nomor Owner\nitem2.URL:https://s.id/Cerdasin62\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET:wudysoft@mail.com\nitem3.X-ABLabel:💌 Mail Owner TaylorBot\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:📍 Lokasi Saya\nBDAY;value=date:🔖 13 January 2001\nEND:VCARD",
      tag_own = await conn.sendMessage(m.chat, {
        contacts: {
          displayName: wm,
          contacts: [{
            vcard: vcard
          }]
        },
        contextInfo: {
          externalAdReply: {
            title: wm,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: !0,
            thumbnailUrl: logo,
            sourceUrl: ""
          }
        }
      }, {
        quoted: fakes
      });
    await conn.reply(m.chat, `Halo kak @${m.sender.split("@")[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, tag_own, {
      mentions: [m.sender]
    });
  }
  if ("pengembang" === command) {
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${author};;;\nFN:${author}\nORG:${author}\nTITLE:\nitem1.TEL;waid=6282195322106:+62 821-9532-2106\nitem1.X-ABLabel:${author}\nX-WA-BIZ-DESCRIPTION:${htjava} Nih pengembang ku kack yg mengaktifkan aq.\nX-WA-BIZ-NAME:${author}\nEND:VCARD`,
      tag_own = await conn.sendMessage(m.chat, {
        contacts: {
          displayName: wm,
          contacts: [{
            vcard: vcard
          }]
        },
        contextInfo: {
          externalAdReply: {
            title: wm,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: !0,
            thumbnailUrl: logo,
            sourceUrl: ""
          }
        }
      }, {
        quoted: fakes
      });
    await conn.reply(m.chat, `Halo kak @${m.sender.split("@")[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, tag_own, {
      mentions: [m.sender]
    });
  }
  if ("owner" === command) try {
    const ownerPromises = owner.map(async (item, index) => [item[0], conn.getName(item[0] + "@s.whatsapp.net") || "Tidak diketahui", "👑 Owner", "Saya adalah Owner", "wudysoft@gmail.com", "🇮🇩 Indonesia", "🚀 https://aygemuy.github.io/", "👤 Gada pawang nih senggol dong 😔"]),
      data = await Promise.all(ownerPromises);
    let contacts = [];
    for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
      number = number.replace(/[^0-9]/g, "");
      let njid = number + "@s.whatsapp.net",
        vcard = (await conn.getBusinessProfile(njid).catch(_ => null), `\nBEGIN:VCARD\nVERSION:3.0\nN:;${name.replace(/\n/g, "\\n").split(" ").reverse().join(";")};;;\nFN:${name.replace(/\n/g, "\\n")}\nitem.ORG:${isi}\nitem1.TEL;waid=${number}:${PhoneNumber("+" + number).getNumber("international")}\nitem1.X-ABLabel:${isi1}\nitem2.EMAIL;type=INTERNET:${isi2}\nitem2.X-ABLabel:📧 Email\nitem3.ADR:;;${isi3};;;;\nitem3.X-ABADR:ac\nitem3.X-ABLabel:📍 Region\nitem4.URL:${isi4}\nitem4.X-ABLabel:Website\nitem5.X-ABLabel:${isi5}\nEND:VCARD`.trim());
      contacts.push({
        vcard: vcard,
        displayName: name
      });
    }
    let tag_own = await conn.sendMessage(m.chat, {
      contacts: {
        displayName: (contacts.length > 1 ? "2013 kontak" : contacts[0]?.displayName) || null,
        contacts: contacts
      },
      contextInfo: {
        externalAdReply: {
          title: wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: !0,
          thumbnailUrl: logo,
          sourceUrl: ""
        }
      }
    }, {
      quoted: fakes
    });
    await conn.reply(m.chat, `Halo kak @${m.sender.split("@")[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, tag_own, {
      mentions: [m.sender]
    });
  } catch {
    let tag_own = await conn.sendContact(m.chat, nomorown, conn.getName(nomorown + "@s.whatsapp.net"), m);
    await conn.reply(m.chat, `Halo kak @${m.sender.split("@")[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, tag_own, {
      mentions: [m.sender]
    });
  }
};
handler.help = ["owner", "creator", "pengembang"], handler.tags = ["info"],
  handler.command = /^(owner|pengembang|creator)$/i;
export default handler;