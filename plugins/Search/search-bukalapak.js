import {
  search
} from "../../lib/scraper/all/search.js";
import {
  BukaLapak
} from "../../lib/scraper/scraper-search.js";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "No results found for ";
  m.react(wait);
  let response;
  try {
    response = await search.bukaLapak(text) || await BukaLapak(text);
  } catch (e) {
    throw "An error occured please try again!";
  }
  const answer = response.getRandom();
  if (!answer) throw "No results found for ";
  const caption = `
Nama: ${answer.title}
Rating: ${answer.rating}
Terjual: ${answer.terjual}

Harga: ${answer.harga}

Toko: ${answer.store.nama}
Lokasi: ${answer.store.lokasi}
Link Toko: ${answer.store.link}

Link Produk: ${answer.link}
`;
  await conn.sendFile(m.chat, answer.image, "", caption, m);
};
handler.help = ["bukalapak"], handler.tags = ["search"], handler.command = /^(bukalapak)$/i;
export default handler;