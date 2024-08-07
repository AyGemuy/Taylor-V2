import {
  join
} from "path";
import {
  promises
} from "fs";
const handler = async (m, {
  args,
  usedPrefix,
  __dirname
}) => {
  let imgr = flaaa.getRandom(),
    user = (JSON.parse(await promises.readFile(join(__dirname, "../package.json")).catch(_ => ({}))), db.data.users[m.sender]);
  if (user.health >= 100) return m.reply("\nYour ❤️health is full!\n".trim());
  const heal = 40 + 4 * user.cat;
  let count = 1 * Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)));
  if (user.potion < count) return await conn.sendFile(m.chat, imgr + "lowpotion", "", `*–『 INSUFFICIENT POTION 』–*\nʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴜʏ ${count - user.potion} ᴍᴏʀᴇ 🥤ᴩᴏᴛɪᴏɴ ᴛᴏ ʜᴇᴀʟ.\nʏᴏᴜ'ᴠᴇ ${user.potion} 🥤ᴩᴏᴛɪᴏɴ ɪɴ ʙᴀɢ.\n⛊━─┈────────┈─━⛊\n💁🏻‍♂ ᴛɪᴩ :\n'ʙᴜʏ🥤ᴩᴏᴛɪᴏɴ' | 'ᴀsᴋ ᴛᴏ ᴀʟʟ'\n`.trim(), m);
  user.potion -= 1 * count, user.health += heal * count, user.healt += heal * count,
    await conn.sendFile(m.chat, imgr + "fullhealth", "", `*━┈━┈━『 FULL HEALTH 』━┈━┈━*\nsᴜᴄᴄᴇssғᴜʟʟʏ ${count} 🥤ᴩᴏᴛɪᴏɴ ᴜsᴇ ᴛᴏ ʀᴇᴄᴏᴠᴇʀ ʜᴇᴀʟᴛʜ.`, m);
};
handler.help = ["heal"], handler.tags = ["rpg"], handler.command = /^(heal)$/i;
export default handler;

function isNumber(number) {
  return number ? "number" == typeof(number = parseInt(number)) && !isNaN(number) : number;
}