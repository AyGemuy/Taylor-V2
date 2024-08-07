import {
  search
} from "../../lib/scraper/all/search.js";
import {
  TixID
} from "../../lib/scraper/scraper-search.js";
const handler = async (m, {
  conn
}) => {
  m.react(wait);
  let response;
  try {
    response = await search.tixID() || await TixID();
  } catch (e) {
    throw "An error occured please try again!";
  }
  const answer = response.getRandom();
  if (!answer) throw "No results found for ";
  const caption = `
Judul: ${answer.judul}
Tanggal: ${answer.tanggal}

Deskripsi:
${answer.deskripsi}

Link Artikel: ${answer.link}
`;
  await conn.sendFile(m.chat, answer.image, "", caption, m);
};
handler.help = ["tixid"], handler.tags = ["search"], handler.command = /^(tixid)$/i;
export default handler;