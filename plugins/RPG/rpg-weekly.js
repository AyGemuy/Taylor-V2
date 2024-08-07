const rewards = {
    exp: 15e3,
    money: 35999,
    potion: 9
  },
  cooldown = 6048e5,
  handler = async (m, {
    conn,
    usedPrefix
  }) => {
    let user = db.data.users[m.sender];
    if (new Date() - user.lastweekly < cooldown) throw `You have already claimed this daily claim!, wait for *${(user.lastweekly + cooldown - new Date()).toTimeString()}*`;
    let text = "";
    for (let reward of Object.keys(rewards)) reward in user && (user[reward] += rewards[reward], text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`);
    conn.sendButton(m.chat, `${htki} WEEKLY ${htka}\n`, text.trim(), flaaa.getRandom() + "Weekly", [
        ["Monthly", usedPrefix + "monthly"]
      ], m),
      user.lastweekly = 1 * new Date();
  };
handler.help = ["weekly"], handler.tags = ["rpg"], handler.command = /^(weekly)$/i,
  handler.cooldown = cooldown;
export default handler;