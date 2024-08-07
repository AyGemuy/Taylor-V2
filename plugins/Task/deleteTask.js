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
      text: `🚨 *Usage:* Send command *${usedPrefix + command} [task ID]*\nExample: *${usedPrefix + command} 1* 🚨`,
      quoted: m
    });
  }
  const taskId = parseInt(text.trim());
  const taskIndex = taskData.task.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return conn.reply(m.chat, "Invalid task ID.", m);
  }
  taskData.task.splice(taskIndex, 1);
  fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));
  await conn.reply(m.chat, "Successfully deleted the task.", m);
};
handler.command = /^(deletetask)$/i;
export default handler;