import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  let apis = await (await fetch("https://open-apis-rest.up.railway.app/")).json(),
    listSections = [];
  return Object.values(apis.avaliable_rests).map((v, index) => {
    listSections.push(["Num. " + ++index, [
      [v.name, usedPrefix + "get " + v.example, v.desc]
    ]]);
  }), conn.sendList(m.chat, htki + " 🗒️ List Apis " + htka, "⚡ Silakan pilih Apis yang anda mau.", author, "[ Apis ]", listSections, m);
};
handler.command = /^(openapis)$/i;
export default handler;