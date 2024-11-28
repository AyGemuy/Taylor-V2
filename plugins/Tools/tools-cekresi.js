import fetch from "node-fetch";
const handler = async (m, { conn, usedPrefix, args }) => {
  try {
    if (args.length < 1) {
      return m.reply(
        `❗ Format perintah salah.\nGunakan "${usedPrefix}cekresi [resi] [kurir]" untuk cek status resi.`,
      );
    }
    const [resi, kurir] = args;
    if (!kurir) {
      const result = await fetchKurir();
      if (result.status === "false") {
        const courierButtons = conn.ctaButton
          .setBody(
            `🚚 *Kurir tidak ditemukan atau status tidak valid! Pilih salah satu kurir dari daftar berikut:*`,
          )
          .setFooter("Klik tombol di bawah untuk memilih kurir.")
          .addSelection("Pilih Kurir")
          .makeSections("Daftar Kurir", "Pilih Kurir");
        result.available_couriers.forEach((courier) => {
          courierButtons.makeRow(
            "",
            courier.description,
            `Pilih ${courier.description}`,
            `${usedPrefix}cekresi ${resi} ${courier.kurir}`,
          );
        });
        return courierButtons.run(m.chat, conn, m);
      }
    }
    const result = await fetchCekResi(resi, kurir);
    if (result.status === "false") {
      const courierButtons = conn.ctaButton
        .setBody(
          `🚚 *Kurir tidak ditemukan atau status tidak valid! Pilih salah satu kurir dari daftar berikut:*`,
        )
        .setFooter("Klik tombol di bawah untuk memilih kurir.")
        .addSelection("Pilih Kurir")
        .makeSections("Daftar Kurir", "Pilih Kurir");
      result.available_couriers.forEach((courier) => {
        courierButtons.makeRow(
          "",
          courier.description,
          `Pilih ${courier.description}`,
          `${usedPrefix}cekresi ${resi} ${courier.kurir}`,
        );
      });
      return courierButtons.run(m.chat, conn, m);
    }
    const { summary, detail, history } = result.result;
    const info =
      `📦 *\`Status Pengiriman\`*\n\n` +
      `🚚 *Kurir:* ${summary.courier}\n` +
      `📋 *Nomor Resi:* ${summary.awb}\n` +
      `📅 *Tanggal:* ${summary.date}\n` +
      `📦 *Deskripsi:* ${summary.desc}\n` +
      `⚖️ *Berat:* ${summary.weight}\n` +
      `🗺️ *Dari:* ${detail.origin}\n` +
      `🗺️ *Tujuan:* ${detail.destination}\n` +
      `📦 *Pengirim:* ${detail.shipper}\n` +
      `📥 *Penerima:* ${detail.receiver}\n\n` +
      `📝 *\`Riwayat Pengiriman:\`*\n${history.map((h) => `- 📅 ${h.date} - ${h.desc}`).join("\n")}`;
    return conn.sendMessage(
      m.chat,
      {
        text: info,
      },
      {
        quoted: m,
      },
    );
  } catch (error) {
    console.error("Error in cekresi handler:", error);
    return m.reply(
      "❌ Terjadi kesalahan saat memproses permintaan. Silakan coba lagi nanti.",
    );
  }
};
handler.menu = ["cekresi"];
handler.tags = ["info"];
handler.command = /^cekresi$/i;
export default handler;
const fetchCekResi = async (resi, kurir) => {
  try {
    const response = await fetch(
      `https://api.nyxs.pw/tools/cekresi?resi=${resi}&kurir=${kurir}`,
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching resi data:", error);
    return {
      status: "false",
      message: "Error fetching data.",
    };
  }
};
const fetchKurir = async () => {
  try {
    const response = await fetch(
      `https://api.nyxs.pw/tools/cekresi?resi=resinya?&kurir=kurirnya?`,
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching resi data:", error);
    return {
      status: "false",
      message: "Error fetching data.",
    };
  }
};
