import moment from "moment";
const defaultHargaPremium = {
  money: Array.from(
    {
      length: 10,
    },
    (_, i) => ({
      harga: (i + 1) * 1e4,
      hari: (i + 1) * 10,
    }),
  ),
  diamond: Array.from(
    {
      length: 10,
    },
    (_, i) => ({
      harga: (i + 1) * 1e3,
      hari: (i + 1) * 10,
    }),
  ),
};
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    db.data.dbbot.buyprem = db.data.dbbot.buyprem || {};
    const hargaPremium = defaultHargaPremium;
    const rows = ["money", "diamond"].flatMap((currency) =>
      hargaPremium[currency].map(({ harga, hari }, idx) => ({
        header: `Paket ${idx + 1} - Gunakan ${currency.charAt(0).toUpperCase() + currency.slice(1)}`,
        id: `${usedPrefix}${command} ${idx + 1} ${currency}`,
        title:
          currency === "money"
            ? `Rp${harga.toLocaleString()}`
            : `${harga} Diamond`,
        description: `Harga: ${currency === "money" ? `Rp${harga.toLocaleString()}` : `${harga} Diamond`}, Durasi: ${hari} hari`,
      })),
    );
    const formattedData = {
      title: "*Daftar Harga Premium*\nPilih paket premium di bawah ini:",
      rows: [
        {
          title: "Bayar Pakai Money",
          highlight_label: "Beli Paket",
          rows: rows.filter((row) => row.id.includes("money")),
        },
        {
          title: "Bayar Pakai Diamond",
          highlight_label: "Beli Paket",
          rows: rows.filter((row) => row.id.includes("diamond")),
        },
      ],
    };
    const [list, currency] = text.trim().split(/\s+/);
    const listNum = parseInt(list, 10);
    const validCurrency = ["money", "diamond"];
    m.react(wait);
    if (
      !/^[1-9]\d*$/.test(list) ||
      !validCurrency.includes(currency.toLowerCase()) ||
      !hargaPremium[currency.toLowerCase()]?.[listNum - 1]
    ) {
      return await conn.sendButtonCta(
        m.chat,
        [
          [
            formattedData.title,
            wm,
            null,
            [],
            null,
            [],
            [["💰 Pilih Paket", formattedData.rows]],
          ],
        ],
        m,
      );
    }
    const { harga, hari } = hargaPremium[currency.toLowerCase()][listNum - 1];
    let user = db.data.users[m.sender];
    const hasEnough =
      currency === "money" ? user.money >= harga : user.diamond >= harga;
    if (!hasEnough) {
      return await conn.reply(
        m.chat,
        `🚫 *Anda membutuhkan setidaknya ${currency === "money" ? `Rp${harga.toLocaleString()}` : `${harga} diamond`} untuk membeli paket ini.* 🚫`,
        m,
      );
    }
    const currentPremiumEnd = moment(user.premiumTime || undefined);
    const newPremiumEnd = currentPremiumEnd.clone().add(hari, "days");
    const message = `🌟 *Konfirmasi Pembelian Premium*\n\n*Paket:* ${listNum}\n*Harga:* ${currency === "money" ? `Rp${harga.toLocaleString()}` : `${harga} Diamond`}\n*Durasi:* ${hari} hari\n\nBalas dengan *Y/N* untuk konfirmasi.`;
    const { key } = await conn.reply(m.chat, message, m);
    m.react(sukses);
    db.data.dbbot.buyprem[m.chat] = {
      currency: currency.toLowerCase(),
      list: listNum,
      hargaPremium: hargaPremium,
      key: key,
      timeout: setTimeout(() => {
        conn.sendMessage(m.chat, {
          delete: key,
        });
        delete db.data.dbbot.buyprem[m.chat];
      }, 6e4),
    };
  } catch (error) {
    console.error("Error handling buyprem command:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  try {
    db.data.dbbot.buyprem = db.data.dbbot.buyprem || {};
    if (
      !db.data.dbbot.buyprem ||
      m.isBaileys ||
      !(m.chat in db.data.dbbot.buyprem)
    )
      return;
    const user = db.data.users[m.sender];
    const input = m.text.trim().toUpperCase();
    const yesRegex = /^(Y|YES)$/i;
    const noRegex = /^(N|NO)$/i;
    if (!yesRegex.test(input) && !noRegex.test(input)) return;
    const { currency, list, hargaPremium, key, timeout } =
      db.data.dbbot.buyprem[m.chat];
    const { harga, hari } = hargaPremium[currency][list - 1];
    if (m.quoted?.id === key.id && input) {
      m.react(wait);
      if (yesRegex.test(input)) {
        if (currency === "money") {
          if (user.money < harga)
            return await conn.reply(
              m.chat,
              `🚫 *Anda membutuhkan setidaknya Rp${harga.toLocaleString()} untuk membeli paket ini.* 🚫`,
              m,
            );
          user.money -= harga;
        } else {
          if (user.diamond < harga)
            return await conn.reply(
              m.chat,
              `🚫 *Anda membutuhkan setidaknya ${harga} diamond untuk membeli paket ini.* 🚫`,
              m,
            );
          user.diamond -= harga;
        }
        const currentPremiumEnd = moment(user.premiumTime || undefined);
        const newPremiumEnd = currentPremiumEnd.clone().add(hari, "days");
        user.premiumTime = newPremiumEnd.valueOf();
        user.premium = true;
        const message = `🌟 *Selamat! Anda sekarang pengguna premium.* 🎉\n⏳ *Countdown:* ${moment.duration(user.premiumTime - Date.now()).humanize()}\n📅 *Perubahan:* Dari ${currentPremiumEnd.format("DD MMM YYYY")} ke ${newPremiumEnd.format("DD MMM YYYY")}\n\n*Detail Paket:*\n*Harga:* ${currency === "money" ? `Rp${harga.toLocaleString()}` : `${harga} Diamond`}\n*Durasi Paket:* ${hari} hari`;
        await conn.reply(m.chat, message, m);
        conn.sendMessage(m.chat, {
          delete: key,
        });
        clearTimeout(timeout);
        delete db.data.dbbot.buyprem[m.chat];
        m.react(sukses);
      } else if (noRegex.test(input)) {
        await conn.reply(
          m.chat,
          "✅ *Anda telah membatalkan peningkatan premium.* ✅",
          m,
        );
        conn.sendMessage(m.chat, {
          delete: key,
        });
        clearTimeout(timeout);
        delete db.data.dbbot.buyprem[m.chat];
        m.react(sukses);
      }
    }
  } catch (error) {
    console.error("Error handling buyprem response:", error);
    m.react(eror);
  }
};
handler.help = ["buyprem"];
handler.tags = ["owner"];
handler.command = /^buyprem$/i;
export default handler;
