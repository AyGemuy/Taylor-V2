async function handler(m) {
  if (!m.quoted) throw "reply pesan!";
  let q = await m.getQuotedMessage();
  if (!q.quoted) throw "pesan yang anda reply tidak mengandung reply!";
  await q.quoted.copyNForward(m.chat, !0);
}
handler.help = ["bq (reply from teks reply)"], handler.tags = ["baileys"], handler.command = /^(bq)$/i;
export default handler;