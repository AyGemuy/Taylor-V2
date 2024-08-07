import {
  promises,
  readFileSync
} from "fs";
let misi = JSON.parse(readFileSync("./lib/misi.json"));
async function handler(m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) {
  if (conn.mission = conn.mission ? conn.mission : {}, m.sender in conn.mission) return m.reply("Kamu masih melakukan misi, tunggu sampai selesai!!");
  try {
    let json = misi[Math.floor(Math.random() * misi.length)];
    const cooldown = 3e5;
    let user = db.data.users[m.sender];
    if (0 === user.health || 0 === user.stamina || 0 === user.mana) return m.reply("your stamina/healt/mana is less than 100");
    "number" != typeof user.lastmisi && (db.data.users[m.sender].lastmisi = 0), "number" != typeof user.exp && (db.data.users[m.sender].exp = 0), "number" != typeof user.crystal && (db.data.users[m.sender].crystal = 0);
    let timers = cooldown - (new Date() - user.lastmisi);
    if (new Date() - user.lastmisi <= cooldown) return m.reply(`wait for 🕐${clockString(timers)}`);
    if (!user.skill) return m.reply("Anda belum mempunyai skill");
    if (!(m.sender in conn.mission)) {
      conn.mission[m.sender] = {
        sender: m.sender,
        timeout: setTimeout(() => {
          m.reply("timed out"), delete conn.mission[m.sender];
        }, 6e4),
        json: json
      };
      let caption = `*A MISSION HAS BEEN GIVEN TO THE HUNTER! (BETA)*\n*🥇 RANK:* ${json.rank}\n*📰 MISI:* ${json.misii}\n*🎁 GIFT:* Exp ${json.exp} & Crystal Mana ${json.crystal}\n${json.title ? `*🔖 TITLE:* ${json.title}` : "\n"} ${json.gems ? `Gems: ${json.gems}` : "\n"}\n\nslect option\n- Accept\n- Cancel\n`;
      return await conn.reply(m.chat, caption, m);
    }
  } catch (e) {
    if (console.error(e), m.sender in conn.mission) {
      let {
        timeout
      } = conn.mission[m.sender];
      clearTimeout(timeout), delete conn.mission[m.sender], m.reply("Rejected");
    }
  }
}
handler.before = async m => {
  if (conn.mission = conn.mission ? conn.mission : {}, !(m.sender in conn.mission)) return;
  if (m.isBaileys) return;
  let {
    timeout,
    json
  } = conn.mission[m.sender];
  let user = db.data.users[m.sender],
    txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : "").toLowerCase();
  if ("accept" != txt && "cancel" != txt && "gas" != txt) return;
  "number" != typeof user.lastmisi && (db.data.users[m.sender].lastmisi = 0), "number" != typeof user.exp && (db.data.users[m.sender].exp = 0), "number" != typeof user.crystal && (db.data.users[m.sender].crystal = 0);
  let timers = 3e5 - (new Date() - user.lastmisi);
  if (new Date() - user.lastmisi <= 3e5) return m.reply(`Wait for 🕐${clockString(timers)}`);
  if (!user.skill) return m.reply("Anda belum mempunyai skill");
  let Aku = 1 * `${Math.floor(101 * Math.random())}`.trim(),
    Kamu = 1 * `${Math.floor(81 * Math.random())}`.trim(),
    aud = ["Mana Habis", "Stamina Habis", "Diserang Monster", "Dibokong Monster"],
    aui = aud[Math.floor(Math.random() * aud.length)];
  try {
    if (/^accept?$/i.test(txt)) {
      if (Aku > Kamu) {
        var cpt = `Berhasil Menyelesaikan 📰misi ${json.misii}`;
        m.reply("" + (json.title ? `You got a title ${json.title}` : "")), m.reply(cpt),
          user.exp += json.exp, user.crystal += json.crystal, user.title += json.title, user.misi += json.misii;
      } else if (Aku < Kamu) {
        var flr = `Gagal Menyelesaikan 📰Misi ${json.misii} Dikarenakan ${aui} `;
        m.reply(flr);
      } else {
        var cpe = `Berhasil Menyelesaikan 📰misi ${json.misii}`;
        m.reply("" + (json.title ? `You got a title ${json.title}` : "")), m.reply(cpe),
          user.exp += json.exp, user.crystal += json.crystal, user.title += json.title, user.misi += json.misii;
      }
      return user.lastmisi = 1 * new Date(), clearTimeout(timeout), delete conn.mission[m.sender], !0;
    }
    if (/^cancel?$/i.test(txt)) return clearTimeout(timeout), delete conn.mission[m.sender],
      m.reply("Canceled"), !0;
  } catch (e) {
    return clearTimeout(timeout), delete conn.mission[m.sender], m.reply("Error saat pengambilan misi (Rejected)"),
      console.log("\n".repeat(3)), console.log(e.stack), !0;
  } finally {
    return clearTimeout(timeout), delete conn.mission[m.sender], !0;
  }
}, handler.help = ["mission"], handler.tags = ["rpg"], handler.command = /^(m(isi)?(ission)?)$/i;
export default handler;

function number(x = 0) {
  return x = parseInt(x), !isNaN(x) && "number" == typeof x;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}