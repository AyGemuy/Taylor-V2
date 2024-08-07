import fetch from "node-fetch";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
class Doodstream {
  constructor(fileBuffer, api_key) {
    void 0 !== api_key && void 0 !== fileBuffer && (this.api_key = api_key, this.fileBuffer = fileBuffer);
  }
  async init() {
    if (void 0 === this.api_key || void 0 === this.fileBuffer) return !1;
    try {
      return this.uploadUrl = await this.getLink(), this.result = await this.upload(),
        this.result;
    } catch (error) {
      return !1;
    }
  }
  async getLink() {
    const response = await fetch(`https://doodapi.com/api/upload/server?key=${this.api_key}`);
    return (await response.json()).result;
  }
  async upload() {
    const {
      ext,
      mime
    } = await fileTypeFromBuffer(this.fileBuffer) || {};
    if (!ext || !mime) throw new Error("Tipe file tidak dapat diidentifikasi");
    const formData = new FormData(),
      blob = new Blob([this.fileBuffer.buffer], {
        type: mime
      });
    formData.append("type", "submit"), formData.append("api_key", this.api_key), formData.append("file", blob, `tmp.${ext}`);
    const options = {
        method: "POST",
        body: formData
      },
      response = await fetch(this.uploadUrl, options);
    return (await response.json()).result[0].protected_embed;
  }
}
export {
  Doodstream
};