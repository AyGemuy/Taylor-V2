import _ from "lodash";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  let a = text?.split(/[\|\n]/).slice(1);
  if (!a?.[1]) throw `Format\n${usedPrefix}${command} halo |ya|gak atau halo\nyagak`;
  if (a?.[12]) throw `Kebanyakan pilihan, Format\n${usedPrefix}${command} halo |ya|gak atau halo\nyagak`;
  if (checkDuplicate(a)) throw "Ada kesamaan isi dalam pesan!";
  const pollMessage = {
    name: `*Polling Request By* ${m?.name}\n*Pesan:* ${text?.split(/[\|\n]/)[0]}`,
    values: a,
    multiselect: false,
    selectableCount: 1
  };
  await conn.sendMessage(m?.chat, {
    poll: pollMessage
  }, {
    quoted: m
  });
};
handler.help = ["poll pertanyaan|pilihan|pilihan", "poll pertanyaan\npilihan\npilihan"];
handler.tags = ["group"];
handler.command = /^po(l((l?ing|ls)|l)|ols?)$/i;
export default handler;

function checkDuplicate(arr) {
  return _.uniq(arr).length !== arr.length;
}