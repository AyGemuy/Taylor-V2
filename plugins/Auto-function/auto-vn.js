import gtts from "node-gtts";
import {
  readFileSync,
  unlinkSync
} from "fs";
import {
  join
} from "path";
import fetch from "node-fetch";
export async function before(m, {
  isAdmin,
  isBotAdmin
}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (!m.isGroup) return !1;
  let chat = db.data.chats[m.chat];
  db.data.settings[this.user.jid];
  if (chat.autoVn) {
    let sim = await fetch(`https://api.simsimi.net/v2/?text=${m.text}&lc=id`),
      res = await sim.json();
    try {
      let so = await fetch(API("btchx", "/api/soundoftext", {
          text: res.success,
          lang: "id-ID"
        }, "apikey")),
        un = await so.json();
      this.sendMessage(m.chat, {
        audio: {
          url: un.result
        },
        mimetype: "audio/mp4"
      });
    } catch (e) {
      let tss = await tts(res.success, "id");
      await this.sendFile(m.chat, tss, "", "", fakes, null, adReply);
    }
  }
}

function tts(text, lang = "id") {
  return console.log(lang, text), new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang),
        filePath = join(__dirname(import.meta.url), "../tmp", 1 * new Date() + ".wav");
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath)), unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}