import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import {
  fetch
} from "undici";
import crypto from "crypto";
class VoiceAPI {
  async createVoice(voiceModelId, inputBuffer) {
    try {
      const formdata = new FormData(),
        {
          ext,
          mime
        } = await fileTypeFromBuffer(inputBuffer) || {},
        randomBytes = crypto.randomBytes(5).toString("hex");
      formdata.append("soundFile", new Blob([inputBuffer], {
        type: mime
      }), randomBytes + "." + ext), formdata.append("voiceModelId", voiceModelId || "221129");
      const response = await fetch("https://relikt-sweng465.vercel.app/api/voice/create_vtv", {
        method: "POST",
        body: formdata
      });
      return await response.json();
    } catch (error) {
      throw console.error("Error in createVoice:", error), error;
    }
  }
  async getModelData(type) {
    let voices = [];
    if ("eleven" === type) try {
      const response = await fetch("https://api.elevenlabs.io/v1/voices");
      return voices = (await response.json()).voices, voices.map(voice => ({
        label: voice.name,
        value: voice.voice_id
      })).sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
      throw console.error("Error in modelVoice:", error), error;
    } else if ("kits" === type) try {
      const response = await fetch("https://relikt-sweng465.vercel.app/api/voice/get_vtv_models");
      return voices = (await response.json()).data, voices.map(voice => ({
        label: voice.title,
        value: voice.id
      })).sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
      throw console.error("Error in modelVoice:", error), error;
    }
  }
  async createTTS(voiceId, textToConvert) {
    try {
      const response = await fetch("https://relikt-sweng465.vercel.app/api/voice/create_tts", {
        method: "POST",
        body: new URLSearchParams({
          textToConvert: textToConvert || "Hello",
          voiceId: voiceId || "CYw3kZ02Hs0563khs1Fj"
        })
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw console.error("Error in createTTS:", error), error;
    }
  }
}
export {
  VoiceAPI
};