const handler = async (m, { conn, usedPrefix, text, command }) => {
  const user = db.data.users[m.sender];
  const skills = [
    "swordmaster",
    "necromancer",
    "witch",
    "archer",
    "magicswordmaster",
    "thief",
    "shadow",
  ];
  const selectedSkill = text.trim().toLowerCase();
  if (!skills.includes(selectedSkill)) {
    return m.reply(
      `Select *skill🃏* what do you want/pilih skill apa yg kamu inginkan:\n\n${skills.map((skill) => `› ${skill}`).join("\n")}\n\nHow To use/Cara menggunakan:\n${usedPrefix + command} <nameskill>\n\nExample/Contoh:\n${usedPrefix + command} necromancer`,
    );
  }
  if (!user.skill) {
    user.skill = selectedSkill;
    m.reply(`Anda telah memilih Skill ${selectedSkill}`);
  } else {
    m.reply(`Anda sudah punya skill ${user.skill} dan tidak bisa diganti`);
  }
};
handler.help = ["selectskill <type>"];
handler.tags = ["rpg"];
handler.command = /^(slectskill|selectskill)$/i;
export default handler;
