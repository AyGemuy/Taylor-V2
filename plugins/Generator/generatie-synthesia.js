import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const API_KEYS = ["2bb47c8a263cacd1a6cc100e1317fcd1", "1a1c4a0edaa7b8cbc82eb52a6baf4c8d", "1617249c979543caaef58e3c726b7ff3"],
    apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)],
    url = "https://api.synthesia.io/v2/videos",
    msg = `Input teks atau reply teks yang ingin di jadikan text to video!\n\n*Contoh:*\n${usedPrefix + command} teks`,
    text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(msg);
  const inputs = text.trim();
  if (!inputs) return m.reply(msg);
  m.react(wait);
  try {
    const headers = {
        accept: "application/json",
        authorization: apiKey,
        "Content-Type": "application/json"
      },
      json_data = {
        test: !1,
        title: "RobotBulls News",
        description: "Crypto and economic News!",
        visibility: "public",
        ctaSettings: {
          label: "More News!",
          url: "https://www.robotbulls.com"
        },
        callbackId: "support@robotbulls.com",
        input: [{
          scriptText: inputs,
          avatar: "6784e07c-9f71-428f-a43d-a27df9965833",
          avatarSettings: {
            voice: "70ded880-ad19-4673-956c-20aeaa5d1695",
            horizontalAlign: "center",
            scale: .8,
            style: "rectangular"
          },
          background: "off_white"
        }]
      },
      videoId = (await makeRequest(url, "POST", json_data, headers)).id;
    conn.synthesia = conn.synthesia || {}, conn.synthesia[m.chat] = {
      videoId: videoId
    };
    const _videoId = conn.synthesia[m.chat].videoId;
    let videoResponse;
    while (true) {
      const videoUrl = `${url}/${_videoId}`,
        videoResponse = await makeRequest(videoUrl, "GET", null, headers);
      if ("complete" === videoResponse.status) {
        await conn.sendFile(m.chat, videoResponse.download, "", "Synthesia", m, !1, {
          mentions: [m.sender]
        }), m.react(sukses), delete conn.synthesia[m.chat];
        break;
      }
      if ("in_progress" !== videoResponse.status) {
        m.react(eror);
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 5e3));
    }
  } catch (error) {
    console.error(error), m.react(eror);
  }
};
handler.help = ["synthesia"], handler.tags = ["internet"], handler.command = /^(synthesia)$/i;
export default handler;
const makeRequest = async (url, method, data = null, headers) => {
  const options = {
      method: method,
      headers: headers,
      body: data ? JSON.stringify(data) : null
    },
    response = await fetch(url, options);
  return await response.json();
};