const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  let urut = text.split("|"),
    one = urut[1],
    two = urut[2],
    three = urut[3];
  var kodeqr = "https://i.pinimg.com/originals/45/de/de/45dede3e8f0f941c16b4da190c66c033.jpg";
  let template = (args[0] || "").toLowerCase(),
    listSections = [],
    caption = `*Contoh Penggunaan*\n\n${usedPrefix + command} list\n\n*List Command*\n• panel\n• insta\n`;
  if (!args[0]) return m.reply(caption);
  if (command) switch (template) {
    case "panel":
      if (!one && !two) return Object.values([{
        name: "•RAM 2 GB • CPU 35%",
        note: "•Rp. 5.000 /Bulan📮",
        price: 5e3,
        status: "5 stok",
        type: "low"
      }, {
        name: "•RAM 3 GB • CPU 50%",
        note: "•Rp. 10.000 /Bulan📮",
        price: 1e4,
        status: "5 stok",
        type: "medium"
      }, {
        name: "•RAM 6 GB • CPU 80%",
        note: "•Rp. 15.000 /Bulan📮",
        price: 15e3,
        status: "5 stok",
        type: "high"
      }, {
        name: "•RAM Unlimited GB • CPU UNLIMITED",
        note: "•Rp. 20.000 /Bulan📮",
        price: 2e4,
        status: "5 stok",
        type: "unlimited"
      }]).map((v, index) => {
        listSections.push(["List. " + ++index, [
          [v.name, usedPrefix + command + " buypanel |" + v.price + "|" + v.status + "|" + v.type, v.note]
        ]]);
      }), conn.sendList(m.chat, "READY PANEL RUN BOT WHATSAPP \nBY MAXXY BOTZ", "📮TOTAL RAM 80GB CPU 88 CORE", author, "[ Choose ]", listSections, m);
      break;
    case "buypanel":
      var panelinfo = `*Harga:* ${Number(one).toLocaleString("id-ID", {
style: "currency",
currency: "IDR",
minimumFractionDigits: 2
})}\n*Status:* ${two}\n*Stok:* ${three}`;
      await conn.sendFile(m.chat, kodeqr, "qr.png", panelinfo, m);
      break;
    case "insta":
      if (!one && !two) return Object.values([{
        name: "250 FOLLOWERS",
        note: "Rp. 4.500",
        price: 4500,
        status: "5 stok",
        type: "low"
      }, {
        name: "500 FOLLOWERS",
        note: "Rp. 8.000",
        price: 8e3,
        status: "5 stok",
        type: "medium"
      }, {
        name: "1000 FOLLOWERS",
        note: "Rp. 15.000",
        price: 15e3,
        status: "5 stok",
        type: "hard"
      }, {
        name: "2000 FOLLOWERS",
        note: "Rp. 25.000",
        price: 25e3,
        status: "5 stok",
        type: "extreme"
      }, {
        name: "3000 FOLLOWERS",
        note: "Rp. 30.000",
        price: 3e4,
        status: "5 stok",
        type: "impossible"
      }]).map((v, index) => {
        listSections.push(["List. " + ++index, [
          [v.name, usedPrefix + command + " buyinsta |" + v.price + "|" + v.status + "|" + v.type, v.note]
        ]]);
      }), conn.sendList(m.chat, "\n", "•READY UP FOLLOWERS IG", author, "[ Choose ]", listSections, m);
      break;
    case "buyinsta":
      var instainfo = `*Harga:* ${Number(one).toLocaleString("id-ID", {
style: "currency",
currency: "IDR",
minimumFractionDigits: 2
})}\n*Status:* ${two}\n*Stok:* ${three}`;
      await conn.sendFile(m.chat, kodeqr, "qr.png", instainfo, m);
  }
};
handler.help = ["jualan <args>"], handler.tags = ["tools"], handler.command = /^(jualan)$/i;
export default handler;