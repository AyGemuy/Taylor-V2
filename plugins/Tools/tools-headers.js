import axios from "axios";
import fetch from "node-fetch";
import got from "got";
const handler = async (m, {
  args
}) => {
  if (!args[0]) throw "....";
  try {
    let headers = (await fetch(args[0])).headers;
    m.reply(Object.keys(headers).map(v => `• ${v}: ${headers.get(v)}`).join("\n"));
  } catch (error) {
    try {
      let res = await axios(args[0]);
      m.reply(Object.keys(res.headers).map(v => `• ${v}: ${res.headers[v]}`).join("\n"));
    } catch (error) {
      try {
        let headers = (await got(args[0])).headers;
        m.reply(Object.keys(headers).map(v => `• ${v}: ${headers[v]}`).join("\n"));
      } catch (error) {
        throw "An error occurred while retrieving headers";
      }
    }
  }
};
handler.command = /^headers$/i;
export default handler;