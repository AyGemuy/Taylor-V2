import fs from "fs";
import path from "path";
import {
  fileURLToPath
} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskFilePath = path.join(__dirname, "../../json/task/coding.json");
let taskData = JSON.parse(fs.readFileSync(taskFilePath));
let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!m.chat.endsWith("@g.us")) {
    return;
  }
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🚨 *Usage:* Send command *${usedPrefix + command} [status]*\nExample: *${usedPrefix + command} pending* or *${usedPrefix + command} all* 🚨`,
      quoted: m
    });
  }
  const status = text.trim().toLowerCase();
  let filteredTasks;
  switch (status) {
    case "all":
      filteredTasks = taskData.task;
      break;
    case "pending":
    case "in progress":
    case "completed":
      filteredTasks = taskData.task.filter(task => task.status.toLowerCase() === status);
      break;
    default:
      return conn.reply(m.chat, "❌ *Invalid status.* Please use: all, pending, in progress, or completed. ❌", m);
  }
  let message = `📝 *Tasks (${status.charAt(0).toUpperCase() + status.slice(1)}):*\n\n`;
  if (filteredTasks.length > 0) {
    filteredTasks.forEach(task => {
      message += `🔹 *ID:* ${task.id}\n`;
      message += `🔹 *Detail:* ${task.detail}\n`;
      message += `🔹 *Due:* ${task.due}\n`;
      message += `🔹 *Staff:* ${task.staff}\n`;
      message += `🔹 *Status:* ${task.status}\n`;
      message += `------------------------------------\n`;
    });
  } else {
    message += "✨ *No tasks found.* ✨";
  }
  await conn.reply(m.chat, message, m);
};
handler.command = /^(checktasks)$/i;
export default handler;