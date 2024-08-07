import fetch from "node-fetch";
const LABSURL = process.env.LABSURL || "https://api.elevenlabs.io",
  LABSKEY = process.env.LABSKEY || "2a0050b5932ff8d79f54418fa370d1c1",
  labsVoiceID = {
    rachel: {
      voice_id: "21m00Tcm4TlvDq8ikWAM"
    },
    clyde: {
      voice_id: "2EiwWnXFnvU5JabPnv8n"
    },
    domi: {
      voice_id: "AZnzlk1XvdvUeBnXmlld"
    },
    dave: {
      voice_id: "CYw3kZ02Hs0563khs1Fj"
    },
    fin: {
      voice_id: "D38z5RcWu1voky8WS1ja"
    },
    bella: {
      voice_id: "EXAVITQu4vr4xnSDxMaL"
    },
    antoni: {
      voice_id: "ErXwobaYiN019PkySvjV"
    },
    thomas: {
      voice_id: "GBv7mTt0atIp3Br8iCZE"
    },
    charlie: {
      voice_id: "IKne3meq5aSn9XLyUdCD"
    },
    emily: {
      voice_id: "LcfcDJNUP1GQjkzn1xUU"
    },
    elli: {
      voice_id: "MF3mGyEYCl7XYWbV9V6O"
    },
    callum: {
      voice_id: "N2lVS1w4EtoT3dr4eOWO"
    },
    patrick: {
      voice_id: "ODq5zmih8GrVes37Dizd"
    },
    harry: {
      voice_id: "SOYHLrjzK2X1ezoPC6cr"
    },
    liam: {
      voice_id: "TX3LPaxmHKxFdv7VOQHJ"
    },
    dorothy: {
      voice_id: "ThT5KcBeYPX3keUQqHPh"
    },
    josh: {
      voice_id: "TxGEqnHWrfWFTfGW9XjX"
    },
    arnold: {
      voice_id: "VR6AewLTigWG4xSOukaG"
    },
    charlotte: {
      voice_id: "XB0fDUnXU5powFXDhCwa"
    },
    matilda: {
      voice_id: "XrExE9yKIg1WjnnlVkGX"
    },
    matthew: {
      voice_id: "Yko7PKHZNXotIFUBG7I9"
    },
    james: {
      voice_id: "ZQe5CZNOzWyzPSCn5a3c"
    },
    joseph: {
      voice_id: "Zlb1dXrM653N07WRdFW3"
    },
    jeremy: {
      voice_id: "bVMeCyTHy58xNoL34h3p"
    },
    michael: {
      voice_id: "flq6f7yk4E4fJM5XTYuZ"
    },
    ethan: {
      voice_id: "g5CIjZEefAph4nQFvHAz"
    },
    gigi: {
      voice_id: "jBpfuIE2acCO8z3wKNLl"
    },
    freya: {
      voice_id: "jsCqWAovK2LkecY7zXl4"
    },
    grace: {
      voice_id: "oWAxZDx7w5VEj9dCyTzz"
    },
    daniel: {
      voice_id: "onwK4e9ZLuTAKqWW03F9"
    },
    serena: {
      voice_id: "pMsXgVXv3BLzUgSXRplE"
    },
    adam: {
      voice_id: "pNInz6obpgDQGcFmaJgB"
    },
    nicole: {
      voice_id: "piTKgcLEGmPE4e6mEKli"
    },
    jessie: {
      voice_id: "t0jbNlBVZ17f02VDIeMI"
    },
    ryan: {
      voice_id: "wViXBPUzp2ZZixB1xQuM"
    },
    sam: {
      voice_id: "yoZ06aMxZJJ28mfd3POQ"
    },
    glinda: {
      voice_id: "z9fAnlkpzviPz146aGWa"
    },
    giovanni: {
      voice_id: "zcAOhNBS3c14rBihAFp1"
    },
    mimi: {
      voice_id: "zrHiDhphv9ZnVXBqCLjz"
    }
  },
  PAULCA_VOICE = "EcOnXAJ3e2odu7bmr9M9",
  YOUTUBE_VOICE = "LQj2X4OpUuX9YFC5sCDw",
  MICHAEL_VOICE = "flq6f7yk4E4fJM5XTYuZ",
  MATTHEW_VOICE = "Yko7PKHZNXotIFUBG7I9",
  DEFAULT_VOICE = MICHAEL_VOICE,
  DEFAULT_MODEL = "eleven_multilingual_v2",
  DEFAULT_URL = "https://api.elevenlabs.io";
