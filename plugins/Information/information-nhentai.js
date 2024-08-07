import axios from "axios";
const handler = async (m, {
  usedPrefix,
  command,
  text,
  args
}) => {
  if ("nhentaihome" === command) {
    let res = await nhentaihome();
    await conn.sendFile(m.chat, logo, "result", "Result : *" + res, m);
  }
  if ("nhentaisearch" === command) {
    if (!text) return await conn.reply(m.chat, "Harap Masukan Text", m);
    let res = await nhentaisearch(text);
    await conn.sendFile(m.chat, logo, "result", "Result : *" + res, m);
  }
  if ("nhentaigetdoujin" === command) {
    if (!text) return await conn.reply(m.chat, "Harap Masukan ID", m);
    let res = await nhentaigetDoujin(text);
    await conn.sendFile(m.chat, logo, "result", "Result : *" + res, m);
  }
  if ("nhentaigetrelated" === command) {
    if (!text) return await conn.reply(m.chat, "Harap Masukan ID", m);
    let res = await nhentaigetRelated(text);
    await conn.sendFile(m.chat, logo, "result", "Result : *" + res, m);
  }
};
handler.help = ["nhentaihome", "nhentaisearch", "nhentaigetdoujin", "nhentaigetrelated"].map(v => v + " <id>"),
  handler.tags = ["internet"], handler.command = ["nhentaihome", "nhentaisearch", "nhentaigetdoujin", "nhentaigetrelated"];
export default handler;

function parseResult(data) {
  let arr = [];
  for (let x of data) arr.push({
    id: x.id,
    title: x.title,
    language: x.lang,
    pages: x.num_pages,
    cover: x.cover.t.replace(/a.kontol|b.kontol/, "c.kontol") || x.cover.replace(/a.kontol|b.kontol/, "c.kontol")
  });
  return arr;
}
async function nhentaihome(type = "latest") {
  type = {
    latest: "all",
    popular: "popular"
  } [type], await axios.get("https://same.yui.pw/api/v4/home").then(res => parseResult(res.data[type]));
}
async function nhentaisearch(query, sort, page) {
  await axios.get(`https://same.yui.pw/api/v4/search/${query}/${sort}/${page}/`).then(res => parseResult(res.data.result));
}
async function nhentaigetDoujin(id) {
  await axios.get("https://same.yui.pw/api/v4/book/" + +id).then(res => res.data);
}
async function nhentaigetRelated(id) {
  await axios.get(`https://same.yui.pw/api/v4/book/${+id}/related/`).then(res => parseResult(res.data.books));
}