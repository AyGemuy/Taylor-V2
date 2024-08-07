import fetch from "node-fetch";
import Replicate from "replicate";
class TextGenerationAPI {
  constructor(replicateApiKey, cohereApiKey) {
    this.replicateApi = new ReplicateAPI(replicateApiKey), this.cohereApi = new CohereAPI(cohereApiKey);
  }
  async generateTextFromReplicate(modelId, messages) {
    return await this.replicateApi.start(modelId, messages);
  }
  async generateTextFromCohere(modelName, messages) {
    return await this.cohereApi.start(modelName, messages);
  }
}
class ReplicateAPI {
  constructor(apiKey) {
    this.replicate = new Replicate({
      auth: apiKey
    });
  }
  async start(modelId, messages) {
    return (await this.replicate.run(modelId, {
      input: {
        prompt: buildPrompt(messages),
        temperature: .75,
        top_p: 1,
        max_length: 500,
        repetition_penalty: 1
      },
      wait: !0
    })).join("");
  }
}
class CohereAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  async start(modelName, messages) {
    const response = await fetch("https://api.cohere.ai/generate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "Cohere-Version": "2022-12-06"
        },
        body: JSON.stringify({
          model: modelName,
          prompt: buildPrompt(messages),
          return_likelihoods: "NONE",
          max_tokens: 200,
          temperature: .9,
          top_p: 1
        })
      }),
      result = await response.json(),
      completion = result.generations[0]?.text.substring(0);
    return completion;
  }
}

function buildPrompt(messages) {
  return messages.join("\n");
}
export {
  TextGenerationAPI
};