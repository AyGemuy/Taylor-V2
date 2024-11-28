import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    let res = await FreeGPT4(text);
    m.reply(res);
  } catch (e) {
    m.react(eror);
  }
};
(handler.help = ["freegpt4"]),
  (handler.tags = ["gpt"]),
  (handler.command = /^(freegpt4)$/i);
export default handler;
async function FreeGPT4(content) {
  const url = "https://aibr.elway-mobile.com/chatCompletion";
  const headers = {
    Accept: "application/json",
    "Accept-Charset": "UTF-8",
    "Accept-Encoding": "gzip",
    aibmd: "default",
    aibpf: "android",
    aibsg:
      "FrUbBtUYtaGXNBDDcoRRgSn3FReN87JosjmWMMdQEP2oF82D98yW3F+6aZ1s8kOdcfmvSB3DrrR0EmT0hMf1eB4cjQoali3zVjosyzm0/J9UAVjnZQH190A8FQM2/7QzLHKsx5Kafgn8LtXDvrbaokPnzOnwdI/vxM9VaBahh/kxCYc3iqoaZq1WcR6jE374LDi7VaSn30Eq/5wAYlBYOCEgZKO+9IZy8oY0qDYhVF6hJOpW2zI/Mx8kmgelyDAgUdvep0oLTXLDpEQaf15/G+vhugUumRMQMJ7fW9CIqSmITedt3cwKf4FPVWVR6evqfAfqid6hQ7sJViA/yahl9w==",
    appmv: "14",
    appvr: "1440",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream; charset=UTF-8",
    "User-Agent": "Ktor client",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    return data
      .split("\n\n")
      .map((line) =>
        line.includes('"content":') && !line.includes('"finishReason":')
          ? JSON.parse(line.slice(5)).content
          : "",
      )
      .filter((content) => content)
      .join("");
  } catch (error) {
    console.error("Fetch error:", error?.message || error);
    throw error;
  }
}
