const handler = async (m, {
  conn
}) => {
  prefix = new RegExp("^[" + (opts.prefix || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]"),
    m.reply("Prefix berhasil direset");
};
handler.help = ["resetprefix"], handler.tags = ["owner"], handler.command = /^(resetprefix)$/i,
  handler.rowner = !0;
export default handler;