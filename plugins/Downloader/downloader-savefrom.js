import {
  savefrom
} from "@bochilteam/scraper";
import fetch from "node-fetch";
import got from "got";
import {
  createContext,
  Script
} from "vm";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["v1", "v2"],
    spas = "                ",
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ");
  if (!lister.includes(feature.toLowerCase())) return m.reply("*Example:*\n" + usedPrefix + command + " v2 link\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"));
  if (lister.includes(feature)) {
    if ("v1" === feature) {
      if (!inputs) return m.reply("Input query link");
      m.react(wait);
      try {
        let Sv = await savefrom(inputs),
          S = Sv[0]?.meta,
          SvCap = `${spas}*[ SaveFrom ]*\n\n*🔗 Source:* ${S.source}\n*📖 Title:* ${S.title}\n*⏱ Duration:* ${S.duration}\n`;
        await conn.sendFile(m.chat, Sv[0]?.url[0]?.url, "", SvCap, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("v2" === feature) {
      if (!inputs) return m.reply("Input query link");
      m.react(wait);
      try {
        let Sv = await SaveFrom(inputs),
          S = Sv.meta,
          SvCap = `${spas}*[ SaveFrom ]*\n\n*🔗 Source:* ${S.source}\n*📖 Title:* ${S.title}\n*⏱ Duration:* ${S.duration}\n`;
        await conn.sendFile(m.chat, Sv.url[0]?.url, "", SvCap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["savefrom"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^(save(from)?)$/i;
export default handler;
async function SaveFrom(url) {
  const executeCode = '[]["filter"]["constructor"](b).call(a);',
    modifiedReq = (await got.post("https://worker.sf-tools.com/savefrom.php", {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://pt.savefrom.net",
        referer: "https://pt.savefrom.net/",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36"
      },
      form: {
        sf_url: url,
        sf_submit: "",
        new: 2,
        lang: "pt",
        app: "",
        country: "br",
        os: "Windows",
        browser: "Chrome",
        channel: " main",
        "sf-nomad": 1
      }
    }).text()).replace(executeCode, `\ntry {\ni++;\nif (i === 2) scriptResult = ${executeCode.split(".call")[0]}.toString();\nelse ${executeCode.replace(/;/, "")};\n} catch {}\n`),
    context = {
      scriptResult: "",
      i: 0
    };
  createContext(context), new Script(modifiedReq).runInContext(context);
  return JSON.parse(context.scriptResult.split("window.parent.sf.videoResult.show(")?.[1].split(");")?.[0]);
}