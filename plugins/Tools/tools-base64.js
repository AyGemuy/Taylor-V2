const handler = async (m, {
  args
}) => {
  if (m.quoted && m.quoted?.text) /^enc(rypt)?$/i.test(args[0]) ? m.reply(Buffer.from(m.quoted?.text, "utf-8").toString("base64")) : /^dec(rypt)?$/i.test(args[0]) && m.reply(Buffer.from(m.quoted?.text, "base64").toString("utf-8"));
  else {
    if (!(args.length >= 2)) throw !1;
    /^enc(rypt)?$/i.test(args[0]) ? m.reply(Buffer.from(args.slice(1).join(" "), "utf-8").toString("base64")) : /^dec(rypt)?$/i.test(args[0]) && m.reply(Buffer.from(args.slice(1).join(" "), "base64").toString("utf-8"));
  }
};
handler.command = /^base64$/i;
export default handler;