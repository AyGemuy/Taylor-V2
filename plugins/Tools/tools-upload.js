import {
  Uploader
} from "../../lib/tools/uploader.js";
import _ from "lodash";
const upload = new Uploader();
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  args,
  text
}) => {
  const asyncFunctions = _(Object.getOwnPropertyNames(Object.getPrototypeOf(upload))).filter(prop => typeof upload[prop] === "function" && prop !== "constructor").map(func => [func, upload[func].bind(upload)]).fromPairs().value();
  const q = m.quoted ? m.quoted : m;
  if (!(q.msg || q).mimetype) throw "❌ Tidak ada media yang ditemukan.";
  const media = await q?.download();
  const asyncFunctionsList = _(Object.keys(asyncFunctions)).sort().map((func, index) => ` *${index + 1}.* ${func.charAt(0).toUpperCase() + func.slice(1)}`).join("\n");
  if (!text) {
    return m.reply(`ℹ️ *Daftar Fungsi Upload Link:*\n${asyncFunctionsList}\n\nℹ️ Gunakan format: ${usedPrefix + command} <urutan>\n\nℹ️ Contoh Penggunaan: ${usedPrefix + command} 1`);
  }
  try {
    const order = parseInt(text);
    if (isNaN(order) || order <= 0 || order > Object.keys(asyncFunctions).length) {
      return m.reply(`❌ Harap berikan nomor yang valid dari daftar fungsi.`);
    }
    const funcName = _(Object.keys(asyncFunctions)).sort().nth(order - 1);
    m.reply(`📤 *Mengunggah ke ${funcName?.toUpperCase()}...*`);
    const output = await asyncFunctions[funcName](media);
    const formatValue = (value, keyPrefix = "") => {
      if (_.isArray(value)) {
        return value.map((item, index) => formatValue(item, `${keyPrefix} ${index + 1}`)).join("\n");
      } else if (_.isObject(value)) {
        let result = "";
        Object.entries(value).forEach(([key, val]) => {
          const currentKey = keyPrefix ? `${keyPrefix} ${key}` : key;
          if (_.isObject(val) && !_.isEmpty(val)) {
            result += formatValue(val, currentKey);
          } else {
            result += `${currentKey} : ${val}\n`;
          }
        });
        return result;
      } else {
        return `${keyPrefix} : ${value}`;
      }
    };
    const dateTime = new Date().toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const reslink = _.isString(output) ? `🚀 *Link:*\n${output}\n\n📁 *Provider:*\n> ${funcName?.toUpperCase()}\n🕒 *Waktu:*\n> ${dateTime}` : _.isArray(output) ? output.map((item, index) => `🚀 *Link:*\n${formatValue(item, `Files ${index + 1}`)}\n\n📁 *Provider:*\n> ${funcName?.toUpperCase()}\n🕒 *Waktu:*\n> ${dateTime}`).join("\n") : output instanceof Map ? Array.from(output.entries()).map(([key, value], index) => `🚀 *Link:*\n${formatValue(value, key)}\n\n📁 *Provider:*\n> ${funcName?.toUpperCase()}\n🕒 *Waktu:*\n> ${dateTime}`).join("\n") : _.isObject(output) && !_.isNull(output) ? `🚀 *Link:*\n${formatValue(output)}\n\n📁 *Provider:*\n> ${funcName?.toUpperCase()}\n🕒 *Waktu:*\n> ${dateTime}` : `⚠️ Unsupported data type: ${typeof output}`;
    m.reply(reslink);
  } catch (error) {
    m.reply(`❌ Terjadi kesalahan: ${error.message}`);
  }
};
handler.help = ["upload type"];
handler.tags = ["tools"];
handler.command = /^(upload)$/i;
export default handler;