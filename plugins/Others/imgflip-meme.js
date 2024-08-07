import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    urut = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who), text.split("|")),
    thm = urut[0],
    text1 = urut[1],
    text2 = urut[2];
  if (!text) throw `Contoh penggunaan ${usedPrefix}${command} id|teks1|teks2\n*List id:*\n• 21735 The\n• 61516 Philosoraptor\n• 61520 Futurama\n• 61527 Y\n• 61532 The\n• 61533 X\n• 61539 First\n• 61544 Success\n• 61546 Brace\n• 61556 Grandma\n• 61579 One\n• 61580 Too\n• 61581 Put\n• 61582 Creepy\n• 61585 Bad\n• 97984 Disaster\n• 100947 Matrix\n• 100955 Confession\n• 101287 Third\n• 101288 Third\n• 101440 10\n• 101470 Ancient\n• 101511 Don't\n• 101716 Yo\n• 109765 I'll\n• 163573 Imagination\n• 195389 Sparta\n• 235589 Evil\n• 245898 Picard\n• 259680 Am\n• 405658 Grumpy\n• 438680 Batman\n• 444501 Maury\n• 460541 Jack\n• 563423 That\n• 718432 Back\n• 766986 Aaaaand\n• 922147 Laughing\n• 1035805 Boardroom\n• 1509839 Captain\n• 3218037 This\n• 4087833 Waiting\n• 5496396 Leonardo\n• 6235864 Finding\n• 6531067 See\n• 8072285 Doge Shiba\n• 9440985 Face\n• 12403754 Bad\n• 14230520 Black\n• 14371066 Star\n• 16464531 But\n• 21604248 Mugatu\n• 27813981 Hide\n• 28251713 Oprah\n• 40945639 Dr\n• 55311130 This\n• 56225174 Be\n• 79132341 Bike\n• 80707627 Sad\n• 84341851 Evil\n• 87743020 Two\n• 89370399 Roll\n• 91538330 X,\n• 91545132 Trump\n• 93895088 Expanding\n• 99683372 Sleeping\n• 100777631 Is\n• 101910402 Who\n• 102156234 Mocking\n• 110163934 I\n• 112126428 Distracted\n• 114585149 Inhaling\n• 119139145 Blank\n• 123999232 The\n• 124055727 Y'all\n• 124822590 Left\n• 129242436 Change\n• 131087935 Running\n• 131940431 Gru's\n• 132769734 Hard\n• 134797956 American\n• 135256802 Epic\n• 135678846 Who\n• 148909805 Monkey\n• 155067746 Surprised\n• 161865971 Marked\n• 175540452 Unsettled\n• 178591752 Tuxedo\n• 180190441 They're\n• 181913649 Drake\n• 188390779 Woman\n• 195515965 Clown\n• 196652226 Spongebob\n• 216951317 Guy\n• 217743513 UNO\n• 222403160 Bernie\n• 226297822 Panik\n• 247375501 Buff\n• 252600902 Always\n• 259237855 Laughing`;
  let res = await fetch(`https://api.imgflip.com/caption_image?template_id=${thm}&username=Wudysoft&password=Wudysoft&text0=${text1}&text1=${text2}`),
    x = await res.json();
  await conn.sendFile(m.chat, await (await fetch(x.data.url)).arrayBuffer(), "", `Result from *${command}*`, m);
};
handler.command = /^(memaker)$/i;
export default handler;