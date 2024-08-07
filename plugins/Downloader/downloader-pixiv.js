import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "detail", "r18", "vilipix"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n" + usedPrefix + command + " search|manhwa\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: " + usedPrefix + command + " search|manhwa");
      try {
        m.react(wait);
        let teks = (await fetchPixivSearchResults(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🆔 *ID:* ${item.id || "Tidak diketahui"}\n📚 *Title:* ${item.title || "Tidak diketahui"}\n📝 *Type:* ${item.type || "Tidak diketahui"}\n📝 *Caption:* ${item.caption || "Tidak diketahui"}\n📅 *Create Date:* ${formatTanggal(item.create_date) || "Tidak diketahui"}\n👁️ *Total View:* ${item.total_view || "Tidak diketahui"}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: " + usedPrefix + command + " detail|angka");
      m.react(wait);
      let IDpixiv = await detectArtworkNumber(Number(inputs));
      try {
        let item = await fetchPixivIllust(IDpixiv),
          cap = `🔍 *[ RESULT ]*\n\n🆔 *ID:* ${item.id || "Tidak diketahui"}\n📚 *Title:* ${item.title || "Tidak diketahui"}\n🔖 *Type:* ${item.type || "Tidak diketahui"}\n📝 *Caption:* ${item.caption || "Tidak diketahui"}\n🔒 *Restrict:* ${item.restrict || "Tidak diketahui"}\n📅 *Create Date:* ${formatTanggal(item.create_date) || "Tidak diketahui"}\n📄 *Page Count:* ${item.page_count || "Tidak diketahui"}\n🔍 *Width:* ${item.width || "Tidak diketahui"}\n🔍 *Height:* ${item.height || "Tidak diketahui"}\n🧠 *Sanity Level:* ${item.sanity_level || "Tidak diketahui"}\n🔒 *X Restrict:* ${item.x_restrict || "Tidak diketahui"}\n👁️ *Total View:* ${item.total_view || "Tidak diketahui"}\n🔖 *Total Bookmarks:* ${item.total_bookmarks || "Tidak diketahui"}\n📌 *Is Bookmarked:* ${item.is_bookmarked || "Tidak diketahui"}\n👀 *Visible:* ${item.visible || "Tidak diketahui"}\n🔇 *Is Muted:* ${item.is_muted || "Tidak diketahui"}\n💬 *Total Comments:* ${item.total_comments || "Tidak diketahui"}\n🧠 *Illust AI Type:* ${item.illust_ai_type || "Tidak diketahui"}\n📚 *Illust Book Style:* ${item.illust_book_style || "Tidak diketahui"}\n🔒 *Comment Access Control:* ${item.comment_access_control || "Tidak diketahui"}\n`;
        await conn.sendFile(m.chat, "https://pixiv.re/" + item.id + ".png" || item.meta_single_page.original_image_url || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("r18" === feature) try {
      m.react(wait);
      let item = await R18(),
        result = Object.entries(item).map(([key, value]) => `\t◦  *${key.charAt(0).toUpperCase() + key.slice(1).split(".").join(" ")}* : ${value}`).join("\n");
      await conn.sendFile(m.chat, item.url || logo, "", result, m);
    } catch (e) {
      m.react(eror);
    }
    if ("vilipix" === feature) {
      if (isNaN(inputs)) return m.reply("Input query link\nExample: " + usedPrefix + command + " vilipix|angka");
      try {
        m.react(wait);
        let item = await vilipixRandomImg(inputs);
        if (inputs >= item.data.count) return m.reply("Input query link\nExample: " + usedPrefix + command + " vilipix|angka\n\nTersedia: " + item.data.count);
        let result = Object.entries(item.data.rows[0]).map(([key, value]) => `\t◦  *${key.charAt(0).toUpperCase() + key.slice(1).split(".").join(" ")}* : ${value}`).join("\n");
        await conn.sendFile(m.chat, item.data.rows[0]?.original_url || item.data.rows[0]?.regular_url || logo, "", result, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["pixiv"], handler.tags = ["internet"], handler.command = /^(pixiv)$/i;
export default handler;

function formatTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function detectArtworkNumber(input) {
  const regex = /(\d+)/;
  if ("string" == typeof input && input.startsWith("https://www.pixiv.net/en/artworks/")) {
    const match = input.match(regex);
    if (match) return match[0];
  }
  if ("number" == typeof input) {
    const match = String(input).match(regex);
    if (match) return match[0];
  }
  return null;
}
async function fetchPixivSearchResults(word) {
  try {
    const response = await fetch(`http://api.obfs.dev/api/pixiv/search?word=${encodeURIComponent(word)}`);
    return (await response.json()).illusts;
  } catch (error) {
    throw console.log("An error occurred while fetching Pixiv search results:", error),
      error;
  }
}
async function fetchPixivIllust(id) {
  try {
    const response = await fetch(`http://api.obfs.dev/api/pixiv/illust?id=${id}`);
    return (await response.json()).illust;
  } catch (error) {
    throw console.log("An error occurred while fetching Pixiv illust:", error), error;
  }
}
async function R18() {
  try {
    const response = await fetch("https://image.anosu.top/pixiv/json?r18=1");
    return (await response.json())[0];
  } catch (error) {
    throw console.log("An error occurred while fetching Pixiv illust:", error), error;
  }
}
async function vilipixRandomImg(offset) {
  try {
    const response = await fetch(`https://www.vilipix.com/api/v1/picture/recommand?limit=1&offset=${offset}`);
    return await response.json();
  } catch (error) {
    throw console.log("An error occurred while fetching Pixiv illust:", error), error;
  }
}