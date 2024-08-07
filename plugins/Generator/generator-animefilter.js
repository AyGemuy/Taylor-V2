import axios from "axios";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let q = m.quoted ? m.quoted : m;
  if (!((q.msg || q).mimetype || "")) throw "No media found";
  let media = await q?.download();
  m.react(wait);
  try {
    const Anim = await animeFilter(media);
    if (Anim) {
      const tag = `@${m.sender.split("@")[0]}`;
      const base64Image = Anim[0];
      const base64Data = base64Image?.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      await conn.sendMessage(m.chat, {
        image: buffer,
        caption: `Nih effect *anime-filter* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["animefilter"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(animefilter)$/i, handler.limit = !0;
export default handler;
async function animeFilter(image) {
  return new Promise(async (resolve, reject) => {
    axios("https://akhaliq-animeganv2.hf.space/api/queue/push/", {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      },
      data: {
        fn_index: 0,
        data: ["data:image/jpeg;base64," + image.toString("base64"), "version 2 (🔺 robustness,🔻 stylization)"],
        action: "predict",
        session_hash: "38qambhlxa8"
      },
      method: "POST"
    }).then(a => {
      let id = a.data.hash;
      axios("https://akhaliq-animeganv2.hf.space/api/queue/status/", {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        },
        data: {
          hash: id
        },
        method: "POST"
      }).then(tes => {
        resolve(tes.data.data.data);
      });
    });
  });
}