import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
const execAsync = promisify(exec);
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks.\nContoh: *${usedPrefix}${command} Hai, apa kabar?*`,
    );
  try {
    const buffer =
      command === "txt2gif"
        ? await createAnimatedImage(text.trim())
        : await createStaticImage(text.trim());
    await conn.sendFile(m.chat, buffer, "", "", m, 0, {
      asSticker: true,
    });
  } catch (error) {
    console.error("Error:", error.message);
    m.reply("Maaf, terjadi kesalahan saat memproses permintaan Anda.");
  }
};
handler.command = /^(txt2pic|txt2gif)$/i;
export default handler;
const createStaticImage = async (text) => {
  try {
    const fontPath = path.join(
      "./src/font",
      fs.readdirSync("./src/font").find((file) => file.endsWith(".ttf")),
    );
    const maxWidth = 1024;
    const maxHeight = 1024;
    const charCount = text.length;
    const maxFontSize = 240;
    const minFontSize = 40;
    const baseFontSize = Math.min(maxWidth / (charCount / 2), maxFontSize);
    const fontSize = Math.max(baseFontSize, minFontSize);
    const lineHeight = fontSize + 6;
    const estimatedLines = Math.ceil(charCount * (fontSize / maxWidth));
    const textHeight = estimatedLines * lineHeight;
    const finalFontSize =
      textHeight > maxHeight
        ? Math.floor(fontSize * (maxHeight / textHeight))
        : fontSize;
    const command = `convert -background transparent -fill white -font "${fontPath}" -pointsize ${finalFontSize} \
                        -gravity center -stroke black -strokewidth 2 -size ${maxWidth}x${maxHeight} \
                        caption:"${text}" -resize ${maxWidth}x${maxHeight}+0+0 -gravity center -extent ${maxWidth}x${maxHeight} \
                        webp:-`;
    const { stdout } = await execAsync(command, {
      encoding: "buffer",
      maxBuffer: 1024 * 1024 * 10,
    });
    if (!stdout.length) throw new Error("Tidak ada output dari perintah.");
    return stdout;
  } catch (error) {
    throw new Error(`Gagal membuat gambar statis: ${error.message}`);
  }
};
const createAnimatedImage = async (text) => {
  try {
    const fontPath = path.join(
      "./src/font",
      fs.readdirSync("./src/font").find((file) => file.endsWith(".ttf")),
    );
    const maxWidth = 1024;
    const maxHeight = 1024;
    const charCount = text.length;
    const maxFontSize = 240;
    const minFontSize = 40;
    const baseFontSize = Math.min(maxWidth / (charCount / 2), maxFontSize);
    const fontSize = Math.max(baseFontSize, minFontSize);
    const lineHeight = fontSize + 6;
    const estimatedLines = Math.ceil(charCount * (fontSize / maxWidth));
    const textHeight = estimatedLines * lineHeight;
    const finalFontSize =
      textHeight > maxHeight
        ? Math.floor(fontSize * (maxHeight / textHeight))
        : fontSize;
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "cyan",
      "magenta",
      "white",
    ];
    const command = colors
      .map(
        (
          color,
          index,
        ) => `convert -background transparent -fill ${color} -font "${fontPath}" -pointsize ${finalFontSize} \
            -gravity center -stroke black -strokewidth 2 -size ${maxWidth}x${maxHeight} label:"${text}" \
            -resize ${maxWidth}x${maxHeight}+0+0 -gravity center -extent ${maxWidth}x${maxHeight} webp:frame_${index}.webp`,
      )
      .join(" && ");
    const combineCommand = `
            ${command} &&
            convert -loop 0 -delay 100 frame_*.webp webp:-
        `;
    const { stdout } = await execAsync(combineCommand, {
      encoding: "buffer",
      maxBuffer: 1024 * 1024 * 20,
    });
    if (!stdout.length) throw new Error("Tidak ada output dari perintah.");
    return stdout;
  } catch (error) {
    throw new Error(`Gagal membuat gambar animasi: ${error.message}`);
  }
};
