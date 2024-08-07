import toMs from "ms";
let thumb1 = "https://user-images.githubusercontent.com/72728486/235344562-4677d2ad-48ee-419d-883f-e0ca9ba1c7b8.jpg",
  thumb2 = "https://user-images.githubusercontent.com/72728486/235344861-acdba7d1-8fce-41b8-adf6-337c818cda2b.jpg",
  thumb3 = "https://user-images.githubusercontent.com/72728486/235316834-f9f84ba0-8df3-4444-81d8-db5270995e6d.jpg",
  thumb4 = "https://user-images.githubusercontent.com/72728486/235354619-6ad1cabd-216c-4c7c-b7c2-3a564836653a.jpg",
  thumb5 = "https://user-images.githubusercontent.com/72728486/235365156-cfab66ce-38b2-4bc7-90d7-7756fc320e06.jpg",
  thumb6 = "https://user-images.githubusercontent.com/72728486/235365148-35b8def7-c1a2-451d-a2f2-6b6a911b37db.jpg";
import jimp from "jimp";
const resize = async (image, width, height) => {
  const read = await jimp.read(image);
  return await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
};
var a, b, d, e, f, textnya, idd, room;
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function emoji_role(role) {
  return "warga" === role ? "👱‍♂️" : "seer" === role ? "👳" : "guardian" === role ? "👼" : "sorcerer" === role ? "🔮" : "werewolf" === role ? "🐺" : "";
}
const findObject = (obj = {}, key, value) => {
    const result = [],
      recursiveSearch = (obj = {}) => {
        obj && "object" == typeof obj && (obj[key] === value && result.push(obj), Object.keys(obj).forEach(function(k) {
          recursiveSearch(obj[k]);
        }));
      };
    return recursiveSearch(obj), result;
  },
  sesi = (from, data) => !!data[from] && data[from],
  playerOnGame = (sender, data) => {
    let index = !1;
    return 0 === findObject(data, "id", sender).length || (index = !0), index;
  },
  playerOnRoom = (sender, from, data) => {
    let result = findObject(data, "id", sender),
      index = !1;
    return result.length > 0 && result[0]?.sesi === from ? (index = !0, index) : index;
  },
  dataPlayer = (sender, data) => {
    let result = findObject(data, "id", sender),
      index = !1;
    return result.length > 0 && result[0]?.id === sender ? (index = result[0], index) : index;
  },
  dataPlayerById = (id, data) => {
    let result = findObject(data, "number", id),
      index = !1;
    return result.length > 0 && result[0]?.number === id ? (index = result[0], index) : index;
  },
  playerExit = (from, id, data) => {
    if (!(room = sesi(from, data))) return !1;
    const indexPlayer = room.player.findIndex(i => i.id === id);
    room.player.splice(indexPlayer, 1);
  },
  getPlayerById = (from, sender, id, data) => {
    if (!(room = sesi(from, data))) return !1;
    const indexPlayer = room.player.findIndex(i => i.number === id);
    return -1 !== indexPlayer && {
      index: indexPlayer,
      sesi: room.player[indexPlayer].sesi,
      db: room.player[indexPlayer]
    };
  },
  getPlayerById2 = (sender, id, data) => {
    let result = findObject(data, "id", sender);
    if (result.length > 0 && result[0]?.id === sender) {
      let from = result[0]?.sesi;
      if (!(room = sesi(from, data))) return !1;
      const indexPlayer = room.player.findIndex(i => i.number === id);
      return -1 !== indexPlayer && {
        index: indexPlayer,
        sesi: room.player[indexPlayer].sesi,
        db: room.player[indexPlayer]
      };
    }
  },
  killWerewolf = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return !1;
    let {
      index,
      sesi,
      db
    } = result;
    data[sesi].player[index].number === id && (db.effect.includes("guardian") ? (data[sesi].guardian.push(parseInt(id)), data[sesi].dead.push(parseInt(id))) : db.effect.includes("guardian") || data[sesi].dead.push(parseInt(id)));
  },
  dreamySeer = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return !1;
    let {
      index,
      sesi,
      db
    } = result;
    return "werewolf" === data[sesi].player[index].role && (data[sesi].seer = !0), data[sesi].player[index].role;
  },
  sorcerer = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return !1;
    let {
      index,
      sesi,
      db
    } = result;
    return data[sesi].player[index].role;
  },
  protectGuardian = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return !1;
    let {
      index,
      sesi,
      db
    } = result;
    data[sesi].player[index].effect.push("guardian");
  },
  roleShuffle = array => {
    let randomIndex, currentIndex = array.length;
    for (; 0 != currentIndex;) randomIndex = Math.floor(Math.random() * currentIndex),
      currentIndex--, [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    return array;
  },
  roleChanger = (from, id, role, data) => {
    if (!(room = sesi(from, data))) return !1;
    var index = room.player.findIndex(i => i.id === id);
    if (-1 === index) return !1;
    room.player[index].role = role;
  },
  roleAmount = (from, data) => {
    const result = sesi(from, data);
    return !!result && (4 === result.player.length ? {
      werewolf: 1,
      seer: 1,
      guardian: 1,
      warga: 1,
      sorcere: 0
    } : 5 === result.player.length ? {
      werewolf: 1,
      seer: 1,
      guardian: 1,
      warga: 3,
      sorcere: 0
    } : 6 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 1,
      warga: 2,
      sorcere: 0
    } : 7 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 1,
      warga: 3,
      sorcere: 0
    } : 8 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 1,
      warga: 4,
      sorcere: 0
    } : 9 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 1,
      warga: 4,
      sorcere: 1
    } : 10 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 1,
      warga: 5,
      sorcere: 1
    } : 11 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 2,
      warga: 5,
      sorcere: 1
    } : 12 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 2,
      warga: 6,
      sorcere: 1
    } : 13 === result.player.length ? {
      werewolf: 2,
      seer: 1,
      guardian: 1,
      warga: 7,
      sorcere: 1
    } : 14 === result.player.length ? {
      werewolf: 2,
      seer: 2,
      guardian: 2,
      warga: 7,
      sorcere: 1
    } : 15 === result.player.length ? {
      werewolf: 3,
      seer: 2,
      guardian: 3,
      warga: 6,
      sorcere: 1
    } : void 0);
  },
  roleGenerator = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    for (var role = roleAmount(from, data), i = 0; i < role.werewolf; i++) {
      var player = room.player.filter(x => !1 === x.role);
      if (0 === (list = roleShuffle(player)).length) return !1;
      var random = Math.floor(Math.random() * list.length);
      roleChanger(from, list[random].id, "werewolf", data);
    }
    for (i = 0; i < role.seer; i++) {
      player = room.player.filter(x => !1 === x.role);
      if (0 === (list = roleShuffle(player)).length) return !1;
      random = Math.floor(Math.random() * list.length);
      roleChanger(from, list[random].id, "seer", data);
    }
    for (i = 0; i < role.guardian; i++) {
      player = room.player.filter(x => !1 === x.role);
      if (0 === (list = roleShuffle(player)).length) return !1;
      random = Math.floor(Math.random() * list.length);
      roleChanger(from, list[random].id, "guardian", data);
    }
    for (i = 0; i < role.warga; i++) {
      player = room.player.filter(x => !1 === x.role);
      if (0 === (list = roleShuffle(player)).length) return !1;
      random = Math.floor(Math.random() * list.length);
      roleChanger(from, list[random].id, "warga", data);
    }
    for (i = 0; i < role.sorcere; i++) {
      var list;
      player = room.player.filter(x => !1 === x.role);
      if (0 === (list = roleShuffle(player)).length) return !1;
      random = Math.floor(Math.random() * list.length);
      roleChanger(from, list[random].id, "sorcerer", data);
    }
    shortPlayer(from, data);
  },
  addTimer = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    room.cooldown = Date.now() + toMs("90s");
  },
  startGame = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    room.status = !0;
  },
  changeDay = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    "pagi" === room.time ? room.time = "voting" : "malem" === room.time ? (room.time = "pagi", room.day += 1) : "voting" === room.time && (room.time = "malem");
  },
  dayVoting = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    ("malem" === room.time || "pagi" === room.time) && (room.time = "voting");
  },
  vote = (from, id, sender, data) => {
    if (!(room = sesi(from, data))) return !1;
    const idGet = room.player.findIndex(i => i.id === sender);
    if (-1 === idGet) return !1;
    const indexPlayer = room.player.findIndex(i => i.number === id);
    if (-1 === indexPlayer) return !1; - 1 !== idGet && (room.player[idGet].isvote = !0), room.player[indexPlayer].vote += 1;
  },
  voteResult = (from, data) => !!(room = sesi(from, data)) && (room.player.sort((a, b) => a.vote < b.vote ? 1 : -1), 0 === room.player[0]?.vote ? 0 : room.player[0]?.vote === room.player[1].vote ? 1 : room.player[0]),
  voteKill = (from, data) => !!(room = sesi(from, data)) && (room.player.sort((a, b) => a.vote < b.vote ? 1 : -1), 0 === room.player[0]?.vote ? 0 : room.player[0]?.vote === room.player[1].vote ? 1 : void(room.player[0].isdead = !0)),
  resetVote = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    for (let i = 0; i < room.player.length; i++) room.player[i].vote = 0;
  },
  voteDone = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    room.voting = !1;
  },
  voteStart = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    room.voting = !0;
  },
  clearAllVote = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    for (let i = 0; i < room.player.length; i++) room.player[i].vote = 0, room.player[i].isvote = !1;
  },
  clearAll = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    room.dead = [], room.seer = !1, room.guardian = [], room.voting = !1;
  },
  clearAllSTATUS = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    for (let i = 0; i < room.player.length; i++) room.player[i].effect = [];
  },
  skillOn = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    for (let i = 0; i < room.player.length; i++) room.player[i].status = !1;
  },
  skillOff = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    for (let i = 0; i < room.player.length; i++) room.player[i].status = !0;
  },
  playerHidup = data => data.player.filter(x => !1 === x.isdead).length,
  playerMati = data => data.player.filter(x => !0 === x.isdead).length,
  getWinner = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    var ww = 0,
      orang_baek = 0;
    for (let i = 0; i < room.player.length; i++) !1 === room.player[i].isdead && ("werewolf" === room.player[i].role || "sorcerer" === room.player[i].role ? ww += 1 : "warga" !== room.player[i].role && "guardian" !== room.player[i].role && "seer" !== room.player[i].role || (orang_baek += 1));
    return room.voting && 0 != (b = voteResult(from, data)) && 1 != b && ("werewolf" === b.role || "sorcerer" === b.role ? ww -= 1 : "warga" !== b.role && "seer" !== b.role && "guardian" !== b.role || (orang_baek -= 1)),
      0 === ww ? (room.iswin = !0, {
        voting: room.voting,
        status: !0
      }) : ww === orang_baek || 0 === orang_baek ? (room.iswin = !1, {
        voting: room.voting,
        status: !1
      }) : {
        voting: room.voting,
        status: null
      };
  },
  shortPlayer = (from, data) => {
    if (!(room = sesi(from, data))) return !1;
    room.player.sort((a, b) => a.number - b.number);
  },
  killww = (from, id, data) => {
    if (!(room = sesi(from, data))) return !1;
    for (let j = 0; j < room.dead.length; j++) {
      if (!(idd = getPlayerById(from, room.player[0], room.dead[j], data))) return !1;
      if (room.player[idd.index].effect.includes("guardian")) return;
      room.player[idd.index].isdead = !0;
    }
  },
  pagii = data => {
    if (data.dead.length < 1) return `*⌂ W E R E W O L F - G A M E*\n\nMentari telah terbit, tidak ada korban berjatuhan malam ini, warga kembali melakukan aktifitasnya seperti biasa.\n90 detik tersisa sebelum waktu penentuan, para warga dipersilahkan untuk berdiskusi\n*Hari ke ${data.day}*`;
    a = "", d = "", e = [], f = [];
    for (let i = 0; i < data.dead.length; i++) b = data.player.findIndex(x => x.number === data.dead[i]),
      data.player[b].effect.includes("guardian") ? e.push(data.player[b].id) : f.push(data.player[b].id);
    for (let i = 0; i < f.length; i++) i === f.length - 1 ? f.length > 1 ? a += ` dan @${f[i].replace("@s.whatsapp.net", "")}` : a += `@${f[i].replace("@s.whatsapp.net", "")}` : i === f.length - 2 ? a += `@${f[i].replace("@s.whatsapp.net", "")}` : a += `@${f[i].replace("@s.whatsapp.net", "")}, `;
    for (let i = 0; i < e.length; i++) i === e.length - 1 ? e.length > 1 ? d += ` dan @${e[i].replace("@s.whatsapp.net", "")}` : d += `@${e[i].replace("@s.whatsapp.net", "")}` : i === e.length - 2 ? d += `@${e[i].replace("@s.whatsapp.net", "")}` : d += `@${e[i].replace("@s.whatsapp.net", "")}, `;
    return textnya = `*⌂ W E R E W O L F - G A M E*\n\nPagi telah tiba, warga desa menemukan ${data.dead.length > 1 ? "beberapa" : "1"} mayat di tumpukan puing dan darah berceceran. ${a ? a + " telah mati! " : ""}${d.length > 1 ? ` ${d} hampir dibunuh, namun *Guardian Angel* berhasil melindunginya.` : ""}\n\nTak terasa hari sudah siang, matahari tepat di atas kepala, terik panas matahari membuat suasana menjadi riuh, warga desa mempunyai 90 detik untuk berdiskusi\n*Hari ke ${data.day}*`;
  };
