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
  if (taskData.task[taskIndex].staff !== "No staff assigned") {
    return conn.reply(m.chat, `This task is already claimed by ${taskData.task[taskIndex].staff}.`, m);
  }
  const userName = m.pushName || m.sender.split("@")[0];
  taskData.task[taskIndex].staff = userName;
  fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));
  const claimedTask = taskData.task[taskIndex];
  const message = `✅ *Task Claimed Successfully!* ✅\n\n` + `🆔 *ID:* ${claimedTask.id}\n` + `📝 *Detail:* ${claimedTask.detail}\n` + `📅 *Due Date:* ${claimedTask.due}\n` + `👥 *Assigned to:* ${claimedTask.staff}\n` + `🔖 *Status:* ${claimedTask.status}\n\n` + `Good luck with the task! 👍`;
  await conn.reply(m.chat, message, m);
};
handler.command = /^(claimtask)$/i;
export default handler;