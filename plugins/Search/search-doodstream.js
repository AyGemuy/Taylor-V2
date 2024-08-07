import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let lister = ["search", "info", "folders", "files"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.doodstream search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .doodstream search|query");
      try {
        const resultList = (await doodstreamSearch(inputs)).result.map((file, index) => `${index + 1}. ${file.title} - File Code: ${file.file_code}`).join("\n");
        m.reply(resultList);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("info" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .doodstream info|code");
      try {
        const teks = (await doodstreamInfo(inputs)).result.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n📰 *Title:* ${item.title}\n🔗 *File Code:* ${item.filecode}\n⏱️ *Length:* ${item.length}\n🔗 *Protected Download:* ${item.protected_dl}\n🖼️ *Single Image:* ${item.single_img}\n▶️ *Can Play:* ${item.canplay}\n👀 *Views:* ${item.views}\n🌊 *Splash Image:* ${item.splash_img}\n💾 *Size:* ${item.size}\n🔗 *Protected Embed:* ${item.protected_embed}\n📅 *Last View:* ${item.last_view}\n⏳ *Uploaded:* ${item.uploaded}`).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("folders" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .doodstream search|query");
      try {
        const foldersList = (await doodstreamFolders(inputs)).result.folders.map((folder, index) => `${index + 1}. ${folder.name} (ID: ${folder.fld_id})`).join("\n");
        m.reply(foldersList);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("files" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .doodstream search|query");
      try {
        const filesList = (await doodstreamFiles(inputs)).result.files.map((file, index) => `${index + 1}. ${file.title} - Download URL: ${file.download_url}`).join("\n");
        m.reply(filesList);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["doodstream"], handler.tags = ["downloader"], handler.command = /^(doodstream)$/i;
export default handler;
async function doodstreamSearch(query) {
  let res = await fetch(`https://doodapi.com/api/search/videos?key=13527p8pcv54of4yjeryk&search_term=${query}`);
  return await res.json();
}
async function doodstreamInfo(query) {
  let res = await fetch(`https://doodapi.com/api/file/info?key=13527p8pcv54of4yjeryk&file_code=${query}`);
  return await res.json();
}
async function doodstreamFolders(query) {
  let res = await fetch(`https://doodapi.com/api/folder/list?key=38097rkclkbw28lzydh4b&code=${query}`);
  return await res.json();
}
async function doodstreamFiles(query) {
  let res = await fetch(`https://doodapi.com/api/file/list?key=38097rkclkbw28lzydh4b&fld_id=${query}`);
  return await res.json();
}