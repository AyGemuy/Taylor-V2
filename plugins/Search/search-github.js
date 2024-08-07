import fetch from "node-fetch";
const searchGit = async query => {
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch GitHub repositories: ${error.message}`);
  }
};
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  try {
    if (!text) return m.reply(`Contoh:\n${usedPrefix + command} Taylor-V2`);
    m.react(wait);
    const json = await searchGit(text);
    const results = json.items?.map((repo, index) => `
${index + 1}. *${repo.full_name}*${repo.fork ? " (fork)" : ""}
_${repo.html_url}_
_Dibuat pada *${formatDate(repo.created_at)}*_
_Terakhir update pada *${formatDate(repo.updated_at)}*_
👁 ${repo.watchers} 🍴 ${repo.forks} ⭐ ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `\n*Deskripsi:*\n${repo.description}` : ""}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
    `.trim()).join("\n\n");
    m.reply(results || "Tidak ada repositori ditemukan.");
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["githubs"];
handler.tags = ["tools"];
handler.command = /^(ghs|githubs)$/i;
export default handler;
const formatDate = (n, locale = "id") => new Date(n).toLocaleDateString(locale, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});