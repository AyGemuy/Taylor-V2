import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
const headers = {
  Authority: "sara.study",
  Accept: "application/json",
  Origin: "https://sara.study",
  Referer: "https://sara.study/",
  "User-Agent": "Postify/1.0.0",
  "X-Forwarded-For": new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join("."),
  "Content-Type": "application/x-www-form-urlencoded",
};
const SaraStudyAI = {
  async chat(question) {
    try {
      const formData = new URLSearchParams({
        question: chat,
      });
      const response = await fetch("https://sara.study/api/questions", {
        method: "POST",
        headers: headers,
        body: formData,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(await response.text());
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async image(img) {
    try {
      const imgb =
        typeof img === "string" && img.startsWith("http")
          ? await (await fetch(img)).arrayBuffer()
          : img;
      const buffer = Buffer.isBuffer(imgb)
        ? imgb
        : await fileTypeFromBuffer(imgb);
      const { ext, mime } = (await fileTypeFromBuffer(buffer)) || {
        ext: "jpg",
        mime: "image/jpeg",
      };
      const formData = new FormData();
      formData.append(
        "image",
        new Blob([buffer], {
          type: mime,
        }),
        `${uuidv4()}.${ext}`,
      );
      const response = await fetch("https://sara.study/api/questions", {
        method: "POST",
        headers: {
          Authority: "sara.study",
          Origin: "https://sara.study",
          Referer: "https://sara.study/",
          "User-Agent": "Postify/1.0.0",
          "X-Forwarded-For": new Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * 256))
            .join("."),
        },
        body: formData,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(await response.text());
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
export { SaraStudyAI };
