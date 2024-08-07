import CryptoJS from "crypto-js";
import axios from "axios";
const ke = {
  J2DOWN_SECRET: "U2FsdGVkX19k5otQh93hNm2YuT6PU7O7fL4ofKNVTFWIvpABfxLh93IuUk0mQn6s"
};
export const socialDl = async url => {
  const isURL = /^http(|s):\/\//.test(url);
  if (!isURL) return "Invalid URL";
  const encryptor = new MyEncryptor();
  const encryptedUri = encryptor.getUri(url);
  try {
    const response = await axios.post("https://api.zm.io.vn/v1/social/autolink", {
      data: encryptedUri
    }, {
      headers: {
        "Content-Type": "application/json",
        token: "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJxxx",
        apikey: "manhdeptraicogisai"
      }
    });
    const data = response.data;
    return data;
  } catch (error) {
    return `Error: ${error.response ? error.response.data : error.message}`;
  }
};
class MyEncryptor {
  secretKey() {
    const decrypted = CryptoJS.AES.decrypt(ke.J2DOWN_SECRET, "manhg-api");
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  getUri(url) {
    const data = {
      url: url,
      unlock: true
    };
    const secretKey = this.secretKey();
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encrypted;
  }
}