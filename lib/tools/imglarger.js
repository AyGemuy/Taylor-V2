import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import chalk from "chalk";
class ImgLarger {
  constructor() {
    this.baseURL = "https://get1.imglarger.com/api/Upscaler";
    this.headers = {
      Accept: "application/json, text/plain, */*",
      Origin: "https://imgupscaler.com",
      Referer: "https://imgupscaler.com/",
      "User-Agent": "Postify/1.0.0",
      "X-Forwarded-For": new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
  }
  async uploadImage(input, scaleRadio = 2, isLogin = 0) {
    const formData = new FormData();
    if (typeof input === "string") {
      if (input.startsWith("http")) {
        try {
          const response = await fetch(input);
          if (!response.ok) throw new Error("Failed to fetch image from URL");
          const buffer = await response.arrayBuffer();
          const blob = new Blob([buffer], {
            type: response.headers.get("content-type") ?? "image/jpeg",
          });
          formData.append("myfile", blob, {
            filename: "uploaded_image.jpg",
          });
        } catch (error) {
          console.error(chalk.red(error.message));
          throw new Error("Failed to download image from URL.");
        }
      } else {
        console.error(chalk.red("Invalid input. Provide a valid image URL."));
        throw new Error("Invalid input. Provide a valid image URL.");
      }
    } else if (Buffer.isBuffer(input)) {
      try {
        const fileType = await fileTypeFromBuffer(input);
        const mimeType = fileType?.mime ?? "application/octet-stream";
        const blob = new Blob([input], {
          type: mimeType,
        });
        formData.append("myfile", blob, {
          filename: "uploaded_image.jpg",
        });
      } catch (error) {
        console.error(chalk.red("Failed to determine file type."));
        throw new Error("Failed to determine file type.");
      }
    } else {
      console.error(chalk.red("Invalid input. Provide a valid image buffer."));
      throw new Error("Invalid input. Provide a valid image buffer.");
    }
    formData.append("scaleRadio", scaleRadio);
    formData.append("isLogin", isLogin);
    try {
      console.log(chalk.blue("Uploading image, please wait..."));
      const response = await fetch(`${this.baseURL}/Upload`, {
        method: "POST",
        headers: {
          ...this.headers,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image.");
      const result = await response.json();
      if (result.code === 999) {
        console.error(chalk.red("Authorization denied. Limit exceeded."));
        throw new Error("Authorization denied. Limit exceeded.");
      }
      console.log(chalk.green("Image upload completed:"), result);
      return result;
    } catch (error) {
      console.error(chalk.red(error.message));
      throw new Error("Image upload failed.");
    }
  }
  async checkStatus(uploadResponse, scaleRadio, isLogin) {
    const code = uploadResponse.data?.code ?? "";
    const payload = {
      code: code,
      scaleRadio: scaleRadio,
      isLogin: isLogin,
    };
    try {
      const response = await fetch(`${this.baseURL}/CheckStatus`, {
        method: "POST",
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to check status.");
      const result = await response.json();
      console.log(chalk.green("Status check result:"), result);
      return result;
    } catch (error) {
      console.error(chalk.red(error.message));
      throw new Error("Status check failed.");
    }
  }
  async processImage(input, scaleRadio = 2, isLogin = 0) {
    if (scaleRadio < 2 || scaleRadio > 4) {
      console.error(chalk.red("scaleRadio must be between 2 and 4."));
      throw new Error("scaleRadio must be between 2 and 4.");
    }
    const uploadResponse = await this.uploadImage(input, scaleRadio, isLogin);
    const code = uploadResponse.data?.code ?? "";
    let status;
    do {
      status = await this.checkStatus(uploadResponse, scaleRadio, isLogin);
      console.log(
        chalk.blue(`Status task: ${status.data?.status ?? "unknown"}`),
      );
      if (status.data?.status === "waiting") {
        console.log(
          chalk.yellow("Image is still being processed, please wait..."),
        );
        await this.delay(5e3);
      }
    } while (status.data?.status === "waiting");
    console.log(chalk.green("Processing complete."));
    return status;
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
export { ImgLarger };
