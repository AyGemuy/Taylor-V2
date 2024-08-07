import axios from "axios";
import crypto from "crypto";
import UserAgent from "fake-useragent";
const jsongen = async url => {
  try {
    const headers = {
      "X-Signature-Version": "web2",
      "X-Signature": crypto.randomBytes(32).toString("hex"),
      "User-Agent": new UserAgent().random
    };
    return (await axios.get(url, {
      headers: headers
    })).data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}, getTrending = async (time, page) => {
  const url = `https://hanime.tv/api/v8/browse-trending?time=${time}&page=${page}&order_by=views&ordering=desc`;
  return (await jsongen(url)).hentai_videos.map(x => ({
    id: x.id,
    name: x.name,
    slug: x.slug,
    cover_url: x.cover_url,
    views: x.views,
    link: `/watch/${x.slug}`
  }));
}, getVideo = async slug => {
  const videoDataUrl = "https://hanime.tv/api/v8/video?id=" + slug,
    videoData = await jsongen(videoDataUrl),
    tags = videoData.hentai_tags.map(t => ({
      name: t.text,
      link: `/hentai-tags/${t.text}/0`
    })),
    streams = videoData.videos_manifest.servers[0]?.streams.map(s => ({
      width: s.width,
      height: s.height,
      size_mbs: s.filesize_mbs,
      url: s.url
    })),
    episodes = videoData.hentai_franchise_hentai_videos.map(e => ({
      id: e.id,
      name: e.name,
      slug: e.slug,
      cover_url: e.cover_url,
      views: e.views,
      link: `/watch/${e.slug}`
    }));
  return [{
    id: videoData.hentai_video.id,
    name: videoData.hentai_video.name,
    description: videoData.hentai_video.description,
    poster_url: videoData.hentai_video.poster_url,
    cover_url: videoData.hentai_video.cover_url,
    views: videoData.hentai_video.views,
    streams: streams,
    tags: tags,
    episodes: episodes
  }];
}, getBrowse = async () => await jsongen("https://hanime.tv/api/v8/browse"), getBrowseVideos = async (type, category, page) => {
  const browseUrl = `https://hanime.tv/api/v8/browse/${type}/${category}?page=${page}&order_by=views&ordering=desc`;
  return (await jsongen(browseUrl)).hentai_videos.map(x => ({
    id: x.id,
    name: x.name,
    slug: x.slug,
    cover_url: x.cover_url,
    views: x.views,
    link: `/watch/${x.slug}`
  }));
};
export {
  getTrending,
  getVideo,
  getBrowse,
  getBrowseVideos
};