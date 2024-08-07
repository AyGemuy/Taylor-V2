import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
import axios from "axios";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  var out;
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || q.mediaType || "";
  if (/video/g.test(mime) && (q.msg || q).seconds > 11) return m.reply("Maksimal 10 detik!");
  if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command}`);
  let img = await q?.download();
  /webp/g.test(mime) ? out = await webp2png(img) : /image/g.test(mime) ? out = await uploadImage(img) : (/video/g.test(mime) || /gif/g.test(mime) || /viewOnce/g.test(mime)) && (out = await uploadFile(img)),
    m.react(wait);
  try {
    const apiResponse = await analyzeImage(out),
      {
        items
      } = apiResponse.api4ai,
      nsfwScore = 100 * (items.find(item => "nsfw" === item.label) || {}).likelihood_score,
      sfwScore = 100 * (items.find(item => "sfw" === item.label) || {}).likelihood_score;
    m.reply(`*[ NSFW ]*\n   - Score: ${nsfwScore.toFixed(2)}%\n*[ SFW ]*   \n- Score: ${sfwScore.toFixed(2)}%`);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["explicit"], handler.tags = ["tools"], handler.command = /^(explicit)$/i;
export default handler;
const analyzeImage = async file_url => {
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/image/explicit_content",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTBlOGQ5YWUtMmExNC00YTA1LTgzZWMtMWY0ZThhMDczMDIwIiwidHlwZSI6ImFwaV90b2tlbiJ9.DoMaXPi7Sd7I-LpzwNQ4bd7Sd7r_4rtT1aGziC03uSs"
    },
    data: {
      response_as_dict: !0,
      attributes_as_list: !1,
      show_original_response: !1,
      providers: "api4ai",
      file_url: file_url
    }
  };
  try {
    return (await axios.request(options)).data;
  } catch (error) {
    console.error(error);
  }
};