import fetch from "node-fetch";
import crypto from "crypto";
const yousearch = async (searchTerm, uid) => {
  const params = new URLSearchParams({
    q: searchTerm,
    uid: uid,
    promptTemplate: `Search term: "{searchTerm}"

Make your language less formal and use emoticons.
I want you to always use Indonesian slang from Jakarta where the words "you" and "anda" are replaced with "lu" and the word I is replaced with "gw".
Create a summary of the search results in three paragraphs with reference numbers, which you then list numbered at the bottom.
Include emojis in the summary.
Be sure to include the reference numbers in the summary.
Both in the text of the summary and in the reference list, the reference numbers should look like this: "(1)".
Formulate simple sentences.
Include blank lines between the paragraphs.
Do not reply with an introduction, but start directly with the summary.
Include emojis in the summary.
At the end write a hint text where I can find search results as comparison with the above search term with a link to Google search in this format \`See Google results: \` and append the link.
Below write a tip how I can optimize the search results for my search query.
I show you in which format this should be structured:

\`\`\`
<Summary of search results with reference numbers>

Sources:
(1) <URL of the first reference>
(2) <URL of the second reference>

<Hint text for further search results with Google link>
<Tip>
\`\`\`

Here are the search results:
{searchResults}`,
    searchParameters: "{}",
    searchResultTemplate: `[{order}] "{snippet}"
URL: {link}`,
  });
  try {
    const res = await fetch(
      `https://app.yoursearch.ai/api?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return (await res.json()).response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Search request failed.");
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.yousearch) db.data.dbai.yousearch = {};
  const session = db.data.dbai.yousearch[m.sender];
  const uid = session ? session.uid : crypto.randomBytes(16).toString("hex");
  const text = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const response = await yousearch(text, uid);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, response, m);
    db.data.dbai.yousearch[m.sender] = {
      uid: uid,
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.yousearch ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.yousearch)
  )
    return;
  const {
    key: { id: keyId },
    uid,
  } = db.data.dbai.yousearch[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const response = await yousearch(m.text.trim(), uid);
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, response, m);
      db.data.dbai.yousearch[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["yousearch"];
handler.tags = ["ai"];
handler.command = /^(youbot|yousearch)$/i;
export default handler;
