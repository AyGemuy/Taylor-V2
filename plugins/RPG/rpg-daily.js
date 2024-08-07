const rewards = {
    exp: 9999,
    money: 4999,
    potion: 5
  },
  cooldown = 864e5,
  handler = async (m, {
    conn,
    usedPrefix
  }) => {
    let user = db.data.users[m.sender];
    if (new Date() - user.lastclaim < 864e5) throw `You have already claimed this daily claim!, wait for *${(user.lastclaim + 864e5 - new Date()).toTimeString()}*`;
    let text = "";
    for (let reward of Object.keys(rewards)) reward in user && (user[reward] += rewards[reward], text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`);
    conn.sendButton(m.chat, `${htki} DAILY ${htka}\n`, text.trim(), flaaa.getRandom() + "Daily", [
        ["Weekly", usedPrefix + "weekly"]
      ], m),
      user.lastclaim = 1 * new Date();
  };
handler.help = ["daily", "claim"], handler.tags = ["xp"], handler.command = /^(daily|claim)$/i,
  handler.cooldown = 864e5;
export default handler;