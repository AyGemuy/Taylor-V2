const handler = async (m, {
  conn,
  command
}) => {
  const user = db.data.users[m.sender];
  switch (command) {
    case "nguli":
      if (new Date() - user.lastnguli > 864e5) {
        user.limit += 10;
        user.lastnguli = +new Date();
        user.stamina = Math.min(user.stamina + 10, 100);
        await conn.reply(m.chat, "✅ +10 limit dan stamina 💪", m);
      } else {
        await conn.reply(m.chat, "❌ Upah sudah diambil hari ini", m);
      }
      break;
    case "punch":
      if (user.jb >= 100) {
        await conn.reply(m.chat, "❌ Anda sudah mencapai batas maksimal 100 punch hari ini", m);
        return;
      }
      if (user.stamina < 10) {
        await conn.reply(m.chat, "❌ Terlalu lelah 🥵", m);
        return;
      }
      const punchReps = Math.floor(Math.random() * 5) + 1;
      user.jb += punchReps;
      user.stamina -= punchReps === 5 ? 3 : punchReps;
      user.stamina = Math.max(user.stamina, 0);
      const bonusMultiplier = user.stamina > 95 ? 2 : 1;
      const moneyEarned = punchReps * 1e3 * bonusMultiplier;
      user.money += moneyEarned;
      if (user.jb >= 90) {
        user.aqua += 5 * bonusMultiplier;
        await conn.reply(m.chat, `👊 ${punchReps} reps.\n🎉 +${5 * bonusMultiplier} Aqua 🥤 dan +${moneyEarned} money 💵`, m);
      } else if (user.jb >= 80) {
        user.stamina = Math.min(user.stamina + 10 * bonusMultiplier, 100);
        await conn.reply(m.chat, `👊 ${punchReps} reps.\n🎉 +${10 * bonusMultiplier} stamina 💪 dan +${moneyEarned} money 💵`, m);
      } else {
        await conn.reply(m.chat, `👊 ${punchReps} reps.`, m);
      }
      if (user.jb % 5 === 0) {
        user.aqua = Math.max(user.aqua - 1, 0);
        await conn.reply(m.chat, "⚠️ -1 Aqua 🥤", m);
      }
      break;
    default:
      await conn.reply(m.chat, "❓ Perintah tidak dikenali", m);
      break;
  }
};
handler.tags = ["rpg"];
handler.command = /^(nguli|punch)$/i;
export default handler;