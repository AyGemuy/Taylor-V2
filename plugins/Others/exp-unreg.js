import {
  createHash
} from "crypto";
const handler = async function(m, {
  args
}) {
  if (!args[0]) throw "Serial Number kosong";
  let user = db.data.users[m.sender],
    sn = createHash("md5").update(m.sender).digest("hex");
  if (args[0] !== sn) throw "Serial Number salah";
  user.registered = !1, m.reply("```Succes Unreg !```");
};
handler.help = ["", "ister"].map(v => "unreg" + v + " <SN|SERIAL NUMBER>"), handler.tags = ["xp"],
  handler.command = /^unreg(ister)?$/i, handler.register = !0;
export default handler;