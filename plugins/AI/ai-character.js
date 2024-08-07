import fetch from "node-fetch";
const fetchData = async url => {
  const response = await fetch(url);
  return await response.json();
}, handler = async ({
  conn,
  args,
  usedPrefix,
  command
}) => {
  const database = db.data.database.characterai;
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`*• Example:* ${usedPrefix + command} *[on/off]*\n*• Example search Chara:* ${usedPrefix + command} search *[characters name]*`);
  const keyword = text.split(" ")[0],
    data = text.slice(keyword.length + 1);
  if ("search" === keyword) {
    if (!data) throw `*• Example:* ${usedPrefix + command} ${keyword} Hutao`;
    m.reply(`_🔍searching data.... *[ ${data} ]*_`);
    const search = await fetchData("https://apigratis.site/api/search_characters?query=" + data);
    const karakter = search.result.characters.map((a, index) => `*[ ${index + 1}. ${a.participant__name} ]*\n*• Greeting:* \`${a.greeting}\`\n*• Visibility:* ${a.visibility}\n*• Creator:* ${a.user__username}`).join("\n\n");
    const reply = await conn.reply(m.chat, karakter, m, {
      contextInfo: {
        mentionedJid: [],
        groupMentions: [],
        externalAdReply: {
          title: search.result.characters[0]?.participant__name,
          body: search.result.characters[0]?.greeting,
          thumbnailUrl: "https://characterai.io/i/200/static/avatars/" + search.result.characters[0]?.avatar_file_name,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: !1
        }
      }
    });
    await conn.reply(m.chat, `*[ KETIK ANGKA 1 SAMPAI ${search.result.characters.length} ]*\n> • _! Pilih karakter anda dengan mengetik *.characterai set (nomor urut)* sesuai dengan pesan diatas_`, reply),
      database[m.sender] = {
        pilih: search.result.characters
      };
  } else if ("set" === keyword) {
    if (!database[m.sender]) throw "*[ KAMU BELUM MENCARI CHARACTER ]*\n> _ketik *.characterai search* untuk mencari characters favorit mu_";
    if (!database[m.sender].pilih) throw "*[ KAMU SUDAH PUNYA CHARACTER ]*\n> _ketik *.characterai search* untuk menganti characters_";
    if (!data) throw `*• Example:* ${usedPrefix + command} ${keyword} 1`;
    const pilihan = database[m.sender].pilih[data - 1],
      info = await fetchData("https://apigratis.site/api/character_info?external_id=" + pilihan.external_id),
      caption = `*[ INFO CHARACTERS NO ${data} ]*\n*• Name:* ${pilihan.paeticipant__name}\n*• Greeting:* \`${pilihan.greeting}\`\n*• Visibily:* ${pilihan.visibility}\n*• Description:* ${info.result.character.description}`;
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [],
        groupMentions: [],
        externalAdReply: {
          title: pilihan.participant__name,
          body: pilihan.greeting,
          thumbnailUrl: "https://characterai.io/i/200/static/avatars/" + pilihan.avatar_file_name,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: !1
        }
      }
    });
    database[m.sender] = {
      isChats: !1,
      id: pilihan.external_id,
      thumb: "https://characterai.io/i/200/static/avatars/" + pilihan.avatar_file_name,
      name: pilihan.participant__name
    };
  } else if ("on" === keyword) {
    if (!database[m.sender]) throw "*[ KAMU BELUM MENCARI CHARACTER ]*\n> _ketik *.characterai search* untuk mencari characters favorit mu_";
    database[m.sender].isChats = !0, m.reply("_*[ ✓ ] Room chat berhasil dibuat*_");
  } else if ("off" === keyword) {
    if (!database[m.sender]) throw "*[ KAMU BELUM MENCARI CHARACTER ]*\n> _ketik *.characterai search* untuk mencari characters favorit mu_";
    database[m.sender].isChats = !1, m.reply("_*[ ✓ ] Berhasil keluar dari Room chat*_");
  }
};
handler.before = async (m, {
  conn,
  usedPrefix
}) => {
  const database = db.data.database.characterai;
  if (database, !m.text) return;
  if (m.text.match(prefix)) return;
  if (!database[m.sender]) return;
  if (!database[m.sender].isChats) return;
  if (!db.data.chats[m.chat].characterai) return;
  m.reply("memuat pesan....");
  const chat = await fetchData(`https://onesytex.my.id/api/beta-character-ai?text=${m.text}&external_id=${database[m.sender].id}`);
  await conn.reply(m.chat, chat.result.reply, m, {
    contextInfo: {
      mentionedJid: [],
      groupMentions: [],
      externalAdReply: {
        title: database[m.sender].name,
        body: null,
        thumbnailUrl: database[m.sender].thumb,
        sourceUrl: "",
        mediaType: 1,
        renderLargerThumbnail: !1
      }
    }
  });
}, handler.help = ["characterai"], handler.tags = ["ai"], handler.command = ["characterai"];
export default handler;