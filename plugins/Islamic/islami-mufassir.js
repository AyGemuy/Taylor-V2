import fetch from "node-fetch";
const API_BASE_URL = "https://hadits.e-mufassir.com/api";
const getKitabList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hadits`);
    const data = await response.json();
    if (!data.data) throw new Error(data.message);
    return data.data;
  } catch (error) {
    throw new Error("Gagal mengambil daftar kitab.");
  }
};
const getHaditsByKitab = async (kitabId, page) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/hadits/by_id/${kitabId}?pagination=true&limit=5&page=${page}`,
    );
    const data = await response.json();
    if (!data.data.list_hadits) throw new Error(data.message);
    return data.data.list_hadits;
  } catch (error) {
    throw new Error("Gagal mengambil hadits.");
  }
};
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const [kitabIndex, page = 0, index] = text
      .split("|")
      .map((str) => str.trim());
    if (!kitabIndex) {
      const kitabList = await getKitabList();
      const buttons = conn.ctaButton
        .setBody("🌐 *Daftar Kitab:*")
        .setFooter("⚡ Pilih kitab berdasarkan nomor indeks:")
        .addSelection("Klik di sini")
        .makeSections("Pilih Kitab", "kitabList");
      kitabList.forEach((kitab, idx) => {
        buttons.makeRow(
          "",
          `📚 ${kitab.nama_kitab}`,
          `Pilih Kitab ${idx + 1}`,
          `${usedPrefix + command} ${idx + 1}`,
        );
      });
      return buttons.run(m.chat, conn, m);
    }
    const kitabList = await getKitabList();
    const kitabIndexInt = parseInt(kitabIndex);
    if (
      isNaN(kitabIndexInt) ||
      kitabIndexInt < 1 ||
      kitabIndexInt > kitabList.length
    ) {
      return m.reply("Indeks kitab tidak valid.");
    }
    const selectedKitab = kitabList[kitabIndexInt - 1];
    const result = await getHaditsByKitab(selectedKitab.id, page);
    if (result?.data.length === 0) return m.reply("Hadits tidak ditemukan.");
    const selectedIndex = parseInt(index);
    if (
      isNaN(selectedIndex) ||
      selectedIndex < 1 ||
      selectedIndex > result?.data.length
    ) {
      const buttons = conn.ctaButton
        .setBody("🌐 *Daftar Hadits:*")
        .setFooter("⚡ Pilih hadits berikut:")
        .addSelection("Klik di sini")
        .makeSections("Pilih Hadits", "haditsList");
      result?.data.forEach((h, idx) => {
        buttons.makeRow(
          "",
          `📜 ${h.kitab}`,
          `Lihat Hadits ${idx + 1}`,
          `${usedPrefix + command} ${kitabIndex}|${page}|${idx + 1}`,
        );
      });
      if (result.current_page < result.last_page) {
        buttons.makeRow(
          "",
          "➡️ Halaman Berikut",
          `Lihat Halaman ${result.current_page + 1}`,
          `${usedPrefix + command} ${kitabIndex}|${result.current_page + 1}`,
        );
      }
      return buttons.run(m.chat, conn, m);
    }
    const selectedHadith = result?.data[selectedIndex - 1];
    const message = `📜 *${selectedHadith.kitab}*\n\n📝 *Teks Arab:*\n${selectedHadith.arab}\n\n📖 *Terjemahan Indonesia:*\n${selectedHadith.terjemah}`;
    m.react(sukses);
    return m.reply(message);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["mufassir <nomor kitab>|<page>"];
handler.tags = ["islami"];
handler.command = /^(mufassir)$/i;
export default handler;
