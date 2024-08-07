import {
  promisify
} from "util";
import {
  exec as execCallback
} from "child_process";
const exec = promisify(execCallback),
  handler = async (m, {
    conn
  }) => {
    try {
      const {
        stdout,
        stderr
      } = await exec("python3 speed.py --share --json"), {
        download,
        upload,
        ping,
        server,
        client,
        timestamp,
        bytes_sent,
        bytes_received,
        share
      } = JSON.parse(stdout.match(/\{(.|\n)*\}/)[0]), message = `\n*🚀 Download Speed*: ${formatSpeed(download)} Mbps\n*📤 Upload Speed*: ${formatSpeed(upload)} Mbps\n*⏱️ Ping*: ${ping} ms\n\n*Server Details*:\n  *Name*: ${server.name}\n  *Country*: ${server.country}\n  *Sponsor*: ${server.sponsor}\n\n*Client Details*:\n  *IP*: ${client.ip}\n  *ISP*: ${client.isp}\n  *Country*: ${client.country}\n\n*📅 Timestamp*: ${formatTimestamp(timestamp)}\n*💾 Bytes Sent*: ${formatBytes(bytes_sent)}\n*💽 Bytes Received*: ${formatBytes(bytes_received)}\n*🔗 Share Link*: ${share}\n`;
      await conn.reply(m.chat, message, m, {
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            body: "SPEEDTEST",
            containsAutoReply: !0,
            mediaType: 1,
            mediaUrl: "https://www.speedtest.net/id",
            renderLargerThumbnail: !0,
            showAdAttribution: !0,
            sourceUrl: "https://www.speedtest.net/id",
            thumbnail: await conn.resize(share, 350, 200),
            thumbnailUrl: share,
            title: htki + " O O K L A " + htka
          }
        }
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
    }
  };
handler.help = ["speedtest"], handler.tags = ["info"], handler.command = /^(speedtest)$/i;
export default handler;

function formatSpeed(speed) {
  return (speed / 1048576).toFixed(2);
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  }).format(date);
}

function formatBytes(bytes) {
  if (0 === bytes) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + ["Bytes", "KB", "MB", "GB", "TB"][i];
}