import fetch from "node-fetch";
import * as cheerio from "cheerio";
const AnimeSound = async (category, page) => {
  try {
    const url = page
      ? `https://audiojungle.net/search/${category}?page=${page}`
      : `https://audiojungle.net/search/${category}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return $("div.shared-item_cards-list-audio_card_component__root")
      .map((i, elem) => {
        const src = $(elem).find("source").attr("src");
        const id = $(elem).data("item-id");
        const name = $(elem).data("impression-name");
        const brand = $(elem).data("impression-brand");
        const price = $(elem).data("price");
        const link = $(elem)
          .find(
            "a.shared-item_cards-list-audio_card_component__itemLinkOverlay",
          )
          .attr("href");
        return {
          src: src,
          id: id,
          name: name,
          brand: brand,
          price: price,
          link: link,
        };
      })
      .get()
      .filter((item) => item.src);
  } catch (error) {
    console.error("Error fetching sounds:", error);
    return [];
  }
};
const handler = async (m, { conn, text }) => {
  if (!text) throw "Input text\ncth: .audiojungle anime 2";
  try {
    m.react(wait);
    let [category, page] = text.split(/\s+/);
    page = page ? parseInt(page, 10) : undefined;
    let res = await AnimeSound(category, page);
    if (res.length === 0) throw "No audio found";
    const audio = res[Math.floor(Math.random() * res.length)];
    const caption = `🎵 *Title:* ${audio.name}\n🎹 *Brand:* ${audio.brand}\n💵 *Price:* $${audio.price}\n🔗 *Link:* ${audio.link}`;
    await conn.reply(m.chat, caption, m);
    await conn.sendMessage(
      m.chat,
      {
        audio: {
          url: audio.src,
        },
        seconds: 0,
        ptt: true,
        mimetype: "audio/mpeg",
        fileName: `${audio.name}.mp3`,
        waveform: [100, 0, 100, 0, 100, 0, 100],
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["audiojungle"];
handler.tags = ["internet"];
handler.command = /^audiojungle$/i;
export default handler;
