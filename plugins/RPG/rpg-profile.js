import {
  join
} from "path";
import {
  xpRange
} from "../../lib/levelling.js";
import {
  BannerBot
} from "../../lib/welcome.js";
import fetch from "node-fetch";
const checkUser = (id, adminList) => {
    const admin = adminList.find(participant => participant.id === id)?.admin;
    return "superadmin" === admin ? "Super Admin" : "admin" === admin ? "Admin" : "Member";
  },
  potongString = str => str.length <= 80 ? str : str.slice(0, 80),
  handler = async (m, {
    conn,
    args,
    usedPrefix,
    command,
    groupMetadata,
    participants
  }) => {
    try {
      const adminList = groupMetadata.participants || participants,
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
        {
          exp,
          limit,
          level,
          role,
          money,
          lastclaim,
          lastweekly,
          registered,
          regTime,
          age,
          banned,
          pasangan
        } = db.data.users[who] || {},
        {
          min,
          xp,
          max
        } = xpRange(level, multiplier),
        name = m.name.split("\n")[0],
        pp = await conn.profilePictureUrl(who, "image").catch(_ => "./src/avatar_contact.png");
      void 0 === db.data.users[who] && (db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: !1,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: "",
        banned: !1,
        level: 0,
        lastweekly: 0,
        role: "Warrior V",
        autolevelup: !1,
        money: 0,
        pasangan: ""
      });
      const math = max - xp,
        caption = `*YOUR PROFILE*\n*🏷️ Nama:* *(${name})* ${registered ? "(" + name + ") " : ""} ( @${who.split("@")[0]} )\n*❤️ Pasangan:*  ${pasangan ? `@${pasangan.split("@")[0]}` : "Tidak Punya"}\n*💲 Money:* *RP* ${money}\n*🏆 Level* ${level}\n*🎋 Role:* ${role}\n*🧬 XP:* TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Siap untuk *${usedPrefix}levelup*` : `${math} XP lagi untuk levelup`}]\n*📨 Terdaftar:* ${registered ? "Ya (" + new Date(regTime).toLocaleString() + ")" : "Tidak"} ${lastclaim > 0 ? "\n*⏱️Terakhir Klaim:* " + new Date(lastclaim).toLocaleString() : ""}\n\n Ketik ${usedPrefix}inv untuk melihat Inventory RPG`,
        contohStringPanjang = `Ini adalah profil dari ${name}, seorang ${checkUser(m.sender, adminList)} di ${groupMetadata.subject}.`,
        profileBuffer = (potongString(contohStringPanjang), BannerBot(m.name.split("\n")[0]));
      try {
        await conn.sendFile(m.chat, profileBuffer, "", caption, m, null, {
          mentions: conn.parseMention(caption)
        });
      } catch (e) {
        await conn.sendFile(m.chat, pp, "", caption, m, null, {
          mentions: conn.parseMention(caption)
        });
      }
    } catch (e) {
      throw e;
    }
  };
handler.help = ["profile"].map(v => v + " <user>"), handler.tags = ["rpg"],
  handler.command = /^(pro(fil)?(file)?)$/i, handler.group = !0;
export default handler;