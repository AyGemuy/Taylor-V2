import * as cheerio from "cheerio";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import userAgent from "fake-useragent";
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("No media found. Please reply to a ZIP file.");
  const media = await q.download();
  if (!/^application\/zip$/.test(mime))
    return m.reply("Unsupported file type. Please reply to a ZIP file.");
  m.react(wait);
  try {
    const output = await ZipPass(media);
    const responseMessage =
      output.processing && output.password
        ? `*Processing:*\n- \`${output.processing}\`\n*Password:*\n- \`${output.password}\``
        : "Failed to extract the password.";
    m.reply(responseMessage);
  } catch (e) {
    m.react(eror);
    console.log(e);
  }
};
handler.help = ["zippass *[Reply zip]*"];
handler.tags = ["tools"];
handler.command = /^(zippass)$/i;
export default handler;
async function ZipPass(content) {
  try {
    const response = await fetch(
      "https://passwordrecovery.io/zip-file-password-removal/",
    );
    const cookies = response.headers.get("set-cookie")?.split(";")[0];
    const $ = cheerio.load(await response.text());
    const csrfToken = $('input[name="csrf_token"]').val();
    if (!csrfToken)
      return {
        processing: "Not found",
        password: "Not found",
      };
    const { ext = "zip", mime = "application/zip" } =
      (await fileTypeFromBuffer(content)) || {};
    const formData = new FormData();
    formData.append(
      "fileName",
      new Blob([content], {
        type: mime,
      }),
      `${Date.now()}.${ext}`,
    );
    formData.append("csrf_token", csrfToken);
    const postResponse = await fetch("https://passwordrecovery.io/query/docs", {
      method: "POST",
      body: formData,
      headers: {
        "User-Agent": userAgent(),
        Cookie: `${cookies}; accept_cookie=true`,
        Referer: "https://passwordrecovery.io/zip-file-password-removal",
      },
    });
    if (!postResponse.ok)
      return {
        processing: "Not found",
        password: "Not found",
      };
    const [, processing = "Not found", password = "Not found"] =
      (await postResponse.text()).match(/Processing: (.+)<br>Result: (.+)/) ||
      [];
    return {
      processing: processing,
      password: password,
    };
  } catch (error) {
    console.error("Error in ZipPass function:", error.message);
    return {
      processing: "Error",
      password: "Error",
    };
  }
}
