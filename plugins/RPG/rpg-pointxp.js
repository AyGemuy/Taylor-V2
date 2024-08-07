const handler = async (m, {
  args,
  text,
  conn
}) => {
  if (!args[0] || !args[1]) return m.reply("pake gini .expoint strength 1");
  if (isNaN(args[1])) return m.reply("Pake angka");
  let human = ["strength", "mana", "stamina", "agility", "intelligence"],
    hum = args[0]?.toLowerCase();
  if (!human.includes(hum)) return m.reply(`\nList exchange point xp\n${human.map(hum => `› ${hum}`).join("\n")}`);
  let user = db.data.users[m.sender];
  if (0 === user.pointxp) return m.reply("your point xp not enough");
  user.hum += args[1], user.pointxp -= args[1], m.reply(`Now Your ${hum} is ${user.hum}!`);
};
handler.help = ["expoint *<type|jumlah>*"], handler.tags = ["rpg"], handler.command = /^(ex(change)?(point)?)$/i;
export default handler;