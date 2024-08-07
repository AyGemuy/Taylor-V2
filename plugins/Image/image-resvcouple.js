import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  m.react(wait);
  try {
    const imgx = await Couple();
    if (imgx) {
      const {
        male,
        female
      } = imgx;
      await conn.sendButtonCta(m.chat, [
        ["*[ C E W E ]*", author, female, []],
        ["*[ C O W O ]*", author, male, []]
      ], m);
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["resvcouple"], handler.tags = ["tools"], handler.command = /^(resvcouple)$/i,
  handler.limit = !0;
export default handler;
async function Couple() {
  try {
    const response = await fetch("https://tools.revesery.com/couple/revesery.php");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw console.error(`An error occurred: ${error.message}`), error;
  }
}