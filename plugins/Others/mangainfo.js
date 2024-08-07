import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Masukkan query!";
  let res = await fetch(API("https://api.jikan.moe", "/v4/manga", {
    q: text
  }));
  if (!res.ok) return await res.text();
  let json = await res.json(),
    {
      title,
      synopsis,
      chapters,
      url,
      volumes,
      score,
      image_url
    } = json.data[0],
    mangaingfo = `*Title:* ${title}\n*Chapters:* ${chapters}\n*Volumes:* ${volumes}\n*Score:* ${score}\n*Synopsis:* ${synopsis}\n*Link*: ${url}`;
  await conn.sendFile(m.chat, image_url, "", mangaingfo, m);
};
handler.help = ["manga <judul>"], handler.tags = ["animsearch"], handler.command = /^(manga)$/i;
export default handler;