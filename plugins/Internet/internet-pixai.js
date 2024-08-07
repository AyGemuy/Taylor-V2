import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
import {
  webp2png
} from "../../lib/webp2mp4.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  try {
    if (!text) throw "Input Text";
    const res = await getImages(encodeURIComponent(text), 1);
    if (!res.artworks || !res.artworks.edges || 0 === res.artworks.edges.length) throw "No results found for the given text.";
    const output = await apiResponse(res.artworks.edges[0]?.node.id),
      outputImg = imageUrlFromResponse(output);
    if (!output.artwork) throw "Error fetching artwork information.";
    let teks = `\n🔍 *[ RESULT ]*\n\n📚 Title: ${output.artwork.title}\n🔗 Author: ${output.artwork.author.displayName}\n📝 Created At: ${output.artwork.createdAt}\n👥 Follower Count: ${output.artwork.author.followerCount}\n👁️ Views: ${output.artwork.views}\n`;
    await conn.sendFile(m.chat, await webp2png((await conn.getFile(outputImg[0])).data), "", teks, m);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, `Error: ${error}`, m);
  }
};
handler.help = ["pixai"], handler.tags = ["internet"], handler.command = ["pixai"];
export default handler;
const baseURL = "https://api.pixai.art/graphql";
async function getImages(q, n = 5, isNsfw = !1) {
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: "\n          query listArtworks($before: String, $after: String, $first: Int, $last: Int, $isNsfw: Boolean, $isPrivate: Boolean, $orderBy: String, $tag: String, $q: String, $relevantArtworkId: ID, $keyword: String, $text: String, $hidePrompts: Boolean, $authorName: String, $feed: String, $authorId: ID, $challenge: Int, $archived: Boolean, $isTheme: Boolean, $themeId: ID) {\n            artworks(\n              before: $before\n              after: $after\n              first: $first\n              last: $last\n              isNsfw: $isNsfw\n              isPrivate: $isPrivate\n              orderBy: $orderBy\n              tag: $tag\n              q: $q\n              relevantArtworkId: $relevantArtworkId\n              keyword: $keyword\n              text: $text\n              hidePrompts: $hidePrompts\n              authorName: $authorName\n              feed: $feed\n              authorId: $authorId\n              challenge: $challenge\n              archived: $archived\n              isTheme: $isTheme\n              themeId: $themeId\n            ) {\n              edges {\n                node {\n                  ...ArtworkBase\n                }\n                cursor\n              }\n              pageInfo {\n                hasNextPage\n                hasPreviousPage\n                endCursor\n                startCursor\n              }\n              totalCount\n            }\n          }\n          \n          fragment ArtworkBase on Artwork {\n            id\n            title\n            authorId\n            authorName\n            author {\n              ...UserBase\n            }\n            mediaId\n            prompts\n            createdAt\n            updatedAt\n            media {\n              ...MediaBase\n            }\n            isNsfw\n            hidePrompts\n            isPrivate\n            tags {\n              ...TagBase\n            }\n            extra\n            likedCount\n            liked\n            views\n            commentCount\n            inspiredCount\n            deriveThemeId\n            rootThemeId\n          }\n          \n          fragment UserBase on User {\n            id\n            email\n            emailVerified\n            username\n            displayName\n            createdAt\n            updatedAt\n            avatarMedia {\n              ...MediaBase\n            }\n            followedByMe\n            followingMe\n            followerCount\n            followingCount\n            inspiredCount\n            isAdmin\n          }\n          \n          fragment MediaBase on Media {\n            id\n            type\n            width\n            height\n            urls {\n              variant\n              url\n            }\n            imageType\n            fileUrl\n            duration\n            thumbnailUrl\n            hlsUrl\n            size\n          }\n          \n          fragment TagBase on Tag {\n            id\n            name\n            mediaId\n            media {\n              ...MediaBase\n            }\n            category\n            weight\n            rootTagId\n            createdAt\n            updatedAt\n            extra\n          }\n        ",
        variables: {
          isNsfw: isNsfw,
          q: q,
          first: n,
          feed: "random"
        }
      })
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return (await response.json()).data;
  } catch (error) {
    return console.error(error), [];
  }
}
async function apiResponse(artworkId) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://pixai.art/",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    },
    body: JSON.stringify({
      query: "\n  query getArtwork($id: ID!) {\n    artwork(id: $id) {\n      ...ArtworkBase\n    }\n  }\n  \n  fragment ArtworkBase on Artwork {\n    id\n    title\n    authorId\n    authorName\n    author {\n      ...UserBase\n    }\n    mediaId\n    prompts\n    createdAt\n    updatedAt\n    media {\n      ...MediaBase\n    }\n    isNsfw\n    hidePrompts\n    tags {\n      id\n      name\n    }\n    extra\n    likedCount\n    liked\n    views\n    commentCount\n  }\n  \n  fragment UserBase on User {\n    id\n    email\n    emailVerified\n    username\n    displayName\n    createdAt\n    updatedAt\n    avatarMedia {\n      ...MediaBase\n    }\n    followedByMe\n    followingMe\n    followerCount\n    followingCount\n    isAdmin\n  }\n  \n  fragment MediaBase on Media {\n    id\n    type\n    width\n    height\n    urls {\n      variant\n      url\n    }\n    imageType\n    fileUrl\n    duration\n    thumbnailUrl\n    hlsUrl\n    size\n  }\n",
      variables: {
        id: artworkId
      }
    })
  };
  try {
    const response = await fetch(baseURL, requestOptions);
    if (200 === response.status) {
      return (await response.json()).data;
    }
    return {};
  } catch (error) {
    return console.error(error), {};
  }
}

function imageUrlFromResponse(response) {
  return response && response.artwork && response.artwork.media ? response.artwork.media.urls.filter(media => "PUBLIC" === media.variant).map(media => media.url) : [];
}