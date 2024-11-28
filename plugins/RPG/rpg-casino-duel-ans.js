export async function before(m) {
  if (
    ((db.data.rpg.casinomulti = db.data.rpg.casinomulti
      ? db.data.rpg.casinomulti
      : {}),
    m.isGroup &&
      m.chat in db.data.rpg.casinomulti &&
      m.sender === db.data.rpg.casinomulti[m.chat].player_2 &&
      /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(
        m.text,
      ))
  ) {
    if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text))
      return (
        this.sendMessage(
          m.chat,
          {
            text: `@${player_2.split("@")[0]} menolak bermain casino, casino dibatalkan`,
            mentions: [player_2],
          },
          {
            quoted: m,
          },
        ),
        delete db.data.rpg.casinomulti[m.chat],
        !0
      );
    (db.data.users[db.data.rpg.casinomulti[m.chat].player_1].money -=
      1 * db.data.rpg.casinomulti[m.chat].count),
      (db.data.users[db.data.rpg.casinomulti[m.chat].player_2].money -=
        1 * db.data.rpg.casinomulti[m.chat].count);
    let randomplayer_1 = 1 * `${Math.floor(10 * Math.random())}`.trim(),
      randomplayer_2 = 1 * `${Math.floor(10 * Math.random())}`.trim(),
      sya = conn.getName(db.data.rpg.casinomulti[m.chat].player_1),
      lwn = conn.getName(db.data.rpg.casinomulti[m.chat].player_2);
    if (randomplayer_1 > randomplayer_2) {
      let caption =
        `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${db.data.rpg.casinomulti[m.chat].player_1.split("@")[0]} - [${sya}]\n┗┅⭑ ${randomplayer_1} Point\n${htjava} @${db.data.rpg.casinomulti[m.chat].player_2.split("@")[0]} - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\n@${db.data.rpg.casinomulti[m.chat].player_1.split("@")[0]} WIN \nKamu menang dan mendapatkan ${2 * db.data.rpg.casinomulti[m.chat].count} Money`.trim();
      await conn.reply(m.chat, caption, m, {
        mentions: this.parseMention(caption),
      }),
        (db.data.users[db.data.rpg.casinomulti[m.chat].player_1].money +=
          2 * db.data.rpg.casinomulti[m.chat].count),
        delete db.data.rpg.casinomulti[m.chat];
    } else if (randomplayer_1 < randomplayer_2) {
      let caption =
        `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${db.data.rpg.casinomulti[m.chat].player_1.split("@")[0]} - [${sya}]\n┗┅⭑ ${randomplayer_1} Point\n${htjava} @${db.data.rpg.casinomulti[m.chat].player_2.split("@")[0]} - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\n@${db.data.rpg.casinomulti[m.chat].player_2.split("@")[0]} WIN \nKamu menang dan mendapatkan ${2 * db.data.rpg.casinomulti[m.chat].count} Money`.trim();
      await conn.reply(m.chat, caption, m, {
        mentions: this.parseMention(caption),
      }),
        (db.data.users[db.data.rpg.casinomulti[m.chat].player_2].money +=
          2 * db.data.rpg.casinomulti[m.chat].count),
        delete db.data.rpg.casinomulti[m.chat];
    } else {
      let caption =
        `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${db.data.rpg.casinomulti[m.chat].player_1.split("@")[0]} - [${sya}]\n┗┅⭑ \n${randomplayer_1} Point\n${htjava} @${db.data.rpg.casinomulti[m.chat].player_2.split("@")[0]} - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\nKalian berdua seri dan ${db.data.rpg.casinomulti[m.chat].count} Money dikembalikan`.trim();
      await conn.reply(m.chat, caption, m, {
        mentions: this.parseMention(caption),
      }),
        db.data.users[db.data.rpg.casinomulti[m.chat].player_1].money,
        db.data.rpg.casinomulti[m.chat].count,
        db.data.users[db.data.rpg.casinomulti[m.chat].player_2].money,
        db.data.rpg.casinomulti[m.chat].count,
        delete db.data.rpg.casinomulti[m.chat];
    }
  }
}
