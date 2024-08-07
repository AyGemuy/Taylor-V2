import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let ends = ["trivia", "math", "date", "year"],
    [modes, kodes] = text.split(/[^\w\s]/g);
  if (!ends.includes(modes)) return m.reply("*Example:*\n.factnum trivia|50\n\n*Pilih type yg ada*\n" + ends.map((v, index) => "  ○ " + v).join("\n"));
  if (ends.includes(modes)) {
    if (!Number(kodes)) return m.reply("Number only!");
    let res = await NumberFact(modes, kodes),
      output = Object.entries(res).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join("\n");
    m.reply(output);
  }
};
handler.help = ["factnum type query"], handler.tags = ["internet"], handler.command = /^(factnum)$/i;
export default handler;
async function NumberFact(mode, input) {
  let res = await fetch(`http://numbersapi.com/${input}/${mode}?json`);
  return await res.json();
}