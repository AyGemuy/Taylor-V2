import fetch from "node-fetch";
import crypto from "crypto";
const hexRandom = () => crypto.randomBytes(3).toString("hex");
const fetchImage = async (url, code) => {
  try {
    const response = await fetch(url);
    return {
      buffer: Buffer.from(await response.arrayBuffer()),
      code: code,
    };
  } catch {
    return {
      buffer: null,
      code: null,
    };
  }
};
export const generate = async (code = hexRandom()) => {
  const url = `https://dummyimage.com/300.png/${hexRandom().slice(0, 3)}/${hexRandom().slice(0, 3)}&text=${encodeURIComponent(code)}`;
  return await fetchImage(url, code);
};
export const generateV1 = async (code = hexRandom()) => {
  const url = `https://via.placeholder.com/300/${hexRandom().slice(0, 3)}/${hexRandom().slice(0, 3)}?text=${encodeURIComponent(code)}`;
  return await fetchImage(url, code);
};
export const generateV2 = async (code = hexRandom()) => {
  const url = `https://fakeimg.pl/300x300/${hexRandom()}/${hexRandom()}/?text=${encodeURIComponent(code)}`;
  return await fetchImage(url, code);
};
export const generateV3 = async (code = hexRandom()) => {
  const url = `https://api.sylvain.pro/en/captcha?text=${encodeURIComponent(code)}`;
  return await fetchImage(url, code);
};
export const generateV4 = async (code = hexRandom()) => {
  const url = `https://api-gen.textstudio.com/?text=${encodeURIComponent(code)}`;
  return await fetchImage(url, code);
};
