import ws from "ws";
import axios from "axios";
import {
  load
} from "cheerio";
const iniId = {
  "Anies-Imin": "https://app.botbrigade.id/chat/018ccd6a-d6e2-77a5-b498-0175d25bf875",
  "Prabowo-Gibran": "https://app.botbrigade.id/chat/018ccd6a-da72-7bff-8b67-fa95ef93d609",
  "Ganjar-Mahfud": "https://app.botbrigade.id/chat/018ccd6a-d972-761d-82a6-a0af0120b97f"
};
class BotBrigade {
  constructor() {}
  async reqChatWithID(idsesi, teks) {
    return new Promise(async (resolve, reject) => {
      const socket = new ws(`wss://api.botbrigade.id/ws/session/${idsesi}`);
      socket.onopen = () => {
        console.log("Connected to websocket"), socket.send(teks);
      }, socket.onmessage = async event => {
        const sf = JSON.parse(event.data);
        sf.message && (socket.close(), resolve({
          response: sf.message,
          idsesi: idsesi
        }));
      }, socket.onerror = err => {
        reject(err);
      }, socket.onclose = async () => {
        console.log("done");
      };
    });
  }
  async ReqChat(nama, teks) {
    return new Promise(async (resolve, reject) => {
      if (void 0 === iniId[nama]) return reject("Ga ada dalam pilihan");
      let {
        data
      } = await axios.get(iniId[nama]);
      const $ = load(data);
      let idsesiauth;
      $("script").each(async (i, e) => {
        if ($(e).text().includes("sessionId")) {
          idsesiauth = JSON.parse(decodeURIComponent($(e).text()).split('self.__next_f.push([1,"8:[\\"$\\",\\"$L9\\",null,')[1].split(']\\n"])')[0].replaceAll("\\", "")).sessionId;
          let {
            data
          } = await axios.post(`https://app.botbrigade.id/api/v1/session/child/${idsesiauth}`);
          idsesiauth = data.data.session_id;
          try {
            resolve(await this.reqChatWithID(idsesiauth, teks));
          } catch (r) {
            reject(r);
          }
        }
      });
    });
  }
}
export {
  BotBrigade
};