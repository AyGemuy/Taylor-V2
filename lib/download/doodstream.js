import fetch from "node-fetch";
export const regexPattern = /(?:doodstream|dood|dooood|ds2play)(?:.*)\/(?:d\/|e\/)([A-z0-9]+)/;
export async function generatePlayUrl(inputText) {
  const match = inputText.match(regexPattern);
  if (!match) throw console.error("Input tidak sesuai dengan regex pattern."), new Error("Input tidak sesuai dengan regex pattern.");
  const apiUrl = `https://api.delivrjs.workers.dev/encrypt/${match[1]}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return `https://xstreampro.pages.dev/play.html?id=${data.encryptId}&host=doodstream`;
  } catch (error) {
    throw console.error("Terjadi kesalahan dalam fetch:", error), error;
  }
}