async function pagi(conn, x, data) {
  skillOff(x.room, data);
  let ment = [];
  for (let i = 0; i < x.player.length; i++) ment.push(x.player[i].id);
  return shortPlayer(x.room, data), killww(x.room, x.dead, data), shortPlayer(x.room, data),
    changeDay(x.room, data), await conn.sendMessage(x.room, {
      text: pagii(x),
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb1, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb1
        },
        mentionedJid: ment
      }
    });
}
async function voting(conn, x, data) {
  let ment = [];
  voteStart(x.room, data), textnya = "*⌂ W E R E W O L F - G A M E*\n\nSenja telah tiba. Seluruh warga berkumpul di balai desa untuk memilih siapa yang akan dieksekusi. Sebagian warga terlihat sibuk menyiapkan alat penyiksaan untuk malam ini. Kalian mempunyai waktu selama 90 detik untuk memilih! Hati-hati, ada penghianat diantara kalian!\n\n*L I S T - P L A Y E R*:\n",
    shortPlayer(x.room, data);
  for (let i = 0; i < x.player.length; i++) textnya += `(${x.player[i].number}) @${x.player[i].id.replace("@s.whatsapp.net", "")} ${!0 === x.player[i].isdead ? "☠️" : ""}\n`,
    ment.push(x.player[i].id);
  return textnya += "\nketik *.ww vote nomor* untuk voting player", dayVoting(x.room, data),
    clearAll(x.room, data), clearAllSTATUS(x.room, data), await conn.sendMessage(x.room, {
      text: textnya,
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb2, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb2
        },
        mentionedJid: ment
      }
    });
}
async function malam(conn, x, data) {
  var hasil_vote = voteResult(x.room, data);
  let ment = [];
  if (0 === hasil_vote) return textnya = "*⌂ W E R E W O L F - G A M E*\n\nTerlalu bimbang menentukan pilihan. Warga pun pulang ke rumah masing-masing, tidak ada yang dieksekusi hari ini. Bulan bersinar terang, malam yang mencekam telah datang. Semoga tidak ada yang mati malam ini. Pemain malam hari: kalian punya 90 detik untuk beraksi!",
    conn.sendMessage(x.room, {
      text: textnya,
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb3, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb3
        }
      }
    }).then(() => {
      if (changeDay(x.room, data), voteDone(x.room, data), resetVote(x.room, data), clearAllVote(x.room, data), null != getWinner(x.room, data).status) return win(x, 1, conn, data);
    });
  if (1 === hasil_vote) return textnya = "*⌂ W E R E W O L F - G A M E*\n\nWarga desa telah memilih, namun hasilnya seri.\n\nBintang memancarkan cahaya indah malam ini, warga desa beristirahat di kediaman masing masing. Pemain malam hari: kalian punya 90 detik untuk beraksi!",
    conn.sendMessage(x.room, {
      text: textnya,
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb3, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb3
        },
        mentionedJid: ment
      }
    }).then(() => {
      if (changeDay(x.room, data), voteDone(x.room, data), resetVote(x.room, data), clearAllVote(x.room, data), null != getWinner(x.room, data).status) return win(x, 1, conn, data);
    });
  if (0 != hasil_vote && 1 != hasil_vote) {
    if ("werewolf" === hasil_vote.role) {
      textnya = `*⌂ W E R E W O L F - G A M E*\n\nWarga desa telah memilih dan sepakat @${hasil_vote.id.replace("@s.whatsapp.net", "")} dieksekusi mati.\n\n@${hasil_vote.id.replace("@s.whatsapp.net", "")} adalah ${hasil_vote.role} ${emoji_role(hasil_vote.role)}`,
        voteKill(x.room, data);
      let ment = [];
      return ment.push(hasil_vote.id), await conn.sendMessage(x.room, {
        text: textnya,
        contextInfo: {
          externalAdReply: {
            title: "W E R E W O L F",
            mediaType: 1,
            renderLargerThumbnail: !0,
            thumbnail: await resize(thumb4, 300, 175),
            sourceUrl: "",
            mediaUrl: thumb4
          },
          mentionedJid: ment
        }
      }).then(() => {
        if (changeDay(x.room, data), voteDone(x.room, data), resetVote(x.room, data), clearAllVote(x.room, data), null != getWinner(x.room, data).status) return win(x, 1, conn, data);
      });
    } {
      textnya = `*⌂ W E R E W O L F - G A M E*\n\nWarga desa telah memilih dan sepakat @${hasil_vote.id.replace("@s.whatsapp.net", "")} dieksekusi mati.\n\n@${hasil_vote.id.replace("@s.whatsapp.net", "")} adalah ${hasil_vote.role} ${emoji_role(hasil_vote.role)}\n\nBulan bersinar terang malam ini, warga desa beristirahat di kediaman masing masing. Pemain malam hari: kalian punya 90 detik untuk beraksi!`,
        voteKill(x.room, data);
      let ment = [];
      return ment.push(hasil_vote.id), await conn.sendMessage(x.room, {
        text: textnya,
        contextInfo: {
          externalAdReply: {
            title: "W E R E W O L F",
            mediaType: 1,
            renderLargerThumbnail: !0,
            thumbnail: await resize(thumb4, 300, 175),
            sourceUrl: "",
            mediaUrl: thumb4
          },
          mentionedJid: ment
        }
      }).then(() => {
        if (changeDay(x.room, data), voteDone(x.room, data), resetVote(x.room, data), clearAllVote(x.room, data), null != getWinner(x.room, data).status) return win(x, 1, conn, data);
      });
    }
  }
}
async function skill(conn, x, data) {
  if (skillOn(x.room, data), null != getWinner(x.room, data).status || null != x.win) return win(x, 1, conn, data);
  {
    if (!x) return;
    if (!x.player) return;
    if (null != x.win) return;
    let tok1 = "\n",
      tok2 = "\n",
      membernya = [];
    shortPlayer(x.room, data);
    for (let i = 0; i < x.player.length; i++) tok1 += `(${x.player[i].number}) @${x.player[i].id.replace("@s.whatsapp.net", "")}${!0 === x.player[i].isdead ? " ☠️" : ""}\n`,
      membernya.push(x.player[i].id);
    for (let i = 0; i < x.player.length; i++) tok2 += `(${x.player[i].number}) @${x.player[i].id.replace("@s.whatsapp.net", "")} ${"werewolf" === x.player[i].role || "sorcerer" === x.player[i].role ? "" + (!0 === x.player[i].isdead ? " ☠️" : ` ${x.player[i].role}`) : " "}\n`,
      membernya.push(x.player[i].id);
    for (let i = 0; i < x.player.length; i++) "werewolf" === x.player[i].role ? 1 != x.player[i].isdead && (textnya = `Silahkan pilih salah satu orang yang ingin kamu makan pada malam hari ini\n*LIST PLAYER*:\n${tok2}\n\nKetik *.wwpc kill nomor* untuk membunuh player`, await conn.sendMessage(x.player[i].id, {
      text: textnya,
      mentions: membernya
    })) : "warga" === x.player[i].role ? 1 != x.player[i].isdead && (textnya = `*⌂ W E R E W O L F - G A M E*\n\nSebagai seorang warga berhati-hatilah, mungkin kamu adalah target selanjutnya.\n*LIST PLAYER*:${tok1}`, await conn.sendMessage(x.player[i].id, {
      text: textnya,
      mentions: membernya
    })) : "seer" === x.player[i].role ? 1 != x.player[i].isdead && (textnya = `Baiklah, siapa yang ingin kamu lihat peran nya kali ini.\n*LIST PLAYER*:${tok1}\n\nKetik *.wwpc dreamy nomor* untuk melihat role player`, await conn.sendMessage(x.player[i].id, {
      text: textnya,
      mentions: membernya
    })) : "guardian" === x.player[i].role ? 1 != x.player[i].isdead && (textnya = `Kamu adalah seorang*Guardian*, lindungi para warga, silahkan pilih salah 1 player yang ingin kamu lindungi\n*LIST PLAYER*:${tok1}\n\nKetik *.wwpc deff nomor* untuk melindungi player`, await conn.sendMessage(x.player[i].id, {
      text: textnya,
      mentions: membernya
    })) : "sorcerer" === x.player[i].role && 1 != x.player[i].isdead && (textnya = `Baiklah, lihat apa yang bisa kamu buat, silakan pilih 1 orang yang ingin kamu buka identitasnya\n*LIST PLAYER*:${tok2}\n\nKetik *.wwpc sorcerer nomor* untuk melihat role player`, await conn.sendMessage(x.player[i].id, {
      text: textnya,
      mentions: membernya
    }));
  }
}
async function win(x, t, conn, data) {
  const sesinya = x.room;
  if (!1 === getWinner(x.room, data).status || !1 === x.iswin) {
    textnya = "*W E R E W O L F - W I N*\n\nTEAM WEREWOLF\n\n";
    let ment = [];
    for (let i = 0; i < x.player.length; i++) "sorcerer" !== x.player[i].role && "werewolf" !== x.player[i].role || (textnya += `${x.player[i].number}) @${x.player[i].id.replace("@s.whatsapp.net", "")}\n     *Role* : ${x.player[i].role}\n\n`, ment.push(x.player[i].id));
    return await conn.sendMessage(sesinya, {
      text: textnya,
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb5, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb5
        },
        mentionedJid: ment
      }
    }).then(() => {
      delete data[x.room];
    });
  }
  if (!0 === getWinner(x.room, data).status) {
    textnya = "*T E A M - W A R G A - W I N*\n\nTEAM WARGA\n\n";
    let ment = [];
    for (let i = 0; i < x.player.length; i++) "warga" !== x.player[i].role && "guardian" !== x.player[i].role && "seer" !== x.player[i].role || (textnya += `${x.player[i].number}) @${x.player[i].id.replace("@s.whatsapp.net", "")}\n     *Role* : ${x.player[i].role}\n\n`, ment.push(x.player[i].id));
    return await conn.sendMessage(sesinya, {
      text: textnya,
      contextInfo: {
        externalAdReply: {
          title: "W E R E W O L F",
          mediaType: 1,
          renderLargerThumbnail: !0,
          thumbnail: await resize(thumb6, 300, 175),
          sourceUrl: "",
          mediaUrl: thumb5
        },
        mentionedJid: ment
      }
    });
  }
}
async function run(conn, id, data) {
  for (; null === getWinner(id, data).status;) {
    if (null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await pagi(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await voting(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await malam(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await skill(conn, sesi(id, data), data), null != getWinner(id, data).status) break;
  }
  await win(sesi(id, data), 1, conn, data);
}
async function run_vote(conn, id, data) {
  for (; null === getWinner(id, data).status;) {
    if (null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await voting(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await malam(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await skill(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await pagi(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) break;
  }
  await win(sesi(id, data), 1, conn, data);
}
async function run_malam(conn, id, data) {
  for (; null === getWinner(id, data).status;) {
    if (null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await skill(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await pagi(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await voting(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await malam(conn, sesi(id, data), data), null != getWinner(id, data).status) break;
  }
  await win(sesi(id, data), 1, conn, data);
}
async function run_pagi(conn, id, data) {
  for (; null === getWinner(id, data).status;) {
    if (null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await pagi(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await voting(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await malam(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await skill(conn, sesi(id, data), data), null != getWinner(id, data).status) {
      win(getWinner(id, data), 1, conn, data);
      break;
    }
    if (await sleep(9e4), null != getWinner(id, data).status) break;
  }
  await win(sesi(id, data), 1, conn, data);
}
export {
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
};