import axios from "axios";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]");
  m.react(wait);
  try {
    const input_data = await getPostByUsername(tema);
    let data = input_data;
    if (!urutan) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* https://www.instagram.com/p/${item.shortcode}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* https://www.instagram.com/p/${item.shortcode}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* https://www.instagram.com/p/${item.shortcode}`).join("\n"));
    let outpic = data[urutan - 1].picture,
      outcap = data[urutan - 1].description,
      outcode = data[urutan - 1].shortcode;
    input_data ? await conn.sendFile(m.chat, outpic, "", "\n*Desc:*\n" + outcap + "\n*Link:*\nhttps://www.instagram.com/p/" + outcode, m) : console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["instapost *[nomor]|[query]*"], handler.tags = ["tools"], handler.command = /^(instapost)$/i;
export default handler;

function cleanupDesc(string) {
  return string.split("#")[0]?.trim("\n");
}
const axiosInstance = axios.create({
  baseURL: "https://i.instagram.com",
  headers: {
    "x-ig-app-id": "936619743392459",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    Accept: "*/*"
  }
});
async function scrapeUser(username) {
  try {
    return (await axiosInstance.get(`/api/v1/users/web_profile_info/?username=${username}`)).data.data.user;
  } catch (error) {
    throw error;
  }
}
async function getPostByUsername(username) {
  try {
    const rawPosts = (await scrapeUser(username)).edge_owner_to_timeline_media.edges;
    return rawPosts.map(function({
      node: r
    }) {
      const d = r.edge_media_to_caption.edges,
        hasNoDesc = 0 === d.length;
      return {
        shortcode: r.shortcode,
        description: hasNoDesc ? "" : cleanupDesc(d[0]?.node.text),
        timestamp: r.taken_at_timestamp,
        dimensions: {
          height: r.dimensions.height,
          width: r.dimensions.width
        },
        picture: r.display_url,
        owner: r.owner.id,
        isVideo: r.is_video,
        isSidecar: "GraphSidecar" === r.__typename
      };
    });
  } catch (error) {
    throw error;
  }
}