import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const ends = ["abs", "arccos", "arcsin", "arctan", "area", "cos", "derive", "factor", "integrate", "log", "simplify", "sin", "tan", "tangent", "zeroes"];
  const [modes, kodes] = text.split(/[^\w\s]/g);
  if (!ends.includes(modes)) {
    return m.reply(`*Example:*\n.newton sin|0\n\n*Pilih type yang ada:*\n${ends.map((v, index) => `  ○ ${v}`).join("\n")}`);
  }
  if (ends.includes(modes)) {
    try {
      const res = await NewTon(modes, kodes);
      m.reply(`🧮 *Result:*\n${res.result}`);
    } catch (error) {
      m.reply("⚠️ Terjadi kesalahan, silakan coba lagi.");
    }
  }
};
handler.help = ["newton type query"];
handler.tags = ["internet"];
handler.command = /^(newton)$/i;
export default handler;
async function NewTon(mode, input) {
  try {
    const res = await fetch(`https://newton.now.sh/api/v2/${mode}/${encodeURIComponent(input)}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data from Newton API");
  }
}