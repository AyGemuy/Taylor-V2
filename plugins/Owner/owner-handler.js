const handler = async (m, {
  conn,
  args
}) => {
  try {
    const [index, paramName, paramValue] = args, keys = Object.keys(plugins);
    if (!index || !paramName || !paramValue) {
      const usage = "Contoh penggunaan: handler 1 owner true\n\nDaftar plugin yang tersedia:\n" + keys.map((key, index) => `*${index + 1}.* ${key.split("/").pop().slice(0, -3)}`).join("\n");
      return void await conn.reply(m.chat, usage, m);
    }
    const key = keys[parseInt(index) - 1];
    if (!key) return void await conn.reply(m.chat, "Index tidak valid", m);
    const plugin = plugins[key];
    if (!plugin) return void await conn.reply(m.chat, "Plugin tidak ditemukan", m);
    let parsedValue;
    if (void 0 !== plugin[paramName] && await conn.reply(m.chat, `Mengganti nilai ${paramName} yang sudah ada di ${key.split("/").pop().slice(0, -3)}`, m), /^(true|false|null|undefined)$/i.test(paramValue)) parsedValue = eval(paramValue);
    else try {
      parsedValue = JSON.parse(paramValue);
    } catch (error) {
      parsedValue = paramValue;
    }
    plugin[paramName] = parsedValue, plugins[key] = plugin, await conn.reply(m.chat, `Menambahkan ${paramName}: ${parsedValue} ke ${key.split("/").pop().slice(0, -3)}`, m);
  } catch (error) {
    console.error(error.message), await conn.reply(m.chat, "Terjadi kesalahan saat menambahkan parameter", m);
  }
};
handler.help = ["handler"], handler.tags = ["owner"], handler.command = /^set?handler$/i,
  handler.owner = !0, handler.private = !0;
export default handler;