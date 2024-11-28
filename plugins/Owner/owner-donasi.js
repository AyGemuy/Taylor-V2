import fetch from "node-fetch";
const handler = async (m, { conn, command, usedPrefix }) => {
  let str = `${conn.getName(m.sender)}\nWant Support Bot?\n\n*[ PAYMENT METHOD ]*\n\n- Pulsa/pulse(Telkomsel): *${pulsa}*\n- Paypal: *${paypal}*\n- Saweria: *${saweria}*\n- Trakteer: *${trakteer}*\n\nSetelah melakukan donasi kirim bukti pembayaran ke owner\n`;
  await conn.relayMessage(
    m.chat,
    {
      requestPaymentMessage: {
        currencyCodeIso4217: "USD",
        amount1000: fsizedoc,
        requestFrom: "0@s.whatsapp.net",
        noteMessage: {
          extendedTextMessage: {
            text: str,
            contextInfo: {
              mentionedJid: [m.sender],
            },
          },
        },
      },
    },
    {},
  );
};
(handler.help = ["donasi"]),
  (handler.tags = ["info"]),
  (handler.command = /^dona(te|si)$/i);
export default handler;
