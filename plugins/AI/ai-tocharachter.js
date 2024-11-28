import fetch from "node-fetch";
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Tidak ada media yang ditemukan");
  const link = await q?.upload();
  m.react(wait);
  const [prompt, style, model] = text
    .split("|")
    .filter(Boolean)
    .map((s) => s.trim());
  const endpoint = (() => {
    switch (command) {
      case "jadighibli":
        return "https://api.nyxs.pw/ai-image/jadighibli?url=";
      case "jadivaporwave":
        return "https://api.nyxs.pw/ai-image/jadivaporwave?url=";
      case "jadidreamscape":
        return "https://api.nyxs.pw/ai-image/jadidreamscape?url=";
      case "jadivintagecomic":
        return "https://api.nyxs.pw/ai-image/jadicomic?url=";
      case "jadicyberpunk":
        return "https://api.nyxs.pw/ai-image/jadicyberpunk?url=";
      case "aitransform":
        return "https://api.nyxs.pw/ai-image/ai-transform?url=";
      default:
        return "https://widipe.com/jadigta?url=";
    }
  })();
  let url = `${endpoint}${encodeURIComponent(link)}`;
  if (command === "aitransform") {
    url += `${prompt ? `&prompt=${encodeURIComponent(prompt)}` : ""}${style ? `&style=${encodeURIComponent(style)}` : ""}${model ? `&model=${encodeURIComponent(model)}` : ""}`;
  }
  try {
    const openAIResponse = await fetchEndpoint(url);
    if (openAIResponse) {
      const result = openAIResponse,
        tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: result || logo,
          },
          caption: `Nih effect *photo-to-${command}* nya\nRequest by: ${tag}`,
          mentions: [m.sender],
        },
        {
          quoted: m,
        },
      );
      m.react(sukses);
    } else {
      m.react(eror);
      console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
    }
  } catch (e) {
    m.react(eror);
    console.error("Handler error:", e);
  }
};
async function fetchEndpoint(url) {
  try {
    const response = await fetch(url);
    return (await response.json())?.result;
  } catch (e) {
    console.log(e);
  }
}
(handler.help = [
  "jadighibli (Balas foto)",
  "jadivaporwave (Balas foto)",
  "jadidreamscape (Balas foto)",
  "jadivintagecomic (Balas foto)",
  "jadicyberpunk (Balas foto)",
  "jadigta (Balas foto)",
  "aitransform (Balas foto)",
].map((v) => v)),
  (handler.tags = ["tools"]),
  (handler.command =
    /^(jadighibli|jadivaporwave|jadidreamscape|jadivintagecomic|jadicyberpunk|jadigta|aitransform)$/i),
  (handler.limit = !0);
export default handler;
