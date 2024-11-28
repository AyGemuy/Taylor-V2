const languages = {
  af: "Afrikaans",
  sq: "Albanian",
  ar: "Arab",
  hy: "Armenian",
  ca: "Catalan",
  zh: "Chinese",
  "zh-cn": "Chinese (Mandarin/China)",
  "zh-tw": "Chinese (Mandarin/Taiwan)",
  "zh-yue": "Chinese (Cantonese)",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  "en-au": "English (Australia)",
  "en-uk": "English (United Kingdom)",
  "en-us": "English (United States)",
  eo: "Esperanto",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  ht: "Haitian Creole",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  la: "Latin",
  lv: "Latvian",
  mk: "Macedonian",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  "pt-br": "Portuguese (Brazil)",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  es: "Spanish",
  "es-es": "Spanish (Spain)",
  "es-us": "Spanish (United States)",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  th: "Thai",
  tr: "Turkish",
  vi: "Vietnamese",
  cy: "Welsh",
};
const handler = async (m) => {
  try {
    const languageList = `
*\`Kode Bahasa\`*
${Object.keys(languages)
  .map((lang) => `- *${lang}* : ${languages[lang]}`)
  .join("\n")}
`.trim();
    m.reply(languageList);
  } catch (err) {
    console.error(err);
    m.reply("Error occurred while generating language list.");
  }
};
handler.help = ["kodebahasa"];
handler.tags = ["internet"];
handler.command = /^kodebahasa$/i;
export default handler;
