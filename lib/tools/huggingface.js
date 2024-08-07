import axios from "axios";
import fetch from "node-fetch";
const API_TOKEN = "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",
  BASE_URL = "https://api-inference.huggingface.co/models/",
  STATUS_URL = "https://huggingface.co/api/models",
  commonAxiosOptions = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    }
  };
export const getStatusModels = async query => {
  const fullUrl = `${STATUS_URL}?search=${query}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET"
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error with fetch:", error);
    try {
      const axiosResponse = await axios.get(fullUrl, commonAxiosOptions);
      if (200 !== axiosResponse.status) throw new Error("Axios request failed");
      return axiosResponse.data;
    } catch (axiosError) {
      return console.error("Error with Axios:", axiosError), null;
    }
  }
};
export const HuggingFace = async (MODEL, INPUT) => {
  const apiUrl = `${BASE_URL}${MODEL}`,
    fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: INPUT,
        options: {
          wait_for_model: !0
        }
      })
    };
  try {
    const response = await fetch(apiUrl, fetchOptions);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error with fetch:", error);
    try {
      const axiosResponse = await axios.post(apiUrl, {
        inputs: INPUT,
        options: {
          wait_for_model: !0
        }
      }, commonAxiosOptions);
      if (200 !== axiosResponse.status) throw new Error("Axios request failed");
      return axiosResponse.data;
    } catch (axiosError) {
      return console.error("Error with Axios:", axiosError), null;
    }
  }
};
export const HuggingFaceBuffer = async (MODEL, INPUT) => {
  const apiUrl = `${BASE_URL}${MODEL}`,
    fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: INPUT,
        options: {
          wait_for_model: !0
        }
      })
    };
  try {
    const response = await fetch(apiUrl, fetchOptions);
    if (!response.ok) throw new Error("Network response was not ok");
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error with fetch:", error);
    try {
      const axiosResponse = await axios.post(apiUrl, {
        inputs: INPUT,
        options: {
          wait_for_model: !0
        }
      }, {
        ...commonAxiosOptions,
        responseType: "arraybuffer"
      });
      if (200 !== axiosResponse.status) throw new Error("Axios request failed");
      const arrayBuffer = axiosResponse.data;
      return Buffer.from(arrayBuffer);
    } catch (axiosError) {
      return console.error("Error with Axios:", axiosError), null;
    }
  }
};