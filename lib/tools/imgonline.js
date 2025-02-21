import { fetch } from "undici";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import * as cheerio from "cheerio";
import { default as Jimp } from "jimp";
class ImageProcessor {
  constructor() {
    this.urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
  }
  async processImage(input, endpoint, options) {
    try {
      const inputBuffer =
          Buffer.isBuffer(input) ||
          input instanceof ArrayBuffer ||
          ArrayBuffer.isView(input)
            ? input
            : this.urlRegex.test(input)
              ? await fetch(input).then((response) => response.arrayBuffer())
              : Buffer.alloc(0),
        image = await Jimp.read(inputBuffer),
        photoBuffer = await image.getBufferAsync(Jimp.MIME_JPEG),
        { ext, mime } = (await fileTypeFromBuffer(photoBuffer)) || {},
        photoBlob = new Blob([photoBuffer], {
          type: mime,
        }),
        formData = new FormData();
      Object.entries(options).forEach(([key, value]) => {
        formData.append(key, value);
      }),
        formData.append("uploadfile", photoBlob, `photo.${ext}`);
      const uploadResponse = await fetch(endpoint, {
          method: "POST",
          body: formData,
        }),
        responseData = await uploadResponse.text();
      console.info(responseData);
      const $ = cheerio.load(responseData),
        links = $("#content a")
          .map((index, element) => {
            let link = $(element).attr("href");
            return link && !link.startsWith("https")
              ? "https://www.imgonline.com.ua/" + link
              : link;
          })
          .get();
      return {
        url: links || "",
        text:
          $('div[style="background-color:#CCFFCC;padding:5px;"]')
            .text()
            .trim() || "",
      };
    } catch (e) {
      console.log("Error", e);
    }
  }
  async compressImage(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/compress-image-result.php",
      {
        efset1: "1",
        efset2: "1",
        jpegtype: "1",
        jpegmeta: "1",
        jpegqual: "1",
      },
    );
  }
  async resizeImage(input, width, height) {
    const options = {
      imgwidth: width,
      imgheight: height,
      imgresizetype: "1",
      pset: "3",
      filtset: "5",
      dpiset: "0",
      outformat: "2",
      jpegtype: "1",
      jpegqual: "92",
      jpegmeta: "1",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/resize-image-result.php",
      options,
    );
  }
  async convertImage(input, type) {
    const options = {
      "ef-set": type,
      "ef-set-2": "1",
      "ef-set-3": "bce",
      "jpeg-conv-type": "1",
      "jpeg-meta": "1",
      "jpeg-quality": "92",
      outformat: "2",
      jpegtype: "1",
      jpegqual: "92",
      jpegmeta: "1",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/convert-result.php",
      options,
    );
  }
  async textOnImage(input, text) {
    const options = {
      addtext: text,
      readysettings: "1",
      textblocklocation: "1",
      textblockpositioning: "6",
      textblockxoffset: "0",
      textblockyoffset: "0",
      textblockoffsetunit: "2",
      textblockw: "100",
      textblockh: "12",
      textblocksizeunit: "2",
      textblockbackgrcolor: "1",
      textblockbackgrhex: "#000000",
      textblockbackgrtransp: "60",
      textblockrotate: "1",
      textrotate: "0",
      textfont: "4",
      textsize: "50",
      textcolor: "7",
      textcolorhex: "#ffffff",
      textcolortransp: "0",
      textblocktextpositioning: "5",
      textsmooth: "4",
      textedge: "5",
      textedgeunit: "2",
      textedgecolor: "5",
      textedgecolorhex: "#ff00ff",
      textedgetransp: "5",
      textbackgrcolor: "11",
      textbackgrhex: "#00ff00",
      textbackgrtransp: "5",
      distletters: "5",
      distwords: "5",
      distlines: "5",
      shadowcolor: "10",
      shadowcolorhex: "#f0f0f0",
      shadowtransp: "80",
      shadowoffsetx: "2",
      shadowoffsety: "2",
      shadowblur: "10",
      outformat: "3",
      jpegtype: "1",
      jpegqual: "92",
      jpegmeta: "2",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/text-on-image-result.php",
      options,
    );
  }
  async replaceBackground(input, color) {
    const options = {
      efset: "20",
      efset2: "5",
      setcol: "14",
      setcolhex: color,
      efset5: "-50",
      efset6: "1",
      jpegtype: "1",
      jpegqual: "92",
      outformat: "3",
      jpegmeta: "2",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/replace-white-background-with-transparent-result.php",
      options,
    );
  }
  async ocrImage(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/ocr-result.php",
      {
        efset1: "19",
        efset2: "1",
        efset3: "2",
        efset4: "3",
        efset5: "4",
        efset6: "1",
        efset7: "1",
        efset8: "1",
      },
    );
  }
  async retouchPhoto(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/retouch-photo-result.php",
      {
        efset1: "4",
        efset2: "3",
        sharpint: "12",
        briset: "0",
        contrset: "0",
        saturset: "0",
        mpxlimit: "2",
        outformat: "2",
        jpegtype: "1",
        jpegqual: "92",
      },
    );
  }
  async fairyTaleEffect(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/fairy-tale-picture-effect-result.php",
      {
        efset1: "2",
        efset2: "1",
        efset3: "1",
        sharpint: "12",
        briset: "0",
        contrset: "0",
        saturset: "0",
        toneset: "1",
        efset4: "1",
        efset5: "1",
        mpxlimit: "2",
        outformat: "2",
        jpegtype: "1",
        jpegqual: "92",
      },
    );
  }
  async whirlpoolEffect(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/whirlpool-effect-result.php",
      {
        "ef-set": "10",
        "ef-set-2": "50",
        "ef-set-3": "50",
        "ef-set-4": "1",
        "jpeg-quality": "92",
      },
    );
  }
  async enlargeImage(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/enlarge-image-result.php",
      {
        efset1: "1",
        efset2: "1",
        outformat: "2",
        jpegtype: "1",
        jpegqual: "92",
      },
    );
  }
  async createQr(input) {
    const options = {
      "effect-settings": "",
      qtype: input,
      "effect-settings-2": "5",
      "effect-settings-3": "1",
      "effect-settings-4": "0",
      "effect-settings-5": "2",
      "effect-settings-6": "2",
      "effect-settings-7": "#000000",
      "effect-settings-8": "#ff0000",
      "jpeg-conv-type": "3",
      "jpeg-quality": "95",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/create-qr-code-result.php",
      options,
    );
  }
  async scanQr(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/scan-qr-bar-code-result.php",
      {
        codetype: "1",
        rotset: "0",
        croptype: "1",
        cropleft: "0",
        cropright: "0",
        croptop: "0",
        cropbottom: "0",
      },
    );
  }
  async autoColorImage(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/auto-color-balance-photo-result.php",
      {
        "ef-set": "0",
        "jpeg-conv-type": "1",
        "jpeg-quality": "92",
      },
    );
  }
  async autoColorContrast(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/auto-contrast-result.php",
      {
        outformat: "2",
        jpegtype: "1",
        jpegqual: "92",
        jpegmeta: "1",
      },
    );
  }
  async tiltImage(input) {
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/tilt-shift-get-settings-result.php",
      {
        "jpeg-quality": "92",
      },
    );
  }
  async frameImage(input, frame) {
    const options = {
      "effect-settings": frame,
      "jpeg-conv-type": "1",
      "jpeg-quality": "92",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/add-frame-result.php",
      options,
    );
  }
  async frameBlurImage(input, color) {
    const options = {
      efset: "32",
      efset2: "32",
      efset3: "32",
      efset4: "1",
      efset5: "0",
      efset6: color,
      efset7: "1",
      outformat: "2",
      jpegtype: "1",
      jpegqual: "91",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/frame-blurred-result.php",
      options,
    );
  }
  async distortionImage(input, int) {
    const options = {
      "ef-set": int,
      "jpeg-quality": "92",
    };
    return await this.processImage(
      input,
      "https://www.imgonline.com.ua/picture-distortion-result.php",
      options,
    );
  }
}
export { ImageProcessor };
