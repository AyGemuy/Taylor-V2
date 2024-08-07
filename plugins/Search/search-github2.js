import fetch from "node-fetch";
const formatDate = (n, locale = "id") => new Date(n).toLocaleDateString(locale, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});
const searchGit = async text => {
  try {
    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error(`Failed to fetch data from GitHub: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
const handler = async (m, {
  text,
  command,
  usedPrefix
}) => {
  if (!text) return m.reply(`Contoh:\n${usedPrefix + command} Taylor-V2`);
  m.react(wait);
  try {
    const json = await searchGit(text);
    const str = json.items.map((repo, index) => `
>      「 ${index + 1} 」       <
ɴᴀᴍᴇ ʀᴇᴘᴏ : ${repo.name}
ʙʏ : ${repo.owner.login}
ғᴏʀᴋᴇᴅ : ${repo.fork ? "True" : "False"}
ᴘʀɪᴠᴀᴛᴇ : ${repo.private ? "True" : "False"}

➔ ᴄʀᴇᴀᴛᴇᴅ ᴏɴ : ${formatDate(repo.created_at)}
➔ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ ᴏɴ : ${formatDate(repo.updated_at)}
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
❗ ɪssᴜᴇ : ${repo.open_issues} ${repo.description ? `\n📚 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:\n${repo.description}` : ""}

⑂ ᴄʟᴏɴᴇ :
$ git clone ${repo.clone_url}
`.trim()).join("\n— — — — — — — — — — — — — —\n");
    await conn.reply(m.chat, `*${htki} ɢɪᴛʜᴜʙ sᴇᴀʀᴄʜ ${htka}*\n${str}`, m);
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["githubsearch"].map(v => v + " <pencarian>");
handler.tags = ["internet", "downloader"];
handler.command = /^g(ithub|h)s(earch)$/i;
export default handler;