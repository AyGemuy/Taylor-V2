import {
  fetch
} from "undici";
import cheerio from "cheerio";
const shuuShuu = async () => {
  try {
    const response = await fetch("https://e-shuushuu.net/random.php");
    const html = await response.text();
    const $ = cheerio.load(html);
    const imageThreads = $("#content .image_thread").map((_, element) => ({
      title: $(element).find(".title a").text().trim(),
      imageLink: "https://e-shuushuu.net" + $(element).find(".thumb .thumb_image").attr("href"),
      submittedBy: $(element).find('.meta dl dt:contains("Submitted By:") + dd span.reg_user').text().trim(),
      submittedOn: $(element).find('.meta dl dt:contains("Submitted On:") + dd').text().trim(),
      fileSize: $(element).find('.meta dl dt:contains("File size:") + dd').text().trim(),
      dimensions: $(element).find('.meta dl dt:contains("Dimensions:") + dd').text().trim(),
      tags: $(element).find('.meta dl dt:contains("Tags:") + dd span.tag').map((_, tag) => $(tag).text().trim()).get(),
      source: $(element).find('.meta dl dt:contains("Source:") + dd span.tag').text().trim(),
      characters: $(element).find('.meta dl dt:contains("Characters:") + dd span.tag').map((_, character) => $(character).text().trim()).get(),
      oldCharacters: $(element).find('.meta dl dt:contains("Old Characters:") + dd').text().trim().split(",").map(item => item.trim()),
      artist: $(element).find('.meta dl dt:contains("Artist:") + dd span.tag').text().trim()
    })).get();
    if (imageThreads.length === 0) {
      console.log("No image threads found.");
      return null;
    }
    return imageThreads[Math.floor(Math.random() * imageThreads.length)];
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  m.react(wait);
  try {
    const randomImageData = await shuuShuu();
    if (randomImageData) {
      const formattedOutput = `✨ *Title:* ${randomImageData.title}\n🖼️ *Image Link:* ${randomImageData.imageLink}\n👤 *Submitted By:* ${randomImageData.submittedBy}\n📅 *Submitted On:* ${randomImageData.submittedOn}\n📁 *File Size:* ${randomImageData.fileSize}\n📐 *Dimensions:* ${randomImageData.dimensions}\n🏷️ *Tags:* ${randomImageData.tags.map(tag => `*"${tag}"*`).join(", ")}\n🔗 *Source:* ${randomImageData.source}\n👥 *Characters:* ${randomImageData.characters.map(character => `*"${character}"*`).join(", ")}\n👴 *Old Characters:* ${randomImageData.oldCharacters.join(", ")}\n🎨 *Artist:* ${randomImageData.artist}`;
      await conn.ctaButton.setBody(formattedOutput).setFooter('Klik "Next" untuk mendapatkan gambar lainnya').setImage(randomImageData.imageLink).addReply("Next", usedPrefix + command).run(m.chat, conn, m);
      m.react(sukses);
    } else {
      console.log("No data available.");
      await conn.reply(m.chat, "Tidak ada data yang tersedia.", m);
    }
  } catch (error) {
    console.error("Error in example usage:", error);
    m.react(eror);
  }
};
handler.help = ["shuushuu"];
handler.tags = ["ai"];
handler.command = /^(shuushuu)$/i;
export default handler;