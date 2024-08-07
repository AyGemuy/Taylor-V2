import fetch from "node-fetch";
import moment from "moment-timezone";
const fetchDoodles = async (month, year) => (await fetch(`https://www.google.com/doodles/json/${year}/${month}`)).json(), handler = async (m, {
  conn,
  usedPrefix,
  args
}) => {
  const [month, year] = args;
  if (!month || !year) return m.reply("Usage: 4 2020");
  try {
    const data = await fetchDoodles(month, year);
    if (!data.length) return m.reply("Could not find any results.");
    const listSections = data.map((v, index) => [`Num. ${index + 1}`, [
      [moment.utc(v.run_date_array.join("-")).format("Do MMMM, YYYY"), `${usedPrefix}fetchsticker https:${v.url} wsf`, v.share_text]
    ]]);
    return conn.sendList(m.chat, `${htki} Google Doodle ${htka}`, "⚡ Silakan pilih rilis yang anda mau.", author, "[ Doodle ]", listSections, m);
  } catch (e) {
    return m.reply("Error: Could not retrieve data.");
  }
};
handler.command = ["gd", "doodle"], handler.tags = ["internet"];
export default handler;