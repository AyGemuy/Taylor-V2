import {
  getInfoFromName
} from "mal-scraper";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  if (!text) throw "Input text is required.";
  try {
    m.react(wait);
    const {
      premiered,
      broadcast,
      genres,
      englishTitle,
      japaneseTitle,
      type,
      episodes,
      rating,
      aired,
      score,
      favorites,
      ranked,
      duration,
      studios,
      popularity,
      members,
      scoreStats,
      source,
      synonyms,
      status,
      id,
      picture
    } = await getInfoFromName(text);
    const Desc = `
      *[📺 My Anime List]*\n
      🗓️ *Premiered:* ${premiered}\n
      📅 *Broadcast:* ${broadcast}\n
      🎭 *Genres:* ${genres}\n
      🇬🇧 *English Title:* ${englishTitle}\n
      🇯🇵 *Japanese Title:* ${japaneseTitle}\n
      📂 *Type:* ${type}\n
      #️⃣ *Episodes:* ${episodes}\n
      ⭐ *Rating:* ${rating}\n
      🗓️ *Aired:* ${aired}\n
      🌟 *Score:* ${score}\n
      ❤️ *Favorites:* ${favorites}\n
      🥇 *Ranked:* ${ranked}\n
      ⏳ *Duration:* ${duration}\n
      🏢 *Studios:* ${studios}\n
      🌍 *Popularity:* ${popularity}\n
      👥 *Members:* ${members}\n
      📊 *Score Stats:* ${scoreStats}\n
      📚 *Source:* ${source}\n
      🔄 *Synonyms:* ${synonyms}\n
      📡 *Status:* ${status}\n
      🆔 *ID:* ${id}\n
      🔗 *Link:* [MyAnimeList](https://myanimelist.net/anime/${id})
    `;
    await conn.sendFile(m.chat, picture, "", Desc.trim(), m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["malscraper query"];
handler.tags = ["internet"];
handler.command = /^(malscraper)$/i;
export default handler;