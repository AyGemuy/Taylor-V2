import _ from "lodash";
import { cpus as _cpus, totalmem, freemem, hostname, platform } from "os";
import fs, { statSync, readdirSync } from "fs";
import { join } from "path";
import osu from "node-os-utils";
import fetch from "node-fetch";
import { performance } from "perf_hooks";
import { sizeFormatter } from "human-readable";
import moment from "moment-timezone";
import { clockString } from "../../lib/other-function.js";
const format = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});
const handler = async (m, { conn, isRowner }) => {
  try {
    const chats = _.filter(
      _.entries(conn.chats),
      ([id, data]) => id && data.isChats,
    );
    const groupsIn = _.filter(chats, ([id]) => id.endsWith("@g.us"));
    const used = process.memoryUsage();
    const cpus = _cpus().map((cpu) => ({
      ...cpu,
      total: _.sum(Object.values(cpu.times)),
    }));
    const cpu = _.reduce(
      cpus,
      (acc, cpu) => ({
        ...acc,
        total: acc.total + cpu.total,
        speed: acc.speed + cpu.speed,
        times: _.mapValues(acc.times, (time, type) => time + cpu.times[type]),
      }),
      {
        speed: 0,
        total: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0,
        },
      },
    );
    const NotDetect = "ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ";
    const cpux = osu.cpu;
    const drive = osu.drive;
    const mem = osu.mem;
    const netstat = osu.netstat;
    const HostN = hostname();
    const OS = platform();
    const cpuModel = (osu.os.ip(), cpux.model());
    const cpuCore = cpux.count();
    const [cpuPer, driveInfo, memInfo, netInfo, { ip, country: cr, cc }] =
      await Promise.all([
        cpux.usage().catch(() => NotDetect),
        drive.info().catch(() => ({
          totalGb: NotDetect,
          usedGb: NotDetect,
          usedPercentage: NotDetect,
        })),
        mem.info().catch(() => ({
          totalMemMb: NotDetect,
          usedMemMb: NotDetect,
        })),
        netstat.inOut().catch(() => ({
          total: {
            inputMb: NotDetect,
            outputMb: NotDetect,
          },
        })),
        fetch("https://api.myip.com")
          .then((res) => res.json())
          .catch(() => ({
            ip: NotDetect,
            country: NotDetect,
            cc: NotDetect,
          })),
      ]);
    const [_ramUsed, _ramTotal] = [
      format(1024 * (memInfo.usedMemMb ?? 0) * 1024) || NotDetect,
      format(1024 * (memInfo.totalMemMb ?? 0) * 1024) || NotDetect,
    ];
    const percent =
      /^[0-9.+/]/g.test(memInfo.usedMemMb) &&
      /^[0-9.+/]/g.test(memInfo.totalMemMb)
        ? `${Math.round(((memInfo.usedMemMb ?? 0) / (memInfo.totalMemMb ?? 1)) * 100)}%`
        : NotDetect;
    const d = new Date();
    const [weeks, dates, times] = [
      d.toLocaleDateString("id", {
        weekday: "long",
      }),
      d.toLocaleDateString("id", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      d.toLocaleTimeString("id", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    ];
    const old = performance.now();
    const neww = performance.now();
    const getFolderSize = (folderPath) => {
      return (
        statSync(folderPath).size +
        _.sumBy(readdirSync(folderPath), (file) => {
          const filePath = join(folderPath, file);
          return statSync(filePath).isDirectory()
            ? getFolderSize(filePath)
            : statSync(filePath).size;
        })
      );
    };
    const folderSession = `${format(getFolderSize(authFolder))}` || NotDetect;
    const credsSession =
      `${format(statSync(join(authFolder, "creds.json")).size)}` || NotDetect;
    const speed = neww - old;
    const _muptime = process.send
      ? 1e3 *
        (await new Promise((resolve) => {
          process.send("uptime");
          process.once("message", resolve);
          setTimeout(resolve, 1e3);
        }))
      : null;
    const muptime = _muptime ? clockString(_muptime) : "ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ";
    const cpuCoreDetails = cpus
      .map(
        (cpu, i) =>
          `${htjava} *${cpu.model.trim()}* (${Math.round(cpu.speed / cpus.length)} MHz)\n${_.map(Object.entries(cpu.times), ([type, time]) => `> *${type}*: ${((100 * time) / cpu.total).toFixed(2)}%`).join("\n")}`,
      )
      .join("\n\n");
    const str = `
*\`${htjava} ᴘɪɴɢ\`*
> ${Math.round(neww - old)} ms
> ${speed} ms

*\`${htjava} ʀᴜɴᴛɪᴍᴇ\`*
${muptime}
${readMore}
*\`${htjava} ᴄʜᴀᴛs\`*
• *${groupsIn.length}* Group Chats
• *${groupsIn.length}* Groups Joined
• *${groupsIn.length - groupsIn.length}* Groups Left
• *${chats.length - groupsIn.length}* Personal Chats
• *${chats.length}* Total Chats

*\`${htjava} sᴇʀᴠᴇʀ\`*
*🛑 RAM:* ${_ramUsed} / ${_ramTotal} (${percent})
*🔵 Free RAM:* ${format(freemem())}
*📑 Creds Session Size:* ${credsSession}
*📑 Folder Session Size:* ${folderSession}
*🔭 Platform:* ${OS}
*🧿 Server:* ${HostN}
*💻 OS:* ${OS}
*📍 IP:* ${ip}
*🌎 Country:* ${cr}
*💬 Country Code:* ${cc}
*📡 CPU Model:* ${cpuModel}
*🔮 CPU Core:* ${cpuCore} Core
*🎛️ CPU Usage:* ${cpuPer}%
*⏰ Server Time:* ${times}

*\`${htjava} ᴏᴛʜᴇʀ\`*
*📅 Weeks:* ${weeks}
*📆 Dates:* ${dates}
*🔁 Net In:* ${format(1024 * _.get(netInfo, "total.inputMb", NotDetect) * 1024)}
*🔁 Net Out:* ${format(1024 * _.get(netInfo, "total.outputMb", NotDetect) * 1024)}
*💿 Drive Total:* ${format(1024 * driveInfo.totalGb * 1024 * 1024)}
*💿 Drive Used:* ${format(1024 * driveInfo.usedGb * 1024 * 1024)}
*⚙️ Drive Usage:* ${driveInfo.usedPercentage}%
${readMore}
*\`${htjava} Node.js Memory Usage\`*
${
  "```" +
  _.map(
    used,
    (val, key) =>
      `${_.padEnd(key, _.maxBy(_.keys(used), "length").length, " ")}: ${format(val)}`,
  ).join("\n") +
  "```"
}\n*\`CPU (${cpus.length}) Core\`*
${cpuCoreDetails}`;
    await conn.sendMessage(
      m.chat,
      {
        text: str,
        contextInfo: {
          mentionedJid: [m.sender],
        },
      },
      {
        quoted: m,
      },
    );
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
