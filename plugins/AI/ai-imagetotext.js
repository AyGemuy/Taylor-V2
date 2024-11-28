import fetch from "node-fetch";
async function ImageToText(link, prompt = "") {
  const url =
    "https://image-to-text.ai/?ref=taaft&utm_source=taaft&utm_medium=referral";
  const headers = {
    Accept: "text/x-component",
    "Next-Action": "c6c917a35679599ab8e19d4a7c4a0713cf12c5dc",
    "Next-Router-State-Tree":
      "%5B%22%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22ref%5C%22%3A%5C%22taaft%5C%22%2C%5C%22utm_source%5C%22%3A%5C%22taaft%5C%22%2C%5C%22utm_medium%5C%22%3A%5C%22referral%5C%22%7D%22%2C%7B%7D%2C%22%2F%3Fref%3Dtaaft%26utm_source%3Dtaaft%26utm_medium%3Dreferral%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer:
      "https://image-to-text.ai/?ref=taaft&utm_source=taaft&utm_medium=referral",
    Cookie:
      "_ga_4YVBNLPYX1=GS1.1.1727794148.1.0.1727794148.0.0.0; _ga=GA1.1.1794199805.1727794149; __client_uat=0; __client_uat_TPvvaHXD=0",
  };
  const data = [
    link,
    "You are an AI model specialized in processing images and generating various forms of textual content. Your tasks include, but are not limited to: generating prompts, describing images, creating advertising copy from product images, recognizing and extracting information from receipts, translating text within images, extracting and structuring text from images, generating web code from image designs, identifying and classifying objects in images, and generating social media sharing tags.\n\nFor each task, your goal is to provide a clear and accurate result directly, without any explanations or additional commentary. Always present the result in the most appropriate format (e.g., Markdown, plaintext). If no relevant content is found, simply state the absence of content. Follow the specific instructions provided in the user prompt to guide your response.",
    "Summarize the content of the image in one sentence, then describe in detail the objects, people, animals, atmosphere, and mood present in the image." +
      prompt,
  ];
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      compress: true,
    });
    const result = await response.text();
    const parseRes = result.split("\n")[1]?.slice(2);
    return JSON.parse(parseRes);
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  const inputText = args.length
    ? args.join(" ")
    : q?.text || q?.caption || q?.description || null;
  if (!mime) throw "No media found";
  let link = await q?.upload();
  m.react(wait);
  try {
    const openAIResponse = await ImageToText(link, inputText);
    if (openAIResponse.content) {
      const result = openAIResponse.content;
      m.reply(result);
      m.react(sukses);
    } else m.react(eror);
  } catch (e) {
    console.error(e), m.react(eror);
  }
};
(handler.help = ["imagetotext *[Reply image]*"]),
  (handler.tags = ["ai"]),
  (handler.command = /^(imagetotext)$/i);
export default handler;
