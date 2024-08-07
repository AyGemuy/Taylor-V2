import fetch from "node-fetch";
import crypto from "crypto";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import chalk from "chalk";
import ora from "ora";
class FineShare {
  spinner;
  token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI5MGZlNzllYS0yODExLTRiMjctYWU0ZS1hZGMzNGFhZDM2NzMiLCJ1c2VyQWNjb3VudCI6InZvaWNlQGZpbmVzaGFyZS5jb20ifQ.AO9q9TKXZ79G6oH70YX5ypOGuSBcLP7K4wEDGIzrDDw";
  constructor() {
    this.spinner = ora({
      text: "FineShare",
      spinner: "moon"
    });
  }
  async voiceDetail(voicename) {
    try {
      const url = `https://voiceai.fineshare.com/api/getv2voicedetail?voice=${voicename}`,
        options = {
          method: "GET",
          headers: {
            Authorization: this.token
          }
        };
      this.spinner.text = chalk.yellow.bold("Process:") + chalk.white(" Detail Voice request..."),
        this.spinner.render();
      const response = await fetch(url, options),
        data = await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" Detail Voice request.")),
        data || {};
    } catch (error) {
      return this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error)), [];
    }
  }
  async myVoice(page) {
    try {
      const url = `https://voiceai.fineshare.com/api/listmyvoicefiles?page=${page}&limit=10&status=4`,
        options = {
          method: "GET",
          headers: {
            Authorization: this.token
          }
        };
      this.spinner.text = chalk.green.bold("Process:") + chalk.white(" List My Voice request..."),
        this.spinner.render();
      const response = await fetch(url, options),
        data = await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" List My Voice request.")),
        data || {};
    } catch (error) {
      return this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error)), null;
    }
  }
  async pageVoice(category, gender, language, page, limit) {
    category = category || "all", gender = gender || "all", language = language || "all",
      page = page || "all", limit = limit || 10;
    try {
      const url = `https://converter.fineshare.com/api/pagevoices?categroy=${category}&gender=${gender}&language=${language}&page=${page}&limit=${limit}`,
        options = {
          method: "GET",
          headers: {
            Authorization: this.token
          }
        };
      this.spinner.text = chalk.green.bold("Process:") + chalk.white(" List Page Voice request..."),
        this.spinner.render();
      const response = await fetch(url, options),
        data = await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" List Page Voice request.")),
        data || {};
    } catch (error) {
      return this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error)), null;
    }
  }
  async voiceRemove(uuid) {
    try {
      const url = "https://voiceai.fineshare.com/api/removesong",
        options = {
          method: "POST",
          headers: {
            Authorization: this.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            uuid: uuid,
            status: 6
          })
        };
      this.spinner.text = chalk.blue.bold("Process:") + chalk.white(" Voice Remove request..."),
        this.spinner.render();
      const response = await fetch(url, options),
        data = await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" Voice Remove request.")),
        data;
    } catch (error) {
      this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error));
    }
  }
  async userUsage() {
    try {
      const url = "https://usage.fineshare.com/api/getmyusage",
        options = {
          method: "POST",
          headers: {
            Authorization: this.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            appId: "107"
          })
        };
      this.spinner.text = chalk.blue.bold("Process:") + chalk.white(" User Usage request..."),
        this.spinner.render();
      const response = await fetch(url, options),
        data = await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" User Usage request.")),
        data;
    } catch (error) {
      this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error));
    }
  }
  async voiceChanger(voicename, audiofile) {
    try {
      const url = "https://voiceai.fineshare.com/api/createaudiofilechanger",
        options = {
          method: "POST",
          headers: {
            Authorization: this.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            voice: voicename
          })
        };
      this.spinner.text = chalk.blue.bold("Process:") + chalk.white(" Voice Changer request..."),
        this.spinner.render();
      const response = await fetch(url, options),
        data = await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" Voice Changer request.")),
        await this.voiceUpload(data.uuid, data.endpoint, audiofile, voicename, data.type);
    } catch (error) {
      this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error));
    }
  }
  async voiceUpload(uuid, host, audio, name, type) {
    try {
      const {
        ext,
        mime
      } = await fileTypeFromBuffer(audio) || {}, blob = new Blob([audio], {
        type: mime
      }), formData = new FormData();
      formData.append("audioFile", blob, `${crypto.randomBytes(5).toString("hex")}.${ext}`);
      const url = `https://${host}/api/uploadaudiofile/${uuid}`,
        options = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: this.token,
            "Changer-Type": type
          }
        };
      this.spinner.text = chalk.magenta.bold("Process:") + chalk.white(" Voice Upload request..."),
        this.spinner.render();
      const response = await fetch(url, options);
      await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" Voice Upload request.")),
        await this.voiceStart(uuid, name, 0);
    } catch (error) {
      this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error));
    }
  }
  async voiceStart(uuid, voice, pitch) {
    try {
      const url = "https://voiceai.fineshare.com/api/changeaudiofile",
        options = {
          method: "POST",
          headers: {
            Authorization: this.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            voice: voice,
            uuid: uuid,
            pitch: pitch
          })
        };
      this.spinner.text = chalk.cyan.bold("Process:") + chalk.white(" Voice Start request..."),
        this.spinner.render();
      const response = await fetch(url, options);
      await response.json();
      return this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" Voice Start request.")),
        await this.getvoiceResult(uuid);
    } catch (error) {
      this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error));
    }
  }
  async getvoiceResult(uuid) {
    let dataUrl, attempts = 0;
    do {
      try {
        const url = `https://voiceai.fineshare.com/api/checkfilechangestatus/${uuid}`,
          options = {
            method: "GET",
            headers: {
              Authorization: this.token
            }
          };
        this.spinner.text = chalk.red.bold("Process:") + chalk.white(" Get Voice Result request..."),
          this.spinner.render();
        const response = await fetch(url, options),
          data = await response.json();
        data.url ? (this.spinner.succeed(chalk.green.bold("Success:") + chalk.white(" Get Voice Result request.")), dataUrl = data.url) : (this.spinner.text = "Waiting for URL...", this.spinner.render(), await new Promise(resolve => setTimeout(resolve, 1e3)));
      } catch (error) {
        this.spinner.fail(chalk.red.bold("Error:") + chalk.white(" " + error)), await new Promise(resolve => setTimeout(resolve, 1e3));
      }
      attempts++;
    } while (!dataUrl && attempts < 10);
    return dataUrl ? (this.spinner.succeed("Final URL:"), console.log("  - " + decodeURIComponent(dataUrl))) : this.spinner.fail("Exceeded maximum attempts. Unable to retrieve URL."),
      decodeURIComponent(dataUrl) || null;
  }
}
export {
  FineShare
};