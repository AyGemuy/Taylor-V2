const handler = async (m, {
  conn
}) => {
  const lastClaim = db.data.users[m.sender].lastclaim,
    cdm = `${MeNit(new Date() - lastClaim)}`,
    cds = `${DeTik(new Date() - lastClaim)}`,
    cd1 = Math.ceil(44 - cdm),
    cd2 = Math.ceil(59 - cds);
  if (!(new Date() - db.data.users[m.sender].lastclaim > 27e5)) throw `Lu udah ambil jatah hari ini.\n\nTunggu ${cd1} Menit ${cd2} Detik!`;
  db.data.users[m.sender].uang += 7e3, db.data.users[m.sender].exp += 100, m.reply("Nih gaji lu +Rp7000"),
    db.data.users[m.sender].lastclaim = 1 * new Date();
};
handler.help = ["gaji", "gajian"], handler.tags = ["rpg"], handler.command = /^(gaji|gajian)$/i,
  handler.group = !0, handler.register = !0, handler.exp = 0;
export default handler;

function JaM(ms) {
  return [isNaN(ms) ? "60" : Math.floor(ms / 36e5) % 60].map(v => v.toString().padStart(2, 0)).join(":");
}

function MeNit(ms) {
  return [isNaN(ms) ? "60" : Math.floor(ms / 6e4) % 60].map(v => v.toString().padStart(2, 0)).join(":");
}

function DeTik(ms) {
  return [isNaN(ms) ? "60" : Math.floor(ms / 1e3) % 60].map(v => v.toString().padStart(2, 0)).join(":");
}