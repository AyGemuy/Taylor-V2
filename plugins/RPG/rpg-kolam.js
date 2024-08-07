const handler = async (m, {
  conn
}) => {
  const user = db.data.users[m.sender],
    name = user.name,
    level = user.level,
    exp = user.exp,
    paus = user.paus,
    kepiting = user.kepiting,
    gurita = user.gurita,
    cumi = user.cumi,
    buntal = user.buntal,
    dory = user.dory,
    lumba = user.lumba,
    lobster = user.lobster,
    hiu = user.hiu,
    udang = user.udang,
    ikan = user.ikan,
    orca = user.orca,
    past = `\n*—「 KOLAM 🏝️ 」—*\n\n*💌 Name :* ${name}\n*📊 Level :* ${level}\n*✨ Exp :* ${exp}\n\n⛊━─┈────────┈─━⛊\n🐳 Paus: *${paus}*   \n🦀 Kepiting: *${kepiting}*   \n🐙 Gurita: *${gurita}*   \n🦑 Cumi: *${cumi}*   \n🐡 Buntal: *${buntal}*  \n🐠 Dory: *${dory}*\n🐬 Lumba: *${lumba}*\n🦞 Lobster: *${lobster}*\n🦈 Hiu: *${hiu}*\n🦐 Udang: *${udang}*\n🐟 Ikan: *${ikan}*\n🐋 Orca: *${orca}*\n⛊━─┈────────┈─━⛊\n🎏 Total Isi: *${paus + kepiting + gurita + cumi + buntal + dory + lumba + lobster + hiu + udang + ikan + orca}* Jenis`,
    isi = `\n🦀 Kepiting = ${kepiting}\n🐠 Dory = ${dory}\n🦞 Lobster = ${lobster}\n🐟 Ikan = ${ikan}\n🦐 Udang = ${udang}\n🐬 Lumba² = ${lumba}\n🦑 Cumi² = ${cumi}\n🐋 Paus = ${paus}\n🐙 Gurita = ${gurita}\n🦈 Hiu = ${hiu}\n🐡 Buntal = ${buntal}\n🐳 Orca = ${orca}`.trim();
  await conn.reply(m.chat, past + "\n\n" + isi, m);
};
handler.help = ["kotakikan", "kolam", "kolamikan"], handler.tags = ["rpg"],
  handler.command = /^(kotak(ikan)?|kolam(ikan)?)$/i, handler.register = !0;
export default handler;