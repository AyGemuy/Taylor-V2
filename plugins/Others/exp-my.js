import daily from "../RPG/rpg-daily.js";
import weekly from "../RPG/rpg-weekly.js";
import monthly from "../RPG/rpg-monthly.js";
import adventure from "../RPG/rpg-adventure.js";
import { clockString } from "../../lib/other-function.js";
const inventory = {
    others: {
      health: !0,
      money: !0,
      exp: !0,
      limit: !0,
    },
    items: {
      health: !0,
      money: !0,
      exp: !0,
      level: !0,
      limit: !0,
    },
    tools: {
      armor: {
        0: "❌",
        1: "Leather Armor",
        2: "Iron Armor",
        3: "Gold Armor",
        4: "Diamond Armor",
        5: "Emerald Armor",
        6: "Crystal Armor",
        7: "Obsidian Armor",
        8: "Netherite Armor",
        9: "Wither Armor",
        10: "Dragon Armor",
        11: "Hacker Armor",
      },
      sword: {
        0: "❌",
        1: "Wooden Sword",
        2: "Stone Sword",
        3: "Iron Sword",
        4: "Gold Sword",
        5: "Copper Sword",
        6: "Diamond Sword",
        7: "Emerald Sword",
        8: "Obsidian Sword",
        9: "Netherite Sword",
        10: "Samurai Slayer Green Sword",
        11: "Hacker Sword",
      },
      pickaxe: {
        0: "❌",
        1: "Wooden Pickaxe",
        2: "Stone Pickaxe",
        3: "Iron Pickaxe",
        4: "Gold Pickaxe",
        5: "Copper Pickaxe",
        6: "Diamond Pickaxe",
        7: "Emerlad Pickaxe",
        8: "Crystal Pickaxe",
        9: "Obsidian Pickaxe",
        10: "Netherite Pickaxe",
        11: "Hacker Pickaxe",
      },
      fishingrod: !0,
    },
    crates: {
      common: !0,
      uncommon: !0,
      mythic: !0,
      legendary: !0,
      pet: !0,
    },
    pets: {
      horse: 10,
      cat: 10,
      fox: 10,
      dog: 10,
    },
    cooldowns: {
      lastclaim: {
        name: "claim",
        time: daily.cooldown,
      },
      lastweekly: {
        name: "weekly",
        time: weekly.cooldown,
      },
      lastmonthly: {
        name: "monthly",
        time: monthly.cooldown,
      },
      lastadventure: {
        name: "adventure",
        time: adventure.cooldown,
      },
    },
  },
  handler = async (m, { conn }) => {
    let user = db.data.users[m.sender];
    Object.keys(inventory.tools)
      .map(
        (v) =>
          user[v] &&
          `*${rpg.emoticon(v)}${v}:* ${"object" == typeof inventory.tools[v] ? inventory.tools[v][user[v].toString()] : `Level(s) ${user[v]}`}`,
      )
      .filter((v) => v)
      .join("\n")
      .trim(),
      Object.keys(inventory.items)
        .map((v) => user[v] && `*${rpg.emoticon(v)}${v}:* ${user[v]}`)
        .filter((v) => v)
        .join("\n│ ")
        .trim(),
      Object.keys(inventory.crates)
        .map((v) => user[v] && `*${rpg.emoticon(v)}${v}:* ${user[v]}`)
        .filter((v) => v)
        .join("\n")
        .trim(),
      Object.keys(inventory.pets)
        .map(
          (v) =>
            user[v] &&
            `*${rpg.emoticon(v)}${v}:* ${user[v] >= inventory.pets[v] ? "Max Levels" : `Level(s) ${user[v]}`}`,
        )
        .filter((v) => v)
        .join("\n")
        .trim(),
      Object.entries(inventory.cooldowns)
        .map(
          ([cd, { name, time }]) =>
            cd in user &&
            `*✧ ${name}*: ${new Date() - user[cd] >= time ? "✅" : "❌"}`,
        )
        .filter((v) => v)
        .join("\n")
        .trim();
    const caption =
      `*🧑🏻‍🏫 ɴᴀᴍᴇ:* ${user.registered ? user.name : conn.getName(m.sender)}\n✉️ *ᴇxᴘ:* ${user.exp}\n🏆 *ʟᴇᴠᴇʟ:* ${user.level}\n🎋 *ʀᴏʟᴇ:* ${user.role}\n❤️ *ʜᴇᴀʟᴛʜ:* ${user.health}\n🌌 *ʟɪᴍɪᴛ:* ${user.limit}\n💲 *ᴍᴏɴᴇʏ:* ${user.money}${user.atm ? `\n💳 *ᴀᴛᴍ:* ʟᴠ.${user.atm}\n🏦 *ʙᴀɴᴋ:* ${user.bank} $ / ${user.fullatm} $` : ""}\nℹ️ *sᴛᴀᴛᴜs:* ${user.premiumTime > 0 ? "Premium" : "Free"}\n📨 *ʀᴇɢɪsᴛᴇʀᴇᴅ:* ${user.registered ? "Yes" : "No"}${user.premiumTime >= 1 ? `\n⏰ *ᴇxᴘɪʀᴇᴅ:*\n${clockString(user.premiumTime - 1 * new Date())}` : ""}\n`.trim();
    await conn.reply(m.chat, `${htki} ᴜ s ᴇ ʀ s ${htka}\n` + caption, m);
  };
(handler.help = ["my"]),
  (handler.tags = ["xp"]),
  (handler.command = /^(my)$/i),
  (handler.register = !1);
export default handler;
