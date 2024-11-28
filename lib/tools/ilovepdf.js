import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
class IlovePDF {
  constructor(
    publicKey = "project_public_c14b91af1ac4799b1f229e682d664154_x5xfs2fff307d4bde7d8b8b6bef3a0f2a9391",
  ) {
    this.publicKey = publicKey;
    this.baseUrl = "https://api.ilovepdf.com/v1/";
  }
  async getAuthToken() {
    const url = this.baseUrl + "auth";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_key: this.publicKey,
      }),
    });
    const data = await response.json();
    return data.token;
  }
  async startTask(tool) {
    const url = `${this.baseUrl}start/${tool}`;
    const token = await this.getAuthToken();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return [data.server, data.task];
  }
  async uploadFile(server, task, fileArrayBuffer) {
    const url = `https://${server}/v1/upload`;
    const formData = new FormData();
    const fileType = await fileTypeFromBuffer(fileArrayBuffer);
    formData.append(
      "file",
      new Blob([fileArrayBuffer], {
        type: fileType?.mime,
      }),
      `inputfile.${fileType?.ext || "bin"}`,
    );
    formData.append("task", task);
    const token = await this.getAuthToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data.server_filename;
  }
  getOutputExtension(tool) {
    const extensions = {
      compress: "pdf",
      extract: "pdf",
      htmlpdf: "pdf",
      imagepdf: "pdf",
      merge: "pdf",
      officepdf: "pdf",
      pagenumber: "pdf",
      pdfa: "pdf",
      pdfjpg: "jpg",
      pdfocr: "pdf",
      protect: "pdf",
      repair: "pdf",
      rotate: "pdf",
      split: "pdf",
      unlock: "pdf",
      validatepdfa: "pdf",
      watermark: "pdf",
      compressimage: "jpg",
      cropimage: "jpg",
      convertimage: "jpg",
      removebackgroundimage: "png",
      repairimage: "jpg",
      resizeimage: "jpg",
    };
    return extensions[tool] || "pdf";
  }
  async processFile(server, task, serverFilename, tool, payload = {}) {
    const url = `https://${server}/v1/process`;
    const token = await this.getAuthToken();
    const outputExtension = this.getOutputExtension(tool);
    const body = JSON.stringify({
      task: task,
      tool: tool,
      files: [
        {
          server_filename: serverFilename,
          filename: `output.${outputExtension}`,
        },
      ],
      ...payload,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
    return await response.json();
  }
  async downloadFile(server, task) {
    const url = `https://${server}/v1/download/${task}`;
    const token = await this.getAuthToken();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.arrayBuffer();
  }
  async process(mediaBuffer, tool, payload) {
    try {
      const [server, task] = await this.startTask(tool);
      const serverFilename = await this.uploadFile(server, task, mediaBuffer);
      const processResult = await this.processFile(
        server,
        task,
        serverFilename,
        tool,
        payload,
      );
      const fileBuffer = await this.downloadFile(server, task);
      return {
        processResult: processResult,
        fileBuffer: fileBuffer,
      };
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  }
}
export { IlovePDF };