let apiURL = LABSURL ?? DEFAULT_URL,
  apiKey = LABSKEY;

function init(url = apiURL, key = apiKey) {
  return apiURL = url, apiKey = key, {
    apiURL: apiURL,
    apiKey: apiKey
  };
}
const FORMATS = ["mp3_44100_64", "mp3_44100_96", "mp3_44100_128", "mp3_44100_192", "pcm_16000", "pcm_22050", "pcm_24000", "pcm_44100"];
async function apiCall(method, relativeURL, _headers, body) {
  try {
    const options = {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
        ..._headers
      },
      body: body ? "string" == typeof body ? body : JSON.stringify(body) : null
    };
    return await fetch(apiURL + relativeURL, options);
  } catch (err) {
    throw new Error("apiCall: " + err.message);
  }
}
async function getUser() {
  try {
    const response = await apiCall("GET", "/v1/user", []);
    return await response.json();
  } catch (err) {
    throw new Error("getUser: " + err.message);
  }
  return null;
}
async function getUserInfo() {
  try {
    const response = await apiCall("GET", "/v1/user/subscription");
    return await response.json();
  } catch (err) {
    throw console.log("getUserInfo: " + err.message), err;
  }
}
async function isValidVoice(voiceId) {
  try {
    const response = await apiCall("GET", `/v1/voices/${voiceId}`);
    return (await response.json()).voice_id === voiceId;
  } catch (e) {
    return console.log("isValidVoice: " + e.message), !1;
  }
}
async function listVoices() {
  try {
    const response = await apiCall("GET", "/v1/voices", []);
    return await response.json();
  } catch (err) {
    console.log("listVoices: " + err.message);
  }
  return null;
}
async function synthesize(ttsOptions) {
  try {
    const user = await getUser(),
      tierLevel = user?.subscription?.tier || "free",
      isMP3 = ttsOptions.output_format.startsWith("mp3_");
    "free" === tierLevel && "mp3_44100_192" === ttsOptions.output_format && (console.log("Free tier is limited to mp3_44100_128 format."), ttsOptions.output_format = "mp3_44100_128");
    const headers = {
        Accept: isMP3 ? "audio/mpeg" : "audio/wav"
      },
      output_format = ttsOptions.output_format,
      model_id = {
        e1: "eleven_monolingual_v1",
        e2: "eleven_monolingual_v2",
        m1: "eleven_multilingual_v1",
        m2: "eleven_multilingual_v2"
      } [ttsOptions.model_id] || DEFAULT_MODEL;
    console.log("Using model: " + model_id);
    const requestBody = {
      ...ttsOptions,
      model_id: model_id,
      voice_settings: {
        stability: .75,
        similarity_boost: .75,
        style: 0
      }
    };
    delete requestBody.output_format;
    const response = await apiCall("POST", `/v1/text-to-speech/${ttsOptions?.voice_id}/stream?output_format=${output_format}`, headers, requestBody),
      contentType = response.headers.get("content-type");
    return contentType && contentType.includes("application/json") ? await response.json() : await response.arrayBuffer();
  } catch (err) {
    throw err;
  }
}
export {
  LABSURL,
  LABSKEY,
  FORMATS,
  DEFAULT_VOICE,
  PAULCA_VOICE,
  YOUTUBE_VOICE,
  labsVoiceID,
  init,
  getUser,
  getUserInfo,
  isValidVoice,
  listVoices,
  synthesize
};