import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description;
  if (!text)
    return m.reply(
      `Please provide the search text.\n*Example:*\n- *${usedPrefix + command}* search_query`,
    );
  const folderPath = "./";
  const commandStr = `grep -rnw '${folderPath}' -e '${text}' --include='*.js' --exclude-dir='node_modules' --color=never`;
  m.react(wait);
  try {
    const { stdout, stderr } = await execPromise(commandStr);
    if (stderr) throw new Error(stderr);
    const lines = stdout.split("\n").filter(Boolean);
    if (lines.length === 0) {
      await m.reply("No matches found.");
      return;
    }
    const resultsText = lines
      .map((line, index) => {
        const match = line.match(/^(.*?):(\d+):(.+)$/);
        if (!match)
          return `*Hasil ${index + 1}*\n\n- *Content:* \`${line.trim()}\``;
        const [, path, lineNum, content] = match;
        return `*Hasil ${index + 1}*\n\n- *Line:* ${lineNum}\n- *Content:* \`${content.trim()}\`\n- *Path:* ${path}`;
      })
      .join("\n________________________\n");
    const resultMessage = `*🔎 Hasil Pencarian*\n\n${resultsText}\n\n*Total Hasil:* ${lines.length}`;
    m.reply(resultMessage);
    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.log(e);
  }
};
handler.help = ["grep"];
handler.tags = ["tools"];
handler.command = /^(grep)$/i;
export default handler;
