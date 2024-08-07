import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix,
  args
}) => {
  let urut = text.split("|"),
    one = urut[0],
    two = urut[1];
  if ("poetry" === command) {
    let url = await fetch("https://poetrydb.org/author"),
      res = (await url.json()).authors,
      row = Object.keys(res).map((v, index) => ({
        title: res[v],
        description: "",
        rowId: usedPrefix + "poetrygeta " + res[v]
      })),
      button = {
        buttonText: "☂️ Poetry Disini ☂️",
        description: `⚡ Silakan pilih poetry di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: author
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("poetrygeta" === command) {
    let url = await fetch("https://poetrydb.org/author/" + text),
      poetry = await url.json(),
      listSections = [];
    return Object.values(poetry).map((v, index) => {
      listSections.push([" [ " + ++index + " ] " + v.title, [
        [v.author, usedPrefix + "poetrygetb " + text + "|" + index, v.linecount + " baris"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Poetry 🔎 " + htka, "⚡ Berikut daftar List Poetry...\nAkses langsung dengan copy namanya", author, "☂️ Klik Disini ☂️", listSections, m);
  }
  if ("poetrygetb" === command) {
    let url = await fetch("https://poetrydb.org/author/" + one),
      poetry = await url.json(),
      str = poetry[two].lines.join("\r\n");
    throw "*" + poetry[two].title + "*\n\n" + str + "\n\n*-" + poetry[two].author + "*";
  }
};
handler.help = ["poetry"], handler.tags = ["internet"], handler.command = /^poetry(get[ab])?$/i,
  handler.limit = !0;
export default handler;