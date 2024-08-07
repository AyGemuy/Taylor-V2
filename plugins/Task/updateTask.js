import fs from "fs";
import path from "path";
import {
  fileURLToPath
} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskFilePath = path.join(__dirname, "../../json/task/coding.json");
let taskData = JSON.parse(fs.readFileSync(taskFilePath));
const validStatuses = ["Pending", "In Progress", "Completed"];
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
      text: `🚨 *Usage:* Send command *${usedPrefix + command} [task ID] [new status]*\nExample: *${usedPrefix + command} 1 Completed* 🚨`,
      quoted: m
    });
  }
  const [taskId, ...statusParts] = text.split(" ");
  const newStatus = statusParts.join(" ").toLowerCase();
  if (!validStatuses.map(status => status.toLowerCase()).includes(newStatus)) {
    return conn.reply(m.chat, `Invalid status. Please use one of the following: ${validStatuses.join(", ")}.`, m);
  }
  const taskIndex = taskData.task.findIndex(task => task.id === parseInt(taskId));
  if (taskIndex === -1) {
    return conn.reply(m.chat, "Invalid task ID.", m);
  }
  taskData.task[taskIndex].status = validStatuses.find(status => status.toLowerCase() === newStatus);
  fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));
  const updatedTask = taskData.task[taskIndex];
  const message = `✅ *Task Updated Successfully!* ✅\n\n` + `🆔 *ID:* ${updatedTask.id}\n` + `📝 *Detail:* ${updatedTask.detail}\n` + `📅 *Due Date:* ${updatedTask.due}\n` + `👥 *Assigned to:* ${updatedTask.staff}\n` + `🔖 *New Status:* ${updatedTask.status}\n\n` + `Keep up the great work! 💪`;
  await conn.reply(m.chat, message, m);
};
handler.command = /^(updatetask)$/i;
export default handler;