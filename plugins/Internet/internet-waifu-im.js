import fetch from "node-fetch";
const handler = async (m, {
  args,
  conn,
  usedPrefix,
  command
}) => {
  let waifu, rgex = /(maid|waifu|marin-kitagawa|mori-calliope|raiden-shogun|oppai|selfies|uniform|ass|hentai|milf|oral|paizuri|ecchi|ero)/i;
  waifu = rgex.test(args[0]) ? args[0]?.match(rgex)[0] : "waifu";
  const response = await fetch(API("https://api.waifu.im", "/search", {
      included_tags: waifu
    })),
    data = await response.json();
  if (!data.images[0]?.url) throw data;
  await conn.sendFile(m.chat, data.images[0]?.url, data.images[0]?.signature + data.images[0]?.extension, data.images[0]?.source, m);
};
handler.help = ["waifuim"], handler.tags = ["internet"], handler.command = ["waifuim"];
export default handler;