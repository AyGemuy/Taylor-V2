import axios from "axios";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Input Number";
  if (!text.match(/08|62/g)) throw "Number Not Supported";
  let num = (text || "").replace(/\D/g, ""),
    s = new URLSearchParams();
  s.append("accountBank", "ovo"), s.append("accountNumber", num);
  let go = (await axios({
    url: "https://cekrek.heirro.dev/api/check",
    method: "post",
    data: s,
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  })).data;
  if (200 !== go.status) throw go.message;
  let caption = `\n\n*° O V O - F I N D E R °*\n\n*∙ Account :* ${go.data[0]?.accountNumber}\n*∙ Name :* ${go.data[0]?.accountName.split(" ")[1]}\n\n`;
  m.reply(caption);
};
handler.help = ["Ovo"], handler.tags = ["host"], handler.command = /^(ovo)$/i;
export default handler;