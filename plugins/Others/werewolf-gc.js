import jimp from "jimp";
const resize = async (image, width, height) => {
  const read = await jimp.read(image);
  return await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
};
import {
  emoji_role,
  sesi,
  playerOnGame,
  playerOnRoom,
  playerExit,
  dataPlayer,
  dataPlayerById,
  getPlayerById,
  getPlayerById2,
  killWerewolf,
  killww,
  dreamySeer,
  sorcerer,
  protectGuardian,
  roleShuffle,
  roleChanger,
  roleAmount,
  roleGenerator,
  addTimer,
  startGame,
  playerHidup,
  playerMati,
  vote,
  voteResult,
  clearAllVote,
  getWinner,
  win,
  pagi,
  malam,
  skill,
  voteStart,
  voteDone,
  voting,
  run,
  run_vote,
  run_malam,
  run_pagi
} from "../../lib/werewolf.js";
let thumb = "https://user-images.githubusercontent.com/72728486/235316834-f9f84ba0-8df3-4444-81d8-db5270995e6d.jpg";
const handler = async (m, {
  conn,
  command,
  usedPrefix,
  args
}) => {
  const {
    sender,
    chat
  } = m;
  conn.werewolf = conn.werewolf ? conn.werewolf : {};
  const ww = conn.werewolf ? conn.werewolf : {},
    value = (ww[chat], args[0]),
    target = args[1];
  if ("create" === value) {
    if (chat in ww) return m.reply("Group masih dalam sesi permainan");
    if (!0 === playerOnGame(sender, ww)) return m.reply("Kamu masih dalam sesi game");
    ww[chat] = {
      room: chat,
      owner: sender,
      status: !1,
      iswin: null,
      cooldown: null,
      day: 0,
      time: "malem",
      player: [],
      dead: [],
      voting: !1,
      seer: !1,
      guardian: []
    }, m.reply("Room berhasil dibuat, ketik *.ww join* untuk bergabung");
  } else if ("join" === value) {
    if (!ww[chat]) return m.reply("Belum ada sesi permainan");
    if (!0 === ww[chat].status) return m.reply("Sesi permainan sudah dimulai");
    if (ww[chat].player.length > 16) return m.reply("Maaf jumlah player telah penuh");
    if (!0 === playerOnRoom(sender, chat, ww)) return m.reply("Kamu sudah join dalam room ini");
    if (!0 === playerOnGame(sender, ww)) return m.reply("Kamu masih dalam sesi game");
    let data = {
      id: sender,
      number: ww[chat].player.length + 1,
      sesi: chat,
      status: !1,
      role: !1,
      effect: [],
      vote: 0,
      isdead: !1,
      isvote: !1
    };
    ww[chat].player.push(data);
    let player = [],
      text = "\n*⌂ W E R E W O L F - P L A Y E R*\n\n";
    for (let i = 0; i < ww[chat].player.length; i++) text += `${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")}\n`,
      player.push(ww[chat].player[i].id);
    text += "\nJumlah player minimal adalah 5 dan maximal 15", conn.sendMessage(m.chat, {
      text: text.trim(),
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb
        },
        mentionedJid: player
      }
    }, {
      quoted: m
    });
  } else if ("start" === value) {
    if (!ww[chat]) return m.reply("Belum ada sesi permainan");
    if (0 === ww[chat].player.length) return m.reply("Room belum memiliki player");
    if (ww[chat].player.length < 5) return m.reply("Maaf jumlah player belum memenuhi syarat");
    if (!1 === playerOnRoom(sender, chat, ww)) return m.reply("Kamu belum join dalam room ini");
    if (ww[chat].cooldown > 0) {
      if ("voting" === ww[chat].time) return clearAllVote(chat, ww), addTimer(chat, ww),
        await run_vote(conn, chat, ww);
      if ("malem" === ww[chat].time) return clearAllVote(chat, ww), addTimer(chat, ww),
        await run_malam(conn, chat, ww);
      if ("pagi" === ww[chat].time) return clearAllVote(chat, ww), addTimer(chat, ww),
        await run_pagi(conn, chat, ww);
    }
    if (!0 === ww[chat].status) return m.reply("Sesi permainan telah dimulai");
    if (ww[chat].owner !== sender) return m.reply(`Hanya @${ww[chat].owner.split("@")[0]} yang dapat memulai permainan`, {
      withTag: !0
    });
    let list1 = "",
      list2 = "",
      player = [];
    roleGenerator(chat, ww), addTimer(chat, ww), startGame(chat, ww);
    for (let i = 0; i < ww[chat].player.length; i++) list1 += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")}\n`,
      player.push(ww[chat].player[i].id);
    for (let i = 0; i < ww[chat].player.length; i++) list2 += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")} ${"werewolf" === ww[chat].player[i].role || "sorcerer" === ww[chat].player[i].role ? `[${ww[chat].player[i].role}]` : ""}\n`,
      player.push(ww[chat].player[i].id);
    for (let i = 0; i < ww[chat].player.length; i++)
      if ("werewolf" === ww[chat].player[i].role) {
        if (1 != ww[chat].player[i].isdead) {
          var text = `Hai ${conn.getName(ww[chat].player[i].id)}, Kamu telah dipilih untuk memerankan *Werewolf* ${emoji_role("werewolf")} pada permainan kali ini, silahkan pilih salah satu player yang ingin kamu makan pada malam hari ini\n*LIST PLAYER*:\n${list2}\n\nKetik *.wwpc kill nomor* untuk membunuh player`;
          await conn.sendMessage(ww[chat].player[i].id, {
            text: text,
            mentions: player
          });
        }
      } else if ("warga" === ww[chat].player[i].role) {
      if (1 != ww[chat].player[i].isdead) {
        let text = `*⌂ W E R E W O L F - G A M E*\n\nHai ${conn.getName(ww[chat].player[i].id)} Peran kamu adalah *Warga Desa* ${emoji_role("warga")}, tetap waspada, mungkin *Werewolf* akan memakanmu malam ini, silakan masuk kerumah masing masing.\n*LIST PLAYER*:\n${list1}`;
        await conn.sendMessage(ww[chat].player[i].id, {
          text: text,
          mentions: player
        });
      }
    } else if ("seer" === ww[chat].player[i].role) {
      if (1 != ww[chat].player[i].isdead) {
        let text = `Hai ${conn.getName(ww[chat].player[i].id)} Kamu telah terpilih  untuk menjadi *Penerawang* ${emoji_role("seer")}. Dengan sihir yang kamu punya, kamu bisa mengetahui peran pemain pilihanmu.\n*LIST PLAYER*:\n${list1}\n\nKetik *.wwpc dreamy nomor* untuk melihat role player`;
        await conn.sendMessage(ww[chat].player[i].id, {
          text: text,
          mentions: player
        });
      }
    } else if ("guardian" === ww[chat].player[i].role) {
      if (1 != ww[chat].player[i].isdead) {
        let text = `Hai ${conn.getName(ww[chat].player[i].id)} Kamu terpilih untuk memerankan *Malaikat Pelindung* ${emoji_role("guardian")}, dengan kekuatan yang kamu miliki, kamu bisa melindungi para warga, silahkan pilih salah 1 player yang ingin kamu lindungi\n*LIST PLAYER*:\n${list1}\n\nKetik *.wwpc deff nomor* untuk melindungi player`;
        await conn.sendMessage(ww[chat].player[i].id, {
          text: text,
          mentions: player
        });
      }
    } else if ("sorcerer" === ww[chat].player[i].role && 1 != ww[chat].player[i].isdead) {
      let text = `Hai ${conn.getName(ww[chat].player[i].id)} Kamu terpilih sebagai Penyihir ${emoji_role("sorcerer")}, dengan kekuasaan yang kamu punya, kamu bisa membuka identitas para player, silakan pilih 1 orang yang ingin kamu buka identitasnya\n*LIST PLAYER*:\n${list2}\n\nKetik *.wwpc sorcerer nomor* untuk melihat role player`;
      await conn.sendMessage(ww[chat].player[i].id, {
        text: text,
        mentions: player
      });
    }
    await conn.sendMessage(m.chat, {
      text: "*⌂ W E R E W O L F - G A M E*\n\nGame telah dimulai, para player akan memerankan perannya masing masing, silahkan cek chat pribadi untuk melihat role kalian. Berhati-hatilah para warga, mungkin malam ini adalah malah terakhir untukmu",
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb
        },
        mentionedJid: player
      }
    }), await run(conn, chat, ww);
  } else {
    if ("vote" === value) {
      if (!ww[chat]) return m.reply("Belum ada sesi permainan");
      if (!1 === ww[chat].status) return m.reply("Sesi permainan belum dimulai");
      if ("voting" !== ww[chat].time) return m.reply("Sesi voting belum dimulai");
      if (!1 === playerOnRoom(sender, chat, ww)) return m.reply("Kamu bukan player");
      if (!0 === dataPlayer(sender, ww).isdead) return m.reply("Kamu sudah mati");
      if (!target || target.length < 1) return m.reply("Masukan nomor player");
      if (isNaN(target)) return m.reply("Gunakan hanya nomor");
      if (!0 === dataPlayer(sender, ww).isvote) return m.reply("Kamu sudah melakukan voting");
      return !0 === getPlayerById(chat, sender, parseInt(target), ww).db.isdead ? m.reply(`Player ${target} sudah mati.`) : ww[chat].player.length < parseInt(target) ? m.reply("Invalid") : !1 === getPlayerById(chat, sender, parseInt(target), ww) ? m.reply("Player tidak terdaftar!") : (vote(chat, parseInt(target), sender, ww), m.reply("✅ Vote"));
    }
    if ("exit" === value) {
      if (!ww[chat]) return m.reply("Tidak ada sesi permainan");
      if (!1 === playerOnRoom(sender, chat, ww)) return m.reply("Kamu tidak dalam sesi permainan");
      if (!0 === ww[chat].status) return m.reply("Permainan sudah dimulai, kamu tidak bisa keluar");
      m.reply(`@${sender.split("@")[0]} Keluar dari permainan`, {
        withTag: !0
      }), playerExit(chat, sender, ww);
    } else if ("delete" === value) {
      if (!ww[chat]) return m.reply("Tidak ada sesi permainan");
      if (ww[chat].owner !== sender) return m.reply(`Hanya @${ww[chat].owner.split("@")[0]} yang dapat menghapus sesi permainan ini`);
      m.reply("Sesi permainan berhasil dihapus").then(() => {
        delete ww[chat];
      });
    } else if ("player" === value) {
      if (!ww[chat]) return m.reply("Tidak ada sesi permainan");
      if (!1 === playerOnRoom(sender, chat, ww)) return m.reply("Kamu tidak dalam sesi permainan");
      if (0 === ww[chat].player.length) return m.reply("Sesi permainan belum memiliki player");
      let player = [],
        text = "\n*⌂ W E R E W O L F - G A M E*\n\nLIST PLAYER:\n";
      for (let i = 0; i < ww[chat].player.length; i++) text += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")} ${!0 === ww[chat].player[i].isdead ? `☠️ ${ww[chat].player[i].role}` : ""}\n`,
        player.push(ww[chat].player[i].id);
      conn.sendMessage(m.chat, {
        text: text,
        contextInfo: {
          externalAdReply: {
            title: "W E R E W O L F",
            mediaType: 1,
            renderLargerThumbnail: !0,
            thumbnail: await resize(thumb, 300, 175),
            sourceUrl: "",
            mediaUrl: thumb
          },
          mentionedJid: player
        }
      }, {
        quoted: m
      });
    } else {
      let text = "\n*⌂ W E R E W O L F - G A M E*\n\nPermainan Sosial Yang Berlangsung Dalam Beberapa Putaran/ronde. Para Pemain Dituntut Untuk Mencari Seorang Penjahat Yang Ada Dipermainan. Para Pemain Diberi Waktu, Peran, Serta Kemampuannya Masing-masing Untuk Bermain Permainan Ini\n\n*⌂ C O M M A N D*\n";
      text += " • ww create\n", text += " • ww join\n", text += " • ww start\n", text += " • ww exit\n",
        text += " • ww delete\n", text += " • ww player\n", text += "\nPermainan ini dapat dimainkan oleh 5 sampai 15 orang.",
        conn.sendMessage(m.chat, {
          text: text.trim(),
          contextInfo: {
            externalAdReply: {
              title: "W E R E W O L F",
              mediaType: 1,
              renderLargerThumbnail: !0,
              thumbnail: await resize(thumb, 300, 175),
              sourceUrl: "",
              mediaUrl: thumb
            }
          }
        }, {
          quoted: m
        });
    }
  }
};
handler.help = ["ww"], handler.tags = ["rpg"], handler.command = ["ww"];
export default handler;