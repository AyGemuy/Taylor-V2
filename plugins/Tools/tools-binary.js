import axios from "axios";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    if (!text) return await conn.reply(m.chat, "Masukkan Teksnya", m);
    const response = await axios.get(`https://some-random-api.com/binary?text=${text}`);
    const hasil = `Teks: ${text}\nBinary: ${response.data?.binary ?? "Tidak ada data binary"}`;
    await conn.reply(m.chat, hasil, m);
  } catch (error) {
    console.error("Error fetching binary data:", error);
    await conn.reply(m.chat, "Terjadi kesalahan saat mengambil data binary", m);
  }
};
handler.help = ["binary"].map(v => v + " <teks>");
handler.tags = ["tools"];
handler.command = /^(binary)$/i;
handler.owner = false;
handler.exp = 0;
handler.limit = false;
export default handler;