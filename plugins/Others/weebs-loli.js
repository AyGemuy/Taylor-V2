import Booru from "booru";
import fetch from "node-fetch";
let sites = ["sb", "kn", "kc"];
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  let res = await Booru.search(sites.getRandom(), ["loli"], {
      random: !0
    }),
    url = res[0]?.fileUrl;
  await conn.sendFile(m.chat, url, "", "Random Image Loli\n" + await shortUrl(url), m);
};
handler.help = ["fotololi"], handler.tags = ["random"], handler.command = /^(fotololi)$/i;
export default handler;
async function shortUrl(url) {
  return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text();
}