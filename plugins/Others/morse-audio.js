import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "input text\nEx. .vnmorse hello world\n<command> <tex>";
    text = m.quoted?.text;
  }
  try {
    let res = await Morse(text);
    await conn.sendMessage(m.chat, {
      audio: res,
      seconds: fsizedoc,
      ptt: !0,
      mimetype: "audio/mpeg",
      fileName: "vn.mp3",
      waveform: [100, 0, 100, 0, 100, 0, 100]
    }, {
      quoted: m
    });
  } catch (e) {
    m.react(wait);
  }
};
handler.help = ["vnmorse"], handler.tags = ["misc"], handler.command = /^(vnmorse)$/i;
export default handler;
async function Morse(input) {
  let res = await fetch("http://api.funtranslations.com/translate/morse/audio?text=" + input + "&speed=0&tone=0", {
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      }
    }),
    wavUrl = (await res.json()).contents.translated.audio;
  return Buffer.from(wavUrl.split("base64,")[1], "base64");
}