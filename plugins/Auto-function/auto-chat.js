import {
  TextGenerationAPI
} from "../../lib/ai/auto-chat.js";

function buildPrompt(messages) {
  return messages.join("\n");
}
export async function before(m) {
  if (this.autochat = this.autochat ? this.autochat : {}, m.isBaileys || !this.autochat.status || !m.text) return !1;
  let text = m.text;
  if (text) try {
    const textGenerationApi = new TextGenerationAPI("3a4886dd3230e523600d3b555f651dc82aba3a4e", "mJ9GVG9lcV8iO7TJYOuQjqfcw4JB2y1CmirFXdX1");
    let generatedText = "";
    if (text.startsWith("settype")) {
      const setType = parseInt(text.split(" ")[1]);
      this.autochat.settype = setType, 1 === setType ? (delete this.autochat.modelName, await this.reply(m.chat, `Set settype to ${setType}.`, m)) : 2 === setType ? (delete this.autochat.modelId, await this.reply(m.chat, `Set settype to ${setType}.`, m)) : await this.reply(m.chat, "Invalid settype value.", m);
    } else if (text.startsWith("setmodel")) {
      const selectedModelIndex = parseInt(text.split(" ")[1]) - 1;
      1 === this.autochat.settype && selectedModelIndex < replicateModel.length ? (this.autochat.modelId = replicateModel[selectedModelIndex], await this.reply(m.chat, `Set model to Replicate model ${selectedModelIndex + 1}.`, m)) : 2 === this.autochat.settype && selectedModelIndex < cohereModel.length ? (this.autochat.modelName = cohereModel[selectedModelIndex], await this.reply(m.chat, `Set model to Cohere model ${selectedModelIndex + 1}.`, m)) : await this.reply(m.chat, "Invalid setmodel value or model type mismatch.", m);
    } else if (text.includes("ai") || text.includes("autochat")) {
      const startIdx = Math.max(text.indexOf("ai"), text.indexOf("autochat")) + 2,
        messages = [text.substring(startIdx).trim()];
      if (1 === this.autochat.settype) {
        if (!this.autochat.modelId) return void await this.reply(m.chat, "Please set the model ID for Replicate API using setmodel.", m);
        generatedText = await textGenerationApi.generateTextFromReplicate(this.autochat.modelId, messages);
      } else {
        if (2 !== this.autochat.settype) return void await this.reply(m.chat, "Please set the type using settype.", m);
        if (!this.autochat.modelName) return void await this.reply(m.chat, "Please set the model name for Cohere API using setmodel.", m);
        generatedText = await textGenerationApi.generateTextFromCohere(this.autochat.modelName, messages);
      }
      await this.reply(m.chat, generatedText, m);
    } else text.startsWith("reset") ? (delete this.autochat, await this.reply(m.chat, "*Autochat reset*", m)) : text.startsWith("off") && (this.autochat.status = !1, await this.reply(m.chat, "*Autochat OFF*", m));
  } catch {
    await this.reply(m.chat, "Error occurred.", m);
  }
}
const replicateModel = ["replicate/llama7b-v2-chat:058333670f2a6e88cf1b29b8183405b17bb997767282f790b82137df8c090c1f", "replicate/llama13b-v2-chat:d5da4236b006f967ceb7da037be9cfc3924b20d21fed88e1e94f19d56e2d3111", "replicate/llama70b-v2-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1"],
  cohereModel = ["command-light-nightly", "command-nightly"];