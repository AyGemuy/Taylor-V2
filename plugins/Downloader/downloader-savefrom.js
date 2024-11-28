import fetch from "node-fetch";
import crypto from "crypto";
import got from "got";
import { createContext, Script } from "vm";
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  let lister = ["v1", "v2"],
    spas = "                ",
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ");
  if (!lister.includes(feature.toLowerCase()))
    return m.reply(
      "*Example:*\n" +
        usedPrefix +
        command +
        " v2 link\n\n*Pilih type yg ada*\n" +
        lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"),
    );
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
(handler.help = ["savefrom"].map((v) => v + " <url>")),
  (handler.tags = ["downloader"]),
  (handler.command = /^(save(from)?)$/i);
export default handler;
async function SaveFrom(url) {
  const executeCode = '[]["filter"]["constructor"](b).call(a);',
    modifiedReq = (
      await got
        .post("https://worker.sf-tools.com/savefrom.php", {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            origin: "https://pt.savefrom.net",
            referer: "https://pt.savefrom.net/",
            "user-agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36",
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
            "sf-nomad": 1,
          },
        })
        .text()
    ).replace(
      executeCode,
      `\ntry {\ni++;\nif (i === 2) scriptResult = ${executeCode.split(".call")[0]}.toString();\nelse ${executeCode.replace(/;/, "")};\n} catch {}\n`,
    ),
    context = {
      scriptResult: "",
      i: 0,
    };
  createContext(context), new Script(modifiedReq).runInContext(context);
  return JSON.parse(
    context.scriptResult
      .split("window.parent.sf.videoResult.show(")?.[1]
      .split(");")?.[0],
  );
}

function generateHash(url) {
  return crypto.createHash("md5").update(url).digest("hex");
}
async function savefrom(url) {
  const form = {
    sf_url: url,
    sf_submit: "",
    new: "2",
    lang: "en",
    app: "",
    country: "en",
    os: "Windows",
    browser: "Chrome",
    channel: "main",
    "sf-nomad": "1",
    url: url,
    ts: Date.now(),
    _ts: 1720433117117,
    _tsc: 0,
    _s: generateHash(url),
    _x: 1,
  };
  const formBody = new URLSearchParams(form).toString();
  const response = await fetch("https://worker.savefrom.net/savefrom.php", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://en.savefrom.net",
      referer: "https://en.savefrom.net/",
    },
    body: formBody,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch SaveFrom data: ${response.statusText}`);
  }
  const data = await response.text();
  const context = {
    results: null,
    parent: {
      document: {
        location: {},
      },
    },
    frameElement: {},
    atob: (base64) => Buffer.from(base64, "base64").toString(),
    _decodeURIComponent: (uri) => {
      const decoded = decodeURIComponent(uri);
      if (/showResult/.test(decoded)) {
        context.results = decoded;
        return "true";
      }
      return decoded;
    },
  };
  createContext(context);
  new Script(`decodeURIComponent=_decodeURIComponent;${data}`).runInContext(
    context,
  );
  const executed =
    context.results?.split("window.parent.sf.videoResult.show(")[1] ||
    context.results?.split("window.parent.sf.videoResult.showRows(")[1];
  if (!executed) {
    throw new Error("Cannot find result from evaluation!");
  }
  let json = null;
  try {
    if (context.results.includes("showRows")) {
      const splits = executed.split('],"');
      const lastIndex = splits.findIndex((v) =>
        v.includes("window.parent.sf.enableElement"),
      );
      json = JSON.parse(splits.slice(0, lastIndex).join('],"') + "]");
    } else {
      json = [JSON.parse(executed.split(");")[0])];
    }
  } catch (e) {
    throw new Error("Cannot parse JSON results data from evaluation!");
  }
  return json;
}
