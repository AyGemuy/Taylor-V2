import {
  fileURLToPath
} from "url";
import {
  ffmpeg as ffmpegConv,
  toSticker,
  openwaSticker,
  StickerTypes as _StickerTypes,
  imageToWebp,
  videoToWebp,
  mp42webp,
  png2webp
} from "./converter.js";
import {
  video2Webp as _video2webp,
  image2Webp as _image2Webp
} from "./webp2mp4.js";
import uploadFile from "./uploadFile.js";
import uploadImage from "./uploadImage.js";
import {
  tmpdir
} from "os";
import {
  Sticker,
  createSticker,
  StickerTypes
} from "wa-sticker-formatter";
import {
  spawn
} from "child_process";
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import Fluent_Ffmpeg from "fluent-ffmpeg";
import {
  fileTypeFromBuffer
} from "file-type";
import webpmux from "node-webpmux";
const {
  Image,
  WebPMux
} = webpmux;
import crypto from "crypto";
import {
  Buffer
} from "buffer";
import sharp from "sharp";
import {
  isBuffer
} from "util";
const __dirname = path.dirname(fileURLToPath(import.meta.url)),
  tmp = path.join(__dirname, "../tmp");
async function sticker1(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const type = await fileTypeFromBuffer(Buffer.from(media)) || {
        mime: "image/jpg",
        ext: "jpg"
      },
      sticker = await openwaSticker(Buffer.from(media), type.mime);
    return sticker || (await _image2Webp(Buffer.from(media)) || await imageToWebp(Buffer.from(media)));
  } catch (error) {
    throw console.error("Error in sticker1:", error), error;
  }
}
async function sticker2(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) throw new Error(await res.text());
      media = await res.arrayBuffer();
    }
    const inp = path.join(tmp, `${Date.now()}.jpeg`);
    await fs.promises.writeFile(inp, Buffer.from(media));
    const ffmpegSpawn = spawn("ffmpeg", ["-y", "-i", inp, "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=#00000000,setsar=1", "-f", "webp", "-"]);
    ffmpegSpawn.on("error", err => {
      throw new Error(`FFmpeg error: ${err.message}`);
    });
    const ffBuffer = await new Promise((resolve, reject) => {
      const bufs = [];
      ffmpegSpawn.stdout.on("data", chunk => bufs.push(chunk)), ffmpegSpawn.stdout.on("end", () => resolve(Buffer.concat(bufs))),
        ffmpegSpawn.stderr.on("data", err => reject(new Error(`FFmpeg stderr: ${err.toString()}`)));
    });
    await fs.promises.unlink(inp);
    const imArgs = [...module.exports.support.gm ? ["gm"] : module.exports.magick ? ["magick"] : [], "convert", "png:-", "webp:-"],
      im = spawn(imArgs[0], imArgs.slice(1));
    im.on("error", err => {
      throw new Error(`ImageMagick error: ${err.message}`);
    });
    const imBuffer = await new Promise((resolve, reject) => {
      const bufs = [];
      im.stdout.on("data", chunk => bufs.push(chunk)), im.stdout.on("end", () => resolve(Buffer.concat(bufs))),
        im.stdin.on("error", err => reject(new Error(`ImageMagick stdin error: ${err.message}`))),
        im.stderr.on("data", err => reject(new Error(`ImageMagick stderr: ${err.toString()}`))),
        im.on("close", code => {
          0 !== code && reject(new Error(`ImageMagick exited with code ${code}`));
        });
    });
    return im.stdin.write(ffBuffer), im.stdin.end(), imBuffer;
  } catch (e) {
    throw console.error("Error in sticker2:", e), e;
  }
}
async function sticker3(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const type = await fileTypeFromBuffer(Buffer.from(media)) || {
      mime: "video/mp4",
      ext: "mp4"
    };
    return await _video2webp(Buffer.from(media)) || await video2webp(Buffer.from(media)) || await video2webp30(Buffer.from(media)) || await video2webp45(Buffer.from(media)) || await video2webp60(Buffer.from(media));
  } catch (error) {
    throw console.error("Error in sticker3:", error), error;
  }
}
async function sticker4(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const ffmpegArgs = ["-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=#00000000,setsar=1"],
      type = await fileTypeFromBuffer(Buffer.from(media)) || {
        ext: "jpeg"
      };
    return await (await ffmpegConv(Buffer.from(media), ffmpegArgs, type.ext, "webp")).toBuffer();
  } catch (error) {
    throw console.error("Error in sticker4:", error), error;
  }
}
async function sticker5(media, url, packname, author, categories = [""], extra = {}) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) throw new Error(await res.text());
      media = await res.arrayBuffer();
    }
    const stickerMetadata = {
        type: StickerTypes.FULL,
        pack: packname,
        author: author,
        categories: categories,
        ...extra
      },
      source = media || url;
    if (!source) throw new Error("Either media or url must be provided.");
    const sticker = new Sticker(source, stickerMetadata);
    return await createSticker(source) || await sticker.toBuffer();
  } catch (error) {
    throw console.error("Error creating sticker:", error), error;
  }
}
async function sticker6(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) throw new Error(await res.text());
      media = await res.arrayBuffer();
    }
    const type = await fileTypeFromBuffer(Buffer.from(media)) || {
      mime: "application/octet-stream",
      ext: "bin"
    };
    const tmpDir = path.join(__dirname, "../tmp"),
      tmpFile = path.join(tmpDir, `${Date.now()}.${type.ext}`),
      outFile = `${tmpFile}.webp`;
    return await fs.promises.writeFile(tmpFile, Buffer.from(media)), new Promise((resolve, reject) => {
      (/video/i.test(type.mime) ? Fluent_Ffmpeg(tmpFile).inputFormat(type.ext) : Fluent_Ffmpeg(tmpFile)).on("error", async err => {
        console.error("FFmpeg error:", err), await fs.promises.unlink(tmpFile), reject(err);
      }).on("end", async () => {
        await fs.promises.unlink(tmpFile);
        const data = await fs.promises.readFile(outFile);
        resolve(data), await fs.promises.unlink(outFile);
      }).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-lossless", "0", "-compression_level", "6", "-qscale", "80", "-preset", "default", "-t", "00:00:05"]).toFormat("webp").save(outFile);
    });
  } catch (e) {
    throw console.error("Error in sticker6:", e), e;
  }
}
async function sticker7(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const type = await fileTypeFromBuffer(Buffer.from(media)) || {
      mime: "video/mp4",
      ext: "mp4"
    };
    return await imageToWebp(Buffer.from(media));
  } catch (error) {
    throw console.error("Error in sticker7:", error), error;
  }
}
async function sticker8(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    return await sharp(Buffer.from(media)).webp({
      quality: 100,
      lossless: !0
    }).toBuffer();
  } catch (error) {
    throw console.error("Error converting to WebP:", error), error;
  }
}
async function sticker9(media, url, quality = 60) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const mux = new WebPMux();
    return await mux.setImage(Buffer.from(media)), await mux.save();
  } catch (error) {
    throw new Error(`WebP conversion error: ${error.message}`);
  }
}
async function sticker10(media, url, packname, author, extra = {}) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const metadata = {
        packname: extra.packname || "Taylor-V2",
        author: extra.author || "Wudysoft",
        isEmail: extra.isEmail || "wudysoft@mail.com",
        isWeb: extra.isWeb || "https://github.com/AyGemuy/Taylor-V2",
        androidLink: extra.androidLink || "https://play.google.com/store/apps/details?id=com.supercell.clashofclans",
        isFirst: void 0 !== extra.isFirst ? extra.isFirst : 1,
        osLink: extra.osLink || "https://apps.apple.com/id/app/clash-of-clans/id529479190",
        isAvatar: void 0 !== extra.isAvatar ? extra.isAvatar : 0,
        ...extra
      },
      options = {
        author: author || "Test",
        pack: packname || "Test_Pack",
        type: _StickerTypes.DEFAULT
      };
    return await toSticker(media, options, metadata);
  } catch (error) {
    throw console.error("Error in sticker10:", error), error;
  }
}
async function sticker11(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const type = await fileTypeFromBuffer(Buffer.from(media)) || {
      ext: "jpeg",
      mime: "image/jpeg"
    };
    if (type.mime?.startsWith("video/")) try {
      const ffmpegArgs = ["-q:v", "10", "-compression_level", "4"];
      return await (await ffmpegConv(Buffer.from(media), ffmpegArgs, type.ext, "webp")).toBuffer();
    } catch (error) {
      throw console.error("Error in video processing:", error), error;
    } else {
      if (!type.mime?.startsWith("image/")) throw new Error("Unsupported MIME type");
      try {
        const ffmpegArgs = ["-q:v", "100", "-compression_level", "4"];
        return await (await ffmpegConv(Buffer.from(media), ffmpegArgs, type.ext, "webp")).toBuffer();
      } catch (error) {
        throw console.error("Error in image processing:", error), error;
      }
    }
  } catch (error) {
    throw console.error("Error in createSticker:", error), error;
  }
}
async function sticker12(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const type = await fileTypeFromBuffer(Buffer.from(media)) || {
      ext: "jpeg",
      mime: "image/jpeg"
    };
    if (type.mime?.startsWith("video/")) try {
      return await mp42webp(Buffer.from(media));
    } catch (error) {
      throw console.error("Error in video processing:", error), error;
    } else {
      if (!type.mime?.startsWith("image/")) throw new Error("Unsupported MIME type");
      try {
        return await png2webp(Buffer.from(media));
      } catch (error) {
        throw console.error("Error in image processing:", error), error;
      }
    }
  } catch (error) {
    throw console.error("Error in createSticker:", error), error;
  }
}
async function sticker13(media, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (200 !== res.status) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      media = await res.arrayBuffer();
    }
    const type = await fileTypeFromBuffer(Buffer.from(media)) || {
      ext: "jpeg",
      mime: "image/jpeg"
    };
    const cmd = {
      image: ["-fs 1M", "-vcodec", "libwebp", "-vf", `scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1`],
      video: ["-fs 1M", "-vcodec", "libwebp"]
    };
    if (type.mime?.startsWith("video/")) try {
      return await convertImage(Buffer.from(media), type.ext, "webp", cmd.video);
    } catch (error) {
      throw console.error("Error in video processing:", error), error;
    } else {
      if (!type.mime?.startsWith("image/")) throw new Error("Unsupported MIME type");
      try {
        return await convertImage(Buffer.from(media), type.ext, "webp", cmd.image);
      } catch (error) {
        throw console.error("Error in image processing:", error), error;
      }
    }
  } catch (error) {
    throw console.error("Error in createSticker:", error), error;
  }
}
async function convertImage(file, ext1, ext2, options = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const temp = path.join(__dirname, "../tmp", Date.now() + "." + ext1);
      const out = temp + "." + ext2;
      await fs.promises.writeFile(temp, file);
      await Fluent_Ffmpeg(temp).on("start", cmd => {
        console.log(cmd);
      }).on("error", e => {
        fs.unlinkSync(temp);
        reject(e);
      }).on("end", () => {
        console.log("Finish");
        setTimeout(() => {
          fs.unlinkSync(temp);
          fs.unlinkSync(out);
        }, 2e3);
        resolve(fs.readFileSync(out));
      }).addOutputOptions(options).toFormat(ext2).save(out);
    } catch (error) {
      reject(error);
    }
  });
}
async function convertVideo(file, ext1, ext2, options = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const temp = path.join(__dirname, "../tmp", Date.now() + "." + ext1);
      const out = temp + "." + ext2;
      await fs.promises.writeFile(temp, file);
      await Fluent_Ffmpeg(temp).on("start", cmd => {
        console.log(cmd);
      }).on("error", e => {
        fs.unlinkSync(temp);
        reject(e);
      }).on("end", () => {
        console.log("Finish");
        setTimeout(() => {
          fs.unlinkSync(temp);
          fs.unlinkSync(out);
        }, 2e3);
        resolve(fs.readFileSync(out));
      }).addOutputOptions(options).seekInput("00:00").setDuration("00:05").toFormat(ext2).save(out);
    } catch (error) {
      reject(error);
    }
  });
}
async function addExif(webpSticker, packname, author, categories = [""], extra = {}) {
  try {
    const metadata = {
        packname: packname || "Taylor-V2",
        author: author || "Wudysoft",
        isEmail: extra.isEmail || "wudysoft@mail.com",
        isWeb: extra.isWeb || "https://github.com/AyGemuy/Taylor-V2",
        androidLink: extra.androidLink || "https://play.google.com/store/apps/details?id=com.supercell.clashofclans",
        isFirst: void 0 !== extra.isFirst ? extra.isFirst : 1,
        osLink: extra.osLink || "https://apps.apple.com/id/app/clash-of-clans/id529479190",
        isAvatar: void 0 !== extra.isAvatar ? extra.isAvatar : 0
      },
      cleanExtra = {
        ...extra
      };
    delete cleanExtra.isEmail, delete cleanExtra.isWeb, delete cleanExtra.androidLink,
      delete cleanExtra.isFirst, delete cleanExtra.osLink, delete cleanExtra.isAvatar;
    const json = {
      "sticker-pack-id": crypto.randomBytes(32).toString("hex") || "https://github.com/AyGemuy/Taylor-V2",
      "sticker-pack-name": metadata?.packname,
      "sticker-pack-publisher": metadata?.author,
      "sticker-pack-publisher-email": metadata?.isEmail,
      "sticker-pack-publisher-website": metadata?.isWeb,
      ...categories && categories.length > 0 ? {
        emojis: categories
      } : {},
      "android-app-store-link": metadata?.androidLink,
      "is-first-party-sticker": metadata?.isFirst,
      "ios-app-store-link": metadata?.osLink,
      "is-avatar-sticker": metadata?.isAvatar,
      ...cleanExtra
    };
    let exifAttr = Buffer.from([73, 73, 42, 0, 8, 0, 0, 0, 1, 0, 65, 87, 7, 0, 0, 0, 0, 0, 22, 0, 0, 0]),
      jsonBuffer = Buffer.from(JSON.stringify(json), "utf8"),
      exif = Buffer.concat([exifAttr, jsonBuffer]);
    exif.writeUIntLE(jsonBuffer?.length, 14, 4);
    const media = new Image();
    return await media.load(webpSticker), media.exif = exif, await media.save(null);
  } catch (error) {
    throw console.error("Error in addExif:", error), error;
  }
}
async function video2webp(media) {
  const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
    tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);
  fs.writeFileSync(tmpFileIn, media), await new Promise((resolve, reject) => {
    Fluent_Ffmpeg(tmpFileIn).on("error", reject).on("end", () => resolve(!0)).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-loop", "0", "-ss", "00:00:00", "-t", "00:00:05", "-preset", "default", "-an", "-vsync", "0"]).toFormat("webp").save(tmpFileOut);
  });
  const buff = fs.readFileSync(tmpFileOut);
  return fs.unlinkSync(tmpFileOut), fs.unlinkSync(tmpFileIn), buff;
}
async function video2webp30(media) {
  const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
    tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);
  fs.writeFileSync(tmpFileIn, media), await new Promise((resolve, reject) => {
    Fluent_Ffmpeg(tmpFileIn).on("error", reject).on("end", () => resolve(!0)).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-loop", "0", "-ss", "00:00:00", "-t", "00:00:05", "-preset", "default", "-an", "-vsync", "0"]).toFormat("webp").save(tmpFileOut);
  });
  const buff = fs.readFileSync(tmpFileOut);
  return fs.unlinkSync(tmpFileOut), fs.unlinkSync(tmpFileIn), buff;
}
async function video2webp45(media) {
  const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
    tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);
  fs.writeFileSync(tmpFileIn, media), await new Promise((resolve, reject) => {
    Fluent_Ffmpeg(tmpFileIn).on("error", reject).on("end", () => resolve(!0)).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-loop", "0", "-ss", "00:00:00", "-t", "00:00:05", "-preset", "default", "-an", "-vsync", "0"]).toFormat("webp").save(tmpFileOut);
  });
  const buff = fs.readFileSync(tmpFileOut);
  return fs.unlinkSync(tmpFileOut), fs.unlinkSync(tmpFileIn), buff;
}
async function video2webp60(media) {
  const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
    tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);
  fs.writeFileSync(tmpFileIn, media), await new Promise((resolve, reject) => {
    Fluent_Ffmpeg(tmpFileIn).on("error", reject).on("end", () => resolve(!0)).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='iw*min(512/iw\\,512/ih):ih*min(512/iw\\,512/ih)':force_original_aspect_ratio=decrease,fps=15,pad='512:512:(512-iw*min(512/iw\\,512/ih))/2:(512-ih*min(512/iw\\,512/ih))/2':color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-loop", "0", "-ss", "00:00:00", "-t", "00:00:05", "-preset", "default", "-an", "-vsync", "0"]).toFormat("webp").save(tmpFileOut);
  });
  const buff = fs.readFileSync(tmpFileOut);
  return fs.unlinkSync(tmpFileOut), fs.unlinkSync(tmpFileIn), buff;
}
async function sticker(media, url, args) {
  const functionsToTry = [sticker6, sticker4, sticker10, sticker11, sticker12, sticker13, sticker3, sticker1, sticker7, sticker9, sticker8, sticker5, sticker2].filter(Boolean);
  for (let func of functionsToTry) {
    try {
      const result = await Promise.race([func(media, url, args), new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 6e4))]);
      if (result?.includes("html")) continue;
      if (result?.includes("WEBP")) return await addExif(result, args).catch(e => {
        console.error(e);
        return result;
      });
      throw new Error(result.toString());
    } catch (err) {
      console.error(err);
    }
  }
  return new Error("All functions failed");
}
const support = {
  ffmpeg: !0,
  ffprobe: !0,
  ffmpegWebp: !0,
  convert: !0,
  magick: !1,
  gm: !1,
  find: !1
};
export {
  sticker,
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
  sticker9,
  sticker10,
  sticker11,
  sticker12,
  sticker13,
  video2webp,
  video2webp30,
  video2webp45,
  video2webp60,
  addExif,
  support
};