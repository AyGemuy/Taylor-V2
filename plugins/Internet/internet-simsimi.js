import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input Teks";
    text = m.quoted?.text;
  }
  try {
    m.react(wait);
    let res = await SimSimi(text);
    m.reply(res);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["simsimi"], handler.tags = ["internet"], handler.command = /^simsimi$/i;
export default handler;
async function SimSimi(input) {
  try {
    let res = await fetch("http://api.simsimi.com/request.p?key=ae752867-ab2f-4827-ab64-88aebed49a1c&lc=id&text=" + encodeURIComponent(input));
    return (await res.json()).response;
  } catch (e) {
    throw "Erorr";
  }
}