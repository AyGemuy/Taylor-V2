import axios from "axios";
import Jimp from "jimp";
import crypto from "crypto";
import {
  HttpsProxyAgent
} from "https-proxy-agent";
const httpsAgent = new HttpsProxyAgent("http://168.63.76.32:3128");
async function draw(input, options = {
  proxy: !1,
  china: !1
}) {
  let obj = {
      busiId: options.china ? "ai_painting_anime_img_entry" : "different_dimension_me_img_entry",
      extra: JSON.stringify({
        face_rects: [],
        version: 2,
        platform: "web"
      }),
      images: [input.toString("base64")]
    },
    resp = await axios({
      method: "post",
      url: "https://ai.tu.qq.com/overseas/trpc.shadow_cv.ai_processor_cgi.AIProcessorCgi/Process",
      data: obj,
      headers: {
        Origin: "https://h5.tu.qq.com",
        Referer: "https://h5.tu.qq.com/",
        "x-sign-value": crypto.createHash("md5").update("https://h5.tu.qq.com" + JSON.stringify(obj).length + "HQ31X02e").digest("hex"),
        "x-sign-version": "v1"
      },
      httpsAgent: !!options.proxy && httpsAgent(options.proxy)
    }),
    {
      img_urls
    } = JSON.parse(await resp.data.extra);
  return {
    code: resp.data.code,
    result: img_urls[0]
  };
}
async function crop(input) {
  const img = await Jimp.read(input),
    {
      height,
      width
    } = img.bitmap;
  return height > width ? img.crop(20, 575, 720, 450) : height < width && img.crop(520, 25, 450, 700),
    await img.getBufferAsync("image/jpeg");
}
async function getPic(input) {
  const img = await Jimp.read(input);
  return await img.getBufferAsync("image/jpeg");
}
export default async (input, options) => {
  let inputs = await getPic(input);
  return crop((await draw(inputs, options)).result);
};