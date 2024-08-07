const rewards = {
    exp: 9999,
    money: 4999,
    potion: 5,
    iron: 2,
    legendary: 1,
    emas: 2,
    string: 3,
    limit: 1
  },
  cooldown = 36e5,
  handler = async (m, {
    conn,
    usedPrefix
  }) => {
    const user = db.data.users[m.sender];
    if (new Date() - user.lasthourly < 36e5) {
      throw `You have already claimed this hourly claim! Wait for *${new Date(user.lasthourly + 36e5 - new Date()).toTimeString()}*`;
    }
    let text = "";
    for (const reward of Object.keys(rewards)) reward in user && (user[reward] += rewards[reward], text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`);
    conn.sendButton(m.chat, `${htki} HOURLY ${htka}\n`, text.trim(), flaaa.getRandom() + "Hourly", [
        ["Daily", usedPrefix + "daily"]
      ], m),
      user.lasthourly = 1 * new Date();
  };
handler.help = ["hourly"], handler.tags = ["xp"], handler.command = /^(hourly)$/i,
  handler.cooldown = 36e5;
export default handler;