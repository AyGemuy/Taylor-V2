import fetch from "node-fetch";
import crypto from "crypto";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import axios from "axios";
import uploadImage from "../uploadImage.js";
const randomBytes = crypto.randomBytes(8).toString("base64").replace(/[/+=]/g, ""),
  getUrlFromInput = async input => {
    if (Buffer.isBuffer(input)) {
      const {
        ext,
        mime
      } = await fileTypeFromBuffer(input) || {
        ext: "jpg",
        mime: "image/jpg"
      }, formData = new FormData();
      return formData.append("file", new Blob([input], {
        type: mime
      }), `${randomBytes}.${ext}`), await uploadImage(formData);
    }
    return input;
  }, RemoveBackground = async input => {
    try {
      let media, mime;
      if (Buffer.isBuffer(input)) media = input, {
        mime
      } = await fileTypeFromBuffer(input) || {
        mime: "image/jpg"
      };
      else {
        const response = await fetch(input);
        media = await response.arrayBuffer(), {
          mime
        } = await fileTypeFromBuffer(media) || {
          mime: "image/jpg"
        };
      }
      const formData = new FormData();
      formData.append("image", new Blob([media], {
        type: mime
      }), `${randomBytes}.jpg`);
      return (await axios.post("https://api.pixian.ai/api/v2/remove-background", formData, {
        auth: {
          username: "px3j2tc79h56pfg",
          password: "t01ahvv1cl98liqfa5ac57csf6seho8b47spe4v7kt57hmhr6527"
        },
        responseType: "arraybuffer"
      })).data;
    } catch (error) {
      throw console.error("Error:", error), new Error("An error occurred while processing the image.");
    }
  }, RemoveBackgroundV2 = async input => {
    try {
      const url = await getUrlFromInput(input),
        response = await fetch(url),
        media = await response.arrayBuffer(),
        {
          mime
        } = await fileTypeFromBuffer(media) || {
          mime: "image/jpg"
        },
        apiResponse = await fetch("https://api.simplified.com/api/v1/growth-tools", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            action: "REMOVE_BACKGROUND",
            image_url: url,
            image_type: mime
          })
        }),
        {
          task_id
        } = await apiResponse.json();
      for (;;) {
        const taskResponse = await fetch(`https://api.simplified.com/api/v1/tasks/${task_id}`),
          {
            info
          } = await taskResponse.json();
        if (info) return info.data.url;
      }
    } catch (error) {
      throw console.error("Error:", error), new Error("An error occurred while processing the image.");
    }
  };
export {
  RemoveBackground,
  RemoveBackgroundV2
};