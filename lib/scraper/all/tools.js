import axios from "axios";
import cheerio from "cheerio";
import FormData from "form-data";
class Tools {
  elevenModel = name => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get("https://api.elevenlabs.io/v1/voices");
      const voice = data.voices.find(v => v.name === name);
      if (!voice) resolve({
        status: false,
        msg: "Voive Not Found",
        voive: data.voices.map(x => {
          return x.name;
        })
      });
      else resolve({
        status: true,
        id: voice.voice_id
      });
    });
  };
  soundText = (text, voice) => {
    return new Promise((resolve, reject) => {
      axios.post("https://api.soundoftext.com/sounds", {
        engine: "Google",
        data: {
          text: text,
          voice: voice
        }
      }, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36",
          Referer: "https://soundoftext.com/"
        },
        compress: true
      }).then(response => {
        const {
          id
        } = response.data;
        axios.get("https://api.soundoftext.com/sounds/" + id, {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36",
            Referer: "https://soundoftext.com/"
          }
        }).then(data => {
          console.log(data.data);
        });
      }).catch(error => {
        console.error("Error:", error);
        reject(new Eror(error));
      });
    });
  };
  detectLang = text => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("https://detectlanguage.com/demo", {
          q: text
        }, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36",
            Referer: "https://detectlanguage.com/"
          },
          compress: true
        });
        const $ = cheerio.load(response.data);
        const result = {};
        $("table.table tr th").each((index, el) => {
          const param = $(el).text().toLowerCase();
          const value = $("table.table td").eq(index).text();
          result[param] = value;
        });
        resolve(result);
      } catch (error) {
        console.error(error);
        reject(new Error(error));
      }
    });
  };
  elevenlabs = (text, model) => {
    return new Promise(async (resolve, reject) => {
      const voice = await this.elevenModel(model);
      if (!voice.status) resolve(voice);
      const response = await axios.post("https://api.elevenlabs.io/v1/text-to-speech/" + voice.id + "/stream", {
        text: text,
        model_id: "eleven_multilingual_v2"
      }, {
        headers: {
          authority: "api.elevenlabs.io",
          "content-type": "application/json",
          origin: "https://elevenlabs.io",
          referer: "https://elevenlabs.io/",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        },
        responseType: "ArrayBuffer"
      }).catch(e => resolve(new Error(e)));
      const buffer = Buffer.from(response.data, "base64");
      resolve(buffer);
    });
  };
  detectText = text => {
    return new Promise(async (resolve, reject) => {
      axios.post("https://api.gptzero.me/v2/predict/text", {
        document: text
      }, {
        headers: {
          "Content-Type": "application/json",
          Cookie: "AMP_MKTG_8f1ede8e9c=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRmlkLnNlYXJjaC55YWhvby5jb20lMkYlMjIlMkMlMjJyZWZlcnJpbmdfZG9tYWluJTIyJTNBJTIyaWQuc2VhcmNoLnlhaG9vLmNvbSUyMiU3RA==; accessToken4=eyJhbGciOiJIUzI1NiIsImtpZCI6IkxQUGtRbDRKRlQvcmY5VkoiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk1MjM1Mzg4LCJpYXQiOjE2OTQ2MzA1ODgsImlzcyI6Imh0dHBzOi8vaHR0cHM6Ly9seWRxaGdkemh2c3FsY29iZGZ4aS5zdXBhYmFzZS5jby9hdXRoL3YxIiwic3ViIjoiOWYyZTRhMTItMTE3Zi00YjIxLWFmY2UtMDg2MzE0ODQyZGM2IiwiZW1haWwiOiJhcGkuZW5kcG9pbnRleHBlcnRAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJnb29nbGUiLCJwcm92aWRlcnMiOlsiZ29vZ2xlIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMakxya1hEVnQ1VVU5ekZBXzR6V1J6VlFCMHA1dHJDamtsTDdld0NMdGtoZz1zOTYtYyIsImVtYWlsIjoiYXBpLmVuZHBvaW50ZXhwZXJ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJhcGkgZW5kcG9pbnRleHBlcnQiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiYXBpIGVuZHBvaW50ZXhwZXJ0IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xqTHJrWERWdDVVVTl6RkFfNHpXUnpWUUIwcDV0ckNqa2xMN2V3Q0x0a2hnPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMDMwMzEwMjg5MDU0NTg4Njk3ODIiLCJzdWIiOiIxMDMwMzEwMjg5MDU0NTg4Njk3ODIifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTY5NDYzMDU4OH1dLCJzZXNzaW9uX2lkIjoiZTg4NGNiYzYtY2U3Yy00NDk1LWIxOTktNDA0Mjg4MTg1YzViIn0.Pjr91l1-bVcRrd-jkmiPQOzrwYG0bv6fSeFY6bSAH3k; AMP_8f1ede8e9c=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjI3OGE3MjJhZi1mMmJlLTQ4OGItOTQwNy1iZGUyNDZjYTA4YTklMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNjk0NjI5ODc0MDExJTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTY5NDYzMDc5MzY0NyUyQyUyMmxhc3RFdmVudElkJTIyJTNBMTElN0Q=",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  };
  rangkum = text => {
    return new Promise(async (resolve, reject) => {
      axios("https://www.editpad.org/tool/tool/summarizingTool", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "ci_session=p881l1l2089486k8qm7i76kl9gdjn6ru",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1"
        },
        data: "text=" + text + "&percnt=50&modd=1&min_length=84.75&max_length=135.6&captcha=0",
        method: "POST"
      }).then(yanz => {
        resolve(yanz.data);
      });
    });
  };
  SimSimi = teks => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("https://api.simsimi.vn/v2/simtalk", `text=${encodeURIComponent(teks)}&lc=id`);
        resolve(response.data.message);
      } catch (e) {
        reject("Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku.");
      }
    });
  };
  blacbox = query => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("https://www.useblackbox.io/chat-request-v4", {
          textInput: query,
          allMessages: [{
            user: query
          }],
          stream: "",
          clickedContinue: false
        });
        const data = response.data.response[0][0];
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  code = (text, input, code) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data
        } = axios("https://codepal.ai/api/code-generator", {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
          },
          data: {
            code: text,
            detected_input_language: input,
            language: code,
            selected_type: "standard",
            debug: 1
          },
          method: "POST"
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  webpage = text => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("https://codepal.ai/api/live-webpage-generator", {
          code: text,
          detected_input_language: "css",
          language: "",
          debug: 1
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  };
  speech = (text, type) => {
    return new Promise(async (resolve, reject) => {
      let data = new FormData();
      data.append("locale", "jv-ID");
      data.append("content", '<voice name="' + type + '"> ' + text + " </voice>");
      data.append("ip", "103.105.35.83");
      let vyos = await axios({
        url: "https://app.micmonster.com/restapi/create",
        method: "POST",
        data: data,
        headers: {
          ...data.getHeaders()
        }
      }).catch(() => reject({
        err: true
      }));
      let res = vyos.data;
      resolve(res || "err");
    });
  };
  ssweb = (url, device = "desktop") => {
    return new Promise((resolve, reject) => {
      const base = "https://www.screenshotmachine.com";
      const param = {
        url: url,
        device: device,
        cacheLimit: 0
      };
      axios({
        url: base + "/capture.php",
        method: "POST",
        data: new URLSearchParams(Object.entries(param)),
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(data => {
        const cookies = data.headers["set-cookie"];
        if (data.data.status == "success") {
          axios.get(base + "/" + data.data.link, {
            headers: {
              cookie: cookies.join("")
            },
            responseType: "arraybuffer"
          }).then(({
            data
          }) => {
            let result = {
              status: 200,
              data: data
            };
            resolve(result);
          });
        } else {
          reject({
            status: 404,
            statuses: `Link Error`,
            message: data.data
          });
        }
      }).catch(reject);
    });
  };
}
export const tools = new Tools();