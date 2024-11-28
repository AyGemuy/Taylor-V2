import axios from "axios";
import * as cheerio from "cheerio";
import vm from "vm";

function unPack(code) {
  "use strict";

  function indent(code) {
    try {
      let tabs = 0,
        old = -1,
        add = "";
      for (let i = 0; i < code.length; i++) {
        if (code[i].includes("{")) tabs++;
        if (code[i].includes("}")) tabs--;
        if (old !== tabs) {
          old = tabs;
          add = "";
          while (old > 0) {
            add += "\t";
            old--;
          }
          old = tabs;
        }
        code[i] = add + code[i];
      }
    } finally {
      tabs = null;
      old = null;
      add = null;
    }
    return code;
  }
  const env = {
    window: {},
    document: {},
  };
  vm.runInNewContext(`with(env) { ${code} }`, {
    env: env,
  });
  code = (code + "")
    .replace(/;/g, ";\n")
    .replace(/{/g, "\n{\n")
    .replace(/}/g, "\n}\n")
    .replace(/\n;\n/g, ";\n")
    .replace(/\n\n/g, "\n");
  code = code.split("\n");
  code = indent(code);
  return code.join("\n");
}
const ENC_OPTIONS = {
  NORMAL: "62",
  NUMERIC: "10",
  HIGH_ASCII: "95",
};
class JSObfuscate {
  constructor() {
    this.url = "https://www.cleancss.com/javascript-obfuscate/index.php";
    this.headers = {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "User-Agent": "Postify/1.0.0",
      "X-Forwarded-For": new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
  }
  async obfuscateCode(ae, sc = "on", fd = "on", source) {
    try {
      const meki = await axios.get(this.url, {
        headers: this.headers,
      });
      const cookies = meki.headers["set-cookie"];
      if (!cookies) {
        throw new Error("Gak ada kukis nya 🗿");
      }
      const headers = {
        ...this.headers,
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookies.join("; "),
      };
      const data = new URLSearchParams();
      data.append("ascii_encoding", ae);
      if (fd) {
        data.append("fast_decode", fd);
      }
      if (sc) {
        data.append("special_char", sc);
      }
      data.append("src", source);
      const response = await axios.post(this.url, data, {
        headers: headers,
      });
      const $ = cheerio.load(response.data);
      const result = $("#packed").val();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  unPacked(code) {
    return unPack(code);
  }
}
const handler = async (m, { args, command, usedPrefix }) => {
  const usage = `*Example:*\n${usedPrefix}${command} (Input text or reply text to enc code)\n${usedPrefix}${command} doc (Reply to a document)`;
  let text;
  if (args.length >= 1) text = args.join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) return m.reply(usage);
    text = m.quoted?.text;
  }
  const obfuscator = new JSObfuscate();
  try {
    const isDocument =
      text === "doc" && m.quoted && m.quoted?.mtype.includes("document");
    const docBuffer =
      isDocument && m.quoted?.download ? await m.quoted.download() : null;
    const content = docBuffer ? docBuffer.toString("utf-8") : text;
    const message =
      command === "packed"
        ? await obfuscator.obfuscateCode(
            ENC_OPTIONS.NORMAL,
            "on",
            "on",
            content,
          )
        : command === "unpacked"
          ? obfuscator.unPacked(content)
          : null;
    if (message) m.reply(message);
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};
handler.command = /^(packed|unpacked)$/i;
export default handler;
