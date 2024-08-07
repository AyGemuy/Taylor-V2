import fetch from "node-fetch";
export const Prodia = (api_key = "dc80a8a4-0b98-4d54-b3e4-b7c797bc2527") => {
  const base = "https://api.prodia.com/v1";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Prodia-Key": api_key
  };
  const sendRequest = async ({
    link,
    method,
    params
  }) => {
    try {
      const url = new URL(`${base}${link}`);
      const options = {
        method: method,
        headers: headers
      };
      if (method === "GET" && params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      } else if (params) {
        options.body = JSON.stringify(params);
      }
      const response = await fetch(url.toString(), options);
      const data = await response.json();
      if (!response.ok) {
        const errorMessages = {
          400: "The provided parameters are invalid.",
          401: "The provided API key is invalid.",
          402: "The API key is not enabled."
        };
        throw new Error(errorMessages[response.status] || "Failed to receive a valid response.");
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {
    generateImage: async params => await sendRequest({
      link: "/sd/generate",
      method: "POST",
      params: params
    }),
    transform: async params => await sendRequest({
      link: "/sd/transform",
      method: "POST",
      params: params
    }),
    inpainting: async params => await sendRequest({
      link: "/sd/inpaint",
      method: "POST",
      params: params
    }),
    controlNet: async params => await sendRequest({
      link: "/sd/controlnet",
      method: "POST",
      params: params
    }),
    generateImageSDXL: async params => await sendRequest({
      link: "/sdxl/generate",
      method: "POST",
      params: params
    }),
    transformSDXL: async params => await sendRequest({
      link: "/sdxl/transform",
      method: "POST",
      params: params
    }),
    inpaintingSDXL: async params => await sendRequest({
      link: "/sdxl/inpaint",
      method: "POST",
      params: params
    }),
    upscale: async params => await sendRequest({
      link: "/upscale",
      method: "POST",
      params: params
    }),
    faceSwap: async params => await sendRequest({
      link: "/faceswap",
      method: "POST",
      params: params
    }),
    faceRestore: async params => await sendRequest({
      link: "/facerestore",
      method: "POST",
      params: params
    }),
    getJob: async job_id => await sendRequest({
      link: `/job/${job_id}`,
      method: "GET"
    }),
    getModels: async () => await sendRequest({
      link: "/sd/models",
      method: "GET"
    }),
    getSDXLModels: async () => await sendRequest({
      link: "/sdxl/models",
      method: "GET"
    }),
    getSamplers: async () => await sendRequest({
      link: "/sd/samplers",
      method: "GET"
    }),
    getSDXLSamplers: async () => await sendRequest({
      link: "/sdxl/samplers",
      method: "GET"
    }),
    getLoras: async () => await sendRequest({
      link: "/sd/loras",
      method: "GET"
    }),
    getSDXLLoras: async () => await sendRequest({
      link: "/sdxl/loras",
      method: "GET"
    }),
    getEmbeddings: async () => await sendRequest({
      link: "/sd/embeddings",
      method: "GET"
    }),
    getSDXLEmbeddings: async () => await sendRequest({
      link: "/sdxl/embeddings",
      method: "GET"
    }),
    wait: async job => {
      let res = job;
      while (res.status !== "succeeded") {
        await new Promise(resolve => setTimeout(resolve, 250));
        if (res.status === "failed") throw new Error("Failed to generate image.");
        res = await sendRequest({
          link: `/job/${job.job}`,
          method: "GET"
        });
      }
      return res;
    }
  };
};