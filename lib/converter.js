import {
  createReadStream,
  promises as fs
} from "fs";
import {
  join
} from "path";
import {
  spawn
} from "child_process";
import {
  randomBytes
} from "crypto";
import Helper from "./helper.js";
import axios from "axios";
import cheerio from "cheerio";
import BodyForm from "form-data";
import {
  fileURLToPath
} from "url";
import fluent_ffmpeg from "fluent-ffmpeg";
import crypto from "crypto";
import webp from "node-webpmux";
import {
  fileTypeFromBuffer
} from "file-type";
import {
  tmpdir
} from "os";
import jimp from "jimp";
import sharp from "sharp";
const __dirname = Helper.__dirname(import.meta.url);
async function spawn_ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return new Promise(async (resolve, reject) => {
    try {
      const tmp = join(__dirname, `../tmp/${Date.now()}.${ext}`),
        out = `${tmp}.${ext2}`;
      Helper.isReadableStream(buffer) ? await Helper.saveStreamToFile(buffer, tmp) : await fs.writeFile(tmp, buffer);
      const ffmpegProcess = spawn("ffmpeg", ["-y", "-i", tmp, ...args, out]);
      ffmpegProcess.once("error", async err => {
        console.error("FFmpeg spawn error, trying fluent-ffmpeg:", err);
        try {
          await fs.unlink(tmp);
        } catch (e) {
          console.error("Error deleting temporary file:", e);
        }
        return fallback_ffmpeg(tmp, args, ext2).then(resolve).catch(reject);
      }), ffmpegProcess.once("close", async code => {
        try {
          if (await fs.unlink(tmp), 0 !== code) return reject(new Error(`FFmpeg process exited with code ${code}`));
          const data = createReadStream(out);
          resolve({
            data: data,
            filename: out,
            async toBuffer() {
              const buffers = [];
              for await (const chunk of data) buffers.push(chunk);
              return Buffer.concat(buffers);
            },
            async clear() {
              data.destroy(), await fs.unlink(out);
            }
          });
        } catch (e) {
          reject(e);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
async function fallback_ffmpeg(inputFile, args, outputExt) {
  return new Promise((resolve, reject) => {
    const outputFile = `${inputFile}.${outputExt}`;
    fluent_ffmpeg(inputFile).outputOptions(args).output(outputFile).on("end", async () => {
      const data = createReadStream(outputFile);
      resolve({
        data: data,
        filename: outputFile,
        async toBuffer() {
          const buffers = [];
          for await (const chunk of data) buffers.push(chunk);
          return Buffer.concat(buffers);
        },
        async clear() {
          data.destroy(), await fs.unlink(outputFile);
        }
      });
    }).on("error", err => {
      reject(err);
    }).run();
  });
}
const defaultImageOptions = ["-vcodec", "libwebp", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-lossless", "0", "-compression_level", "6", "-qscale", "80", "-preset", "default"],
  defaultVideoOptions = ["-vcodec", "libwebp", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-loop", "0", "-ss", "00:00:00.0", "-t", "00:00:05.0", "-lossless", "0", "-compression_level", "6", "-qscale", "80", "-preset", "default", "-an", "-vsync", "0"];
async function imageToWebp(buffer, stickerOptions = {
  author: "Taylor-V2",
  pack: "Wudysoft",
  fps: 15,
  type: "default"
}, opsi = []) {
  try {
    let options = {
      author: stickerOptions.author || "Taylor-V2",
      pack: stickerOptions.pack || "Wudysoft",
      fps: stickerOptions.fps || 15,
      type: stickerOptions.type || "default"
    };
    return await createSticker(buffer, options, {});
  } catch (e) {
    try {
      let {
        ext
      } = await fileTypeFromBuffer(buffer);
      return await (await spawn_ffmpeg(buffer, [...defaultImageOptions, ...Object.entries(opsi).map(([key, value]) => `${key}=${value}`)], ext, "webp")).toBuffer();
    } catch (e) {
      console.log(e);
    }
  }
}
async function videoToWebp(buffer, stickerOptions = {}) {
  try {
    let options = {
      author: stickerOptions.author || "Taylor-V2",
      pack: stickerOptions.pack || "Wudysoft",
      fps: stickerOptions.fps || 15,
      type: stickerOptions.type || "default",
      ...stickerOptions
    };
    return await createSticker(buffer, options, {});
  } catch (e) {
    try {
      let {
        ext
      } = await fileTypeFromBuffer(buffer);
      return await (await spawn_ffmpeg(buffer, [...defaultImageOptions, ...Object.entries(opsi).map(([key, value]) => `${key}=${value}`)], ext, "webp")).toBuffer();
    } catch (e) {
      console.log(e);
    }
  }
}
async function toPTT(buffer, audioExt) {
  return await spawn_ffmpeg(buffer, ["-vn", "-ab", "128k", "-ar", "44100"], audioExt, "ogg");
}
async function toAudio(buffer, audioExt) {
  return await spawn_ffmpeg(buffer, ["-vn", "-ab", "128k", "-ar", "44100", "-ac", "2", "-codec:a", "libmp3lame", "-b:a", "128k"], audioExt, "mp3");
}
async function toAudio8k(buffer, audioExt) {
  return await spawn_ffmpeg(buffer, ["-af", "apulsator=hz=0.125", "-codec:a", "libmp3lame", "-b:a", "128k"], audioExt, "mp3");
}
async function toVideo(buffer, videoExt) {
  return await spawn_ffmpeg(buffer, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "23", "-preset", "slow", "-tune", "film"], videoExt, "mp4");
}
async function toMp4(buffer, videoExt) {
  return await spawn_ffmpeg(buffer, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "23", "-movflags", "+faststart", "-vf", "crop=1024:1024", "-c:a", "aac", "-b:a", "128k"], videoExt, "mp4");
}
async function videoConvert(buffer, options = []) {
  return await (await spawn_ffmpeg(buffer, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow", "-tune", "film", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2'", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", ...options], "mp4", "mp4")).toBuffer();
}
async function toGif(data) {
  try {
    const input = `./${randomBytes(3).toString("hex")}.webp`,
      output = `./${randomBytes(3).toString("hex")}.gif`;
    await fs.writeFile(input, data), await new Promise((resolve, reject) => {
      const convertProcess = spawn("convert", [input, output]);
      convertProcess.once("error", reject), convertProcess.once("exit", () => resolve());
    });
    const result = await fs.readFile(output);
    return await fs.unlink(input), await fs.unlink(output), result;
  } catch (error) {
    throw console.log(error), new Error("Failed to convert to GIF");
  }
}
async function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return await spawn_ffmpeg(buffer, args, ext, ext2);
}
export {
  imageToWebp,
  videoToWebp,
  toPTT,
  toAudio,
  toAudio8k,
  toVideo,
  toMp4,
  videoConvert,
  toGif,
  ffmpeg
};
const webp2mp4File = source => new Promise((resolve, reject) => {
    const form = new BodyForm(),
      isUrl = "string" == typeof source && /https?:\/\//.test(source);
    form.append("new-image-url", isUrl ? source : ""), form.append("new-image", isUrl ? "" : source, "image.webp"),
      axios.post("https://s6.ezgif.com/webp-to-mp4", form, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`
        }
      }).then(({
        data
      }) => {
        const bodyFormThen = new BodyForm(),
          file = cheerio.load(data)('input[name="file"]').attr("value");
        bodyFormThen.append("file", file), bodyFormThen.append("convert", "Convert WebP to MP4!"),
          axios.post(`https://ezgif.com/webp-to-mp4/${file}`, bodyFormThen, {
            headers: {
              "Content-Type": `multipart/form-data; boundary=${bodyFormThen._boundary}`
            }
          }).then(({
            data
          }) => {
            const result = "https:" + cheerio.load(data)("div#output > p.outfile > video > source").attr("src");
            resolve(result);
          }).catch(reject);
      }).catch(reject);
  }),
  openwaSticker = (buffer, mime = "image/jpg", options = {}) => new Promise((resolve, reject) => {
    axios.post("https://sticker-api.openwa.dev/" + (mime.startsWith("image") ? "prepareWebp" : "convertMp4BufferToWebpDataUrl"), {
      maxBodyLength: 2e7,
      maxContentLength: 15e5,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
        "User-Agent": "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
      },
      data: JSON.stringify(Object.assign(options, {
        ["" + (mime.startsWith("image") ? "image" : "file")]: `data:${mime};base64,${buffer.toString("base64")}`
      }))
    }).then(({
      data
    }) => {
      resolve(mime.startsWith("image") ? data.webpBase64 : data);
    }).catch(reject);
  }),
  TelegraPh = Path => new Promise(async (resolve, reject) => {
    if (!fs.exists(Path)) return reject(new Error("File not Found"));
    try {
      const form = new BodyForm();
      form.append("file", fs.createReadStream(Path));
      const {
        data
      } = await axios.post("https://telegra.ph/upload", form, {
        headers: {
          ...form.getHeaders()
        }
      });
      resolve("https://telegra.ph" + data[0]?.src);
    } catch (err) {
      reject(new Error(String(err)));
    }
  }),
  UploadFileUgu = input => new Promise(async (resolve, reject) => {
    const form = new BodyForm();
    form.append("files[]", fs.createReadStream(input)), axios.post("https://uguu.se/upload.php", form, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        ...form.getHeaders()
      }
    }).then(({
      data
    }) => {
      resolve(data.files[0]);
    }).catch(reject);
  });
export {
  webp2mp4File,
  openwaSticker,
  TelegraPh,
  UploadFileUgu
};
const createSticker = async (buffer, options = {}, metadata = {}) => {
  let {
    mime
  } = await fileTypeFromBuffer(buffer), isAnimated = mime.startsWith("video") || mime.includes("gif");
  options = {
    pack: packname,
    author: author,
    ...options
  };
  const bufferWebp = await convertToWebp(buffer, isAnimated, options);
  return await addExif(bufferWebp, options.pack, options.author, metadata);
};
async function convertToWebp(buffer, isAnimated, options) {
  return new Promise(async (resolve, reject) => {
    let inputPath, optionsFfmpeg, webpPath = `${tmpdir()}/${Math.random().toString(36)}.webp`;
    isAnimated ? (inputPath = `${tmpdir()}/${Math.random().toString(36)}.mp4`, optionsFfmpeg = ["-vcodec", "libwebp", "-filter:v", `fps=fps=${options.fps || 15}`, "-lossless", "0", "-compression_level", "6", "-q:v", "10", "-qscale", "80", "-loop", "1", "-preset", "default", "-an", "-vsync", "0", "-s", "512:512"]) : (inputPath = `${tmpdir()}/${Math.random().toString(36)}.png`, buffer = await editImage(buffer, options.type || "default"), optionsFfmpeg = ["-vcodec", "libwebp", "-loop", "0", "-lossless", "0", "-compression_level", "6", "-q:v", "100", "-qscale", "80"]),
      fs.writeFile(inputPath, buffer), fluent_ffmpeg(inputPath).outputOptions(optionsFfmpeg).save(webpPath).on("end", async () => {
        let buffer = fs.readFile(webpPath);
        fs.unlink(webpPath), fs.unlink(inputPath), resolve(buffer);
      }).on("error", async err => {
        fs.unlink(inputPath), reject(err);
      });
  });
}
async function editImage(buffer, type) {
  const image = await jimp.read(buffer),
    originalWidth = image.bitmap.width,
    originalHeight = image.bitmap.height,
    resizeWidth = originalWidth < 1920 ? 1920 : originalWidth,
    resizeHeight = originalHeight < 1080 ? jimp.AUTO : originalHeight;
  switch (image.resize(resizeWidth, resizeHeight), type) {
    case "circle":
      image.circle();
      break;
    case "grayscale":
      image.grayscale();
      break;
    case "invert":
      image.invert();
      break;
    case "sepia":
      image.sepia();
      break;
    case "blur":
      image.blur(5);
  }
  return image.resize(originalWidth, originalHeight), await image.getBufferAsync(jimp.MIME_PNG);
}
async function addExif(buffer, pack, author, metadata = {}, extra = {}) {
  const img = new webp.Image(),
    stickerPackId = crypto.randomBytes(32).toString("hex"),
    cleanExtra = {
      ...extra
    },
    json = {
      "sticker-pack-id": metadata?.isId || stickerPackId || "https://github.com/AyGemuy/Taylor-V2",
      "sticker-pack-name": pack || "Taylor-V2",
      "sticker-pack-publisher": author || "Wudysoft",
      "sticker-pack-publisher-email": metadata?.isEmail || "wudysoft@mail.com",
      "sticker-pack-publisher-website": metadata?.isWeb || "https://github.com/AyGemuy/Taylor-V2",
      ...metadata?.categories && metadata?.categories.length >= 1 ? {
        emojis: metadata?.categories
      } : {},
      "android-app-store-link": metadata?.androidLink || "https://play.google.com/store/apps/details?id=com.supercell.clashofclans",
      "is-first-party-sticker": void 0 !== metadata?.isFirst ? metadata?.isFirst : 1,
      "ios-app-store-link": metadata?.osLink || "https://apps.apple.com/id/app/clash-of-clans/id529479190",
      "is-avatar-sticker": void 0 !== metadata?.isAvatar ? metadata?.isAvatar : 0,
      ...cleanExtra
    };
  delete cleanExtra.isId, delete cleanExtra.packname, delete cleanExtra.author, delete cleanExtra.isEmail,
    delete cleanExtra.isWeb, delete cleanExtra.categories, delete cleanExtra.androidLink,
    delete cleanExtra.isFirst, delete cleanExtra.osLink, delete cleanExtra.isAvatar;
  let exifAttr = Buffer.from([73, 73, 42, 0, 8, 0, 0, 0, 1, 0, 65, 87, 7, 0, 0, 0, 0, 0, 22, 0, 0, 0]),
    jsonBuffer = Buffer.from(JSON.stringify(json), "utf8"),
    exif = Buffer.concat([exifAttr, jsonBuffer]);
  return exif.writeUIntLE(jsonBuffer?.length, 14, 4), await img.load(buffer), img.exif = exif,
    await img.save(null);
}
export const toSticker = async (buffer, stickerOptions = {}, extra = {}) => {
  try {
    let options = {
      author: stickerOptions.author || "Taylor-V2",
      pack: stickerOptions.pack || "Wudysoft",
      fps: stickerOptions.fps || 15,
      type: stickerOptions.type || "default",
      ...stickerOptions
    };
    return await createSticker(buffer, options, extra);
  } catch (err) {
    throw err;
  }
};
export const updateExif = async (buffer, pack, author) => {
  try {
    return await addExif(buffer, pack, author);
  } catch (err) {
    throw err;
  }
};
export const StickerTypes = {
  CIRCLE: "circle",
  DEFAULT: "default"
};
async function mp42webp(source) {
  try {
    const inputBuffer = "string" == typeof source ? await fs.readFile(source) : source,
      outputPath = join(__dirname, "../tmp", "output.webp");
    await sharp(inputBuffer).webp().toFile(outputPath);
    return `data:image/webp;base64,${(await fs.readFile(outputPath)).toString("base64")}`;
  } catch (error) {
    throw new Error(`Failed to convert MP4 to WebP: ${error.message}`);
  }
}
async function png2webp(source) {
  try {
    const inputBuffer = "string" == typeof source ? await fs.readFile(source) : source;
    return `data:image/webp;base64,${(await sharp(inputBuffer).webp().toBuffer()).toString("base64")}`;
  } catch (error) {
    throw new Error(`Failed to convert PNG to WebP: ${error.message}`);
  }
}
export {
  mp42webp,
  png2webp
};