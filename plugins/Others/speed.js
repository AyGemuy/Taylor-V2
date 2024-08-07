import _ from "lodash";
import {
  cpus as _cpus,
  totalmem,
  freemem,
  hostname,
  platform
} from "os";
import fs, {
  statSync,
  readdirSync
} from "fs";
import {
  join
} from "path";
import osu from "node-os-utils";
import fetch from "node-fetch";
import {
  performance
} from "perf_hooks";
import {
  sizeFormatter
} from "human-readable";
import moment from "moment-timezone";
const format = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`
});
const handler = async (m, {
  conn,
  isRowner
}) => {
  try {
    const chats = _.filter(_.entries(conn.chats), ([id, data]) => id && data.isChats);
    const groupsIn = _.filter(chats, ([id]) => id.endsWith("@g.us"));
    const used = process.memoryUsage();
    const cpus = _cpus().map(cpu => ({
      ...cpu,
      total: _.sum(Object.values(cpu.times))
    }));
    const cpu = _.reduce(cpus, (acc, cpu) => ({
      ...acc,
      total: acc.total + cpu.total,
      speed: acc.speed + cpu.speed,
      times: _.mapValues(acc.times, (time, type) => time + cpu.times[type])
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
    const NotDetect = "ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ";
    const cpux = osu.cpu;
    const drive = osu.drive;
    const mem = osu.mem;
    const netstat = osu.netstat;
    const HostN = hostname();
    const OS = platform();
    const cpuModel = (osu.os.ip(), cpux.model());
    const cpuCore = cpux.count();
    const [cpuPer, driveInfo, memInfo, netInfo, {
      ip,
      country: cr,
      cc
    }] = await Promise.all([cpux.usage().catch(() => NotDetect), drive.info().catch(() => ({
      totalGb: NotDetect,
      usedGb: NotDetect,
      usedPercentage: NotDetect
    })), mem.info().catch(() => ({
      totalMemMb: NotDetect,
      usedMemMb: NotDetect
    })), netstat.inOut().catch(() => ({
      total: {
        inputMb: NotDetect,
        outputMb: NotDetect
      }
    })), fetch("https://api.myip.com").then(res => res.json()).catch(() => ({
      ip: NotDetect,
      country: NotDetect,
      cc: NotDetect
    }))]);
    const [_ramUsed, _ramTotal] = [format(1024 * (memInfo.usedMemMb ?? 0) * 1024) || NotDetect, format(1024 * (memInfo.totalMemMb ?? 0) * 1024) || NotDetect];
    const percent = /^[0-9.+/]/g.test(memInfo.usedMemMb) && /^[0-9.+/]/g.test(memInfo.totalMemMb) ? `${Math.round((memInfo.usedMemMb ?? 0) / (memInfo.totalMemMb ?? 1) * 100)}%` : NotDetect;
    const d = new Date();
    const [weeks, dates, times] = [d.toLocaleDateString("id", {
      weekday: "long"
    }), d.toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }), d.toLocaleTimeString("id", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    })];
    const old = performance.now();
    const neww = performance.now();
    const getFolderSize = folderPath => {
      return statSync(folderPath).size + _.sumBy(readdirSync(folderPath), file => {
        const filePath = join(folderPath, file);
        return statSync(filePath).isDirectory() ? getFolderSize(filePath) : statSync(filePath).size;
      });
    };
    const folderSession = `${format(getFolderSize(authFolder))}` || NotDetect;
    const credsSession = `${format(statSync(join(authFolder, "creds.json")).size)}` || NotDetect;
    const speed = neww - old;
    const _muptime = process.send ? 1e3 * await new Promise(resolve => {
      process.send("uptime");
      process.once("message", resolve);
      setTimeout(resolve, 1e3);
    }) : null;
    const muptime = _muptime ? clockString(_muptime) : "ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ";
    const cpuCoreDetails = cpus.map((cpu, i) => `${htjava} *${cpu.model.trim()}* (${Math.round(cpu.speed / cpus.length)} MHz)\n` + `${_.map(Object.entries(cpu.times), ([ type, time ]) => `> *${type}*: ${(100 * time / cpu.total).toFixed(2)}%`).join("\n")}`).join("\n\n");
    const str = `\n*\`${htjava} ᴘ ɪ ɴ ɢ\`*\n> ${Math.round(neww - old)}ms\n> ${speed}ms\n\n*\`${htjava} ʀ ᴜ ɴ ᴛ ɪ ᴍ ᴇ\`*\n${muptime}\n${readMore}\n*\`${htjava} ᴄ ʜ ᴀ ᴛ s\`*\n• *${groupsIn.length}* Group Chats\n• *${groupsIn.length}* Groups Joined\n• *${groupsIn.length - groupsIn.length}* Groups Left\n• *${chats.length - groupsIn.length}* Personal Chats\n• *${chats.length}* Total Chats\n\n*\`${htjava} s ᴇ ʀ ᴠ ᴇ ʀ\`*\n*🛑 Rᴀᴍ:* ${_ramUsed} / ${_ramTotal} (${percent})\n*🔵 FʀᴇᴇRᴀᴍ:* ${format(freemem())}\n*📑 ᴄʀᴇᴅꜱ sᴇssɪᴏɴ sɪᴢᴇ :* ${credsSession}\n*📑 ꜰᴏʟᴅᴇʀ sᴇssɪᴏɴ sɪᴢᴇ :* ${folderSession}\n*🔭 ᴘʟᴀᴛғᴏʀᴍ:* ${OS}\n*🧿 sᴇʀᴠᴇʀ:* ${HostN}\n*💻 ᴏs:* ${OS}\n*📍 ɪᴘ:* ${ip}\n*🌎 ᴄᴏᴜɴᴛʀʏ:* ${cr}\n*💬 ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ:* ${cc}\n*📡 ᴄᴘᴜ ᴍᴏᴅᴇʟ:* ${cpuModel}\n*🔮 ᴄᴘᴜ ᴄᴏʀᴇ:* ${cpuCore} Core\n*🎛️ ᴄᴘᴜ:* ${cpuPer}%\n*⏰ ᴛɪᴍᴇ sᴇʀᴠᴇʀ:* ${times}\n\n*\`${htjava} ᴏ ᴛ ʜ ᴇ ʀ\`*\n*📅 Wᴇᴇᴋꜱ:* ${weeks}\n*📆 Dᴀᴛᴇꜱ:* ${dates}\n*🔁 NᴇᴛꜱIɴ:* ${format(1024 * _.get(netInfo, "total.inputMb", NotDetect) * 1024)}\n*🔁 NᴇᴛꜱOᴜᴛ:* ${format(1024 * _.get(netInfo, "total.outputMb", NotDetect) * 1024)}\n*💿 DʀɪᴠᴇTᴏᴛᴀʟ:* ${format(1024 * driveInfo.totalGb * 1024 * 1024)}\n*💿 DʀɪᴠᴇUꜱᴇᴅ:* ${format(1024 * driveInfo.usedGb * 1024 * 1024)}\n*⚙️ DʀɪᴠᴇPᴇʀ:* ${driveInfo.usedPercentage}\n${readMore}\n*\`${htjava} ɴᴏᴅᴇJS ᴍᴇᴍᴏʀʏ ᴜsᴀɢᴇ\`*\n${"```" + _.map(used, (val, key) => `${_.padEnd(key, _.maxBy(_.keys(used), "length").length, " ")}: ${format(val)}`).join("\n") + "```"}\n\n*\`CPU (${cpus.length}) Core\`*\n${cpuCoreDetails}`;
const thumbnail = (await conn.getFile("https://cdn-icons-png.flaticon.com/128/9320/9320767.png")).data;
await conn.sendMessage(m.chat, {
  text: str,
  contextInfo: {
    externalAdReply: {
      title: "🤖 Bot Speed",
      thumbnail: thumbnail
    },
    mentionedJid: [m.sender]
  }
}, {
  quoted: m
});
} catch (error) {
  console.error(error);
}
};
handler.help = ["ping", "speed"];
handler.tags = ["info", "tools"];
handler.command = /^(ping|speed|info)$/i;
export default handler;
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  const duration = moment.duration(ms);
  return `☀️ *${_.padStart(duration.days(), 2, "0")}* Days\n` + `🕐 *${_.padStart(duration.hours(), 2, "0")}* Hours\n` + `⏰ *${_.padStart(duration.minutes(), 2, "0")}* Minutes\n` + `⏱️ *${_.padStart(duration.seconds(), 2, "0")}* Seconds`;
}