import {
  Sticker
} from "wa-sticker-formatter";
import {
  emojiGraph,
  searchEmoji,
  emojiPedia,
  NotoEmoji,
  EmojiGG,
  emojiAll
} from "../../lib/scraper/scraper-search.js";
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  try {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) {
      return m.reply(`*⛌ Masukkan emoji atau perintah yang benar*\n\n- *Contoh:*\n- ${usedPrefix + command} 🗿\n- ${usedPrefix + command} emoji_query`);
    }
    let sticker;
    switch (command) {
      case "emo":
      case "emoji":
      case "emojis":
        const emojiUrlList = await searchEmoji(text);
        const emojiResults = await emojiGraph(emojiUrlList[0]);
        const emojiVendors = emojiResults[0]?.vendors;
        if (!emojiVendors.length) {
          return m.reply("❌ Emoji tidak ditemukan atau input tidak valid. Silakan coba lagi.");
        }
        if (!args[1]) {
          const buttons = conn.ctaButton.setBody(`Daftar vendor untuk *${text}*:\n\n${emojiVendors.map((vendor, index) => `*${index + 1}.* ${vendor.name}`).join("\n")}\n\nContoh: *${usedPrefix + command}* [emoji] [vendor]`).setFooter("Klik tombol di bawah untuk memilih vendor.").addSelection("Pilih Vendor").makeSections("Daftar Vendor", "Pilih Vendor");
          emojiVendors.forEach((vendor, index) => buttons.makeRow("", vendor.name, `Pilih ${vendor.name}`, `${usedPrefix + command} ${text} ${index + 1}`));
          return buttons.run(m.chat, conn, m);
        }
        const vendorIndex = parseInt(args[1]) - 1;
        if (isNaN(vendorIndex) || vendorIndex < 0 || vendorIndex >= emojiVendors.length) {
          return m.reply(`Indeks vendor tidak valid. Harap berikan nomor yang valid dari angka 1 sampai ${emojiVendors.length}.`);
        }
        const selectedVendor = emojiVendors[vendorIndex];
        m.react(wait);
        await m.reply(`Informasi emoji untuk *${text}* (${selectedVendor.name}):\n\n*Url:* ${selectedVendor.link}\n*Gambar:* ${selectedVendor.image}`);
        sticker = await createSticker(null, selectedVendor.image, packname, m.name, 60);
        return m.reply(sticker);
      case "notoemoji":
        const notoEmojiUrl = await NotoEmoji(text);
        if (notoEmojiUrl) {
          m.react(wait);
          sticker = await createSticker(null, notoEmojiUrl, packname, m.name, 60);
          return m.reply(sticker);
        }
        return m.reply("❌ Gagal mendapatkan URL emoji.");
      case "emojigg":
        const emojiGgResults = await EmojiGG(text);
        if (!emojiGgResults.length) {
          return m.reply("❌ Emoji tidak ditemukan atau input tidak valid. Silakan coba lagi.");
        }
        if (!args[1]) {
          const buttons = conn.ctaButton.setBody(`Daftar vendor untuk *${text}*:\n\n${emojiGgResults.map((vendor, index) => `*${index + 1}.* ${vendor.title}`).join("\n")}\n\nContoh: *${usedPrefix + command}* [emoji] [vendor]`).setFooter("Klik tombol di bawah untuk memilih vendor.").addSelection("Pilih Vendor").makeSections("Daftar Vendor", "Pilih Vendor");
          emojiGgResults.forEach((vendor, index) => buttons.makeRow("", vendor.title, `Pilih ${vendor.title}`, `${usedPrefix + command} ${text} ${index + 1}`));
          return buttons.run(m.chat, conn, m);
        }
        const ggVendorIndex = parseInt(args[1]) - 1;
        if (isNaN(ggVendorIndex) || ggVendorIndex < 0 || ggVendorIndex >= emojiGgResults.length) {
          return m.reply(`Indeks vendor tidak valid. Harap berikan nomor yang valid dari angka 1 sampai ${emojiGgResults.length}.`);
        }
        const selectedGgVendor = emojiGgResults[ggVendorIndex];
        m.react(wait);
        await m.reply(`Informasi emoji untuk *${text}* (${selectedGgVendor.title}):\n\n*Description:* ${selectedGgVendor.description}\n*Gambar:* ${selectedGgVendor.image}`);
        sticker = await createSticker(null, selectedGgVendor.image, packname, m.name, 60);
        return m.reply(sticker);
      case "emojipedia":
        const emojiPediaResults = await emojiPedia(text);
        if (!emojiPediaResults.length) {
          return m.reply("❌ Emoji tidak ditemukan atau input tidak valid. Silakan coba lagi.");
        }
        if (!args[1]) {
          const buttons = conn.ctaButton.setBody(`Daftar vendor untuk *${text}*:\n\n${emojiPediaResults.map((vendor, index) => `*${index + 1}.* ${vendor.name}`).join("\n")}\n\nContoh: *${usedPrefix + command}* [emoji] [vendor]`).setFooter("Klik tombol di bawah untuk memilih vendor.").addSelection("Pilih Vendor").makeSections("Daftar Vendor", "Pilih Vendor");
          emojiPediaResults.forEach((vendor, index) => buttons.makeRow("", vendor.name, `Pilih ${vendor.name}`, `${usedPrefix + command} ${text} ${index + 1}`));
          return buttons.run(m.chat, conn, m);
        }
        const pediaVendorIndex = parseInt(args[1]) - 1;
        if (isNaN(pediaVendorIndex) || pediaVendorIndex < 0 || pediaVendorIndex >= emojiPediaResults.length) {
          return m.reply(`Indeks vendor tidak valid. Harap berikan nomor yang valid dari angka 1 sampai ${emojiPediaResults.length}.`);
        }
        const selectedPediaVendor = emojiPediaResults[pediaVendorIndex];
        m.react(wait);
        await m.reply(`Informasi emoji untuk *${text}* (${selectedPediaVendor.name}):\n\n*Description:* ${selectedPediaVendor.description}\n*Gambar:* ${selectedPediaVendor.image}`);
        sticker = await createSticker(null, selectedPediaVendor.image, packname, m.name, 60);
        return m.reply(sticker);
      case "emojiall":
        const emojiAllResults = await emojiAll(text);
        const allVendors = emojiAllResults.vendors;
        if (!allVendors?.length) {
          return m.reply("❌ Emoji tidak ditemukan atau input tidak valid. Silakan coba lagi.");
        }
        if (!args[1]) {
          const buttons = conn.ctaButton.setBody(`Daftar vendor untuk *${text}*:\n\n${allVendors.map((vendor, index) => `*${index + 1}.* ${vendor.name}`).join("\n")}\n${emojiAllResults.description}\n\nContoh: *${usedPrefix + command}* [emoji] [vendor]`).setFooter("Klik tombol di bawah untuk memilih vendor.").addSelection("Pilih Vendor").makeSections("Daftar Vendor", "Pilih Vendor");
          allVendors.forEach((vendor, index) => buttons.makeRow("", vendor.name, `Pilih ${vendor.name}`, `${usedPrefix + command} ${text} ${index + 1}`));
          return buttons.run(m.chat, conn, m);
        }
        const allVendorIndex = parseInt(args[1]) - 1;
        if (isNaN(allVendorIndex) || allVendorIndex < 0 || allVendorIndex >= allVendors.length) {
          return m.reply(`Indeks vendor tidak valid. Harap berikan nomor yang valid dari angka 1 sampai ${allVendors.length}.`);
        }
        const selectedAllVendor = allVendors[allVendorIndex];
        m.react(wait);
        await m.reply(`Informasi emoji untuk *${text}* (${selectedAllVendor.name}):\n\n*Description:* ${emojiAllResults.description}\n*Gambar:* ${selectedAllVendor.image}`);
        sticker = await createSticker(null, selectedAllVendor.image, packname, m.name, 60);
        return m.reply(sticker);
      default:
        return m.reply("Perintah tidak valid.");
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    m.react(eror);
  }
};
handler.help = ["emoji", "notoemoji", "emojigg", "emojipedia", "emojiall"];
handler.tags = ["sticker"];
handler.command = /^(emo(jis|ji)?|notoemoji|emojigg|emojipedia|emojiall)$/i;
export default handler;
async function createSticker(img, url, packName, authorName, quality) {
  try {
    return await new Sticker(img || url, {
      type: "full",
      pack: packName,
      author: authorName,
      quality: quality
    }).toBuffer();
  } catch (error) {
    console.error("Error creating sticker:", error);
  }
}