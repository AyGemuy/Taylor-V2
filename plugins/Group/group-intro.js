const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let imgr = flaaa.getRandom(),
    krtu = htki + "Yᴏᴜʀ Cᴀʀᴅ Iɴᴛʀᴏ" + htka + "\n" + dmenub + " *Nama:*\n" + dmenub + " *Umur:*\n" + dmenub + " *Alamat:*\n" + dmenub + " *Hobi:*\n" + dmenub + " *Pasangan:*\n" + dmenuf;
  await conn.sendFile(m.chat, imgr + command, "", krtu, m);
};
handler.help = ["intro"], handler.command = /^(intro)$/i;
export default handler;