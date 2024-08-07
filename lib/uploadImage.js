import uploadFile from "./uploadFile.js";
export default async function(inp, opt = "all") {
  try {
    return await uploadFile(inp, opt) || null;
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
}