import fs from "fs";
import path from "path";
import nodezip from "node-zip";
import sharp from "sharp";
import pdfkit from "pdfkit";
import axios from "axios";
import {
  PassThrough
} from "stream";
async function pushImageToPdf(pdf, imageFile, pdfName) {
  const image = sharp(imageFile),
    metadata = await image.metadata();
  return pdf ? pdf.addPage({
    size: [metadata.width, metadata.height],
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  }) : (pdf = new pdfkit({
    size: [metadata.width, metadata.height],
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  })).pipe(fs.createWriteStream(pdfName)), pdf.image(imageFile, {
    width: metadata.width,
    height: metadata.height,
    align: "center",
    valign: "center"
  }), pdf;
}
async function convertZipToPdf(zipFile, pdfFile) {
  const zip = new nodezip(fs.readFileSync(zipFile, {
    encoding: "binary"
  }), {
    base64: !1,
    checkCRC32: !0
  });
  let pdf = null;
  for (const fileName of Object.keys(zip.files)) try {
    const imageBuffer = Buffer.from(zip.files[fileName]._data, "binary");
    pdf = await pushImageToPdf(pdf, imageBuffer, pdfFile), console.log("Add:", fileName);
  } catch (e) {
    console.log("Skip:", fileName);
  }
  pdf && pdf.end();
}
async function imgToPdf(imageSources) {
  try {
    const buffers = [],
      pdfDoc = new pdfkit(),
      pdfStream = new PassThrough();
    if (pdfDoc.pipe(pdfStream), !imageSources || 0 === imageSources.length) return console.log("No images found."),
      null;
    for (const [index, imageSource] of imageSources.entries()) try {
      let imageData;
      if ("string" == typeof imageSource) {
        const imageResponse = await axios.get(imageSource, {
          responseType: "arraybuffer"
        });
        imageData = Buffer.from(imageResponse.data);
      } else {
        if (!Buffer.isBuffer(imageSource)) {
          console.error(`Invalid image source at index ${index + 1}`);
          continue;
        }
        imageData = imageSource;
      }
      await pdfDoc.addPage().image(imageData, {
        fit: [pdfDoc.page.width, pdfDoc.page.height],
        align: "center",
        valign: "center"
      });
    } catch (error) {
      console.error(`Error processing image at index ${index + 1}:`, error);
    }
    return pdfDoc.end(), pdfStream.on("data", chunk => buffers.push(chunk)), new Promise(resolve => pdfStream.on("end", () => resolve(Buffer.concat(buffers))));
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}
async function textToPdf(text) {
  try {
    const buffers = [],
      pdfDoc = new pdfkit(),
      pdfStream = new PassThrough();
    pdfDoc.pipe(pdfStream);
    const lines = text.split("\n");
    for (const line of lines) pdfDoc.text(line);
    return pdfDoc.end(), pdfStream.on("data", chunk => buffers.push(chunk)), new Promise(resolve => pdfStream.on("end", () => resolve(Buffer.concat(buffers))));
  } catch (error) {
    throw console.error("Error converting text to PDF:", error), error;
  }
}
export {
  pushImageToPdf,
  convertZipToPdf,
  imgToPdf,
  textToPdf
};