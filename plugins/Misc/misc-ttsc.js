import {
  randomUUID
} from "crypto";
let fetchear;
import("node-fetch").then(function({
  default: fetch
}) {
  fetchear = fetch;
});
const fakeYouToken = "187b56b2217ac09dbe6ae610f19b35dfbc53cdd5857f818f03b45d048287b4bc",
  handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
  }) => {
    let text, ListVoice = await (await fetch("https://api.fakeyou.com/tts/list")).json(),
      lister = ListVoice.models,
      query = `Input query!\n\n*Example:*\n${usedPrefix + command} [angka]|[teks]\n\n*Pilih angka yg ada*\n` + String.fromCharCode(8206).repeat(4001) + lister.map((item, index) => "  " + (index + 1) + ". " + item.title).join("\n");
    if (args.length >= 1) text = args.slice(0).join(" ");
    else {
      if (!m.quoted || !m.quoted?.text) throw query;
      text = m.quoted?.text;
    }
    let [atas, bawah] = text.split("|");
    if (!atas) return m.reply(query);
    if (!bawah) return m.reply(query);
    const {
      modelToken,
      title
    } = await getModelByIndex(ListVoice, atas);
    m.reply(wait + "\n" + title);
    try {
      let res = await requestSpeech(modelToken, bawah);
      res && await conn.sendFile(m.chat, res, "audio.mp3", "", m, !0, {
        mimetype: "audio/mp4",
        ptt: !0,
        waveform: [100, 0, 100, 0, 100, 0, 100],
        contextInfo: adReplyS.contextInfo
      });
    } catch (e) {
      m.react(eror);
    }
  };
handler.help = ["ttsc *number|your text*"], handler.tags = ["misc"], handler.command = /^(ttsc)$/i;
export default handler;
async function getModelByIndex(arrayObject, index) {
  const model = arrayObject.models[index - 1];
  if (model) {
    const {
      model_token,
      title
    } = model;
    return {
      modelToken: model_token,
      title: title
    };
  }
  throw new Error("Invalid index");
}
async function fetchPatiently(url, params) {
  let response = await fetchear(url, params);
  for (; 408 === response.status || 502 === response.status;) await new Promise(res => setTimeout(res, 3e3)),
    response = await fetchear(url, params);
  return response;
}

function poll(token) {
  return new Promise(async (resolve, reject) => {
    await new Promise(res => setTimeout(res, 1e3));
    const response = await fetchPatiently("https://api.fakeyou.com/tts/job/" + token, {
      method: "GET",
      headers: {
        Authorization: fakeYouToken,
        Accept: "application/json"
      }
    }).catch(error => {
      reject(`HTTP error! ${error.name}`), console.error(error);
    });
    if (!response.ok) return;
    const json = await response.json().catch(error => {
      reject("Failed to parse poll JSON!"), console.error(error);
    });
    if (json) {
      if (!json.success) return reject(`Failed polling! ${json.error_reason}`), void console.error(json);
      switch (json.state.status) {
        case "pending":
        case "started":
        case "attempt_failed":
          return void await poll(token).then(resolve).catch(reject);
        case "complete_success":
          return void resolve("https://storage.googleapis.com/vocodes-public" + json.state.maybe_public_bucket_wav_audio_path);
        default:
          return reject(`Failed polling! ${json.state.status}`), void console.error(json);
      }
    }
  });
}
async function requestSpeech(voice, message) {
  return new Promise(async (resolve, reject) => {
    const response = await fetchPatiently("https://api.fakeyou.com/tts/inference", {
      method: "POST",
      body: JSON.stringify({
        tts_model_token: voice,
        uuid_idempotency_token: randomUUID(),
        inference_text: message
      }),
      headers: {
        Authorization: fakeYouToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).catch(error => {
      reject(`HTTP error! ${error.name}`), console.error(error);
    });
    if (!response.ok) return;
    const json = await response.json().catch(error => {
      reject("Failed to parse request JSON!"), console.error(error);
    });
    return json ? json.success ? void await poll(json.inference_job_token).then(resolve).catch(reject) : (reject(`Failed voice request! ${json.error_reason}`), void console.error(json)) : void 0;
  });
}