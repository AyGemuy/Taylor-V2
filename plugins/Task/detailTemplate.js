function generateMessageTemplate(userPhone, projectDetail, dueDate, totalPayment) {
  const depositAmount = (totalPayment * .35).toFixed(2);
  const message = `📞 *User Phone Number:* ${userPhone}\n\n` + `📋 *Project Detail:* ${projectDetail}\n\n` + `📅 *Due Date:* ${dueDate}\n\n` + `💰 *Total Payment:* $${totalPayment}\n` + `💵 *Deposit Required (35%):* $${depositAmount}\n\n` + `🔧 *Service Details:*\n` + `- Client needs to pay 35% of the total payment as a deposit.\n` + `- Pay the balance after the project is done.\n` + `- Any additional services can be charged.\n` + `- Client has 3 days of support after the project is handed over.`;
  return message;
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
      text: `🚨 *Usage:* Send command *${usedPrefix + command} [phone number] | [project detail] | [due date] | [total payment]*\nExample: *${usedPrefix + command} +123456789 | Develop a new e-commerce website | 2024-06-30 | 1500* 🚨`,
      quoted: m
    });
  }
  const [userPhone, projectDetail, dueDate, totalPayment] = text.trim().split(/\s*\|\s*/);
  if (!userPhone || !projectDetail || !dueDate || !totalPayment) {
    return conn.sendMessage(m.chat, {
      text: `🚨 *Usage:* Send command *${usedPrefix + command} [phone number] | [project detail] | [due date] | [total payment]*\nExample: *${usedPrefix + command} +123456789 | Develop a new e-commerce website | 2024-06-30 | 1500* 🚨`,
      quoted: m
    });
  }
  const message = generateMessageTemplate(userPhone, projectDetail, dueDate, totalPayment);
  await conn.reply(m.chat, message, m);
};
handler.command = /^(codingtemplate)$/i;
export default handler;