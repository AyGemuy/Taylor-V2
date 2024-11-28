import fetch from "node-fetch";
import { isUrl } from "../../lib/other-function.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description ||
    null;
  try {
    let result;
    switch (command) {
      case "compile":
      case "decrypt":
        if (!text) {
          return m.reply(
            `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
          );
        }
        result =
          command === "compile"
            ? (await compiles(text))?.output
            : (await decrypts(text))?.result;
        break;
      case "recognition":
        let file =
          text && isUrl(text)
            ? text
            : m.quoted
              ? await m.quoted.upload()
              : null;
        if (!file) {
          return m.reply(
            `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
          );
        }
        result = (await recognition(file))?.data?.title;
        break;
    }
    m.reply(result || "Tidak ada hasil.");
  } catch (e) {
    console.error(e);
    m.reply("Terjadi kesalahan. Coba lagi nanti.");
  }
};
handler.help = ["compile", "decrypt", "recognition"];
handler.tags = ["tools"];
handler.command = /^(compile|decrypt|recognition)$/i;
export default handler;
async function compiles(code) {
  try {
    const language = getLanguage(code);
    const response = await fetch("https://apiv3-2l3o.onrender.com/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        code: code,
        input: "",
      }),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    return "Terjadi kesalahan saat kompilasi.";
  }
}
async function decrypts(url) {
  try {
    const response = await fetch("https://apiv3-2l3o.onrender.com/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        token: "",
      }),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    return "Terjadi kesalahan saat dekripsi.";
  }
}
async function recognition(url) {
  if (!/^https?:\/\/[^\s]+$/.test(url)) {
    return {
      status: false,
      message: "Invalid URL input!",
    };
  }
  try {
    const response = await fetch(
      "https://imphnen-ai.vercel.app/api/asr/music_recognition",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: url,
        }),
      },
    );
    return await response.json();
  } catch (e) {
    console.error(e);
    return {
      status: false,
      message: e.message || "Terjadi kesalahan.",
    };
  }
}

function getLanguage(code) {
  if (/^#!\s*\/bin\/bash/.test(code)) return "bash";
  if (
    /public\s+class\s+\w+/.test(code) &&
    /public\s+static\s+void\s+main\s*\(/.test(code)
  )
    return "java";
  if (
    /def\s+\w+\s*\(/.test(code) ||
    /import\s+\w+/.test(code) ||
    code.includes("print(")
  )
    return "python";
  if (/^\s*#include\s+<.*?>/.test(code) || /namespace\s+\w+/.test(code))
    return "cpp";
  if (/^\s*using\s+System/.test(code) || /namespace\s+\w+/.test(code))
    return "csharp";
  if (
    /^\s*require\s*\(\s*['"][^'"]+['"]\s*\)/.test(code) ||
    /function\s+\w+\s*\(/.test(code) ||
    /console\.log\(/.test(code)
  )
    return "node";
  if (/^\s*import\s+\w+/.test(code) || /function\s+\w+\s*\(/.test(code))
    return "typescript";
  return "unsupported";
}
