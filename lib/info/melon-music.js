import axios from "axios";
import cheerio from "cheerio";
class Melon {
  async songSearch(_section, _q, _page, _sort) {
    try {
      const encodedSearchQuery = encodeURIComponent(_q),
        startIdx = 1 + 50 * (_page - 1),
        res = await axios.get(`https://www.melon.com/search/song/index.htm?startIndex=${startIdx}&pageSize=50&q=${encodedSearchQuery}&sort=${_sort}&section=${_section}&sectionId=&genreDir=`),
        $ = cheerio.load(res.data),
        songIds = Array.from($("tbody > tr > td:nth-of-type(1) input").map((i, el) => parseInt($(el).attr("value").trim()))),
        songTitles = Array.from($("tbody > tr > td:nth-of-type(3) a.fc_gray").map((i, el) => $(el).attr("title").trim())),
        artists = Array.from($("tbody > tr > td:nth-of-type(4) span > a.fc_mgray").map((i, el) => $(el).attr("title").split(" - 페이지 ")[0]?.trim())),
        albums = Array.from($("tbody > tr > td:nth-of-type(5) a").map((i, el) => {
          const albumId = $(el).attr("href").match(/(?<=goAlbumDetail\(\')[0-9]+(?=\'\))/)[0];
          return {
            title: $(el).attr("title").split(" - 페이지 ")[0]?.trim(),
            id: parseInt(albumId)
          };
        }));
      return songTitles.map((itm, idx) => ({
        songId: songIds[idx],
        songTitle: itm,
        artist: artists[idx],
        album: albums[idx]
      }));
    } catch (error) {
      throw console.error("Error in songSearch:", error), error;
    }
  }
  async songDetail(_songId) {
    try {
      const res = await axios.get(`https://www.melon.com/song/detail.htm?songId=${_songId}`),
        $song = cheerio.load(res.data),
        songTitle = $song("#downloadfrm > div > div > div.entry > div.info > div.song_name").text().trim().split("\t").splice(-1)[0],
        albumTitle = $song("#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(2) > a").text().trim(),
        artistName = $song("#downloadfrm > div > div > div.entry > div.info > div.artist > a > span:nth-child(1)").text().trim(),
        artistThumbnail = $song("#downloadfrm > div > div > div.entry > div.info > div.artist > a > span.thumb_atist > img").attr("src"),
        releasedAt = new Date($song("#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(4)").text().trim()).toISOString(),
        category = $song("#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(6)").text().trim(),
        lyrics = $song("#d_video_summary").html()?.replace(/\<\!\-\-.*\-\-\>/g, "").replace(/\<br ?\/?\>/g, "\n").replace(/\\t/g, "").trim() || "",
        thumbnailRawURL = $song("#downloadfrm > div > div > div.thumb > a > img").attr("src").split("?")[0],
        thumbnailBaseURL = thumbnailRawURL.match(/\_500\.jpg/) ? thumbnailRawURL.split("_500.jpg")[0] : thumbnailRawURL.match(/\_1000\.jpg/) ? thumbnailRawURL.split("_1000.jpg")[0] : thumbnailRawURL.split(".jpg")[0];
      return {
        songId: _songId,
        songTitle: songTitle,
        albumTitle: albumTitle,
        artistName: artistName,
        category: category,
        releasedAt: releasedAt,
        artistThumbnail: artistThumbnail,
        thumbnail: {
          1e3: `${thumbnailBaseURL}_1000.jpg`,
          500: `${thumbnailBaseURL}_500.jpg`,
          200: `${thumbnailBaseURL}.jpg`
        },
        lyrics: lyrics
      };
    } catch (error) {
      throw console.error("Error in songDetail:", error), error;
    }
  }
  async albumDetail(_albumId) {
    try {
      const res = await axios.get(`https://www.melon.com/album/detail.htm?albumId=${_albumId}`),
        $album = cheerio.load(res.data),
        albumTitle = $album("#conts > div.section_info > div > div.entry > div.info > div.song_name").text().trim().split("\t").splice(-1)[0],
        artistName = $album("#conts > div.section_info > div > div.entry > div.info > div.artist > a").attr("title").trim(),
        artistThumbnail = $album("#conts > div.section_info > div > div.entry > div.info > div.artist > a > span.thumb_atist > img").attr("src"),
        thumbnailRawURL = $album("#d_album_org > img").attr("src").split("?")[0],
        thumbnailBaseURL = thumbnailRawURL.match(/\_500\.jpg/) ? thumbnailRawURL.split("_500.jpg")[0] : thumbnailRawURL.match(/\_1000\.jpg/) ? thumbnailRawURL.split("_1000.jpg")[0] : thumbnailRawURL.split(".jpg")[0];
      return {
        albumId: _albumId,
        albumTitle: albumTitle,
        artistName: artistName,
        artistThumbnail: artistThumbnail,
        thumbnail: {
          1e3: `${thumbnailBaseURL}_1000.jpg`,
          500: `${thumbnailBaseURL}_500.jpg`,
          200: `${thumbnailBaseURL}.jpg`
        }
      };
    } catch (error) {
      throw console.error("Error in albumDetail:", error), error;
    }
  }
}
export {
  Melon
};