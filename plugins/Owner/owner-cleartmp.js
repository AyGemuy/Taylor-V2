import {
  readdirSync,
  rmSync
} from "fs";
const handler = async (m, {
  conn,
  text
}) => {
  readdirSync("./tmp").forEach(f => rmSync(`./tmp/${f}`));
  m.reply("The *tmp* folder has been cleaned");
};
handler.help = ["cleartmp"], handler.tags = ["owner"], handler.owner = !1, handler.command = /^(cleartmp)$/i;
export default handler;