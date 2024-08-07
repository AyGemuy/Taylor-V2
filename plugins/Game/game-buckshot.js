const {
  delay
} = await (await import("@whiskeysockets/baileys"))?.default;
import {
  format
} from "util";
const ammo = {
  1: {
    1: [true, false, false],
    2: [true, true, false, false, false],
    3: [true, true, true, false, false, false, false, false]
  },
  2: {
    1: [true, false],
    2: [true, true, false, false],
    3: [true, true, false, false, false],
    4: [true, true, true, false, false, false, false, false]
  },
  3: {
    1: [true, false, false],
    2: [true, true, false],
    3: [true, true, false, false],
    4: [true, true, true, false, false],
    5: [true, true, true, false, false, false, false, false]
  }
};
let userhp = {
  1: 2,
  2: 4,
  3: 6
};
const item = {
  1: {
    name: "Magnifying Glass",
    desc: "to see whether the bullet is filled or empty"
  },
  2: {
    name: "Cutter",
    desc: "gun deals 2 damage"
  },
  3: {
    name: "Handcuffs",
    desc: "dealer skip next turn"
  },
  4: {
    name: "Cigarette",
    desc: "heals 1 hp"
  },
  5: {
    name: "Beer",
    desc: "removes 1 bullets"
  }
};
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
  args
}) => {
  if (m.isGroup) throw `Permainan ini hanya bisa dimainkan di private chat!`;
  try {
    const cmd = args[0];
    conn.buckshot = conn.buckshot || {};
    conn.buckshot[m.chat] = conn.buckshot[m.chat] || {};
    let buckshot = conn.buckshot[m.chat];
    const isButton = {
      start: async () => {
        const difficult = ["easy", "normal", "hard"];
        if (!args[1] || !difficult.includes(args[1])) {
          return conn.ctaButton.setBody("Select The Difficulty!").addSelection("Click Here!").makeSections("Difficulty").makeRow("", "Easy", "Select Easy", ".buckshot start easy").makeRow("", "Normal", "Select Normal", ".buckshot start normal").makeRow("", "Hard", "Select Hard", ".buckshot start hard").run(m.chat, conn, m);
        }
        if (conn.buckshot.hasOwnProperty(m.chat)) delete conn.buckshot[m.chat];
        buckshot = {
          on: true,
          mode: args[1],
          turn: true,
          ammo: ammo[1][1].sort(() => Math.random() - .5),
          dmg: 1,
          round: 1,
          subround: 1,
          hp: userhp[1],
          hpm: userhp[1],
          hc: false,
          hcm: false,
          slot: [],
          slotm: [],
          delay: {
            easy: 5e3,
            normal: 3e3,
            hard: 1500
          } [args[1]]
        };
        await conn.sendMessage(m.chat, {
          text: "`Ronde pertama di mulai!`"
        }, {
          quoted: m
        });
        await showAmmo(m, conn, 3, buckshot);
        await delay(buckshot.delay);
        return showShot(m, conn, buckshot);
      },
      tembak: async () => {
        if (!buckshot.on || !buckshot.turn) return `Tunggu dealer!`;
        async function shot(target, siapa) {
          let chance = {
            easy: Math.random() < .5,
            normal: Math.random() < .5 ? buckshot.ammo[0] : !buckshot.ammo[0] ? Math.random() < .3 : Math.random < .5,
            hard: Math.random() < .9 ? buckshot.ammo[0] : !buckshot.ammo[0] ? Math.random() < .3 : Math.random < .5
          } [buckshot.mode] ? "you" : "me";
          if (!target) {
            if (buckshot.hcm) {
              await conn.sendMessage(m.chat, {
                text: `Dealer melewati gilirannya`
              }, {
                quoted: m
              });
              buckshot.hcm = false;
              buckshot.turn = true;
              return await showShot(m, conn, buckshot);
            }
            await conn.sendMessage(m.chat, {
              text: "Menunggu dealer..."
            }, {
              quoted: m
            });
            await delay(3e3);
          }
          if (!target) {
            let using = [];
            let randomizer = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < randomizer; i++) {
              if (buckshot.mode === "easy") {
                if (buckshot.slotm.includes("1") && !using.includes("1") && Math.random() < .4) using.push("1");
                if (buckshot.slotm.includes("2") && !using.includes("2") && Math.random() < .3) using.push("2");
                if (buckshot.slotm.includes("3") && !using.includes("3") && Math.random() < .4) using.push("3");
                if (buckshot.slotm.includes("4") && (buckshot.hpm > userhp[buckshot.round] && Math.random() < .4) || buckshot.hpm <= 2 && Math.random() < .7) using.push("4");
                if (buckshot.slotm.includes("5") && Math.random() < .5) using.push("5");
              } else if (buckshot.mode === "normal") {
                if (buckshot.slotm.includes("1") && !using.includes("1") && siapa === "me" && Math.random() * 15 > buckshot.ammo.length) using.push("1");
                if (buckshot.slotm.includes("2") && !using.includes("2") && (siapa === "you" && Math.random() < .8) || buckshot.slotm.includes("1") && buckshot.ammo[0]) using.push("2");
                if (buckshot.slotm.includes("3") && !using.includes("3") && (siapa === "you" && Math.random() < .7 || Math.random() < .5)) using.push("3");
                if (buckshot.slotm.includes("4") && (buckshot.hpm + using.filter(v => v == 4).length < buckshot.hp && Math.random() < .7 || buckshot.hpm + using.filter(v => v == 4).length <= 2 && Math.random() < .7 || buckshot.hpm + using.filter(v => v == 4).length == 1)) using.push("4");
                if (buckshot.slotm.includes("5") && !using.includes("1") && (siapa === "me" && Math.random() < .7) || Math.random < .5) using.push("5");
              } else if (buckshot.mode === "hard") {
                if (buckshot.slotm.includes("1") && !using.includes("1") && siapa === "me" && Math.random() * 15 > buckshot.ammo.length) using.push("1");
                if (buckshot.slotm.includes("2") && !using.includes("2") && (siapa === "you" && Math.random() < .6) || buckshot.slotm.includes("1") && buckshot.ammo[0]) using.push("2");
                if (buckshot.slotm.includes("3") && !using.includes("3") && (siapa === "you" && Math.random() < .8 || Math.random() < .6)) using.push("3");
                if (buckshot.slotm.includes("4") && (buckshot.hpm + using.filter(v => v == 4).length < buckshot.hp && Math.random() < .8 || buckshot.hpm + using.filter(v => v == 4).length <= 3 && Math.random() < .8 || buckshot.hpm + using.filter(v => v == 4).length == 1)) using.push("4");
                if (buckshot.slotm.includes("5") && !using.includes("1") && (siapa === "me" && Math.random() < .8) || Math.random < .6) using.push("5");
              } else {}
            }
            for (let id of using) {
              if (!buckshot.slotm.includes(id)) continue;
              await conn.sendMessage(m.chat, {
                text: `Sang dealer menggunakan \`${item[id].name}\``
              });
              await delay(1e3);
              if (id == 1) siapa = buckshot.ammo[0] ? "you" : "me";
              if (id == 2) {
                buckshot.dmg = 2;
              }
              if (id == 3) {
                buckshot.hc = true;
                await conn.sendMessage(m.chat, {
                  text: `Kamu akan melewati giliran berikutnya!`
                });
              }
              if (id == 4) {
                let anu = buckshot.hpm == userhp[buckshot.round] ? false : buckshot.hpm++;
                await conn.sendMessage(m.chat, {
                  text: `Sang dealer menyembuhkan +${anu ? "1" : "0"} darah, darah dealer sekarang adalah ${buckshot.hpm}/${userhp[buckshot.round]}`
                });
              }
              if (id == 5) {
                let isEmpt = buckshot.ammo.shift();
                await conn.sendMessage(m.chat, {
                  text: `Sang dealer mengeluarkan 1 peluru ${isEmpt ? "terisi" : "kosong"}`
                });
                if (!buckshot.ammo.length) await reload(m, conn, buckshot);
              }
              delete buckshot.slotm[buckshot.slotm.indexOf(id)];
              buckshot.slotm = buckshot.slotm.filter(v => v);
              await delay(2e3);
            }
          }
          if (!target && buckshot.mode !== "easy") {
            let itsYou = buckshot.ammo.filter(v => v);
            let itsMe = buckshot.ammo.filter(v => !v);
            if (!itsYou && itsMe) {
              siapa = Math.random() < .9 ? "me" : siapa;
            }
            if (itsYou && !itsMe) {
              siapa = Math.random() < .9 ? "you" : siapa;
            }
          }
          const isi = buckshot.ammo.shift();
          const txt = `${target ? "Kamu" : "Sang dealer"} menembak ${target ? siapa === "me" ? "dirimu sendiri" : "sang dealer" : siapa === "me" ? "dirinya sendiri" : "kamu"}, dan ${isi ? "pelurunya terisi" : "pelurunya kosong"}`;
          let msg = await conn.sendMessage(m.chat, {
            text: txt
          });
          if (isi) {
            let getTarget = target ? siapa === "me" ? "hp" : "hpm" : siapa === "me" ? "hpm" : "hp";
            await hpAnimation(m, conn, buckshot[getTarget], txt, msg, buckshot.dmg);
            let shotDmg = buckshot.dmg > buckshot[getTarget] ? buckshot[getTarget] : buckshot.dmg;
            buckshot[getTarget] -= shotDmg;
          }
          buckshot.dmg = 1;
          if (buckshot.ammo.length > 2 && buckshot.mode !== "easy") {
            if (buckshot.ammo[0]) chance = "you";
            else chance = "me";
          }
          if (!buckshot.hpm) {
            buckshot.round = buckshot.round + 1;
            buckshot.hpm = userhp[buckshot.round];
            buckshot.hp = userhp[buckshot.round];
            buckshot.subround = 0;
            buckshot.ammo = [];
            if (buckshot.round <= Object.keys(ammo).length) await conn.sendMessage(m.chat, {
              text: `\`Ronde ke ${buckshot.round} dimulai!\``
            }, {
              quoted: m
            });
          }
          if (buckshot.round > Object.keys(ammo).length) {
            delete conn.buckshot[m.chat];
            db.data.users[m.sender].money += 25 * 1e3;
            return await conn.sendMessage(m.chat, {
              text: "Kamu menang!"
            }, {
              quoted: m
            });
          }
          if (!buckshot.hp) {
            delete conn.buckshot[m.chat];
            db.data.users[m.sender].money -= 25 * 1e3;
            return await conn.sendMessage(m.chat, {
              text: "Kamu kalah"
            }, {
              quoted: m
            });
          }
          if (!buckshot.ammo.length) {
            await reload(m, conn, buckshot);
          }
          if (!isi && !target && siapa === "me") {
            conn.buckshot[m.chat] = buckshot;
            return await shot(false, chance);
          }
          if (!target && buckshot.hc) {
            await conn.sendMessage(m.chat, {
              text: `Kamu melewati giliranmu`
            }, {
              quoted: m
            });
            buckshot.hc = false;
            buckshot.turn = false;
            return await shot(false, chance);
          }
          if (!isi && target && siapa === "me") {
            return await showShot(m, conn, buckshot);
          }
          await delay(2e3);
          if (!target) {
            buckshot.turn = true;
            return await showShot(m, conn, buckshot);
          } else {
            buckshot.turn = false;
            return await shot(false, chance);
          }
        }
        return await shot(true, args[1]);
      },
      use: async () => {
        if (!buckshot.on || !buckshot.turn) return `Tunggu dealer!`;
        let id = args[1];
        let isi = buckshot.ammo[0];
        if (!buckshot.slot.includes(id)) return;
        delete buckshot.slot[buckshot.slot.indexOf(id)];
        buckshot.slot = buckshot.slot.filter(v => v);
        if (id == 1) {
          let msg = await conn.sendMessage(m.chat, {
            text: `Peluru tersebut adalah peluru ${isi ? "terisi" : "kosong"}`
          }, {
            quoted: m
          });
          await delay(3e3);
          conn.sendMessage(m.chat, {
            delete: msg.key
          });
        } else if (id == 2) {
          buckshot.dmg = 2;
          await conn.sendMessage(m.chat, {
            text: `Damage senjata sekarang menjadi 2`
          }, {
            quoted: m
          });
        } else if (id == 3) {
          buckshot.hcm = true;
          await conn.sendMessage(m.chat, {
            text: `Dealer akan melewati giliran berikutnya`
          }, {
            quoted: m
          });
        } else if (id == 4) {
          let anu = buckshot.hp == userhp[buckshot.round] ? false : buckshot.hp++;
          await conn.sendMessage(m.chat, {
            text: `Menyembuhkan +${anu ? "1" : "0"} darah, darahmu sekarang adalah ${buckshot.hp}/${userhp[buckshot.round]}`
          }, {
            quoted: m
          });
        } else if (id == 5) {
          let isEmpt = buckshot.ammo.shift();
          await conn.sendMessage(m.chat, {
            text: `Kamu mengeluarkan 1 peluru ${isEmpt ? "terisi" : "kosong"}`
          }, {
            quoted: m
          });
          if (!buckshot.ammo.length) await reload(m, conn, buckshot);
        } else {}
        return showShot(m, conn, buckshot);
      },
      info: async () => {
        let isButton = conn.ctaButton.setBody(`Darah Kamu: ${buckshot.hp}/${userhp[buckshot.round]}\nItem:\n${buckshot.slot.map((v, i) => `${i + 1}. ${item[v].name}`).join("\n")}\n\nDarah Dealer: ${buckshot.hpm}/${userhp[buckshot.round]}\nItem:\n${buckshot.slotm.map((v, i) => `${i + 1}. ${item[v].name}`).join("\n")}`).addSelection("Select Here!").makeSections("Select").makeRow("", "Tembak Diri Sendiri", "Menembak diri sendiri", ".buckshot tembak me").makeRow("", "Tembak Dealer", "Tembak Sang Dealer", ".buckshot tembak dealer");
        return isButton.run(m.chat, conn, m);
      }
    };
    if (!isButton[cmd]) {
      return conn.ctaButton.setBody("Do you want to start?").addReply("Start!", `${usedPrefix}${command} start`).run(m.chat, conn, m);
    }
    await isButton[cmd]();
    conn.buckshot[m.chat] = buckshot;
  } catch (e) {
    m.reply(format(e));
  }
};
handler.command = ["buckshotroullete", "buckshot"];
handler.help = ["buckshot"];
handler.tags = ["game"];
export default handler;
async function reload(m, conn, buckshot) {
  if (buckshot.subround < Object.keys(ammo[buckshot.round]).length) buckshot.subround = buckshot.subround + 1;
  if (buckshot.round > 1) {
    let ack = ran(Object.keys(item)).slice(0, 4);
    if (buckshot.round == 2) ack = ack.slice(0, 2);
    if (8 - buckshot.slot.length < ack.length) ack = ack.slice(0, 8 - buckshot.slot.length);
    if (buckshot.slot.length < 8) conn.sendMessage(m.chat, {
      text: `Kamu mendapatkan:\n${ack.map((v, i) => `${i + 1}. ${item[v].name}`).join("\n")}`
    }, {
      quoted: m
    });
    buckshot.slot = [...buckshot.slot, ...ack];
    ack = ran(Object.keys(item)).slice(0, 4);
    if (buckshot.round == 2) ack = ack.slice(0, 2);
    if (8 - buckshot.slotm.length < ack.length) ack = ack.slice(0, 8 - buckshot.slotm.length);
    buckshot.slotm = [...buckshot.slotm, ...ack];
  }
  conn.buckshot[m.chat].ammo = ammo[buckshot.round][buckshot.subround].sort(() => Math.random() - .5);
  await delay(500);
  await showAmmo(m, conn, 3, buckshot);
  await delay(buckshot.delay);
  return buckshot;
}
async function showAmmo(m, conn, count, buckshot) {
  let notEmpty = buckshot.ammo.filter(v => v).length;
  let yesEmpty = buckshot.ammo.filter(v => !v).length;
  let msg = await conn.sendMessage(m.chat, {
    text: `Wait ${count}s`
  }, {
    quoted: m
  });
  for (let i = count; i >= 1; i--) {
    try {
      await conn.sendMessage(m.chat, {
        text: `Wait ${i}s`,
        edit: msg.key
      });
      await delay(1e3);
    } catch (e) {}
  }
  await conn.sendMessage(m.chat, {
    text: `Terdapat ${notEmpty} peluru terisi, dan ${yesEmpty} peluru kosong`,
    edit: msg.key
  });
  await delay(buckshot.delay);
  await conn.sendMessage(m.chat, {
    delete: msg.key
  });
  return buckshot;
}

