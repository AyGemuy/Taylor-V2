import crypto from "crypto";
import fetch from "node-fetch";

function generateDeviceId() {
  return crypto.randomUUID();
}
async function sendNgl(username, question) {
  const url = "https://ngl.link/api/submit";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    Referer: `https://ngl.link/${username}`,
  };
  const deviceId = generateDeviceId();
  const body = new URLSearchParams({
    username: username,
    question: question,
    deviceId: deviceId,
    gameSlug: "",
    referrer: "",
  }).toString();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return response.ok
      ? data.questionId
        ? {
            success: true,
            data: data,
          }
        : {
            success: false,
            message: "No questionId found",
          }
      : {
          success: false,
          message: `HTTP error! Status: ${response.status}`,
        };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
}

function extractUsername(url) {
  const match = url.match(/ngl\.link\/([^/]+)/);
  return match ? match[1] : "";
}
const handler = async (m, { text, usedPrefix, command }) => {
  let [user, msg] = text.split("|");
  if (!user || !msg) {
    return m.reply(
      `*Usage:* ${usedPrefix + command} username/ngl_link | message\n*Example:* ${usedPrefix + command} https://ngl.link/username | Hello`,
    );
  }
  const link = /^(http|https):\/\/ngl.link/gi.test(user)
    ? user
    : `https://ngl.link/${extractUsername(user)}`;
  m.react(wait);
  try {
    const result = await sendNgl(extractUsername(link), msg);
    m.reply(
      result.success
        ? `✅ *Success:* Message sent to *${extractUsername(user)}*.\n*Message:* "${msg}"`
        : `❌ *Failed:* ${result.message}`,
    );
    m.react(sukses);
  } catch (error) {
    console.log(error);
    m.react(eror);
  }
};
handler.help = ["ngl"];
handler.tags = ["tools"];
handler.command = /^ngl$/i;
export default handler;
