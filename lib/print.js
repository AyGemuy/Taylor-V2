import {
  WAMessageStubType
} from "@whiskeysockets/baileys";
import PhoneNumber from "awesome-phonenumber";
import ora from "ora";
import chalk from "chalk";
import {
  watchFile,
  readFile,
  writeFile
} from "fs";
import terminalImage from "terminal-image";
import urlRegex from "url-regex-safe";
import {
  sizeFormatter,
  durationFormatter
} from "human-readable";
const formatSize = sizeFormatter({
    std: "JEDEC",
    decimalPlaces: 2,
    keepTrailingZeroes: !1,
    render: (literal, symbol) => `${literal} ${symbol}B`
  }),
  formatTime = timestamp => {
    try {
      const dateInMakassar = new Date(1e3 * (timestamp?.low || 0)),
        formatter = new Intl.DateTimeFormat("en-EN", {
          timeZone: "Asia/Makassar",
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      return formatter.format(dateInMakassar);
    } catch (error) {
      return console.error("Error formatting time:", error.message), "Invalid Timestamp";
    }
  },
  formatDuration = timestamp => {
    try {
      return durationFormatter({
        units: ["h", "m", "s"],
        round: !0
      })(timestamp?.low || 0);
    } catch (error) {
      return console.error("Error formatting duration:", error.message), "Invalid Duration";
    }
  };
class ClearLogger {
  logCount = 0;
  addLog = () => (this.logCount >= 999 && this.clearLogs(), this.logCount++);
  clearLogs = () => (console.log(chalk.blue("Clearing log...")) && console.clear(), this.logCount = 0);
}
const clearLoggerInstance = new ClearLogger();
export default async function(m, conn = {
  user: {}
}) {
  const database = db.data.database.listbot;
  const formatType = type => type ? type.replace(/message$/i, "").replace("audio", m.msg.ptt ? "PTT" : "audio").replace(/^./, v => v.toUpperCase()) : "Unknown",
    _name = conn.getName(m.sender) || "Tanpa nama",
    chat = (PhoneNumber("+" + m.sender.replace("@s.whatsapp.net", "")).getNumber("international"), conn.getName(m.chat) || "Tanpa nama"),
    filesize = m.msg && m.msg.vcard ? m.msg.vcard.length : m.msg && m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength : m.text ? m.text.length : 0;
  if (nomorbot !== conn.user.jid?.split("@")[0]) {
    nomorbot = conn.user.jid?.split("@")[0];
  }
  if (m?.sender && m?.msg) {
    if (m?.msg && m?.isCommand && (clearLoggerInstance.addLog(), console.log(chalk.bold.cyan("\n╭──────────────────────────────────────···")), console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`), console.log(chalk.bold.cyan("├──────────────────────────────────────···")), console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key.id || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender.split("@")[0] || m.key.remoteJid || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user?.name || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key.remoteJid || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Total Log Messages")}: ${clearLoggerInstance.logCount}`), console.log(chalk.bold.cyan("╰──────────────────────────────────────···\n"))), (opts.antibot || db.data.settings[conn.user?.jid]?.antibot && m?.isGroup) && m?.sender) {
      clearLoggerInstance.addLog();
      if ((m.isBot || m.isBaileys) && !m.fromMe && m.sender !== conn.user?.jid) {
        const antiBotMessage = "[ *🚫 ANTI BOT 🚫* ]\n\n🛑 Group ini dilengkapi dengan anti bot\n\n⚠ Anda melanggar peraturan bot";
        await conn.sendMessage(m.chat, {
          text: antiBotMessage,
          contextInfo: {
            externalAdReply: {
              title: "🤖 Anti Bot",
              body: "",
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: false,
              thumbnailUrl: "https://cdn-icons-png.flaticon.com/128/2333/2333083.png",
              sourceUrl: ""
            },
            mentionedJid: [m.sender]
          }
        }, {
          quoted: m
        }), conn.logger.info("Bot detected " + m.sender.split("@")[0]);
      }
    }
    if (m?.isGroup && m?.sender) {
      clearLoggerInstance.addLog();
      if ((m.isBot || m.isBaileys) && !m.fromMe && m.sender !== conn.user?.jid) {
        const chatKey = m.chat ?? m.key?.remoteJid ?? "N/A",
          chatValue = {
            name: m.name ?? m.pushName ?? conn.user?.name ?? "N/A",
            number: m.sender ?? m.key?.remoteJid ?? "N/A",
            groupId: m.chat ?? m.key?.remoteJid ?? "N/A"
          };
        database[chatKey] = database[chatKey] || [], database[chatKey]?.some(bot => bot.number === m.sender) ? database[chatKey] = database[chatKey]?.filter(bot => bot.number !== m.sender) : database[chatKey]?.push(chatValue);
      }
    }
  }
  if ("string" == typeof m?.text && m?.text && m?.isCommand && m?.sender) {
    clearLoggerInstance.addLog(), console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
    let logMessage = m.text.replace(/\u200e+/g, "");
    const mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g,
      mdFormat = (depth = 4) => (_, type, text, monospace) => {
        const types = {
          _: "italic",
          "*": "bold",
          "~": "strikethrough"
        };
        text = text || monospace;
        return !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
      };
    if (logMessage.length < 4096 && (logMessage = logMessage.replace(urlRegex, (url, i, text) => {
        const end = url.length + i;
        return 0 === i || end === text.length || /^\s$/.test(text[end]) && /^\s$/.test(text[i - 1]) ? chalk.bold.blueBright(url) : url;
      })), logMessage = logMessage.replace(mdRegex, mdFormat(4)), m.mentionedJid)
      for (const user of m.mentionedJid) logMessage = logMessage.replace("@" + user.split("@")[0], chalk.bold.blueBright("@" + conn.getName(user)));
    const maxLogLength = 200,
      truncatedLog = logMessage.length > maxLogLength ? `${logMessage.slice(0, maxLogLength / 2)}...${logMessage.slice(-maxLogLength / 2)}` : logMessage;
    console.log(null != m.error ? `🚨 ${chalk.bold.red(truncatedLog)}` : m.isCommand ? `⚙️ ${chalk.bold.yellow(truncatedLog)}` : truncatedLog),
      console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
  }
  if (m?.msg && m?.sender) {
    clearLoggerInstance.addLog();
    const attachmentType = m.mtype.replace(/message$/i, "");
    if (/document/i.test(attachmentType)) console.log(chalk.bold.cyan("╭──────────────────────────────────────···")),
      console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`),
      console.log(chalk.bold.cyan("├──────────────────────────────────────···")), console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key.id || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender.split("@")[0] || m.key.remoteJid || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user?.name || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key.remoteJid || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`), console.log(chalk.bold.redBright(`📄 Attached Document:\n\n ${m.msg.fileName || m.msg.displayName || "Document"}`)),
      console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    else if (/contact/i.test(attachmentType)) console.log(chalk.bold.cyan("╭──────────────────────────────────────···")),
      console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`),
      console.log(chalk.bold.cyan("├──────────────────────────────────────···")), console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key.id || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender.split("@")[0] || m.key.remoteJid || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user?.name || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key.remoteJid || "N/A"}`),
      console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`), console.log(chalk.bold.redBright(`👨 Attached Contact: ${m.msg.displayName || "N/A"}`)),
      console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    else if (/audio/i.test(attachmentType)) {
      console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
      const duration = m.msg.seconds || 0,
        formattedDuration = formatDuration(duration);
      console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`),
        console.log(chalk.bold.cyan("├──────────────────────────────────────···")), console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key.id || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender.split("@")[0] || m.key.remoteJid || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user?.name || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key.remoteJid || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`), console.log(chalk.bold.redBright(`🎵 Attached Audio: ${m.msg.ptt ? "(PTT)" : "(Audio)"} - Duration: ${formattedDuration}`)),
        console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    } else if (/image/i.test(attachmentType)) {
      console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
      const attachmentName = m.msg.caption || attachmentType;
      if (console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`), console.log(chalk.bold.cyan("├──────────────────────────────────────···")), console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key.id || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender.split("@")[0] || m.key.remoteJid || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user?.name || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key.remoteJid || "N/A"}`), console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`), console.log(chalk.bold.redBright(`🟡 Attached Image: ${attachmentName}`)), m.msg.url && opts.img) try {
        const imageBuffer = await m.download(),
          terminalImg = await terminalImage.buffer(imageBuffer);
        console.log(terminalImg);
      } catch (error) {
        console.error(chalk.bold.red("Error displaying image:"), error);
      }
      console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    } else if (/video/i.test(attachmentType)) {
      console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
      const attachmentName = m.msg.caption || attachmentType;
      console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`),
        console.log(chalk.bold.cyan("├──────────────────────────────────────···")), console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key.id || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender.split("@")[0] || m.key.remoteJid || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user?.name || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key.remoteJid || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`), console.log(chalk.bold.redBright(`📹 Attached Video: ${attachmentName}`)),
        console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    } else if (/sticker/i.test(attachmentType)) {
      console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
      const attachmentName = m.msg.caption || attachmentType;
      console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`),
        console.log(chalk.bold.cyan("├──────────────────────────────────────···")), console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key.id || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender.split("@")[0] || m.key.remoteJid || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user?.name || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key.remoteJid || "N/A"}`),
        console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`), console.log(chalk.bold.redBright(`🎴 Attached Sticker: ${attachmentName}`)),
        console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    }
  }
  m?.isCommand && m?.sender && m?.msg && (clearLoggerInstance.addLog(), console.log(chalk.bold.greenBright(`\n  ${chalk.bold.red("From")}: ${getPhoneNumber(m.sender)}`)), console.log(chalk.bold.blueBright(`  ${chalk.bold.red("To")}: ${getPhoneNumber(conn.user?.jid)}`)), console.log(chalk.bold.magentaBright("\n")));
}
const getPhoneNumber = jid => PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");