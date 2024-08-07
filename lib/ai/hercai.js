"use strict";
import axios from "axios";
const baseurl = "https://hercai.onrender.com/v2/hercai";
class Hercai {
  constructor() {}
  async question({
    model = "v2",
    content
  }) {
    if (["v2", "beta", "v3-beta"].some(ind => model === ind) || (model = "v2"), !content || null == content) throw new Error("Please specify a question!");
    try {
      return (await axios.get(`https://hercai.onrender.com/${model}/hercai?question=` + encodeURI(content), {
        headers: {
          "content-type": "application/json"
        }
      })).data;
    } catch (err) {
      throw new Error("Error: " + err.message);
    }
  }
  async drawImage({
    model = "v1",
    prompt
  }) {
    if (["v1", "v2", "v2-beta", "v3", "lexica", "prodia"].some(ind => model === ind) || (model = "prodia"), !prompt || null == prompt) throw new Error("Please specify a prompt!");
    try {
      return (await axios.get(`https://hercai.onrender.com/${model}/text2image?prompt=` + encodeURI(prompt), {
        headers: {
          "content-type": "application/json"
        }
      })).data;
    } catch (err) {
      throw new Error("Error: " + err.message);
    }
  }
}
export default Hercai;