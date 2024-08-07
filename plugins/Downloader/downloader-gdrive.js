import fetch from "node-fetch";
import {
  sizeFormatter
} from "human-readable";
const handler = async (m, {
  conn,
  args
}) => {
  if (!(args[0] || "").match(/([\w-]){33}|([\w-]){19}/)) throw "[!] Input GoogleDrive URL";
  try {
    let res = await GDriveDl(args[0]);
    if ("GB" === res.fileSize.slice(-2)) return m.reply(`Ngotak dong.\nMana bisa ngirim video ${res.fileSize}`);
    if (!someincludes(["kB", "KB"], res.fileSize.slice(-2)) && parseInt(res.fileSize) > 500) return m.reply(`Filesize: ${res.fileSize}\nTidak dapat mengirim, maksimal file 500 MB`);
    let txt = "*[ Downloading file ]*\n\n";
    txt += `*Name :* ${res.fileName}\n`, txt += `*Size :* ${res.fileSize}\n`, txt += `*Type :* ${res.mimetype}`,
      m.reply(txt), res.downloadUrl || m.react(eror), await conn.sendFile(m.chat, res.downloadUrl, res.fileName + res.mimetype, res.fileName + res.mimetype, m);
  } catch (e) {
    throw console.log(e), "Bot tidak memiliki akses ke GoogleDrive ini";
  }
};
handler.menudownload = ["gdrive <url>"], handler.tagsdownload = ["search"],
  handler.command = /^(g?(oogle)?drive)$/i, handler.premium = !1, handler.limit = !0;
export default handler;
const someincludes = (data, id) => !!data.find(el => id.includes(el)),
  formatSize = sizeFormatter({
    std: "JEDEC",
    decimalPlaces: 2,
    keepTrailingZeroes: !1,
    render: (literal, symbol) => `${literal} ${symbol}B`
  });
async function GDriveDl(url) {
  let id, res = {
    error: !0
  };
  if (!url || !url.match(/drive\.google/i)) return res;
  try {
    if (id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1], !id) throw "ID Not Found";
    res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
      method: "post",
      headers: {
        "accept-encoding": "gzip, deflate, br",
        "content-length": 0,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        origin: "https://drive.google.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
        "x-drive-first-party": "DriveWebUi",
        "x-json-requested": "true"
      }
    });
    let {
      fileName,
      sizeBytes,
      downloadUrl
    } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl) throw "Link Download Limit!";
    let data = await fetch(downloadUrl);
    return 200 !== data.status ? data.statusText : {
      downloadUrl: downloadUrl,
      fileName: fileName,
      fileSize: formatSize(sizeBytes),
      mimetype: data.headers.get("content-type")
    };
  } catch (e) {
    return console.log(e), res;
  }
}