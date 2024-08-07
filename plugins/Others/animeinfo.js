import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Masukkan query!";
  let res = await fetch(API("https://api.jikan.moe", "/v4/anime", {
    q: text
  }));
  if (!res.ok) return await res.text();
  let json = await res.json(),
    {
      title,
      members,
      synopsis,
      episodes,
      url,
      rated,
      score,
      image_url,
      type,
      start_date,
      end_date
    } = json.data[0],
    animeingfo = `✨️ *Title:* ${title}\n🎆️ *Episodes:* ${episodes}\n➡️ *Start date:* ${start_date}\n🔚 *End date:* ${end_date}\n💬 *Show Type:* ${type}\n💌️ *Rating:* ${rated}\n❤️ *Score:* ${score}\n👥 *Members:* ${members}\n💚️ *Synopsis:* ${synopsis}\n🌐️ *URL*: ${url}`;
  await conn.sendFile(m.chat, image_url, "", animeingfo, m);
};
handler.help = ["anime"].map(v => v + " <judul>"), handler.tags = ["animsearch"],
  handler.command = /^(anime|animeinfo)$/i;
export default handler;