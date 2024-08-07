const handler = async (m, {
  conn
}) => {
  const user = db.data.users[m.sender],
    animals_banteng = user.banteng,
    animals_harimau = user.harimau,
    animals_gajah = user.gajah,
    animals_kambing = user.kambing,
    animals_panda = user.panda,
    animals_buaya = user.buaya,
    animals_kerbau = user.kerbau,
    animals_sapi = user.sapi,
    animals_monyet = user.monyet,
    animals_babihutan = user.babihutan,
    animals_babi = user.babi,
    animals_ayam = user.ayam;
  let ndy = `\n*${htki} KANDANG ${htka}*\n    \n *➡️   ️ 🐂 = [ ${animals_banteng} ] Ekor Banteng*\n *➡️   ️ 🐅 = [ ${animals_harimau} ] Ekor Harimau*\n *➡️   ️ 🐘 = [ ${animals_gajah} ] Ekor Gajah*\n *➡️   ️ 🐐 = [ ${animals_kambing} ] Ekor Kambing*\n *➡️   ️ 🐼 = [ ${animals_panda} ] Ekor Panda*\n *➡️   ️ 🐊 = [ ${animals_buaya} ] Ekor Buaya*\n *➡️   ️ 🐃 = [ ${animals_kerbau} ] Ekor Kerbau*\n *➡️   ️ 🐮 = [ ${animals_sapi} ] Ekor Sapi*\n *➡️   ️ 🐒 = [ ${animals_monyet} ] Ekor Monyet*\n *➡️   ️ 🐗 = [ ${animals_babihutan} ] Ekor Babi Hutan*\n *➡️   ️ 🐖 = [ ${animals_babi} ] Ekor Babi*\n *➡️   ️ 🐓 = [ ${animals_ayam} ] Ekor Ayam*\n `.trim();
  await conn.reply(m.chat, ndy, m);
};
handler.help = ["kandang"], handler.tags = ["rpg"], handler.command = /^(kandang)$/i;
export default handler;