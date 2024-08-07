import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
import Genius from "genius-lyrics";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let Client = new Genius.Client("h6fTn1BYNjYi5VTszhyAFTcM3WWtk2E4hqrXCcutfObE4jVFnJ3LVyewHKIYTli7"),
    lister = ["search", "module", "lyrics", "lyricsv2", "getartist", "getsong", "annotation", "referent"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.genius search|adel\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("module" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let teks = (await Client.songs.search(inputs)).map((v, index) => `Result: ${index + 1}\n*fullTitle:* ${v.fullTitle}\n*featuredTitle:* ${v.featuredTitle}\n*thumbnail:* ${v.thumbnail}\n*id:* ${v.id}\n*title:* ${v.title}\n*url:* ${v.url}\n`.trim()).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let res = await search(inputs),
          teks = Object.values(res.response.hits).map((v, index) => `Result: ${index + 1}\n*annotation_count:* ${v.result.annotation_count}\n*api_path:* ${v.result.api_path}\n*artist_names:* ${v.result.artist_names}\n*full_title:* ${v.result.full_title}\n*header_image_thumbnail_url:* ${v.result.header_image_thumbnail_url}\n*header_image_url:* ${v.result.header_image_url}\n*id:* ${v.result.id}\n*language:* ${v.result.language}\n*lyrics_owner_id:* ${v.result.lyrics_owner_id}\n*lyrics_state:* ${v.result.lyrics_state}\n*path:* ${v.result.path}\n*pyongs_count:* ${v.result.pyongs_count}\n*relationships_index_url:* ${v.result.relationships_index_url}\n*release_date_for_display:* ${v.result.release_date_for_display}\n*release_date_with_abbreviated_month_for_display:* ${v.result.release_date_with_abbreviated_month_for_display}\n*song_art_image_thumbnail_url:* ${v.result.song_art_image_thumbnail_url}\n*song_art_image_url:* ${v.result.song_art_image_url}\n*title:* ${v.result.title}\n*title_with_featured:* ${v.result.title_with_featured}\n\t`.trim()).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("lyrics" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      if (!inputs_) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let song = await Client.songs.search(inputs),
          teks = await song[inputs_].lyrics();
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("lyricsv2" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let teks = await getLyrics(inputs);
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("getartist" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let teks = await getArtist(inputs);
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("getsong" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let teks = await getSong(inputs);
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("annotation" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let teks = await getAnnotation(inputs);
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("referent" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .genius search|hello");
      m.react(wait);
      try {
        let teks = await getSongReferents(inputs);
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["genius type query"], handler.tags = ["internet"], handler.command = /^(genius)$/i;
export default handler;
const BASE_URL = "https://api.genius.com",
  ACCESS_TOKEN = "5A3jmNtHiCmWSmKZYfoM_T5seFaHnZiTwzIxCsHJqF7JXauBIDLocGmo9wFFzLNX";
async function search(query) {
  const response = await fetch(`${BASE_URL}/search?access_token=${ACCESS_TOKEN}&q=${query}`);
  return await response.json();
}
async function getArtist(artistId) {
  const response = await fetch(`${BASE_URL}/artists/${artistId}?access_token=${ACCESS_TOKEN}`);
  return await response.json();
}
async function getSong(songId) {
  const response = await fetch(`${BASE_URL}/songs/${songId}?access_token=${ACCESS_TOKEN}`);
  return await response.json();
}
async function getAnnotation(annotationId) {
  const response = await fetch(`${BASE_URL}/annotations/${annotationId}?access_token=${ACCESS_TOKEN}`);
  return await response.json();
}
async function getSongReferents(songId) {
  const response = await fetch(`${BASE_URL}/referents/?song_id=${songId}&access_token=${ACCESS_TOKEN}`);
  return await response.json();
}
async function getLyrics(url) {
  const response = await fetch(Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1] + url),
    html = await response.text(),
    $ = cheerio.load(html);
  let lyrics = "";
  return $('div[class^="Lyrics__Container"]').each((i, elem) => {
    if (0 !== $(elem).text().length) {
      const snippet = $(elem).html().replace(/<br>/g, "\n").replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
      lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
    }
  }), lyrics;
}