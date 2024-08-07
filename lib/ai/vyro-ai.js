import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import {
  fetch
} from "undici";
import crypto from "crypto";
class VyroAI {
  constructor({
    key = "vk-dk3DMbasbyjxOeOVu9k8lqnDAiKYs1NaqMEOBT6kwzHJS",
    link = !0,
    buffer = !0
  }) {
    this.baseUrl = "https://api.vyro.ai/v1/imagine/api/", this.commonHeaders = {
      Authorization: `Bearer ${key}`
    }, this.defaultOptions = {
      url: link,
      buffer: buffer
    };
  }
  async catbox(content) {
    try {
      const {
        ext,
        mime
      } = await fileTypeFromBuffer(content) || {}, blob = new Blob([content], {
        type: mime
      }), formData = new FormData(), randomBytes = crypto.randomBytes(5).toString("hex");
      formData.append("reqtype", "fileupload"), formData.append("fileToUpload", blob, randomBytes + "." + ext);
      const uploadURL = "https://catbox.moe/user/api.php",
        response = await fetch(uploadURL, {
          method: "POST",
          body: formData,
          headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
          }
        });
      return await response.text() || null;
    } catch (e) {
      throw e;
    }
  }
  async makeRequest(url, formdata, options = {}) {
    const requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          ...this.commonHeaders
        }
      },
      mergedOptions = {
        ...this.defaultOptions,
        ...options
      };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error(`Failed to make request. Status: ${response.status}`);
      return mergedOptions.url && !mergedOptions.buffer ? {
        link: await this.catbox(await response.arrayBuffer())
      } : !mergedOptions.url && mergedOptions.buffer ? {
        buffer: Buffer.from(await response.arrayBuffer())
      } : mergedOptions.url && mergedOptions.buffer ? {
        buffer: Buffer.from(await response.arrayBuffer()),
        link: await this.catbox(await response.arrayBuffer())
      } : null;
    } catch (error) {
      throw new Error(`Error making request: ${error.message}`);
    }
  }
  async generateImage(prompt, styleId) {
    const url = `${this.baseUrl}generations`,
      formdata = new FormData();
    return formdata.append("prompt", prompt), formdata.append("style_id", styleId),
      await this.makeRequest(url, formdata);
  }
  async remixImage(prompt, styleId, imageBuffer) {
    const url = `${this.baseUrl}edits/remix`,
      {
        mime
      } = await fileTypeFromBuffer(imageBuffer) || {},
      image = new Blob([imageBuffer.toArrayBuffer()], {
        type: mime
      }),
      formdata = new FormData();
    return formdata.append("style_id", styleId), formdata.append("prompt", prompt),
      formdata.append("image", image), await this.makeRequest(url, formdata);
  }
  async inpaintImage(prompt, imageBuffer, maskBuffer) {
    const url = `${this.baseUrl}edits/inpaint`,
      img = await fileTypeFromBuffer(imageBuffer) || {},
      image = new Blob([imageBuffer.toArrayBuffer()], {
        type: img.mime
      }),
      msk = await fileTypeFromBuffer(maskBuffer) || {},
      mask = new Blob([maskBuffer.toArrayBuffer()], {
        type: msk.mime
      }),
      formdata = new FormData();
    return formdata.append("prompt", prompt), formdata.append("image", image), formdata.append("mask", mask),
      await this.makeRequest(url, formdata);
  }
  async upscaleImage(imageBuffer) {
    const url = `${this.baseUrl}upscale`,
      {
        mime
      } = await fileTypeFromBuffer(imageBuffer) || {},
      image = new Blob([imageBuffer.toArrayBuffer()], {
        type: mime
      }),
      formdata = new FormData();
    return formdata.append("image", image), await this.makeRequest(url, formdata);
  }
  async generateVariations(prompt, styleId, imageBuffer) {
    const url = `${this.baseUrl}generations/variations`,
      {
        mime
      } = await fileTypeFromBuffer(imageBuffer) || {},
      image = new Blob([imageBuffer.toArrayBuffer()], {
        type: mime
      }),
      formdata = new FormData();
    return formdata.append("style_id", styleId), formdata.append("prompt", prompt),
      formdata.append("image", image), await this.makeRequest(url, formdata);
  }
  async removeBackground(imageBuffer) {
    const url = `${this.baseUrl}background/remover`,
      {
        mime
      } = await fileTypeFromBuffer(imageBuffer) || {},
      image = new Blob([imageBuffer.toArrayBuffer()], {
        type: mime
      }),
      formdata = new FormData();
    return formdata.append("image", image), await this.makeRequest(url, formdata);
  }
}
export {
  VyroAI
};