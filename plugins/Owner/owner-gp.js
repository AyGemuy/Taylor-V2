import {
  exec
} from "child_process";
import {
  promisify
} from "util";
const handler = async (m, {
  conn,
  command,
  text
}) => {
  const querys = text.split(/\D+/).filter(Boolean),
    pluginsList = Object.keys(plugins),
    uniqueCategories = [];
  for (const plugin of pluginsList) {
    const category = plugin.split("/")[2];
    uniqueCategories.includes(category) || uniqueCategories.push(category);
  }
  if (querys[0])
    if (querys[1])
      if (querys[0] && querys[1] && !isNaN(querys[0]) && !isNaN(querys[1])) {
        const categoryIndex = parseInt(querys[0]),
          pluginIndex = parseInt(querys[1]);
        if (categoryIndex >= 1 && categoryIndex <= uniqueCategories.length) {
          const selectedCategory = uniqueCategories[categoryIndex - 1],
            pluginNames = pluginsList.filter(plugin => plugin.split("/")[2] === selectedCategory);
          if (pluginIndex >= 1 && pluginIndex <= pluginNames.length) {
            const selectedPlugin = pluginNames[pluginIndex - 1],
              commandToExecute = `cat ${selectedPlugin.slice(1)}`,
              execPromise = promisify(exec);
            try {
              const {
                stdout,
                stderr
              } = await execPromise(commandToExecute), rep = await conn.reply(m.chat, `/*\nSukses Get Plugin\n${selectedPlugin}\n${author}\n*/\n\n${stdout}`, m), buffer = Buffer.from(stdout, "utf-8"), mimeType = "application/javascript";
              await conn.sendMessage(m.chat, {
                document: buffer,
                mimetype: mimeType,
                fileName: selectedPlugin.split("/").pop(),
                caption: "Cek kode lengkapnya disini"
              }, {
                quoted: rep
              });
            } catch (error) {
              m.reply(`*Error:* ${error.message}`);
            }
          } else m.reply("*Indeks plugin salah* atau di luar rentang yang sesuai.");
        } else m.reply("*Indeks kategori salah* atau di luar rentang yang sesuai.");
      } else m.reply('*Format perintah tidak valid.* Gunakan "gp" untuk menampilkan list kategori, "gp 1" untuk menampilkan list file dalam kategori, atau "gp 1 2" untuk menjalankan operasi tertentu.');
  else {
    const categoryIndex = parseInt(querys[0]) - 1;
    if (!isNaN(categoryIndex) && categoryIndex >= 0 && categoryIndex < uniqueCategories.length) {
      const selectedCategory = uniqueCategories[categoryIndex],
        pluginList = pluginsList.filter(plugin => plugin.split("/")[2] === selectedCategory).map((plugin, index) => `${index + 1}. *${plugin.split("/").pop().replace(".js", "")}*`).join("\n");
      m.reply(`*List File dalam Kategori "${selectedCategory}":*\n${pluginList}`);
    } else m.reply("*Input salah* atau angka di luar rentang yang sesuai.");
  } else {
    const pluginList = uniqueCategories.map((category, index) => `${index + 1}. *${category}*`).join("\n");
    m.reply(`*List Kategori:*\n${pluginList}`);
  }
};
handler.help = ["gp"].map(v => v + " *index*"), handler.tags = ["owner"], handler.command = /^(gp)$/i,
  handler.rowner = !0;
export default handler;