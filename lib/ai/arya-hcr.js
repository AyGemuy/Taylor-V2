import fetch from "node-fetch";
class Arya {
  constructor(baseURL = "https://nexra.aryahcr.cc") {
    this.baseURL = baseURL;
  }
  extractJson(str) {
    const match = str.match(/({.*})/);
    return match ? JSON.parse(match[1]) : null;
  }
  async postData(decode, endpoint, data) {
    try {
      const url = `${this.baseURL}/${endpoint}`,
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }),
        text = await response.text();
      return Buffer.isBuffer(text) ? text.toString() : decode ? JSON.parse(text) : this.extractJson(text);
    } catch (error) {
      throw console.error("Error in postData:", error), error;
    }
  }
  async complementImage(model, prompt, additionalData = {}) {
    const requestData = {
      prompt: prompt || "An serene sunset landscape where a river winds through gentle hills covered in trees. The sky is tinged with warm and soft tones, with scattered clouds reflecting the last glimmers of the sun.",
      model: model,
      ...additionalData
    };
    return await this.postData(!1, "api/image/complements", requestData);
  }
  async stablediffusion15(prompt, model) {
    return await this.complementImage(model ?? "stablediffusion-1.5", prompt);
  }
  async stablediffusion21(prompt, model) {
    return await this.complementImage(model ?? "stablediffusion-2.1", prompt, {
      data: {
        prompt_negative: "",
        guidance_scale: 9
      }
    });
  }
  async stablediffusionXL(prompt, model, style) {
    return await this.complementImage(model ?? "stablediffusion-xl", prompt, {
      data: {
        prompt_negative: "",
        image_style: style ?? "(No style)",
        guidance_scale: 7.5
      }
    });
  }
  async pixartA(prompt, model, style) {
    return await this.complementImage(model ?? "pixart-a", prompt, {
      data: {
        prompt_negative: "",
        sampler: "DPM-Solver",
        image_style: style ?? "Anime",
        width: 1024,
        height: 1024,
        dpm_guidance_scale: 4.5,
        dpm_inference_steps: 14,
        sa_guidance_scale: 3,
        sa_inference_steps: 25
      }
    });
  }
  async pixartLcm(prompt, model) {
    return await this.complementImage(model ?? "pixart-lcm", prompt, {
      data: {
        prompt_negative: "",
        image_style: "Fantasy art",
        width: 1024,
        height: 1024,
        lcm_inference_steps: 9
      }
    });
  }
  async dalle(prompt, model) {
    return await this.complementImage(model ?? "dalle", prompt);
  }
  async dalleMini(prompt, model) {
    return await this.complementImage(model ?? "dalle-mini", prompt);
  }
  async prodia(prompt, modelA, modelB) {
    return await this.complementImage(modelA ?? "prodia", prompt, {
      data: {
        model: modelB ?? "absolutereality_V16.safetensors [37db0fc3]",
        steps: 25,
        cfg_scale: 7,
        sampler: "DPM++ 2M Karras",
        negative_prompt: ""
      }
    });
  }
  async prodiaStablediffusion(prompt, modelA, modelB) {
    return await this.complementImage(modelA ?? "prodia-stablediffusion", prompt, {
      data: {
        prompt_negative: "",
        model: modelB ?? "absolutereality_v181.safetensors [3d9d4d2b]",
        sampling_method: "DPM++ 2M Karras",
        sampling_steps: 25,
        width: 512,
        height: 512,
        cfg_scale: 7
      }
    });
  }
  async prodiaStablediffusionXL(prompt, modelA, modelB) {
    return await this.complementImage(modelA ?? "prodia-stablediffusion-xl", prompt, {
      data: {
        prompt_negative: "",
        model: modelB ?? "sd_xl_base_1.0.safetensors [be9edd61]",
        sampling_method: "DPM++ 2M Karras",
        sampling_steps: 25,
        width: 1024,
        height: 1024,
        cfg_scale: 7
      }
    });
  }
  async emi(prompt, model) {
    return await this.complementImage(model ?? "emi", prompt);
  }
  async chatGPT(assistant, user, prompt, model) {
    return await this.postData(!0, "api/chat/gpt", {
      messages: [{
        role: "assistant",
        content: assistant ?? "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu? How are you today?"
      }, {
        role: "user",
        content: user ?? "Hello, my name is OpenAI."
      }],
      prompt: prompt ?? "Can you repeat my name?",
      model: model ?? "GPT-4",
      markdown: !1
    });
  }
  async chatComplements(assistant, user, model, conversation_style) {
    return await this.postData(!0, "api/chat/complements", {
      messages: [{
        role: "assistant",
        content: assistant ?? "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu? How are you today?"
      }, {
        role: "user",
        content: user ?? "Hello, my name is OpenAI."
      }],
      conversation_style: conversation_style ?? "Balanced",
      markdown: !1,
      stream: !1,
      model: model ?? "Bing"
    });
  }
  async translate(text, source, target) {
    return await this.postData(!0, "api/translate/", {
      text: text,
      source: source,
      target: target
    });
  }
}
export {
  Arya
};