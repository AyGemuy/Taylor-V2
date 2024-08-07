import {
  areJidsSameUser
} from "@whiskeysockets/baileys";
const leaderboards = ["level", "exp", "limit", "money", "iron", "gold", "diamond", "emerald", "trash", "potion", "petFood", "wood", "rock", "string", "common", "uncommon", "mythic", "legendary", "pet"],
  handler = async (m, {
    conn,
    args,
    participants,
    usedPrefix,
    command
  }) => {
    let imgr = flaaa.getRandom(),
      users = Object.entries(db.data.users).map(([key, value]) => ({
        ...value,
        jid: key
      })),
      leaderboard = leaderboards.filter(v => v && users.some(user => user && user[v])),
      type = (args[0] || "").toLowerCase();
    const wrong = `🔖 ᴛʏᴩᴇ ʟɪsᴛ :\n${leaderboard.map(v => `⮕ ${rpg.emoticon(v)} - ${v}`).join("\n")}\n––––––––––––––––––––––––\n💁🏻‍♂ ᴛɪᴩ :\n⮕ ᴛᴏ ᴠɪᴇᴡ ᴅɪғғᴇʀᴇɴᴛ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ:\n${usedPrefix}${command} [type]\n★ ᴇxᴀᴍᴩʟᴇ:\n${usedPrefix}${command} legendary`.trim();
    if (!leaderboard.includes(type)) return await conn.sendFile(m.chat, imgr + "leaderboard", "", "*––––『 LEADERBOARD 』––––*\n" + wrong, m);
    let sortedItem = users.map(toNumber(type)).sort(sort(type, !1)),
      userItem = sortedItem.map(enumGetKey),
      userIndex = userItem.indexOf(m.sender),
      userEntries = await Promise.all(sortedItem?.slice(0, 5).map(async (user, i) => {
        let isParticipant = participants.some(p => areJidsSameUser(user.jid, p.id)),
          name = isParticipant ? conn.getName(user.jid) : "Unknown";
        return `${i + 1}. *﹙${user[type]}﹚* - ${isParticipant ? `${name} \nwa.me/` : "ғʀᴏᴍ ᴏᴛʜᴇʀ ɢʀᴏᴜᴩ\n @"}${user.jid.split("@")[0]}`;
      })),
      text = `\n🏆 ʀᴀɴᴋ: ${userIndex + 1} ᴏᴜᴛ ᴏғ ${userItem.length}\n\n                    *• ${rpg.emoticon(type)} ${type} •*\n\n${userEntries.join("\n\n")}\n`.trim();
    return await conn.sendFile(m.chat, imgr + "leaderboard", "", "*–『 GLOBAL LEADERBOARD 』–*\n" + text, m, {
      mentions: userItem.slice(0, 5).filter(v => !participants.some(p => areJidsSameUser(v, p.id)))
    });
  };
handler.help = ["leaderboard [jumlah user]", "lb [jumlah user]"], handler.tags = ["xp"],
  handler.command = /^(leaderboard|lb)$/i;
export default handler;

function sort(property, ascending = !0) {
  return (a, b) => ascending ? a[property] - b[property] : b[property] - a[property];
}

function toNumber(property, _default = 0) {
  return user => ({
    ...user,
    [property]: void 0 === user[property] ? _default : user[property]
  });
}

function enumGetKey(user) {
  return user.jid;
}

function isNumber(number) {
  return !isNaN(parseInt(number));
}