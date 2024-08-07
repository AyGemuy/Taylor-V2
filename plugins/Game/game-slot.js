import _ from "lodash";
const handler = async (m, {
  args,
  usedPrefix,
  command,
  conn
}) => {
  const levels = ["easy", "normal", "hard", "extreme"];
  const taruhanOptions = [100, 500, 1e3, 5e3, 1e4];
  const sizeMap = {
    easy: 3,
    normal: 4,
    hard: 5,
    extreme: 6
  };
  const emojisMap = {
    easy: ["🔧", "🔨", "🛠", "🧰", "🏆", "💣"],
    normal: ["🍕", "🍔", "🍣", "🍜", "🏆", "💣"],
    hard: ["🐶", "🐱", "🐭", "🐹", "🏆", "💣"],
    extreme: ["🚗", "🛵", "🚀", "🛥", "🏆", "💣"]
  };
  const getMultiplier = (level, hasTrophy, hasBomb) => {
    let base = {
      easy: 2,
      normal: 3,
      hard: 4,
      extreme: 5
    } [level] || 1;
    if (hasTrophy) base *= 2;
    if (hasBomb) base /= 2;
    return base;
  };
  const generateSlot = (size, emojis) => _.times(size, () => _.sampleSize(emojis, size));
  const formatSlot = slot => slot.map(row => row.join(" ")).join("\n");
  const generateRandomSlots = (count, size, emojis) => _.times(count, () => formatSlot(generateSlot(size, emojis)));
  const checkWin = slot => {
    const size = slot.length;
    const winLines = [];
    for (let i = 0; i < size; i++) {
      const row = slot[i];
      const column = slot.map(r => r[i]);
      if (_.uniq(row).length === 1) winLines.push(`Row ${i + 1}`);
      if (_.uniq(column).length === 1) winLines.push(`Column ${i + 1}`);
    }
    const diag1 = _.range(size).map(i => slot[i][i]);
    const diag2 = _.range(size).map(i => slot[i][size - i - 1]);
    if (_.uniq(diag1).length === 1) winLines.push(`Main Diagonal`);
    if (_.uniq(diag2).length === 1) winLines.push(`Secondary Diagonal`);
    return winLines;
  };
  let taruhan = parseInt(args[0]);
  let level = args[1];
  if (!taruhan) {
    const taruhanButtons = conn.ctaButton.setBody("*Choose a bet to start the game.*").addSelection("Click here").makeSections("Bet", "Select bet amount.");
    taruhanOptions.forEach(option => taruhanButtons.makeRow("", `${option} XP`, `Bet ${option} XP`, `${usedPrefix + command} ${option}`));
    return taruhanButtons.run(m.chat, conn, m);
  }
  if (!level) {
    const levelButtons = conn.ctaButton.setBody("*Choose game level.*").addSelection("Click here").makeSections("Level", "Select game level.");
    levels.forEach(l => levelButtons.makeRow("", `${_.capitalize(l)}`, `Level ${_.capitalize(l)} (${sizeMap[l]}x${sizeMap[l]})`, `${usedPrefix + command} ${taruhan} ${l}`));
    return levelButtons.run(m.chat, conn, m);
  }
  if (isNaN(taruhan) || !levels.includes(level)) {
    return conn.reply(m.chat, `📜 *Usage:* ${usedPrefix + command} <amount> <level>\n\n📌 *Example:* ${usedPrefix + command} 100 normal\n\n*Explanation:* Bet 100 XP at normal level.`, m);
  }
  let users = db.data.users[m.sender];
  if (taruhan < 1 || users.exp < taruhan) return m.reply("*📉 Minimum bet is 1 XP* or not enough XP!");
  let size = sizeMap[level];
  let bet = emojisMap[level];
  let randomSlot = generateSlot(size, bet);
  let winningLines = checkWin(randomSlot);
  const hasTrophy = winningLines.some(line => line.includes("🏆"));
  const hasBomb = winningLines.some(line => line.includes("💣"));
  let multiplier = getMultiplier(level, hasTrophy, hasBomb);
  let effectiveTaruhan = hasBomb ? taruhan / 2 : taruhan;
  let totalWin = winningLines.length ? effectiveTaruhan * multiplier * winningLines.length : 0;
  let moneyChange = totalWin - effectiveTaruhan;
  const randomSlots = generateRandomSlots(_.random(3, 5), size, bet);
  const randomSlotsMessages = randomSlots.map(slots => `🎰 *SLOTS (${size}x${size})*\n\n${slots}\n\n*Waiting for slot results.*`);
  const endMessage = hasBomb ? `💥 *BOOM!* 😱 *- ${effectiveTaruhan * 100} XP*` : winningLines.length ? `🏅 *JACKPOT!* 🎉 *+${totalWin * 100} XP*` : `😔 *LOST* -${effectiveTaruhan * 100} XP`;
  const detailMessage = `📊 *Bet Details:*\n` + `- *Bet:* ${taruhan * 100} XP\n` + `- *Level:* ${_.capitalize(level)} (${size}x${size})\n` + `${winningLines.length ? `- *Win:* ${totalWin * 100} XP\n` : hasBomb ? `- *Loss:* ${effectiveTaruhan * 100} XP\n` : ""}` + `${winningLines.length ? `- *Multiplier:* x${multiplier}\n` : ""}` + `${winningLines.length ? `- *XP Change:* +${totalWin * 100}\n` : ""}` + `${winningLines.length ? `- *Winning Lines:* ${winningLines.join(", ")}\n` : hasBomb ? `- *Bomb Lines:* ${winningLines.join(", ")}\n` : ""}` + `- *Money Change:* ${moneyChange * 1e3 >= 0 ? `+${moneyChange * 1e3}` : moneyChange * 1e3}`;
  await conn.loadingMsg(m.chat, `🎰 *Starting Slot*`, `🎰 *SLOTS (${size}x${size})*\n\n${formatSlot(randomSlot)}\n\n${endMessage}\n\n${detailMessage}`, randomSlotsMessages, 2e3, m);
  users.exp += totalWin - effectiveTaruhan;
  users.money += multiplier * effectiveTaruhan * 2e3 - effectiveTaruhan * 1e3;
  users.lastslot = Date.now();
};
handler.help = ["slot <amount> <level>"];
handler.tags = ["game"];
handler.command = /^(slot?)$/i;
export default handler;