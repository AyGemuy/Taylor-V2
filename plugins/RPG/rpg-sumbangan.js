let confirmation = {};
async function handler(m, {
  conn,
  args,
  usedPrefix,
  command
}) {
  if (confirmation[m.sender]) return m.reply("Kamu sedang meminta sumbangan!");
  db.data.users;
  const count = args[0];
  if (!count) return m.reply("⚠️ Masukkan angka jumlah sumbangan.");
  if (isNaN(count)) return m.reply("⚠️ Jumlah sumbangan harus berupa angka.");
  let hasil = formatRupiah(Number(count)),
    confirm = `😔 Kak bagi sumbangan\ncuma *${hasil}* dong.\n\nApakah kamu yakin ingin memberi sumbangan\n✅ (Yes) ❌ (No)`,
    {
      key
    } = await conn.reply(m.chat, confirm, m, {
      mentions: [m.sender]
    });
  confirmation[m.sender] = {
    sender: m.sender,
    message: m,
    count: count,
    hasil: hasil,
    key: key,
    pesan: conn,
    timeout: setTimeout(() => (conn.sendMessage(m.chat, {
      delete: key
    }), delete confirmation[m.sender]), 6e4)
  };
}
handler.before = async m => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;
    let {
      timeout,
      sender,
      message,
      count,
      hasil,
      key,
      pesan
    } = confirmation[m.sender];
    if (m.id === message.id) return;
    let user = db.data.users[m.sender],
      _user = db.data.users[sender];
    /(✔️|y(es)?)/g.test(m.text.toLowerCase()) && (m.sender !== sender ? (user.money -= 1 * count, _user.money += 1 * count, m.reply(`✨ Terima kasih!\n${m.name.split("\n")[0]} telah memberi sumbangan sebesar *${hasil}*`), pesan.sendMessage(m.chat, {
      delete: key
    }), clearTimeout(timeout), delete confirmation[sender]) : m.reply("⚠️ Tidak bisa meminta sumbangan ke diri anda sendiri!.")), /(✖️|n(o)?)/g.test(m.text.toLowerCase()) && (m.reply(`😔 ${m.name.split("\n")[0]} kamu berdosa banget kak...`), pesan.sendMessage(m.chat, {
      delete: key
    }), clearTimeout(timeout), delete confirmation[sender]);
  }, handler.help = ["sumbangan"].map(v => v + " [jumlah]"), handler.tags = ["rpg"],
  handler.command = /^(sumbangan)$/i, handler.disabled = !1;
export default handler;

function isNumber(x) {
  return !isNaN(x);
}

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}