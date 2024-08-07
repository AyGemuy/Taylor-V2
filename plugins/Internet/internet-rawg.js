import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  conn.getName(m.sender);
  if ("rawggame" === command) {
    if (!text) throw "input id";
    return await fetchGame(text);
  }
  if ("rawgsearch" === command) {
    if (!text) throw "input search";
    return await fetchGamesBySearch(text);
  }
  if ("rawggenre" === command) {
    return await fetchGenres();
  }
};
handler.tags = ["search"], handler.command = handler.help = ["rawggame", "rawgsearch", "rawggenre"];
export default handler;
async function fetchGame(id) {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=df0a6dbf13504aefb411f7298892a149`);
  return await response.json();
}
async function fetchGamesBySearch(query) {
  const response = await fetch(`https://api.rawg.io/api/games?key=df0a6dbf13504aefb411f7298892a149&search=${query}`);
  return (await response.json()).results;
}
async function fetchGenres() {
  const response = await fetch("https://api.rawg.io/api/genres?key=df0a6dbf13504aefb411f7298892a149&ordering=-games_count&page_size=10");
  return (await response.json()).results;
}