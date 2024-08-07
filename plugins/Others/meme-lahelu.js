import axios from "axios";
import fetch from "node-fetch";
const fetchData = async (query, page) => {
  const url = `https://lahelu.com/api/post/get-search?query=${query}&page=${page}`;
  try {
    return (await axios.get(url)).data;
  } catch (axiosError) {
    console.error("Error with Axios:", axiosError);
    try {
      const fetchResponse = await fetch(url);
      return await fetchResponse.json();
    } catch (fetchError) {
      throw console.error("Error with Fetch:", fetchError), fetchError;
    }
  }
}, handler = async (m, {
  conn,
  text
}) => {
  const parts = text.trim().split("|").map(item => item.trim());
  if (parts.length < 1) return await conn.reply(m.chat, "📚 Contoh penggunaan: *lahelu query|page|part*", m);
  const [query, page, part] = parts, pageNum = +page || 1, partNum = +part || 1;
  try {
    const {
      postInfos
    } = await fetchData(query, pageNum);
    if (postInfos && postInfos.length > 0)
      if (partNum > 0 && partNum <= postInfos.length) {
        const {
          postID,
          userID,
          title,
          totalUpvotes,
          totalDownvotes,
          totalComments,
          createTime,
          media,
          sensitive,
          userUsername
        } = postInfos[partNum - 1], message = `\n📌 *Post ID:* ${postID}\n👤 *User ID:* ${userID}\n📜 *Title:* ${title}\n👍 *Total Upvotes:* ${totalUpvotes}\n👎 *Total Downvotes:* ${totalDownvotes}\n💬 *Total Comments:* ${totalComments}\n⏰ *Create Time:* ${new Date(createTime).toLocaleString()}\n🖼️ *Media:* ${media}\n🚫 *Sensitive:* ${sensitive ? "Yes" : "No"}\n🧑‍💼 *User Username:* ${userUsername}\n\n📚 Contoh penggunaan: *lahelu query|page|part*`;
        await conn.sendFile(m.chat, `https://cache.lahelu.com/${media}`, "", message, m);
      } else if (pageNum > 0) {
      const listMessage = postInfos.map((post, index) => `*${index + 1}.* ${post.title}`).join("\n"),
        helpMessage = "\n\n📚 Contoh penggunaan: *lahelu query|page|part*";
      await conn.reply(m.chat, listMessage + helpMessage, m);
    } else await conn.reply(m.chat, "❌ Nomor bagian tidak valid. Harap masukkan nomor bagian yang tepat.\n\n📚 Contoh penggunaan: *lahelu query|page|part*", m);
    else await conn.reply(m.chat, "📭 Tidak ada hasil yang ditemukan.", m);
  } catch (error) {
    console.error("Terjadi kesalahan:", error), await conn.reply(m.chat, "❌ Terjadi kesalahan saat mengambil data. Pastikan format input benar.\n\n📚 Contoh penggunaan: *lahelu query|page|part*", m);
  }
};
handler.help = ["lahelu"].map(v => v + " query|page|part"), handler.tags = ["internet"],
  handler.command = /^(lahelu)$/i;
export default handler;