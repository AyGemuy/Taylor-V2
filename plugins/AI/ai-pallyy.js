import axios from "axios";
async function DescribeMyImage(buffer) {
  try {
    const { data: Sig } = await axios.post(
      "https://pallyy.com/api/images/getUploadURL",
    );
    const { url, sasString, blobName } = Sig;
    const UploadURL = `${url}captions/${blobName}?${sasString}`;
    await axios.put(UploadURL, buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content-type": "image/jpeg",
      },
    });
    const AnalyzeURL = `https://pallyy.com/api/images/analysis`;
    const { data: Analyze } = await axios.post(AnalyzeURL, {
      blobName: blobName,
    });
    const DescribeURL = `https://pallyy.com/api/images/description`;
    const tags = Analyze.tagsResult.values;
    const { data: Describe } = await axios.post(DescribeURL, {
      analysis: Analyze,
    });
    return {
      q: Describe[0],
      tags: tags,
    };
  } catch (e) {
    return {
      error: e.message,
      timestamp: Date.now(),
      service: "DescribeMyImage",
      route: "describe",
      method: "post",
    };
  }
}
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("No media found");
  let media = await q?.download();
  m.react(wait);
  try {
    const openAIResponse = await DescribeMyImage(media);
    if (openAIResponse) {
      const { q: description, tags } = openAIResponse;
      let tagsFormatted = tags
        .map(
          (tag) =>
            `- ${tag.name} (Confidence: ${Math.round(tag.confidence * 100)}%)`,
        )
        .join("\n");
      let responseMessage = `*Deskripsi:*\n${description}\n\n*Tags:*\n${tagsFormatted}`;
      m.reply(responseMessage);
    } else {
      console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["pallyy *[Reply image]*"];
handler.tags = ["ai"];
handler.command = /^(pallyy)$/i;
export default handler;
