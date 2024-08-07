import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = ["meta-llama/Llama-2-7b-chat-hf", "meta-llama/Llama-2-70b-chat-hf"];
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]");
  m.react(wait);
  try {
    let data = input_data.map((item, index) => ({
      title: item.split("/")[1],
      id: item
    }));
    if (!urutan) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1].id;
    if (out) {
      if ("meta-llama/Llama-2-7b-chat-hf" === out) {
        const messages = [{
            role: "user",
            content: tema
          }, {
            role: "assistant",
            content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
          }],
          asyncGenerator = await createAsyncGenerator(out, messages, null, {});
        await conn.sendMessage(m.chat, {
          text: asyncGenerator
        }, {
          quoted: m
        });
      } else if ("meta-llama/Llama-2-70b-chat-hf" === out) {
        const messages = [{
            role: "user",
            content: tema
          }, {
            role: "assistant",
            content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
          }],
          asyncGenerator = await createAsyncGenerator(out, messages, null, {});
        await conn.sendMessage(m.chat, {
          text: asyncGenerator
        }, {
          quoted: m
        });
      }
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    console.error(e), m.react(eror);
  }
};
handler.help = ["llama2 *[nomor]|[query]*"], handler.tags = ["ai"], handler.command = /^(llama2)$/i;
export default handler;
const models = {
    "meta-llama/Llama-2-7b-chat-hf": {
      name: "Llama 2 7B",
      version: "d24902e3fa9b698cc208b5e63136c4e26e828659a9f09827ca6ec5bb83014381",
      shortened: "7B"
    },
    "meta-llama/Llama-2-70b-chat-hf": {
      name: "Llama 2 70B",
      version: "2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
      shortened: "70B"
    }
  },
  url = "https://www.llama2.ai",
  working = !0,
  supports_message_history = !0;
async function createAsyncGenerator(model, messages, proxy, kwargs) {
  if (model) {
    if (!models[model]) throw new Error(`Model is not supported: ${model}`);
  } else model = "meta-llama/Llama-2-70b-chat-hf";
  const version = models[model].version,
    headers = {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Accept: "*/*",
      "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
      "Accept-Encoding": "gzip, deflate, br",
      Referer: `${url}/`,
      "Content-Type": "text/plain;charset=UTF-8",
      Origin: url,
      Connection: "keep-alive",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      TE: "trailers"
    },
    data = {
      prompt: formatPrompt(messages),
      version: version,
      systemPrompt: kwargs.system_message || "You are a helpful assistant.",
      temperature: kwargs.temperature || .75,
      topP: kwargs.top_p || .9,
      maxTokens: kwargs.max_tokens || 8e3,
      image: null
    };
  const response = await fetch(`${url}/api`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
    proxy: proxy
  });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return await response.text();
}

function formatPrompt(messages) {
  return messages.map(message => "user" === message.role ? `[INST] ${message.content} [/INST]` : message.content).join("\n") + "\n";
}