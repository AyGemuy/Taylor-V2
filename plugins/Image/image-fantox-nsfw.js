import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let arrlist = ["animal", "animalears", "anusview", "ass", "barefoot", "bed", "bell", "bikini", "blonde", "bondage", "bra", "breasthold", "breasts", "bunnyears", "bunnygirl", "chain", "closeview", "cloudsview", "cum", "dress", "drunk", "elbowgloves", "erectnipples", "fateseries", "fingering", "flatchest", "food", "foxgirl", "gamecg", "genshin", "glasses", "gloves", "greenhair", "hatsunemiku", "hcatgirl", "headband", "headdress", "headphones", "hentaimiku", "hentaivideo", "hloli", "hneko", "hololove", "horns", "inshorts", "japanesecloths", "necklace", "nipples", "nobra", "nsfwbeach", "nsfwbell", "nsfwdemon", "nsfwidol", "nsfwmaid", "nsfwmenu", "nsfwvampire", "nude", "openshirt", "pantyhose", "pantypull", "penis", "pinkhair", "ponytail", "pussy", "ribbons", "schoolswimsuit", "schooluniform", "seethrough", "sex", "sex2", "sex3", "shirt", "shirtlift", "skirt", "spreadlegs", "spreadpussy", "squirt", "stockings", "sunglasses", "swimsuit", "tail", "tattoo", "tears", "thighhighs", "thogirls", "topless", "torncloths", "touhou", "twintails", "uncensored", "underwear", "vocaloid", "weapon", "wet", "white", "whitehair", "wings", "withflowers", "withgun", "withpetals", "withtie", "withtree", "wolfgirl", "yuri"],
    listnya = arrlist.map((v, index) => `[ ${++index} ] ${usedPrefix + command} ${v}`).join("\n"),
    nah = `${htki} *L I S T* ${htka}\n_Example: ${usedPrefix + command} yuri_\n\n${listnya}`;
  if (!arrlist.includes(text)) return m.reply(nah);
  m.react(wait);
  try {
    let ani = await fetch("https://fantox-apis.vercel.app/" + text),
      mek = await ani.json();
    await conn.sendFile(m.chat, mek.url, "", `Nih kak ${m.name}`, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.command = handler.help = ["fantox"], handler.tags = ["anime"];
export default handler;