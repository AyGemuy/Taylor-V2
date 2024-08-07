import fetch from "node-fetch";
const handler = async (m, {
  command,
  text
}) => {
  try {
    const url = {
      npmjs: `https://registry.npmjs.org/-/v1/search?text=${text}`,
      cdnjs: `https://api.cdnjs.com/libraries/${text}`,
      jsdelivr: `https://api.jsdelivr.com/v1/jsdelivr/libraries/${text}`,
      unpkg: `https://api.jsdelivr.com/v1/unpkg/package/${text}`,
      jsdelivrcdn: `https://cdn.jsdelivr.net/npm/${text}`,
      cloudflare: `https://api.cdnjs.com/libraries/${text}`,
      rawgit: `https://api.github.com/repos/${text}/releases`,
      bootstrapcdn: `https://api.cdnjs.com/libraries/${text}`,
      googleapis: `https://ajax.googleapis.com/ajax/libs/${text}`,
      jquerycdn: `https://code.jquery.com/${text}`,
      fontawesome: `https://api.cdnjs.com/libraries/${text}`,
      fontcdn: `https://fonts.googleapis.com/css?family=${text.replace(/\s/g, "+")}`
    } [command];
    if (!url) return m.reply("Perintah tidak dikenali.");
    const res = await fetch(url),
      data = await res.json(),
      txt = (() => {
        switch (command) {
          case "npmjs":
          case "npm":
            const responseData = data.objects;
            return responseData.length ? responseData.map(({
              package: pkg
            }) => `📦 *${pkg.name}* (v${pkg.version})\n[🔗 npm](${pkg.links.npm})\n${pkg.description}`).join("\n\n") : `Query "${text}" tidak ditemukan :/`;
          case "cdnjs":
            return `📦 *Name:* ${data.name}\n*Latest:* ${data.version}\n\n*Description:* ${data.description}\n*Homepage:* ${data.homepage}`;
          case "jsdelivr":
            return data.versions.map(pkg => `📦 *Name:* ${pkg.name}\n*Version:* ${pkg.version}\n*Description:* ${pkg.description}\n*Homepage:* ${pkg.homepage}`).join("\n\n");
          case "unpkg":
            return `📦 *Package:* ${data.name}\n*Version:* ${data.version}\n*Description:* ${data.description}\n*Homepage:* ${data.homepage}`;
          case "jsdelivrcdn":
            return `📦 *CDN:* ${data.name}\n*URL:* ${data.latest}`;
          case "cloudflare":
            return `📦 *Library:* ${data.name}\n*Version:* ${data.version}\n*Homepage:* ${data.homepage}`;
          case "rawgit":
            return data.map(release => `📦 *Version:* ${release.tag_name}\n[🔗 Release](${release.html_url})`).join("\n\n");
          case "bootstrapcdn":
            return `📦 *Library:* ${data.name}\n*Version:* ${data.version}\n*Description:* ${data.description}`;
          case "googleapis":
          case "jquerycdn":
            return `📦 *Library:* ${data.name}\n*Version:* ${data.version}\n*URL:* ${data.latest}`;
          case "fontawesome":
            return data.versions.map(pkg => `📦 *Name:* ${pkg.name}\n*Version:* ${pkg.version}\n*Homepage:* ${pkg.homepage}`).join("\n\n");
          case "fontcdn":
            return `📦 *Font:* ${data.family}\n*URL:* ${url}`;
          default:
            return "Perintah belum diimplementasikan.";
        }
      })();
    m.reply(txt);
  } catch (error) {
    m.reply(error.message);
  }
};
handler.help = ["npmsearch"], handler.tags = ["tools"], handler.command = /^(npm?js|cdnjs|jsdelivr|unpkg|jsdelivrcdn|cloudflare|rawgit|bootstrapcdn|google|jquerycdn|fontawesome|fontcdn)$/i;
export default handler;