import yargs from "yargs";
import os from "os";
import path, {
  dirname
} from "path";
import {
  fileURLToPath,
  pathToFileURL
} from "url";
import {
  createRequire
} from "module";
import fs from "fs";
import {
  Readable
} from "stream";
import emojiRegex from "emoji-regex";
const __filename = (pathURL = import.meta, rmPrefix = "win32" !== os.platform()) => rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString(),
  __dirname = pathURL => path.dirname(__filename(pathURL, !0)),
  __require = (dir = import.meta) => createRequire(dir),
  checkFileExists = async file => {
    try {
      return await fs.promises.access(file, fs.constants.F_OK), !0;
    } catch (error) {
      return !1;
    }
  }, checkFilesExist = async files => {
    if (Array.isArray(files)) {
      const fileChecks = files.map(file => checkFileExists(file));
      return await Promise.all(fileChecks);
    }
    return await checkFileExists(files);
  }, API = (name, path = "/", query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? "?" + new URLSearchParams(Object.entries({
    ...query,
    ...apikeyqueryname ? {
      [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {}
  })) : ""), saveStreamToFile = async (stream, file) => {
    const writable = fs.createWriteStream(file);
    await new Promise((resolve, reject) => {
      writable.on("finish", resolve), writable.on("error", reject), stream.pipe(writable);
    });
  }, isReadableStream = stream => "object" == typeof stream && null !== stream && (stream instanceof Readable && "function" == typeof stream.pipe || stream instanceof fs.ReadStream || "function" == typeof stream.pipe && "function" == typeof stream.on), symbolRegex = /^[^\w\s\d]/u, emojiAndSymbolRegex = new RegExp(`(${symbolRegex.source}|${emojiRegex().source})`, "u"), prefix = emojiAndSymbolRegex, opts = yargs(process.argv.slice(2)).exitProcess(!1).parse();
export default {
  __filename: __filename,
  __dirname: __dirname,
  __require: __require,
  checkFileExists: checkFileExists,
  checkFilesExist: checkFilesExist,
  API: API,
  saveStreamToFile: saveStreamToFile,
  isReadableStream: isReadableStream,
  opts: opts,
  prefix: prefix
};