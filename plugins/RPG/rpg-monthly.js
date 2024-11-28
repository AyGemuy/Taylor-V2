const rewards = {
    exp: 5e4,
    money: (Math.random() * 5001 + 5e3) | 0,
    potion: 10,
    mythic: 3,
    legendary: 1,
  },
  cooldown = 2592e6,
  handler = async (m, { conn, usedPrefix }) => {
    let user = db.data.users[m.sender];
    if (new Date() - user.lastmonthly < cooldown)
      throw `You have already claimed this monthly claim, wait for ${(user.lastmonthly + cooldown - new Date()).toTimeString()}`;
    let text = "";
    for (let reward of Object.keys(rewards))
      reward in user &&
        ((user[reward] += rewards[reward]),
        (text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`));
    conn.sendButton(
      m.chat,
      `${htki} MONTHLY ${htka}\n`,
      text.trim(),
      flaaa.getRandom() + "Monthly",
      [["My", usedPrefix + "my"]],
      m,
    ),
      (user.lastmonthly = 1 * new Date());
  };
(handler.help = ["monthly"]),
  (handler.tags = ["rpg"]),
  (handler.command = /^(monthly)$/i),
  (handler.cooldown = cooldown);
export default handler;
