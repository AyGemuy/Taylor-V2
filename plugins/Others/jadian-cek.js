const handler = async (m, {
  conn,
  usedPrefix,
  text
}) => {
  if (text = function(number) {
      return number.replace(/\s/g, "").replace(/([@+-])/g, "");
    }(text), isNaN(text)) var number = text.split("@")[1];
  else if (!isNaN(text)) number = text;
  if (number.length > 15 || number.length < 9 && number.length > 0) return await conn.reply(m.chat, "Maaf, Nomor yang anda masukan salah!", m);
  if (text || m.quoted) {
    if (text) user = number + "@s.whatsapp.net", orang = "Orang yang kamu tag";
    else if (m.quoted?.sender) user = m.quoted?.sender,
      orang = "Orang yang kamu balas";
    else if (m.mentionedJid) user = number + "@s.whatsapp.net",
      orang = "Orang yang kamu tag";
  } else var user = m.sender,
    orang = "Kamu";
  return void 0 === db.data.users[user] || void 0 === db.data.users[db.data.users[user].pasangan] && "" != db.data.users[user].pasangan ? m.reply("Target tidak terdaftar di dalam database!") : void("" === db.data.users[user].pasangan ? await conn.reply(m.chat, `${orang} tidak memiliki pasangan dan tidak sedang menembak siapapun\n\n*Ketik .jadian @user untuk menembak seseorang*`, m) : db.data.users[db.data.users[user].pasangan].pasangan != user ? await conn.reply(m.chat, `${orang} sedang menunggu jawaban dari @${db.data.users[user].pasangan.split("@")[0]} karena sedang tidak diterima atau di tolak\n\nKetik *${usedPrefix}ikhlasin* untuk mengikhlaskan!`, m, {
    contextInfo: {
      mentionedJid: [db.data.users[user].pasangan]
    }
  }) : await conn.reply(m.chat, `${orang} sedang menjalani hubungan dengan @${db.data.users[user].pasangan.split("@")[0]} 💓💓💓`, m, {
    contextInfo: {
      mentionedJid: [db.data.users[user].pasangan]
    }
  }));
};
handler.help = ["cekpacar"], handler.tags = ["jadian"], handler.command = /^(cekpacar)$/i;
export default handler;