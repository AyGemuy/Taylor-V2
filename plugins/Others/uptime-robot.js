import fetch from "node-fetch";
async function postRequest(url, form) {
  const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache"
      },
      body: new URLSearchParams(form)
    },
    response = await fetch(url, options);
  return await response.json();
}
const handler = async (m, {
  conn,
  command,
  text
}) => {
  const apiKey = "u2239117-169fd18aaa7ec6c7b7bce232";
  if ("uptimerobot" === command)
    if (text) {
      const [action, input, inputs] = text.split("|");
      if ("new" === action) {
        const newMonitorOptions = {
          api_key: apiKey,
          format: "json",
          type: "1",
          url: input || "http://myMonitorURL.com",
          friendly_name: inputs || "My Monitor"
        };
        try {
          const response = await postRequest("https://api.uptimerobot.com/v2/newMonitor", newMonitorOptions);
          console.log(response), "ok" === response.stat && response.monitor?.id ? m.reply(`✅ Monitor baru berhasil dibuat dengan ID: ${response.monitor.id}`) : m.reply("❌ Gagal membuat monitor baru.");
        } catch (error) {
          console.error(error), m.reply("❌ Gagal membuat monitor baru.");
        }
      } else if ("del" === action) {
        const deleteMonitorOptions = {
          api_key: apiKey,
          format: "json",
          id: input || "777712827"
        };
        try {
          const response = await postRequest("https://api.uptimerobot.com/v2/deleteMonitor", deleteMonitorOptions);
          console.log(response), "ok" === response.stat && response.monitor?.id ? m.reply(`✅ Monitor dengan ID: ${response.monitor.id} berhasil dihapus.`) : m.reply("❌ Gagal menghapus monitor.");
        } catch (error) {
          console.error(error), m.reply("❌ Gagal menghapus monitor.");
        }
      } else if ("stats" === action) {
        const getMonitorsOptions = {
          api_key: apiKey,
          format: "json",
          logs: "1"
        };
        try {
          const monitors = (await postRequest("https://api.uptimerobot.com/v2/getMonitors", getMonitorsOptions)).monitors;
          let replyMsg = "✅ Statistik Monitor 📈:\n\n";
          for (const monitor of monitors) {
            const log = monitor.logs[0];
            replyMsg += `Monitor ${monitor.id}:\n`, replyMsg += `- Nama: ${monitor.friendly_name}\n`,
              replyMsg += `- URL: ${monitor.url}\n`, replyMsg += `- Tipe: ${monitor.type}\n`,
              replyMsg += `- Interval: ${monitor.interval} detik\n`, replyMsg += `- Status: ${1 === monitor.status ? "Tidak Aktif" : "Aktif"}\n\n`,
              replyMsg += "Log terakhir:\n", replyMsg += `- Tipe: ${log.type}\n`, replyMsg += `- Waktu: ${log.datetime}\n`,
              replyMsg += `- Durasi: ${log.duration} detik\n\n`, replyMsg += "-------------------------\n\n";
          }
          m.reply(replyMsg);
        } catch (error) {
          console.error(error), m.reply("❌ Gagal mengambil statistik monitor.");
        }
      } else m.reply("❌ Aksi tidak valid! Gunakan `new|input`, `del|input`, atau `stats`.");
    } else m.reply("❌ Harap berikan perintah yang valid! Gunakan `new|input`, `del|input`, atau `stats`.");
};
handler.help = ["uptimerobot"], handler.tags = ["tools"], handler.command = /^(uptimerobot)$/i;
export default handler;