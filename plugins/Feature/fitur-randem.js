const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply(`Example : ${usedPrefix + command} cuddle\n  *List Efek:*\n\n• bully\n• cuddle\n• cry\n• hug\n• awoo\n• kiss\n• lick\n• pat\n• smug\n• bonk\n• yeet\n• blush\n• smile\n• wave\n• smile\n• wave\n• highfive\n• handhold\n• nom\n• bite\n• glomp\n• kill\n• slap\n• happy\n• wink\n• poke\n• dance\n• cringe\n• blush`);
  let images = `https://api.lolhuman.xyz/api/random/${text}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`;
  await conn.sendFile(m.chat, images, "", `Nih kak ${m.name}`, m);
};
handler.help = ["randem"].map(v => v + " <efek>"), handler.tags = ["tools"],
  handler.command = /^(randem)$/i;
export default handler;