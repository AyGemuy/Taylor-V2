import {
  cpus as _cpus,
  totalmem,
  freemem
} from "os";
import {
  performance
} from "perf_hooks";
import {
  sizeFormatter
} from "human-readable";
import {
  join
} from "path";
import {
  promises
} from "fs";
import moment from "moment-timezone";
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001),
  format = sizeFormatter({
    std: "JEDEC",
    decimalPlaces: 2,
    keepTrailingZeroes: !1,
    render: (literal, symbol) => `${literal} ${symbol}B`
  }),
  handler = async (m, {
    conn,
    __dirname
  }) => {
    try {
      let date = moment.tz("Asia/Jakarta").format("dddd, Do MMMM, YYYY"),
        time = moment.tz("Asia/Jakarta").format("HH:mm:ss"),
        _package = JSON.parse(await promises.readFile(join(__dirname, "../package.json")).catch(_ => "{}")) || {},
        uptime = clockString(1e3 * process.uptime()),
        totalreg = Object.keys(db.data.users).length,
        rtotalreg = Object.values(db.data.users).filter(user => user.registered).length;
      const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats),
        groupsIn = chats.filter(([id]) => id.endsWith("@g.us")),
        cpus = (process.memoryUsage(), _cpus().map(cpu => (cpu.total = Object.values(cpu.times).reduce((last, type) => last + type, 0), cpu)));
      cpus.reduce((last, cpu, _, {
        length
      }) => ({
        total: last.total + cpu.total,
        speed: last.speed + cpu.speed / length,
        times: {
          user: last.times.user + cpu.times.user,
          nice: last.times.nice + cpu.times.nice,
          sys: last.times.sys + cpu.times.sys,
          idle: last.times.idle + cpu.times.idle,
          irq: last.times.irq + cpu.times.irq
        }
      }), {
        speed: 0,
        total: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      });
      let speed = performance.now() - performance.now(),
        capti = `🤖 Nama: ${_package.name || "N/A"}\n🔢 Versi: ${_package.version || "N/A"}\n📚 Library: ${_package.description || "N/A"}\n\n⏳ Waktu Aktif: ${uptime}\n📈 Pengguna Terdaftar: ${totalreg} (${rtotalreg} terverifikasi)\n\n📅 Tanggal: ${date}\n⌚ Waktu: ${time} (GMT +7)\n\n💻 Info Server:\n⮕ Ping: ${speed.toFixed(2)} ms\n⮕ RAM: ${format(totalmem() - freemem())} / ${format(totalmem())}\n\n💬 Status WhatsApp:\n⮕ ${groupsIn.length} Grup Chat\n⮕ ${groupsIn.length} Grup Bergabung\n⮕ ${chats.length - groupsIn.length} Chat Pribadi\n⮕ ${chats.length} Total Chat`.trim();
      m.reply(capti);
    } catch (error) {
      console.error(error);
    }
  };
handler.help = ["botinfo"], handler.tags = ["info"], handler.command = /^(bot(info)?|infobot)$/i;
export default handler;

function clockString(ms) {
  let d = Math.floor(ms / 864e5),
    h = Math.floor(ms / 36e5) % 24,
    m = Math.floor(ms / 6e4) % 60,
    s = Math.floor(ms / 1e3) % 60;
  return `${d} *Hari ☀️*\n${h.toString().padStart(2, "0")} *Jam 🕐*\n${m.toString().padStart(2, "0")} *Menit ⏰*\n${s.toString().padStart(2, "0")} *Detik ⏱️*`;
}