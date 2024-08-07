import cheerio from "cheerio";
import fetch from "node-fetch";
const getTikPornData = async () => {
  try {
    const response = await fetch("https://tikporntok.com/?random=1"),
      htmlText = await response.text(),
      $ = cheerio.load(htmlText),
      hasil = [];
    return $(".swiper-slide").each(function(index, element) {
      const title = $(element).attr("data-title"),
        video = $(element).find("source").attr("src") || $(element).find("video").attr("src"),
        thumb = $(element).find("img").attr("src"),
        desc = $(element).find(".shorts_events > p").text().trim(),
        views = $(element).find("#video-views-count-" + index).text();
      hasil.push({
        title: title,
        video: video,
        thumb: thumb,
        desc: desc,
        views: views
      });
    }), hasil;
  } catch (error) {
    throw new Error("Error fetching data from TikPornTok: " + error.message);
  }
}, getCaption = obj => `\n📝 *Title:* ${obj.title}\n🔗 *Link:* ${obj.video}\n📢 *Description:* ${obj.desc}\n👀 *Views Count:* ${obj.views}\n`, handler = async (m, {
  conn
}) => {
  conn.tikPorntok = conn.tikPorntok ? conn.tikPorntok : {};
  const list = await getTikPornData();
  if (!list) return m.react(eror);
  const teks = list.map((obj, index) => `*${index + 1}.* ${obj.title}`).join("\n"),
    {
      key
    } = await conn.reply(m.chat, `🔧 Daftar Video TikPorn:\n\n${teks}\n\nBalas pesan ini dengan nomor video yang ingin ditampilkan.`, m);
  conn.tikPorntok[m.chat] = {
    list: list,
    key: key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key
      }), delete conn.tikPorntok[m.chat];
    }, 6e4)
  };
};
handler.before = async (m, {
    conn
  }) => {
    if (conn.tikPorntok = conn.tikPorntok ? conn.tikPorntok : {}, m.isBaileys || !(m.chat in conn.tikPorntok)) return;
    const {
      list,
      key,
      timeout
    } = conn.tikPorntok[m.chat];
    if (!m.quoted || m.quoted?.id !== key.id || !m.text) return;
    const choice = m.text.trim(),
      numChoice = Number(choice);
    if (isNaN(numChoice) || numChoice < 1 || numChoice > list.length) await conn.reply(m.chat, "⚠️ Masukkan nomor video yang valid.", m);
    else {
      const position = list[numChoice - 1];
      await conn.sendFile(m.chat, position.video, "", getCaption(position), m), conn.sendMessage(m.chat, {
        delete: key
      }), clearTimeout(timeout), delete conn.tikPorntok[m.chat];
    }
  }, handler.help = ["tikporn", "tikporntok", "tiktokporn"], handler.tags = ["search"],
  handler.command = /^(tikporn|tikporntok|tiktokporn)$/i, handler.limit = !0;
export default handler;