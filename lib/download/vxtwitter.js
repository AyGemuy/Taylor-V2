import axios from "axios";
const cleanTwitterURL = url => {
    const match = url.match(/(https:\/\/twitter\.com\/[^\/]+\/status\/\d+)(\/photo\/\d+)?(\/\d+)?/i);
    return match ? match[1] : url;
  },
  getTwitterMedia = async (url, options = {}) => {
    try {
      const input = "object" == typeof url ? url.url ? url : {
          found: !1,
          error: "No URL provided"
        } : {
          url: url
        },
        {
          buffer,
          text
        } = options;
      (buffer || text) && (input.buffer = buffer, input.text = text);
      const cleanedURL = cleanTwitterURL(input.url);
      if (!/\/\/twitter.com/.test(cleanedURL)) return {
        found: !1,
        error: `Invalid URL: ${cleanedURL}`
      };
      const apiURL = cleanedURL.replace("//twitter.com", "//api.vxtwitter.com"),
        result = await axios.get(apiURL).then(res => res.data).catch(() => ({
          found: !1,
          error: "An issue occurred. Make sure the Twitter link is valid."
        }));
      if (!result.media_extended) return {
        found: !1,
        error: "No media found"
      };
      const output = {
        found: !0,
        media: result.media_extended.map(({
          url,
          type
        }) => ({
          url: url,
          type: type
        })),
        date: result.date,
        likes: result.likes,
        replies: result.replies,
        retweets: result.retweets,
        authorName: result.user_name,
        authorUsername: result.user_screen_name,
        ...input.text && {
          text: result.text
        }
      };
      if (input.buffer)
        for (const media of output.media) media.buffer = await axios.get(media.url, {
          responseType: "arraybuffer"
        }).then(res => Buffer.from(res.data, "binary")).catch(() => {});
      return output;
    } catch (error) {
      throw console.error("Error in getTwitterMedia:", error.message), new Error("Failed to get Twitter media");
    }
  };
export {
  getTwitterMedia
};