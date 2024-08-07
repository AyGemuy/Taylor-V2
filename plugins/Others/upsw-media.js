import fetch from "node-fetch";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
const commandList = ["upsw"],
  mimeAudio = "audio/mpeg",
  mimeVideo = "video/mp4",
  mimeImage = "image/jpeg",
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    let teks;
    if (args.length >= 1 ? teks = args.slice(0).join(" ") : m.quoted && m.quoted?.text && (teks = m.quoted?.text), !m.quoted || !m.quoted?.mtype) throw "❌ Tidak ada media yang diberikan!";
    {
      const mtype = m.quoted?.mtype;
      let type;
      if ("audioMessage" === mtype) type = "vn";
      else if ("videoMessage" === mtype) type = "vid";
      else if ("imageMessage" === mtype) type = "img";
      else {
        if ("extendedTextMessage" !== mtype) throw "❌ Media type tidak valid!";
        type = "txt";
      }
      const doc = {};
      if ("vn" === type) {
        const link = await ("img" === type ? uploadImage : uploadFile)(await m.quoted?.download());
        doc.mimetype = mimeAudio, doc.audio = {
          url: link
        };
      } else if ("vid" === type) {
        const link = await ("img" === type ? uploadImage : uploadFile)(await m.quoted?.download());
        doc.mimetype = mimeVideo, doc.caption = teks, doc.video = {
          url: link
        };
      } else if ("img" === type) {
        const link = await ("img" === type ? uploadImage : uploadFile)(await m.quoted?.download());
        doc.mimetype = mimeImage, doc.caption = teks, doc.image = {
          url: link
        };
      } else "txt" === type && (doc.text = teks);
      await conn.sendMessage("status@broadcast", doc, {
        backgroundColor: getRandomHexColor(),
        font: Math.floor(9 * Math.random()),
        statusJidList: Object.keys(db.data.users).filter(key => db.data.users[key].registered)
      }).then(async res => {
        await conn.reply(m.chat, `Sukses upload ${type}`, res);
      }).catch(async () => {
        await conn.reply(m.chat, `Gagal upload ${type}`, m);
      });
    }
  };
handler.help = commandList, handler.tags = ["main"], handler.owner = !0, handler.rowner = !0,
  handler.command = new RegExp(`^(${commandList.join("|")})$`, "i");
export default handler;
async function generateVoice(Locale = "id-ID", Voice = "id-ID-ArdiNeural", Query) {
  const formData = new FormData();
  formData.append("locale", Locale), formData.append("content", `<voice name="${Voice}">${Query}</voice>`),
    formData.append("ip", "46.161.194.33");
  const response = await fetch("https://app.micmonster.com/restapi/create", {
    method: "POST",
    body: formData
  });
  return Buffer.from(("data:audio/mpeg;base64," + await response.text()).split(",")[1], "base64");
}

function getRandomHexColor() {
  return "#" + Math.floor(16777215 * Math.random()).toString(16).padStart(6, "0");
}