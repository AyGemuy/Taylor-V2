import fs from "fs";
import {
  tmpdir
} from "os";
import Crypto from "crypto";
import ff from "fluent-ffmpeg";
import webp from "node-webpmux";
import path from "path";
import {
  imageToWebp,
  videoToWebp
} from "./converter.js";
async function writeExifImg(media, metadata = {}, extra = {}) {
  try {
    let wMedia = await imageToWebp(media),
      tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
      tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    if (fs.writeFileSync(tmpFileIn, wMedia), metadata) {
      let img = new webp.Image(),
        cleanExtra = {
          ...extra
        },
        json = {
          "sticker-pack-id": metadata?.isId || "https://github.com/AyGemuy/Taylor-V2",
          "sticker-pack-name": metadata?.packname || "Taylor-V2",
          "sticker-pack-publisher": metadata?.author || "Wudysoft",
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
        jsonBuffer = Buffer.from(JSON.stringify(json), "utf-8"),
        exif = Buffer.concat([exifAttr, jsonBuffer]);
      return exif.writeUIntLE(jsonBuffer?.length, 14, 4), await img.load(tmpFileIn), fs.unlinkSync(tmpFileIn),
        img.exif = exif, await img.save(tmpFileOut), tmpFileOut;
    }
  } catch (error) {
    throw console.error(error), new Error("Error writing EXIF data for image.");
  }
}
async function writeExifVid(media, metadata = {}, extra = {}) {
  try {
    let wMedia = await videoToWebp(media),
      tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
      tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    if (fs.writeFileSync(tmpFileIn, wMedia), metadata) {
      let img = new webp.Image(),
        cleanExtra = {
          ...extra
        },
        json = {
          "sticker-pack-id": metadata?.isId || "https://github.com/AyGemuy/Taylor-V2",
          "sticker-pack-name": metadata?.packname || "Taylor-V2",
          "sticker-pack-publisher": metadata?.author || "Wudysoft",
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
        jsonBuffer = Buffer.from(JSON.stringify(json), "utf-8"),
        exif = Buffer.concat([exifAttr, jsonBuffer]);
      return exif.writeUIntLE(jsonBuffer?.length, 14, 4), await img.load(tmpFileIn), fs.unlinkSync(tmpFileIn),
        img.exif = exif, await img.save(tmpFileOut), tmpFileOut;
    }
  } catch (error) {
    throw console.error(error), new Error("Error writing EXIF data for video.");
  }
}
async function writeExif(media, metadata = {}, extra = {}) {
  try {
    let wMedia = /webp/.test(media.mimetype) ? media.data : /image/.test(media.mimetype) ? await imageToWebp(media.data) : /video/.test(media.mimetype) ? await videoToWebp(media.data) : "",
      tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
      tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    if (fs.writeFileSync(tmpFileIn, wMedia), metadata) {
      let img = new webp.Image(),
        cleanExtra = {
          ...extra
        },
        json = {
          "sticker-pack-id": metadata?.isId || "https://github.com/AyGemuy/Taylor-V2",
          "sticker-pack-name": metadata?.packname || "Taylor-V2",
          "sticker-pack-publisher": metadata?.author || "Wudysoft",
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
        jsonBuffer = Buffer.from(JSON.stringify(json), "utf-8"),
        exif = Buffer.concat([exifAttr, jsonBuffer]);
      return exif.writeUIntLE(jsonBuffer?.length, 14, 4), await img.load(tmpFileIn), fs.unlinkSync(tmpFileIn),
        img.exif = exif, await img.save(tmpFileOut), tmpFileOut;
    }
  } catch (error) {
    throw console.error(error), new Error("Error writing EXIF data.");
  }
}
async function writeExifWebp(media, metadata = {}, extra = {}) {
  try {
    let wMedia = media,
      tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`),
      tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    if (fs.writeFileSync(tmpFileIn, wMedia), metadata) {
      let img = new webp.Image(),
        cleanExtra = {
          ...extra
        },
        json = {
          "sticker-pack-id": metadata?.isId || "https://github.com/AyGemuy/Taylor-V2",
          "sticker-pack-name": metadata?.packname || "Taylor-V2",
          "sticker-pack-publisher": metadata?.author || "Wudysoft",
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
        jsonBuffer = Buffer.from(JSON.stringify(json), "utf-8"),
        exif = Buffer.concat([exifAttr, jsonBuffer]);
      return exif.writeUIntLE(jsonBuffer?.length, 14, 4), await img.load(tmpFileIn), fs.unlinkSync(tmpFileIn),
        img.exif = exif, await img.save(tmpFileOut), tmpFileOut;
    }
  } catch (error) {
    throw console.error(error), new Error("Error writing EXIF data for WebP.");
  }
}
export {
  writeExifImg,
  writeExifVid,
  writeExif,
  writeExifWebp
};