function showShot(m, conn, buckshot) {
  let isButton = conn.ctaButton.setBody("Kamu ingin menembak dirimu sendiri, atau dealer?\n\n" + `Darah Kamu: ${buckshot.hp}/${userhp[buckshot.round]}\nItem:\n${buckshot.slot.length ? buckshot.slot.map((v, i) => `${i + 1}. ${item[v].name}`).join("\n") : "- No items"}\n\nDarah Dealer: ${buckshot.hpm}/${userhp[buckshot.round]}\nItem:\n${buckshot.slotm.length ? buckshot.slotm.map((v, i) => `${i + 1}. ${item[v].name}`).join("\n") : "- No items"}`).addSelection("Select Here!").makeSections("Select").makeRow("", "Tembak Diri Sendiri", "Menembak diri sendiri", ".buckshot tembak me").makeRow("", "Tembak Dealer", "Tembak Sang Dealer", ".buckshot tembak dealer").addSelection("Use Item").makeSections("Your Items");
  for (let i = 0; i < 8; i++) {
    isButton.makeRow("", item[buckshot.slot[i]] && item[buckshot.slot[i]].name || "No Items", item[buckshot.slot[i]] && item[buckshot.slot[i]].desc || "", ".buckshot use " + (buckshot.slot[i] || "No"));
  }
  return isButton.run(m.chat, conn, m);
}
async function hpAnimation(m, conn, hp, text, msg, minus) {
  let min = minus;
  if (hp < minus) min = hp;
  for (let i = 1; i <= 5; i++) {
    try {
      await conn.sendMessage(m.chat, {
        text: `${text}\n\n -${minus} HP\n${"❤".repeat(hp - (i % 2 === 0 ? 0 : min))}`,
        edit: msg.key
      });
      await delay(1e3);
    } catch (e) {}
  }
}

function ran(arr) {
  const weights = arr.map(item => 1 / item.length);
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

  function weightedRandom() {
    let rand = Math.random() * weightSum;
    for (let i = 0; i < arr.length; i++) {
      rand -= weights[i];
      if (rand <= 0) {
        return arr[i];
      }
    }
  }
  const shuffled = [];
  for (let i = 0; i < arr.length; i++) {
    shuffled.push(weightedRandom());
  }
  return shuffled;
}