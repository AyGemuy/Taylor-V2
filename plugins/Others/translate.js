import fetch from "node-fetch";
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  let lang, text;
  if (args.length >= 2) lang = args[0] ? args[0] : "id", text = args.slice(1).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw `Ex: ${usedPrefix + command} id hello i am robot`;
    lang = args[0] ? args[0] : "id", text = m.quoted?.text;
  }
  try {
    const prompt = text.trim();
    let res = await translate(prompt, lang),
      lister = Object.keys(await langList()),
      supp = `Error : Bahasa "${lang}" Tidak Support`;
    if (!lister.includes(lang)) return m.reply(supp + "\n\n*Example:*\n." + command + " id hello\n\n*Pilih kode yg ada*\n" + lister.map(v => v).join(", "));
    let caption = `*[ Terdeteksi ]*\n- ${res[1].toUpperCase() ? res[1].toUpperCase() : "US"}\n\n*[ Ke Bahasa ]*\n- ${lang.toUpperCase()}\n\n*[ Terjemahan ]*\n- ${res[0]?.trim()}\n`;
    m.reply(caption, null, m.mentionedJid ? {
      mentions: conn.parseMention(caption)
    } : {});
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["translate"].map(v => v + " <lang> <teks>"), handler.tags = ["tools"],
  handler.command = /^(t(erjemahkan|ransl(ate|et))|t(erjemah|r)|apanih)$/i;
export default handler;
async function langList() {
  return (await fetch("https://translate.google.com/translate_a/l?client=webapp&sl=auto&tl=en&v=1.0&hl=en&pv=1&tk=&source=bh&ssel=0&tsel=0&kc=1&tk=626515.626515&q=").then(response => response.json())).tl;
}
async function translate(query = "", lang) {
  if (!query.trim()) return "";
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.append("client", "gtx"), url.searchParams.append("sl", "auto"),
    url.searchParams.append("dt", "t"), url.searchParams.append("tl", lang), url.searchParams.append("q", query);
  try {
    const response = await fetch(url.href),
      data = await response.json();
    return data ? [data[0].map(item => item[0]?.trim()).join("\n"), data[2]] : "";
  } catch (err) {
    throw err;
  }
}