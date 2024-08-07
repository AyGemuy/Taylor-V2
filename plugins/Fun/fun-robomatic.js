import fetch from "node-fetch";
const fetchData = async text => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Host": "robomatic-ai.p.rapidapi.com",
      "X-RapidAPI-Key": "414ed3dd91mshcc92bca3c605999p125f24jsnf2650ad70ac3"
    },
    body: new URLSearchParams({
      in: text,
      op: "in",
      cbot: "1",
      SessionID: "RapidAPI1",
      ChatSource: "RapidAPI",
      cbid: "1",
      key: "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP"
    })
  };
  try {
    const res = await fetch("https://robomatic-ai.p.rapidapi.com/api.php", options);
    if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
    return await res.json();
  } catch (e) {
    throw new Error(`Fetch data failed: ${e.message}`);
  }
}, handler = async (m, {
  conn,
  args,
  text
}) => {
  if (!text) throw "Masukkan teks untuk diproses";
  try {
    const data = await fetchData(text);
    m.reply(data.out);
  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e.message}`);
  }
};
handler.command = /^robo$/i, handler.limit = !0;
export default handler;