import fetch from "node-fetch";
class Lalals {
  async request(url, method, data, headers = {}) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined,
      });
      return response.ok
        ? await response.json()
        : {
            error: "Request gagal",
          };
    } catch (error) {
      return {
        error: "Request gagal",
      };
    }
  }
  async getAllVoices() {
    const url = "https://devapi.lalals.com/voices/get-all";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "yes",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer: "https://lalals.com/voices",
    };
    const data = {
      sort: {
        field: "use_count",
        order: "desc",
      },
      voice_name: "a",
      page: 1,
      limit: 15,
      is_original: false,
    };
    return await this.request(url, "POST", data, headers);
  }
  async createMusic(input_text, input_tags) {
    const url = "https://devapi.lalals.com/projects/lyrics-to-music";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "yes",
      Authorization:
        "Bearer 0c05850e8c530b6276d3f825e4e52985b6fc01d06da38ce051eda9bbb3a6aa910cac5e04165bfe76a7fee5f5cc5c99e949cfe9906602f8aeff377a250c24567636804df1a3d4ac8627fd3a1a72e0cb108aefacccb4700f9aefebd4e90455ab541c7304d7e6d5fcd1168a9682a5683f718ddb5ef294892211fa1de2a40ad40a7bf141b23eb0c847053903f69d9d304fdf6adb6ee0dd670ec9a60748440ea053dac10551ce5fa49756c668fd8e8f03a606",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer: "https://lalals.com/",
    };
    const arr = [
      "26088041-fa27-4e24-921c-e21603c49c04",
      "4ffc412e-94be-4abe-bd37-a64db39e6ca1",
      "66cf9ae4-09cf-4df0-b65a-300191bb5aec",
      "ab186086-1428-496a-bbae-215612120ddd",
      "bd085997-6de5-402a-8f3e-70805e3d8b91",
      "4c68a378-d17d-4065-b9f8-4749c89a7e96",
      "967bc7ff-abec-444a-bca1-327ec5179a43",
      "c1a6dda5-05f6-4c0d-9686-57e146ded467",
      "6f0de919-f896-49ee-835f-fb945756b357",
      "6d7a58e3-e69c-4452-a321-cb10b768e004",
      "40fab8f7-8555-48a7-be96-e357237296c9",
      "4025bd17-0aa2-4af3-8e67-4d2531589dea",
      "adbbad1c-c976-4b68-a71a-587852e67ea0",
      "07250062-3f9f-4a6c-ba2d-0038bd3d6e3b",
      "53348a97-ff9a-4003-b722-aad2aafe28c8",
    ];
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];
    const body = {
      voice_id: randomElement,
      user_id: "e79764c3-90b7-4a4e-8e8f-7e4428443fd6",
      custom_lyric: input_text || "Hello its Me",
      music_style: input_tags || "dreamy",
      gender: "m",
      conversionType: "LYRICS_TO_MUSIC",
    };
    try {
      const response = await this.request(url, "POST", body, headers);
      const { task_id } = response;
      if (task_id) {
        let startTime = Date.now();
        let timeout = 36e4;
        let interval = 3e3;
        while (true) {
          const workListResponse = await this.request(
            "https://devapi.lalals.com/user/e79764c3-90b7-4a4e-8e8f-7e4428443fd6/projects?offset=0",
            "GET",
            null,
            headers,
          );
          const { rows: workList } = workListResponse;
          const work = workList[0];
          if (work) {
            if (work.track_url) {
              return work;
            } else {
              console.log("Audio belum siap. Menunggu 2 detik...");
              await new Promise((resolve) => setTimeout(resolve, interval));
            }
          } else if (Date.now() - startTime > timeout) {
            console.log(
              "Timeout: UID tidak ditemukan di work list setelah 1 menit",
            );
            return null;
          } else {
            await new Promise((resolve) => setTimeout(resolve, interval));
          }
        }
      } else {
        console.log("Tidak ada UID yang dihasilkan");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.lalals) db.data.dbai.lalals = {};
  let inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  const styleMatch = inputText.match(/--style=([^]+)$/);
  const style = styleMatch ? styleMatch[1].trim() : null;
  const inputTextClean = styleMatch
    ? inputText.replace(/--style=[^]+$/, "").trim()
    : inputText.trim();
  m.react(wait);
  const lalals = new Lalals();
  try {
    const answer = await lalals.createMusic(inputTextClean, style);
    const infoReply = {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    };
    await conn.reply(
      m.chat,
      `*\`LalalsAi\`*\n*Voice:* ${answer.voices[0].voice_name}\n🔗 *Audio:* ${answer.audio_link}`,
      m,
      infoReply,
    );
    const {
      key: { id: keyId },
    } = await conn.sendMessage(
      m.chat,
      {
        audio: {
          url: answer.track_url || answer.audio_link,
        },
        mimetype: "audio/mp4",
      },
      {
        quoted: m,
      },
    );
    db.data.dbai.lalals[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.lalals || m.isBaileys || !(m.sender in db.data.dbai.lalals))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.lalals[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    const styleMatch = m.text.trim().match(/--style=([^]+)$/);
    const style = styleMatch ? styleMatch[1].trim() : null;
    const inputTextClean = styleMatch
      ? m.text
          .trim()
          .replace(/--style=[^]+$/, "")
          .trim()
      : m.text.trim();
    m.react(wait);
    const lalals = new Lalals();
    try {
      const answer = await lalals.createMusic(inputTextClean, style);
      const infoReply = {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      };
      await conn.reply(
        m.chat,
        `*\`LalalsAi\`*\n*Voice:* ${answer.voices[0].voice_name}\n🔗 *Audio:* ${answer.audio_link}`,
        m,
        infoReply,
      );
      const {
        key: { id: newKeyId },
      } = await conn.sendMessage(
        m.chat,
        {
          audio: {
            url: answer.track_url || answer.audio_link,
          },
          mimetype: "audio/mp4",
        },
        {
          quoted: m,
        },
      );
      db.data.dbai.lalals[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["lalals"];
handler.tags = ["ai"];
handler.command = /^(lalals)$/i;
export default handler;
