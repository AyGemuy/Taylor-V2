import fetch from "node-fetch";
export async function generateSerpApiUrl(data) {
  const url = `https://serpapi.com/search.json?${new URLSearchParams(data).toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}