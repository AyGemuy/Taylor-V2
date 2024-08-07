import fetch from "node-fetch";
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/([^\/:]+)(?:\.git)?/i;
const fetchFromGithub = async (url, method = "GET") => {
  try {
    const response = await fetch(url, {
      method: method
    });
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching ${url}: ${error.message}`);
  }
};
const getFilename = headers => {
  const contentDisposition = headers.get("content-disposition");
  return contentDisposition ? contentDisposition.match(/filename="(.+)"/)?.[1] : "";
};
const githubDownload = async (user, repo) => {
  try {
    const url = `https://api.github.com/repos/${user}/${repo}/zipball`;
    const response = await fetchFromGithub(url, "HEAD");
    return {
      filename: getFilename(response.headers) || `${repo}.zip`,
      url: url
    };
  } catch (error) {
    throw new Error(`Error downloading repository: ${error.message}`);
  }
};
const getRepoInfo = async (user, repo) => {
  try {
    const url = `https://api.github.com/repos/${user}/${repo}`;
    const response = await fetchFromGithub(url);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching repository info: ${error.message}`);
  }
};
const getRepoThumbnail = async (user, repo) => {
  try {
    const url = `https://github.com/${user}/${repo}`;
    const response = await fetchFromGithub(url);
    const html = await response.text();
    const match = html.match(/<meta property="og:image" content="(.*?)"/);
    return match ? match[1] : "";
  } catch (error) {
    throw new Error(`Error fetching repository thumbnail: ${error.message}`);
  }
};
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  if (!args[0] || !regex.test(args[0])) {
    return m.reply(`Contoh penggunaan: ${usedPrefix}${command} <url>`);
  }
  const [, user, repo] = args[0].match(regex);
  m.react(wait);
  try {
    const {
      filename,
      url: downloadUrl
    } = await githubDownload(user, repo);
    const repoInfo = await getRepoInfo(user, repo);
    const thumbnail = await getRepoThumbnail(user, repo);
    const ytthumb = (await conn.getFile(thumbnail))?.data;
    const infoReply = {
      contextInfo: {
        externalAdReply: {
          body: `Mengunduh repository, harap tunggu...`,
          mediaType: 2,
          mediaUrl: downloadUrl,
          previewType: 0,
          renderLargerThumbnail: true,
          sourceUrl: downloadUrl,
          thumbnail: ytthumb,
          title: `G I T H U B`
        }
      }
    };
    const caption = `
📦 *GitHub Repository Downloaded* 📦
────────────────────
*Name:* ${repoInfo.name}
*Owner:* ${repoInfo.owner.login}
*Description:* ${repoInfo.description || "No description available"}
*Stars:* ${repoInfo.stargazers_count}
*Forks:* ${repoInfo.forks_count}
*Open Issues:* ${repoInfo.open_issues_count}
*URL:* ${repoInfo.html_url}
────────────────────
    `.trim();
    await conn.reply(m.chat, caption, m, infoReply);
    await conn.sendFile(m.chat, downloadUrl, filename, "", m);
    m.react(sukses);
  } catch (error) {
    console.lof(error);
    m.react(eror);
  }
};
handler.help = ["gitclone"].map(v => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^(gitclone)$/i;
handler.limit = true;
export default handler;