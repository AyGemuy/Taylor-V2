import fetch from "node-fetch";
import chalk from "chalk";
class StableHorde {
  constructor({
    apiKey = ""
  }) {
    this.apiKey = apiKey || "0000000000", this.pendingTextGenerationIds = [], this.pendingImageGenerationIds = [],
      this.startTime = 0;
  }
  async fetchData(url, options) {
    try {
      const response = await fetch(url, options),
        data = await response.json();
      return console.log(data), data;
    } catch (error) {
      return console.log(chalk.red.bold("An error occurred:"), error), error;
    }
  }
  async statusGenerate(id) {
    return await this.fetchData(`https://aihorde.net/api/v2/generate/status/${id}`, {
      method: "GET"
    });
  }
  async cancelGenerate(id) {
    return await this.fetchData(`https://aihorde.net/api/v2/generate/status/${id}`, {
      method: "DELETE"
    });
  }
  async checkGenerate(id) {
    return await this.fetchData(`https://aihorde.net/api/v2/generate/check/${id}`, {
      method: "GET"
    });
  }
  async getModels() {
    return await this.fetchData("https://stablehorde.net/api/v2/status/models", {
      method: "GET"
    });
  }
  async getStyle() {
    return await this.fetchData("https://raw.githubusercontent.com/db0/Stable-Horde-Styles/main/styles.json", {
      method: "GET"
    });
  }
  async imageModels() {
    return await this.fetchData("https://stablehorde.net/api/v2/status/models");
  }
  async textModels() {
    return ["koboldcpp/MythoMax-L2-13b", "aphrodite/Undi95/Emerhyst-20B", "aphrodite/Undi95/MXLewd-L2-20B", "aphrodite/Undi95/PsyMedRP-v1-20B", "koboldcpp/Emerhyst-20B.q6_k"];
  }
  async generateText(dataInput) {
    const headers = {
        "Content-Type": "application/json",
        apikey: this.apiKey
      },
      body = JSON.stringify({
        prompt: dataInput.prompt + (dataInput.negativePrompt ? ` ### ${dataInput.negativePrompt}` : ""),
        params: {
          ...dataInput
        },
        models: [dataInput.model]
      }),
      response = await fetch("https://stablehorde.net/api/v2/generate/text/async", {
        method: "POST",
        headers: headers,
        body: body
      }).catch(error => {
        console.log(chalk.red.bold("An error occurred:"), error);
      });
    if (401 === response.status) return console.log(chalk.yellow("Unauthorized access:"), response),
      null;
    const {
      id
    } = await response.json();
    this.pendingTextGenerationIds.push(id), this.startTime = Date.now();
    for (; this.pendingTextGenerationIds.length > 0;) {
      if (Date.now() - this.startTime > 12e4) {
        console.log(chalk.yellow("Text generation timeout."));
        break;
      }
      (await this.fetchData(`https://stablehorde.net/api/v2/generate/text/status/${id}`, {
        headers: headers
      })).finished ? this.pendingTextGenerationIds.shift() : await new Promise(resolve => setTimeout(resolve, 1e3));
    }
    return await this.fetchData(`https://stablehorde.net/api/v2/generate/text/status/${id}`, {
      headers: headers
    });
  }
  async generateImage(dataInput) {
    const headers = {
        apikey: this.apiKey,
        "Content-Type": "application/json"
      },
      body = JSON.stringify({
        prompt: dataInput.prompt + (dataInput.negativePrompt ? ` ### ${dataInput.negativePrompt}` : ""),
        params: {
          ...dataInput,
          seed_variation: 1e3,
          post_processing: [],
          sampler_name: "k_euler",
          n: 1
        },
        nsfw: dataInput.nsfw,
        censor_nsfw: !dataInput.nsfw,
        slow_workers: !0,
        worker_blacklist: !1,
        models: [dataInput.model],
        r2: !0,
        shared: !1
      }),
      response = await fetch("https://stablehorde.net/api/v2/generate/async", {
        method: "POST",
        headers: headers,
        body: body
      }),
      {
        id
      } = await response.json();
    this.pendingImageGenerationIds.push(id), this.startTime = Date.now();
    for (; this.pendingImageGenerationIds.length > 0;) {
      if (Date.now() - this.startTime > 12e4) {
        console.log(chalk.yellow("Image generation timeout."));
        break;
      }
      if ((await this.fetchData(`https://stablehorde.net/api/v2/generate/check/${id}`, {
          headers: headers
        })).done) {
        this.pendingImageGenerationIds.shift();
        return await this.fetchData(`https://stablehorde.net/api/v2/generate/status/${id}`, {
          headers: headers
        });
      }
      await new Promise(resolve => setTimeout(resolve, 5e3));
    }
  }
}
class AiHorde {
  constructor({
    apiKey = ""
  }) {
    this.apiKey = apiKey || "0000000000", this.pendingTextGenerationIds = [], this.pendingImageGenerationIds = [],
      this.startTime = 0;
  }
  async fetchData(url, options) {
    try {
      const response = await fetch(url, options),
        data = await response.json();
      return console.log(data), data;
    } catch (error) {
      return console.log(chalk.red.bold("An error occurred:"), error), error;
    }
  }
  async statusGenerate(id) {
    return await this.fetchData(`https://aihorde.net/api/v2/generate/status/${id}`, {
      method: "GET"
    });
  }
  async cancelGenerate(id) {
    return await this.fetchData(`https://aihorde.net/api/v2/generate/status/${id}`, {
      method: "DELETE"
    });
  }
  async checkGenerate(id) {
    return await this.fetchData(`https://aihorde.net/api/v2/generate/check/${id}`, {
      method: "GET"
    });
  }
  async getModels() {
    return await this.fetchData("https://aihorde.net/api/v2/status/models", {
      method: "GET"
    });
  }
  async getStyle() {
    return await this.fetchData("https://raw.githubusercontent.com/db0/Stable-Horde-Styles/main/styles.json", {
      method: "GET"
    });
  }
  async imageModels() {
    return await this.fetchData("https://aihorde.net/api/v2/status/models");
  }
  async textModels() {
    return ["koboldcpp/MythoMax-L2-13b", "aphrodite/Undi95/Emerhyst-20B", "aphrodite/Undi95/MXLewd-L2-20B", "aphrodite/Undi95/PsyMedRP-v1-20B", "koboldcpp/Emerhyst-20B.q6_k"];
  }
  async generateText(dataInput) {
    const headers = {
        "Content-Type": "application/json",
        apikey: this.apiKey
      },
      body = JSON.stringify({
        prompt: dataInput.prompt + (dataInput.negativePrompt ? ` ### ${dataInput.negativePrompt}` : ""),
        params: {
          ...dataInput
        },
        models: [dataInput.model]
      }),
      response = await fetch("https://aihorde.net/api/v2/generate/text/async", {
        method: "POST",
        headers: headers,
        body: body
      }).catch(error => {
        console.log(chalk.red.bold("An error occurred:"), error);
      });
    if (401 === response.status) return console.log(chalk.yellow("Unauthorized access:"), response),
      null;
    const {
      id
    } = await response.json();
    this.pendingTextGenerationIds.push(id), this.startTime = Date.now();
    for (; this.pendingTextGenerationIds.length > 0;) {
      if (Date.now() - this.startTime > 12e4) {
        console.log(chalk.yellow("Text generation timeout."));
        break;
      }
      (await this.fetchData(`https://aihorde.net/api/v2/generate/text/status/${id}`, {
        headers: headers
      })).finished ? this.pendingTextGenerationIds.shift() : await new Promise(resolve => setTimeout(resolve, 1e3));
    }
    return await this.fetchData(`https://aihorde.net/api/v2/generate/text/status/${id}`, {
      headers: headers
    });
  }
  async generateImage(dataInput) {
    const headers = {
        apikey: this.apiKey,
        "Content-Type": "application/json"
      },
      body = JSON.stringify({
        prompt: dataInput.prompt + (dataInput.negativePrompt ? ` ### ${dataInput.negativePrompt}` : ""),
        params: {
          ...dataInput,
          seed_variation: 1e3,
          post_processing: [],
          sampler_name: "k_euler",
          n: 1
        },
        nsfw: dataInput.nsfw,
        censor_nsfw: !dataInput.nsfw,
        slow_workers: !0,
        worker_blacklist: !1,
        models: [dataInput.model],
        r2: !0,
        shared: !1
      }),
      response = await fetch("https://aihorde.net/api/v2/generate/async", {
        method: "POST",
        headers: headers,
        body: body
      }),
      {
        id
      } = await response.json();
    this.pendingImageGenerationIds.push(id), this.startTime = Date.now();
    for (; this.pendingImageGenerationIds.length > 0;) {
      if (Date.now() - this.startTime > 12e4) {
        console.log(chalk.yellow("Image generation timeout."));
        break;
      }
      if ((await this.fetchData(`https://aihorde.net/api/v2/generate/check/${id}`, {
          headers: headers
        })).done) {
        this.pendingImageGenerationIds.shift();
        return await this.fetchData(`https://aihorde.net/api/v2/generate/status/${id}`, {
          headers: headers
        });
      }
      await new Promise(resolve => setTimeout(resolve, 5e3));
    }
  }
}
export {
  StableHorde,
  AiHorde
};