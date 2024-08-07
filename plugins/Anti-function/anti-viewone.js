import {
  downloadContentFromMessage
} from "@whiskeysockets/baileys";
export async function before(m) {
  const {
    viewonce
  } = db.data.chats[m.chat];
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  if (viewonce && m.mtype && m.msg && m.msg.hasOwnProperty("viewOnce")) try {
    const type = m.msg.mimetype.split("/")[0],
      media = await downloadContentFromMessage(m.msg, type);
    let buffer = Buffer.from([]);
    for await (const chunk of media) buffer = Buffer.concat([buffer, chunk]);
    const fileSize = formatFileSize(m.msg.fileLength),
      timestamp = getMakassarTimestamp(m.msg.mediaKeyTimestamp),
      description = `🚫 *Anti-ViewOnce*\n📁 *Media Type:* ${"image" === type ? "Image" : "video" === type ? "Video" : "audio" === type ? "Audio" : "Unknown"}\n📝 *Caption:* ${m.msg.caption || "N/A"}\n📏 *Size:* ${fileSize}\n⏰ *Timestamp:* ${timestamp}\n👤 *Sender:* @${m.sender.split("@")[0]}`;
    /image|video|audio/.test(type) && (await this.sendFile(m.chat, buffer, type, description || type, m, !1, {
      mentions: [m.sender]
    }), console.log(`[📷 View Once ${type}] Detected`));
  } catch (error) {
    console.error("Error processing media:", error);
  }
}

function formatFileSize(bytes) {
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "TY", "EY"][i];
}

function getMakassarTimestamp(timestamp) {
  return new Date(1e3 * timestamp).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
  });
}