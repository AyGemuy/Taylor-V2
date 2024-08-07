const handler = async (m, {
  conn,
  usedPrefix,
  text,
  command
}) => {
  var user = db.data.users[m.sender];
  skill = ["swordmaster", "necromancer", "witch", "Archer", "magicswordmaster", "thief", "shadow"];
  let skil = text.trim().toLowerCase();
  if (!skill.includes(skil)) throw `Select *skill🃏* what do you want/pilih skill apa yg kamu inginkan:\n\n${skill.map(skil => `› ${skil}`).join("\n")}\n\n     How To use/Cara menggunakan:\n     ${usedPrefix + command} <nameskill>\n     \n     Example/Contoh:\n     ${usedPrefix + command} necromancer\n     `;
  "" === user.skill ? (user.skill = skil, m.reply(`Anda telah memilih Skill ${skil}`)) : user.skill && m.reply(`Anda Sudah Punya skill ${user.skill} Tidak bisa diganti`);
};
handler.help = ["selectskill <type>"], handler.tags = ["rpg"], handler.command = /^(slectskill|selectskill)$/i;
export default handler;