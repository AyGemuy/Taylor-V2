import {
  promises
} from "fs";
import {
  join
} from "path";
import fs from "fs";

function ranNumb(min, max = null) {
  return null !== max ? (min = Math.ceil(min), max = Math.floor(max), Math.floor(Math.random() * (max - min + 1)) + min) : Math.floor(Math.random() * min) + 1;
}

function padLead(num, size) {
  for (var s = num + ""; s.length < size;) s = "0" + s;
  return s;
}
let tags = {
  genshin: "Genshin Data"
};
const defaultMenu = {
    before: `\nGenshin Impact JSON data with a robust searching API! Updated to version 2.8. Sources from the fandom wiki and GenshinData repo.\n\n${htjava} 🐳 GENSHIN COMMAND ${htjava}\n`.trimStart(),
    header: `${cmenut} *%category* ${cmenuh}`,
    body: `${cmenub} %cmd`,
    footer: `${cmenuf}`
  },
  handler = async (m, {
    conn,
    usedPrefix: _p,
    __dirname
  }) => {
    try {
      padLead(ranNumb(39), 3);
      let nais = fs.readFileSync("./thumbnail.jpg"),
        help = (JSON.parse(await promises.readFile(join(__dirname, "../package.json")).catch(_ => ({}))), Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => ({
          help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: "customPrefix" in plugin,
          enabled: !plugin.disabled
        }))),
        groups = {};
      for (let tag in tags) {
        groups[tag] = [];
        for (let plugin of help) plugin.tags && plugin.tags.includes(tag) && plugin.help && groups[tag].push(plugin);
      }
      conn.menu = conn.menu ? conn.menu : {};
      let before = conn.menu.before || defaultMenu.before,
        header = conn.menu.header || defaultMenu.header,
        body = conn.menu.body || defaultMenu.body,
        footer = conn.menu.footer || defaultMenu.footer,
        _text = [before, ...Object.keys(tags).map(tag => header.replace(/%category/g, tags[tag]) + "\n" + [...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => menu.help.map(help => body.replace(/%cmd/g, menu.prefix ? help : "%p" + help).trim()).join("\n")), footer].join("\n"))].join("\n"),
        text = "string" == typeof conn.menu ? conn.menu : "object" == typeof conn.menu ? _text : "",
        replace = {
          p: _p,
          "%": "%",
          readmore: readMore
        };
      text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, "g"), (_, name) => "" + replace[name]);
      const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => "./src/avatar_contact.png");
      await conn.sendFile(m.chat, pp || nais, "", text.replace("si <character>", `si <character>${readMore}`).trim(), m);
    } catch (e) {
      return await conn.reply(m.chat, "Maaf, menu genshin sedang error", m), e;
    }
  };
handler.help = ["genshinmenu"], handler.tags = ["genshin"], handler.command = /^(genshinm(enu)?|m(enu)?genshin)$/i;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001);