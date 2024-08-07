const handler = async (m, {
  conn
}) => {
  try {
    const diceValue = Math.floor(6 * Math.random()) + 1,
      diceImage = rollDice(diceValue),
      isHighRoll = diceValue >= 4,
      additionalCoins = 3 === diceValue ? 300 : 100 * diceValue,
      baseCoins = isHighRoll ? Math.min(Math.floor(15001 * Math.random()), 15e3) : 0,
      baseExp = isHighRoll ? Math.min(Math.floor(10001 * Math.random()), 1e4) : 0,
      multiplier = isHighRoll ? Math.floor(2 * Math.random()) + 1 : 1,
      coins = Math.min(baseCoins * multiplier + additionalCoins, 15e3),
      exp = Math.min(baseExp * multiplier, 1e4),
      player = db.data.users[m.sender];
    player.money += coins, player.exp += exp;
    const coinMessage = coins ? `💰 *${coins.toLocaleString()}* coins earned!` : "No coins earned.",
      expMessage = exp ? `🌟 *${exp.toLocaleString()}* exp gained!` : "No exp gained.",
      additionalCoinsMessage = additionalCoins ? `💰 Additional *${additionalCoins.toLocaleString()}* coins for rolling a ${diceValue}!` : "",
      msg = `${coinMessage}\n${expMessage}\n${additionalCoinsMessage}\n${multiplier > 1 ? `Multiplier: *${multiplier}*` : ""}`;
    await conn.reply(m.chat, msg, m, {
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "🎲 Roll the dice!",
          thumbnail: await (await conn.getFile(diceImage)).data
        }
      }
    });
  } catch (error) {
    console.error(error), m.reply("Error processing the dice roll.");
  }
};
handler.help = ["dadu"], handler.tags = ["game"], handler.command = ["dadu"];
export default handler;

function rollDice(value) {
  return `https://www.random.org/dice/dice${value}.png`;
}