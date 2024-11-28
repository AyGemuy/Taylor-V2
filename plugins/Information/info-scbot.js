import moment from "moment-timezone";
import fetch from "node-fetch";
const handler = async (m, { conn }) => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/AyGemuy/Taylor-V2",
    );
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const json = await response.json();
    let txt = "*乂  B O T  -  S C R I P T*\n\n";
    txt += `\t◦  *Name* : ${json.name}\n`;
    txt += `\t◦  *Description* : ${json.description || "No description available"}\n`;
    txt += `\t◦  *Visitor* : ${json.watchers_count}\n`;
    txt += `\t◦  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `\t◦  *Created* : ${moment(json.created_at).format("DD/MM/YY - HH:mm:ss")}\n`;
    txt += `\t◦  *Updated* : ${moment(json.updated_at).format("DD/MM/YY - HH:mm:ss")}\n`;
    txt += `\t◦  *Issues* : ${json.open_issues_count} open\n`;
    txt += `\t◦  *Url* : ${json.html_url}\n\n`;
    txt += `\t   ${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues\n\n`;
    txt += author;
    const thumbnailUrl =
      json.owner.avatar_url ||
      "https://cdn-icons-png.flaticon.com/128/11024/11024158.png";
    await conn.reply(m.chat, txt, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    });
  } catch (error) {
    console.error("Error in handler:", error);
    await conn.reply(m.chat, `An error occurred: ${error.message}`, m);
  }
};
handler.help = ["scbot"];
handler.tags = ["info"];
handler.command = /^sc(ript(bot)?|bot)?$/i;
export default handler;
