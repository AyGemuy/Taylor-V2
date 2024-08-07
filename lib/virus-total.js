import axios from "axios";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
const VIRUS_TOTAL_API_KEY = "4e3202fdbe953d628f650229af5b3eb49cd46b2d3bfe5546ae3c5fa48b554e0c",
  VirusTotal = async buffer => {
    try {
      const {
        ext,
        mime
      } = await fileTypeFromBuffer(buffer) || {}, form = new FormData(), blob = new Blob([buffer.toArrayBuffer()], {
        type: mime
      });
      form.append("name", `virustotal.${ext}`), form.append("file", blob, `virustotal.${ext}`),
        form.append("apikey", VIRUS_TOTAL_API_KEY);
      const options = {
        method: "post",
        url: "https://www.virustotal.com/vtapi/v2/file/scan",
        data: form
      };
      return (await axios(options)).data;
    } catch (error) {
      throw new Error(`VirusTotal scan failed: ${error.message}`);
    }
  }, LookUp = async sample_hash => {
    try {
      const reportParams = {
        apikey: VIRUS_TOTAL_API_KEY,
        resource: sample_hash
      };
      return (await axios.get("https://www.virustotal.com/vtapi/v2/file/report", {
        params: reportParams
      })).data;
    } catch (error) {
      throw new Error(`VirusTotal lookup failed: ${error.message}`);
    }
  };
export {
  VirusTotal,
  LookUp
};