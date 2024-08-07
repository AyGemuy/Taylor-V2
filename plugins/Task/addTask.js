import fs from "fs";
import path from "path";
import {
  fileURLToPath
} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskFilePath = path.join(__dirname, "../../json/task/coding.json");
let taskData = JSON.parse(fs.readFileSync(taskFilePath));

function generateNewTaskId(tasks) {
  return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}
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
      text: `🚨 *Usage:* Send command *${usedPrefix + command} [task detail] | [due date]*\nExample: *${usedPrefix + command} Fix the bug in the login feature | 2024-06-30* 🚨`,
      quoted: m
    });
  }
  const [taskDetail, dueDate] = text.trim().split(/\s*\|\s*/);
  const newTaskId = generateNewTaskId(taskData.task);
  const newTask = {
    id: newTaskId,
    detail: taskDetail,
    due: dueDate || "No due date",
    staff: "No staff assigned",
    status: "Pending"
  };
  taskData.task.push(newTask);
  fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));
  const message = `🎉 *New Task Added!* 🎉\n\n` + `🆔 *ID:* ${newTask.id}\n` + `📝 *Detail:* ${newTask.detail}\n` + `📅 *Due Date:* ${newTask.due}\n\n` + `/claimtask to claim! 💪`;
  await conn.reply(m.chat, message, m);
};
handler.command = /^(addtask)$/i;
export default handler;