function generateInvoiceMessage(details) {
  const items = details.map(item => {
    const [detail, price] = item.split("=");
    return {
      detail: detail.trim(),
      price: parseFloat(price.trim())
    };
  });
  const totalAmount = items.reduce((total, item) => total + item.price, 0);
  let message = "📋 *Invoice* 📋\n\n";
  items.forEach((item, index) => {
    message += `*${index + 1}.* ${item.detail}: $${item.price}\n`;
  });
  message += "\n";
  message += `💰 *Total Amount:* $${totalAmount.toFixed(2)}`;
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
      text: `🚨 *Usage:* Send command *${usedPrefix + command} [detail1 = price1] [detail2 = price2] ...*`,
      quoted: m
    });
  }
  const details = text.trim().split(/\s+/);
  const message = generateInvoiceMessage(details);
  await conn.reply(m.chat, message, m);
};
handler.command = /^(calculatep)$/i;
export default handler;