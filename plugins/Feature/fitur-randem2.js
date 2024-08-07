const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply(`Example : ${usedPrefix + command} bj\n  *List Efek:*\n\n• bj\n• ero\n• cum\n• les\n• neko\n• feet\n• yuri\n• trap\n• ngif\n• lewd\n• feed\n• eron\n• solo\n• gasm\n• poke\n• anal\n• holo\n• keta\n• tits\n• kuni\n• kiss\n• erok\n• smug\n• baka\n• solog\n• feetg\n• lewdk\n• waifu\n• pussy\n• tickle\n• femdom\n• cuddle\n• hentai\n• eroyuri\n• cum_jpg\n• blowjob\n• erofeet\n• holoero\n• classic\n• erokemo\n• fox_girl\n• futanari\n• hololewd\n• lewdkemo\n• wallpaper\n• pussy_jpg\n• kemonomimi\n• nsfw_avatar\n• nsfw_neko_gif\n• random_hentai_gif`);
  let images = `https://api.lolhuman.xyz/api/random/nsfw/${text}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`;
  await conn.sendFile(m.chat, images, "", `Nih kak ${m.name}`, m);
};
handler.help = ["randem2"].map(v => v + " <efek>"), handler.tags = ["tools"],
  handler.command = /^(randem2)$/i;
export default handler;