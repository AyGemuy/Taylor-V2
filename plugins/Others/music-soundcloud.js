import axios from "axios";
import cheerio from "cheerio";
import {
  SoundCloudeS
} from "../../lib/scraper/scraper-search.js";
import {
  search
} from "../../lib/scraper/all/search.js";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix: _p,
  command: cmd
}) => {
  let sc = new SoundCloud();
  if (!text || !/soundcloud\.com\/[^/]+\//.test(args[0])) {
    if (text) {
      let data = await SoundCloudeS(text) || await search.soundCloude(text);
      if (!data?.length) throw "Not Found";
      let listSections = [];
      return Object.values(data).map((v, index) => {
        listSections.push([" [ " + index + " ] ", [
          [v.judul, _p + cmd + " " + v.link, sc.toTimeString(Date.now())]
        ]]);
      }), conn.sendList(m.chat, "*[ SOUNDCLOUD ]*\n\n", `The Most Trusted How-to Site on The Internet....\n\nPencarian *${text.toUpperCase()}*\n\n${data.length} Hasil Ditemukan Dari Pencarian ${text.capitalize()}\n\nTap Button On Below For More`, author, "Tap Here !", listSections, m);
    }
    throw `Ex: ${_p + cmd} Query / SoundCloud Url`;
  } else {
    let data;
    try {
      data = await sc.download2(args[0]);
    } catch (e) {
      data = await sc.download(args[0]);
    }
    if (!data.status) throw data.message;
    let txt = `*Title:* ${data.title}\n*Likes:* ${data.like_count}\n*Duration:* ${sc.toTimeString(data.duration)}`,
      msg = /^(?:-|--)doc$/i.test(args[1]) ? await conn.sendFile(m.chat, data.thumbnail, "", txt, m) : await conn.sendButton(m.chat, txt, wait, data.thumbnail, [
        ["Audio (Document)", `${_p + cmd} ${args[0]} --doc`]
      ], m),
      url = data.streams.find(v => /mp3/.test(v.extension) && v.has_audio).url,
      audio = await sc.req(url, {
        responseType: "arraybuffer"
      }).catch(e => m.reply(e + ""));
    await conn.sendMessage(m.chat, {
      [/^(?:-|--)doc$/i.test(args[1]) ? "document" : "audio"]: audio.data,
      fileName: `${data.title}.mp3`,
      mimetype: audio.headers["content-type"]
    }, {
      quoted: msg
    });
  }
};
handler.help = ["soundcloud"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^s(oundcloud(d(own|l))?|cd(own|l))$/i;
export default handler;
class SoundCloud {
  toTimeString(num) {
    return new Date(1e3 * num).toTimeString().split(" ")[0];
  }
  cLoad(html) {
    return cheerio.load(html.data);
  }
  async req(url, opt = {}) {
    return await axios({
      url: url,
      ...opt
    });
  }
  async getSession() {
    let res = await this.req("https://soundcloudmp3.org/id"),
      token = this.cLoad(res)("form#conversionForm > input[type=hidden]").attr("value");
    return {
      cookie: res.headers["set-cookie"],
      token: token
    };
  }
  async search(query) {
    let res = await this.req(`https://api-mobi.soundcloud.com/search?q=${query}&client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX&stage=`);
    return res?.data?.collection.filter(v => /track/.test(v?.kind));
  }
  async download(url) {
    let session = await this.getSession(),
      res = await this.req("https://soundcloudmp3.org/converter", {
        method: "post",
        data: new URLSearchParams(Object.entries({
          _token: session.token,
          url: url
        })),
        headers: {
          cookie: session.cookie
        }
      }),
      $ = this.cLoad(res),
      data = {};
    return data.thumb = $("div.info.clearfix > img").attr("src"), data.title = $("div.info.clearfix > p:nth-child(2)").text().replace("Title:", ""),
      data.duration = $("div.info.clearfix > p:nth-child(3)").text().replace(/Length\:|Minutes/gi, "").trim(),
      data.quality = $("div.info.clearfix > p:nth-child(4)").text().replace("Quality:", ""),
      data.url = $("a#download-btn").attr("href"), data;
  }
  async download2(url) {
    return (await this.req(`https://getvideo.p.rapidapi.com/?url=${url}`, {
      headers: {
        "x-rapidapi-key": "5be05bd400msh1fe8c757005c169p10ea3bjsnf6b6811bc600"
      }
    })).data;
  }
}