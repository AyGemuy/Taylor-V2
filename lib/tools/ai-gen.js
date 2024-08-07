import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
import sharp from "sharp";
import fs from "fs";
import {
  FormData
} from "formdata-node";
const _prompt = "I flew to the roof";
const _accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcl91dWlkIjoiYmVhOTlkMDAtNDc2NS00NDFjLWI0ZjktYjdkMGU1NjIxOTk1IiwiY2xpZW50X2lkIjoiIn0sImV4cCI6MTcxODk3MjEwMH0.vZt6jyHErsa8yuSWRVeYpvlh5xDOZnocI9z36n5QgSA";
const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
  },
  Svgai = async prompt => {
    try {
      const {
        data
      } = await axios.post("https://api.svg.io/generate-image", {
        userPrompt: prompt
      }, {
        headers: headers
      }), Data = data.data;
      return Data;
    } catch (error) {
      throw console.error("Error:", error.response ? error.response.data : error.message),
        error;
    }
  }, MyInstant = class {
    async scrape(url) {
      try {
        const {
          data: html
        } = await axios.get(url), $ = cheerio.load(html);
        return $(".instant").map((_, el) => ({
          title: $(el).find(".instant-link").text().trim(),
          soundLink: `https://www.myinstants.com${$(el).find("button.small-button").attr("onclick").match(/play\('(.+?)'/)[1]}`,
          pageLink: `https://www.myinstants.com${$(el).find(".instant-link").attr("href")}`
        })).get();
      } catch (error) {
        throw console.error("Error:", error), error;
      }
    }
    async home() {
      return await this.scrape("https://www.myinstants.com/en/index/id/");
    }
    async best() {
      return await this.scrape("https://www.myinstants.com/en/best_of_all_time/id/");
    }
    async recent() {
      return await this.scrape("https://www.myinstants.com/en/recent/");
    }
    async category(cat) {
      const categories = ["games", "anime manga", "memes", "movies", "music", "politics", "pranks", "reactions", "sound effects", "sports", "television", "tiktok trends", "viral", "whatsapp audios"];
      return categories.includes(cat) ? await this.scrape(`https://www.myinstants.com/en/categories/${cat}`) : (console.error("Invalid category."), categories);
    }
    async new() {
      return await this.scrape("https://www.myinstants.com/en/new/");
    }
    async fav() {
      return await this.scrape("https://www.myinstants.com/en/favorites/");
    }
    async search(query) {
      return await this.scrape(`https://www.myinstants.com/en/search/?name=${query}`);
    }
  }, Zmoai = async (prompt, identify = "f944236b0480a21d0344ad661b0bae9f", categoryId = "b8001af87354413387180815c5f250cf", styleCategoryIds = ["cdf3fddfee364bcfa31a38a9bb4d63fe"], scale = "1280x720", resolution = "1280x720", numOfImages = 1) => {
    const headers = {
        "Content-Type": "application/json",
        "App-Code": "dalle",
        identify: identify
      },
      data = {
        subject: prompt,
        categoryId: categoryId,
        styleCategoryIds: styleCategoryIds,
        scale: scale,
        resolution: resolution,
        numOfImages: numOfImages
      };
    try {
      const createResponse = await fetch("https://web-backend-prod.zmo.ai/api/v1.0/microTask/makeUp/anonymous/create", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
      if (!createResponse.ok) throw new Error(`Error creating task: ${createResponse.statusText}`);
      const {
        batchTaskId
      } = await createResponse.json(), urlGet = `https://web-backend-prod.zmo.ai/api/v1.0/microTask/makeUp/get?batchTaskId=${batchTaskId}`;
      let taskDetails, attempts = 0;
      const maxAttempts = 20;
      do {
        await new Promise(resolve => setTimeout(resolve, 1e4));
        const getResponse = await fetch(urlGet, {
          method: "GET",
          headers: headers
        });
        if (!getResponse.ok) throw new Error(`Error getting task details: ${getResponse.statusText}`);
        taskDetails = await getResponse.json(), attempts += 1;
      } while (!taskDetails.images && attempts < maxAttempts);
      if (!taskDetails.images) throw new Error("Failed to get task details after maximum attempts.");
      return taskDetails;
    } catch (error) {
      throw console.error("Error creating task or getting task details:", error), error;
    }
  }, Arthub = async (prompt, censor_nsfw = !1, nsfw = !0, cfg_scale = 7.5, height = 512, n = 1, sampler_name = "k_dpm_2", seed = "", steps = 25, width = 512, post_processing = ["RealESRGAN_x4plus"], r2 = !0, trusted_workers = !1, models = ["Deliberate"]) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6Ikd5OEFFbmtua3JCMXJhN3QiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE3MzQ1MzEyLCJpYXQiOjE3MTczNDE3MTIsImlzcyI6Imh0dHBzOi8vZml3ZHVhZWpteHd0aWRibnlveHkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjIzMDQzNGM0LWUxZTUtNDg2Zi1hYTBjLWFhYjdiYjg0MGNjMCIsImVtYWlsIjoiYWJkbWFsaWthbHFhZHJpMjAwMUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImdpdGh1YiIsInByb3ZpZGVycyI6WyJnaXRodWIiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS85MTk0NTExOT92PTQiLCJlbWFpbCI6ImFiZG1hbGlrYWxxYWRyaTIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkF5R2VtdXkiLCJpc3MiOiJodHRwczovL2FwaS5naXRodWIuY29tIiwibmFtZSI6IkF5R2VtdXkiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6IkF5R2VtdXkiLCJwcm92aWRlcl9pZCI6IjkxOTQ1MTE5Iiwic3ViIjoiOTE5NDUxMTkiLCJ1c2VyX25hbWUiOiJBeUdlbXV5In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTczNDE3MTJ9XSwic2Vzc2lvbl9pZCI6IjM1ODVjMDk1LTA5ODAtNDY3Yy05N2JiLTBmOTAzZjJiMmEwMiIsImlzX2Fub255bW91cyI6ZmFsc2V9.ioeuL0KCI-_VQOKi4cODQUZ249EAypssRXTu7NoPAYk"
      },
      data = {
        censor_nsfw: censor_nsfw,
        nsfw: nsfw,
        params: {
          cfg_scale: cfg_scale,
          height: height,
          n: n,
          sampler_name: sampler_name,
          seed: seed,
          steps: steps,
          width: width,
          post_processing: post_processing
        },
        r2: r2,
        prompt: prompt,
        trusted_workers: trusted_workers,
        models: models
      };
    try {
      const createResponse = await fetch("https://arthub-gen-worker.repalash.workers.dev/api/v1/generate", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
      if (!createResponse.ok) throw new Error(`Error creating task: ${createResponse.statusText}`);
      const {
        id: batchTaskId
      } = await createResponse.json(), urlGet = `https://arthub-gen-worker.repalash.workers.dev/api/v1/check/${batchTaskId}`;
      let taskDetails, attempts = 0;
      const maxAttempts = 20;
      do {
        await new Promise(resolve => setTimeout(resolve, 1e4));
        const getResponse = await fetch(urlGet, {
          method: "GET",
          headers: headers
        });
        if (!getResponse.ok) throw new Error(`Error getting task details: ${getResponse.statusText}`);
        taskDetails = await getResponse.json(), attempts += 1;
      } while (!taskDetails.done && attempts < maxAttempts);
      if (!taskDetails.done) throw new Error("Failed to get task details after maximum attempts.");
      return taskDetails;
    } catch (error) {
      throw console.error("Error creating task or getting task details:", error), error;
    }
  }, Limewire = async (prompt = "A cute baby sea otter", negative_prompt = "", samples = 1, quality = "LOW", guidance_scale = 50, aspect_ratio = "1:1", style = "PHOTOREALISTIC") => {
    const headers = {
        "Content-Type": "application/json",
        "X-Api-Version": "v1",
        Accept: "application/json",
        Authorization: "Bearer lmwr_sk_qVretommpl_vw8PBAgja0oO8SG20NlR0eIFQa4xGDng71utP"
      },
      body = {
        prompt: prompt,
        negative_prompt: negative_prompt,
        samples: samples,
        quality: quality,
        guidance_scale: guidance_scale,
        aspect_ratio: aspect_ratio,
        style: style
      };
    try {
      const response = await fetch("https://api.limewire.com/api/image/generation", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`Error creating task: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      throw console.error("Error creating task or getting task details:", error), error;
    }
  };
async function LumaAi(prompt = _prompt, imgFile = null, accessToken = _accessToken) {
  const url = "https://internal-api.virginia.labs.lumalabs.ai/api/photon/v1/generations/";
  const payload = {
    user_prompt: prompt,
    aspect_ratio: "16:9",
    expand_prompt: true,
    image_url: imgFile ? await LumaAiFile(accessToken, imgFile) : undefined
  };
  const headers = {
    Cookie: `access_token=${accessToken}`,
    Origin: "https://lumalabs.ai",
    Referer: "https://lumalabs.ai",
    "Content-Type": "application/json"
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  let taskDetails, attempts = 0;
  const maxAttempts = 20;
  do {
    await new Promise(resolve => setTimeout(resolve, 1e4));
    const getResponse = await fetch(`https://internal-api.virginia.labs.lumalabs.ai/api/photon/v1/generations/${result[0]?.id}`, {
      method: "GET",
      headers: headers
    });
    if (!getResponse.ok) throw new Error(`Error getting task details: ${getResponse.state}`);
    taskDetails = await getResponse.json(), attempts += 1;
  } while (!(taskDetails.state === "completed") && attempts < maxAttempts);
  if (!(taskDetails.state === "completed")) throw new Error("Failed to get task details after maximum attempts.");
  return taskDetails;
}
async function LumaAiRefresh(accessToken = _accessToken) {
  const url = "https://internal-api.virginia.labs.lumalabs.ai/api/photon/v1/user/generations/";
  const params = new URLSearchParams({
    offset: "0",
    limit: "10"
  });
  const headers = {
    Cookie: `access_token=${accessToken}`
  };
  const response = await fetch(`${url}?${params}`, {
    method: "GET",
    headers: headers
  });
  return await response.json();
}
async function LumaAiSign(accessToken = _accessToken) {
  const url = "https://internal-api.virginia.labs.lumalabs.ai/api/photon/v1/generations/file_upload";
  const params = new URLSearchParams({
    file_type: "image",
    filename: "file.jpg"
  });
  const headers = {
    Cookie: `access_token=${accessToken}`
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: params
  });
  if (!response.ok) throw new Error("Failed to get signed upload URL");
  return await response.json();
}
async function LumaAiFile(filePath, accessToken = _accessToken) {
  try {
    const {
      presigned_url,
      public_url
    } = await LumaAiSign(accessToken);
    const file = fs.readFileSync(filePath);
    const response = await fetch(presigned_url, {
      method: "PUT",
      headers: {
        "Content-Type": "image/*",
        Referer: "https://lumalabs.ai",
        Origin: "https://lumalabs.ai"
      },
      body: file
    });
    if (response.status !== 200) throw new Error("Upload failed");
    console.log("Upload successful:", public_url);
    return public_url;
  } catch (error) {
    console.error("Upload failed. Error uploading image:", error);
  }
}
async function LumaAiImg(filePath, accessToken = _accessToken) {
  const url = "https://internal-api.virginia.labs.lumalabs.ai/api/photon/v1/generations/file_upload?file_type=image&filename=file.jpg";
  const file = fs.readFileSync(filePath);
  const headers = {
    Cookie: `access_token=${accessToken}`,
    "User-Agent": "Apipost/8 (https://www.apipost.cn)"
  };
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: formData
  });
  const {
    public_url
  } = await response.json();
  console.log(public_url);
  return public_url;
}
export {
  Svgai,
  MyInstant,
  Zmoai,
  Arthub,
  Limewire,
  LumaAi,
  LumaAiRefresh,
  LumaAiFile,
  LumaAiImg
};