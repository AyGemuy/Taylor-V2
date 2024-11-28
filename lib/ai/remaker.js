import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import fetch from "node-fetch";
class RemakerAi {
  constructor(
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwOTY4MjMsInByb2R1Y3RfY29kZSI6IjA2NzAwMyIsInRpbWUiOjE3MjU3OTc3ODl9.JCa-FpsS9dEpZj5g0kg-gcIHID1b_Vig71cThP0Xm4M",
  ) {
    this.headers = {
      Authorization: token,
      "Product-Code": "067003",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://remaker.ai/",
    };
  }
  async enhance(imageBuffer) {
    try {
      const formData = new FormData();
      const blob = new Blob([imageBuffer], {
        type: await this.getFileType(imageBuffer),
      });
      formData.append("image_file", blob, "remaker.jpg");
      const response = await fetch(
        "https://developer.remaker.ai/api/remaker/v1/ai-enhance/create-job",
        {
          method: "POST",
          body: formData,
          headers: this.headers,
        },
      );
      const { result } = await response.json();
      const jobId = result.job_id;
      return await this.pollForResult(jobId);
    } catch (error) {
      console.error("Error in upscaler:", error);
      throw error;
    }
  }
  async getFileType(imageBuffer) {
    try {
      const type = await fileTypeFromBuffer(imageBuffer);
      return type ? type.mime : "image/jpeg";
    } catch (error) {
      console.error("Error in getFileType:", error);
      throw error;
    }
  }
  async pollForResult(jobId) {
    try {
      const interval = 3e3;
      let attempts = 0;
      while (attempts < 60) {
        const output = await fetch(
          `https://developer.remaker.ai/api/remaker/v1/ai-enhance/${jobId}`,
          {
            method: "GET",
            headers: this.headers,
          },
        );
        const result = await output.json();
        if (result.result !== null) {
          return result;
        }
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
      throw new Error("Polling timed out after 1 minute.");
    } catch (error) {
      console.error("Error in pollForResult:", error);
      throw error;
    }
  }
  async swap(targetImageBuffer, swapImageBuffer) {
    try {
      const formData = new FormData();
      const targetBlob = new Blob([targetImageBuffer], {
        type: await this.getFileType(targetImageBuffer),
      });
      const swapBlob = new Blob([swapImageBuffer], {
        type: await this.getFileType(swapImageBuffer),
      });
      formData.append("target_image", targetBlob, "target.jpg");
      formData.append("swap_image", swapBlob, "swap.jpg");
      const response = await fetch(
        "https://developer.remaker.ai/api/remaker/v1/face-swap/create-job",
        {
          method: "POST",
          body: formData,
          headers: this.headers,
        },
      );
      const { result } = await response.json();
      const jobId = result.job_id;
      return await this.pollForResult(jobId);
    } catch (error) {
      console.error("Error in faceSwap:", error);
      throw error;
    }
  }
  async swapvideo(
    targetVideoUrl = "https://pai-data-5f568.oss-us-west-1.aliyuncs.com/test/mda-pi8ndtq6h3gkkic7.mp4",
    swapImageBuffer,
  ) {
    try {
      const formData = new FormData();
      formData.append("target_video_url", targetVideoUrl);
      const swapImageBlob = new Blob([swapImageBuffer], {
        type: await this.getFileType(swapImageBuffer),
      });
      formData.append("swap_image", swapImageBlob, "images.jpg");
      const response = await fetch(
        "https://developer.remaker.ai/api/remaker/v1/face-swap-video/create-job",
        {
          method: "POST",
          body: formData,
          headers: this.headers,
        },
      );
      const { result } = await response.json();
      const jobId = result.job_id;
      return await this.pollForResult(jobId);
    } catch (error) {
      console.error("Error in faceSwapVideo:", error);
      throw error;
    }
  }
  async portrait(
    imageBuffers,
    styleName = "Photographic (Default)",
    prompt,
    negativePrompt,
    advanced = 1,
    styleStrengthRatio = 15,
    numOutputs = 2,
  ) {
    try {
      const formData = new FormData();
      formData.append("style_name", styleName);
      formData.append("prompt", prompt);
      formData.append("negative_prompt", negativePrompt);
      formData.append("advanced", advanced);
      formData.append("style_strength_ratio", styleStrengthRatio);
      formData.append("num_outputs", numOutputs);
      for (const imageBuffer of imageBuffers) {
        const imageBlob = new Blob([imageBuffer], {
          type: await this.getFileType(imageBuffer),
        });
        formData.append(
          "image_file",
          imageBlob,
          `image_${imageBuffers.indexOf(imageBuffer) + 1}.png`,
        );
      }
      const response = await fetch(
        "https://developer.remaker.ai/api/remaker/v1/ai-portrait/create-job",
        {
          method: "POST",
          body: formData,
          headers: this.headers,
        },
      );
      const { result } = await response.json();
      const jobId = result.job_id;
      return await this.pollForResult(jobId);
    } catch (error) {
      console.error("Error in aiPortrait:", error);
      throw error;
    }
  }
  async baby(dadPhotoBuffer, momPhotoBuffer, gender = "boy", numOutputs = 4) {
    try {
      const formData = new FormData();
      formData.append("gender", gender);
      formData.append("num_outputs", numOutputs);
      const dadPhotoBlob = new Blob([dadPhotoBuffer], {
        type: await this.getFileType(dadPhotoBuffer),
      });
      formData.append("dad_photo", dadPhotoBlob, "dad.jpg");
      const momPhotoBlob = new Blob([momPhotoBuffer], {
        type: await this.getFileType(momPhotoBuffer),
      });
      formData.append("mom_photo", momPhotoBlob, "mom.jpg");
      const response = await fetch(
        "https://developer.remaker.ai/api/remaker/v1/ai-baby/create-job",
        {
          method: "POST",
          body: formData,
          headers: this.headers,
        },
      );
      const { result } = await response.json();
      const jobId = result.job_id;
      return await this.pollForResult(jobId);
    } catch (error) {
      console.error("Error in aiBaby:", error);
      throw error;
    }
  }
  async videoenhancer(
    targetVideo = "https://pai-data-5f568.oss-us-west-1.aliyuncs.com/test/mda-pi8ndtq6h3gkkic7.mp4",
  ) {
    try {
      const formData = new FormData();
      formData.append("target_video_url", targetVideo);
      const response = await fetch(
        "https://developer.remaker.ai/api/remaker/v1/ai-video-enhancer/create-job",
        {
          method: "POST",
          body: formData,
          headers: this.headers,
        },
      );
      const { result } = await response.json();
      const jobId = result.job_id;
      return await this.pollForResult(jobId);
    } catch (error) {
      console.error("Error in videoEnhance:", error);
      throw error;
    }
  }
}
export const remaker = new RemakerAi();
