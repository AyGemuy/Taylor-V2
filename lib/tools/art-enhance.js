import fetch from "node-fetch";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import Replicate from "replicate";
import crypto from "crypto";
class ImageProcessor {
  constructor({
    token = "",
    replicate = ""
  }) {
    this.token = token, this.replicate = replicate;
  }
  async colorizePicture(filename, content) {
    try {
      const endpoint = "https://api.hotpot.ai/colorize-picture",
        payload = {
          requestId: `${this.generateRequestId()}`,
          renderFactor: "20"
        },
        blob = new Blob([content], {
          type: "image/jpeg"
        }),
        formData = new FormData();
      formData.append("image", blob, {
        filename: filename
      });
      const headers = {
          Authorization: this.token,
          ...formData.getHeaders()
        },
        response = await this.sendRequest(endpoint, "POST", headers, payload, formData);
      return await response.arrayBuffer();
    } catch (error) {
      throw new Error(`Error processing image: ${error.message}`);
    }
  }
  async restorePicture(filename, content, withScratch = !1) {
    try {
      const endpoint = "https://api.hotpot.ai/restore-picture",
        payload = {
          requestId: `${this.generateRequestId()}`,
          withScratch: withScratch
        },
        blob = new Blob([content], {
          type: "image/jpeg"
        }),
        formData = new FormData();
      formData.append("image", blob, {
        filename: filename
      });
      const headers = {
          Authorization: this.token,
          ...formData.getHeaders()
        },
        response = await this.sendRequest(endpoint, "POST", headers, payload, formData);
      return await response.arrayBuffer();
    } catch (error) {
      throw new Error(`Error restoring picture: ${error.message}`);
    }
  }
  async removeBackground(content) {
    try {
      const fileType = await fileTypeFromBuffer(content);
      if (!fileType || !fileType.mime.startsWith("image/")) throw new Error("Invalid file type. Only image files are supported.");
      const base64Image = Buffer.from(content).toString("base64"),
        payload = JSON.stringify({
          image: "data:image/" + fileType.ext + ";base64," + base64Image
        }),
        headers = {
          "Content-Type": "application/json"
        },
        endpoint = "https://backend.zyro.com/v1/ai/remove-background",
        response = await this.sendRequest(endpoint, "POST", headers, payload),
        encodedString = response.result.split(",")[1];
      return Buffer.from(encodedString, "base64");
    } catch (error) {
      throw new Error(`Error removing background: ${error.message}`);
    }
  }
  async upscaleImage(content) {
    try {
      const fileType = await fileTypeFromBuffer(content);
      if (!fileType || !fileType.mime.startsWith("image/")) throw new Error("Invalid file type. Only image files are supported.");
      const base64Image = Buffer.from(content).toString("base64"),
        payload = JSON.stringify({
          image: "data:image/" + fileType.ext + ";base64," + base64Image
        }),
        headers = {
          "Content-Type": "application/json"
        },
        endpoint = "https://backend.zyro.com/v1/ai/upscale-image",
        response = await this.sendRequest(endpoint, "POST", headers, payload),
        encodedString = response.result.split(",")[1];
      return Buffer.from(encodedString, "base64");
    } catch (error) {
      throw new Error(`Error upscaling image: ${error.message}`);
    }
  }
  async artEnhance(img) {
    try {
      const replicate = new Replicate({
          auth: this.replicate
        }),
        model = "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
        input = {
          img: img
        },
        output = await replicate.run(model, {
          input: input
        });
      return Buffer.from(output, "base64").buffer;
    } catch (error) {
      throw new Error(`Error enhancing art: ${error.message}`);
    }
  }
  async sendRequest(url, method, headers, data, formData = null) {
    const requestOptions = {
        method: method,
        headers: headers,
        body: "POST" === method && formData ? formData : data
      },
      response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  }
  generateRequestId() {
    return crypto.randomBytes(8).toString("hex");
  }
}
export {
  ImageProcessor
};