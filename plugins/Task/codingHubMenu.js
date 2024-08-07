let taskMenu = `
📋 *Task Management Commands* 📋

🆕 *Add Task*
Usage: */addtask [task detail] | [due date]*
Example: */addtask Fix the bug in the login feature | 06-03-2003*

🔄 *Update Task Status*
Usage: */updatetask [task ID] [new status]*
Example: */updatetask 1 Completed*

🔍 *Check Tasks*
Usage: */checktasks [status]*
Example: */checktasks pending*

❌ *Delete Task*
Usage: */deletetask [task ID]*
Example: */deletetask 1*

👤 *Claim Task*
Usage: */claimtask [task ID]*
Example: */claimtask 1*
`;
let handler = async (m, {
  conn
}) => {
  if (!m.chat.endsWith("@g.us")) {
    return;
  }
  await conn.sendMessage(m.chat, taskMenu, m);
};
handler.command = /^(taskmenu)$/i;
export default handler;