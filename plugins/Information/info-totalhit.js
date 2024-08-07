import _ from "lodash";
const handler = async (m, {
  conn
}) => {
  try {
    const stats = _.chain(Object.entries(db.data.stats)).map(([key, val]) => ({
      name: Array.isArray(plugins[key].help) ? plugins[key].help.join(" , ") : plugins[key].help || key.split("/").pop().slice(0, -3),
      ...val
    })).filter(({
      name
    }) => !/exec/.test(name)).sortBy(({
      total
    }) => -total).slice(0, 50).map(({
      name,
      total,
      last,
      success,
      lastSuccess
    }, i) => {
      const formattedLastUsed = getTime(last);
      const formattedLastSuccess = formatTime(lastSuccess);
      return `*${i + 1}.* ( *${name.split(" ")[0]}* )\n-   *Hits*: \`${total}\`\n-   *Success*: \`${success}\`\n-   *Last Used*: \`${formattedLastUsed} ago\`\n-   *Last Success*: \`${formattedLastSuccess}\``;
    }).join("\n\n").value();
    await conn.reply(m.chat, stats, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan dalam pemrosesan data.", m);
  }
};
handler.command = handler.help = ["totalhit"];
handler.tags = ["info", "tools"];
export default handler;
const formatTime = time => {
  const formattedTime = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3
  }).format(new Date(time));
  return formattedTime;
};
const getTime = ms => {
  const now = parseMs(+new Date() - ms);
  return `${now.days ? now.days + "d" : ""} ${now.hours ? now.hours + "h" : ""} ${now.minutes ? now.minutes + "m" : ""} ${now.seconds ? now.seconds + "s" : ""} ${now.milliseconds ? now.milliseconds + "ms" : ""}`.trim() || "a few seconds";
};
const parseMs = ms => ({
  days: Math.trunc(ms / 864e5),
  hours: Math.trunc(ms / 36e5) % 24,
  minutes: Math.trunc(ms / 6e4) % 60,
  seconds: Math.trunc(ms / 1e3) % 60,
  milliseconds: Math.trunc(ms) % 1e3
});