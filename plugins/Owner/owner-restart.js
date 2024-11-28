const handler = async (m, { conn, isROwner, text }) => {
  try {
    if (!process.send) {
      m.reply("Please run the script with `node index.js`, not `node main.js`");
      return;
    }
    m.reply("```R E S T A R T . . .```");
    await reloadHandler(true);
  } catch (err) {
    console.error(err);
  }
};
handler.help = ["restart"];
handler.tags = ["owner"];
handler.command = /^(res(tart)?)$/i;
handler.rowner = true;
export default handler;
