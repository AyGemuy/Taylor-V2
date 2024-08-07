import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Input text";
  const parts = text.split("|"),
    subredditQuery = parts[0];
  let startIndex = parseInt(parts[1]) || 5;
  try {
    const message = (await getSubredditData(subredditQuery, startIndex, "new", ["title", "url", "selftext"])).map((item, index) => `*${index + 1}.* ${item.title}\n   *URL:* ${item.url}\n   *Selftext:* ${item.selftext}`).join("\n\n");
    m.reply(`Daftar Posting Untuk *${subredditQuery}*:\n\n` + message);
  } catch (error) {
    console.error(error.message), m.reply(error.message);
  }
};
handler.help = ["subreddit"], handler.tags = ["search"], handler.command = /^(subreddit)$/i;
export default handler;
const validTerms = new Set(["approved_at_utc", "approved_by", "author_flair_background_color", "author_flair_css_class", "author_flair_richtext", "author_flair_template_id", "author_fullname", "author_premium", "can_mod_post", "category", "clicked", "content_categories", "created_utc", "downs", "edited", "gilded", "gildings", "hidden", "hide_score", "is_created_from_ads_ui", "is_meta", "is_original_content", "is_reddit_media_domain", "is_video", "link_flair_css_class", "link_flair_richtext", "link_flair_text", "link_flair_text_color", "media_embed", "mod_reason_title", "name", "permalink", "pwls", "quarantine", "saved", "score", "secure_media", "secure_media_embed", "selftext", "subreddit", "subreddit_name_prefixed", "subreddit_type", "thumbnail", "title", "top_awarded_type", "total_awards_received", "ups", "upvote_ratio", "url", "user_reports"]);
async function getSubredditData(subreddit, limit = 1, age = "new", wantedData = []) {
  if (wantedData.some(term => !validTerms.has(term))) throw new Error(`Invalid search term: ${wantedData.filter(term => !validTerms.has(term)).join(", ")}`);
  const response = await fetch(`https://reddit.com/r/${subreddit}/${age}.json?limit=${limit}`, {
    headers: {
      "User-agent": "A random string"
    }
  });
  if (429 === response.status) throw new Error("HTTP Error 429 (Rate Limited)");
  const data = await response.json();
  return wantedData.length ? data.data.children.slice(0, limit).map((child, id) => wantedData.reduce((obj, item) => ({
    ...obj,
    [item]: child.data[item]
  }), {})) : data.data.children.slice(0, limit);
}