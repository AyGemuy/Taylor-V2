const {
  generateSerpApiUrl
} = await import("../../lib/serpapi.js");
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let [tema, urutan] = text.split(/[^\w\s]/g);
  if (!tema) return m.reply("Input query!\n*Example:*\n.viewmap [area]|[nomor]");
  m.react(wait);
  try {
    const param = {
      api_key: "f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c",
      engine: "google_maps",
      q: tema
    };
    let all = await generateSerpApiUrl(param);
    let data = all.local_results;
    if (!urutan) return m.reply("Input query!\n*Example:*\n.viewmap [area]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.viewmap [area]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.viewmap [area]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1];
    let caption = `🔍 *[ HASIL ]*

🆔 *ID:* ${out.place_id || "Tidak ada"}
📋 *Deskripsi:* ${out.title || "Tidak ada"}
📍 *Alamat:* ${out.address || "Tidak ada"}
⭐ *Rating:* ${out.rating || "Tidak ada"}
📝 *Ulasan:* ${out.reviews || "Tidak ada"}
📞 *Nomor Telepon:* ${out.phone || "Tidak ada"}`;
    const data2 = {
      api_key: "f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c",
      engine: "google_maps_photos",
      data_id: out.data_id
    };
    const result2 = await generateSerpApiUrl(data2);
    await conn.sendMessage(m.chat, {
      image: {
        url: result2.photos[0]?.image || out.thumbnail
      },
      caption: caption
    }, {
      quoted: m
    });
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["viewmap *[area]|[nomor]*"];
handler.tags = ["search"];
handler.command = /^(viewmap)$/i;
export default handler;