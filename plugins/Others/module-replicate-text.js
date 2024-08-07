import fetch from "node-fetch";
import Replicate from "replicate";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input Code:\n.replicatext console";
    text = m.quoted?.text;
  }
  if (text) {
    m.react(wait);
    let hasil = await textReplicate(text, "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478", "3a4886dd3230e523600d3b555f651dc82aba3a4e");
    await conn.sendFile(m.chat, hasil[0], "result", "Result:\n", m);
  } else m.react(eror);
};
handler.help = ["replicatext"], handler.tags = ["internet", "tools"], handler.command = /^replicatext$/i;
export default handler;
async function textReplicate(prompt, models, ApiKey) {
  const replicate = new Replicate({
      auth: ApiKey
    }),
    input = {
      prompt: prompt
    };
  return await replicate.run(models, {
    input: input
  });
}