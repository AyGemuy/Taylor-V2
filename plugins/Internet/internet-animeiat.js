import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["search", "video", "slugeps", "slugvid", "getvid"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.animeiat search|naruto\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query anime");
      m.react(wait);
      try {
        let teks = (await searchAnime(inputs)).map((anime, index) => `*[ ${index + 1} ]*\n*Judul:* ${anime.anime_name}\n*ID:* ${anime.id}\n*Slug:* ${anime.slug}\n*Cerita:* ${anime.story}\n*Nama lain:* ${anime.other_names}\n*Total episode:* ${anime.total_episodes}\n*Usia:* ${anime.age}\n*Tipe:* ${anime.type}\n*Status:* ${anime.status}\n*Path poster:* ${anime.poster_path}\n*Dipublikasikan oleh:* ${anime.published}\n*Tanggal publikasi:* ${anime.published_at}\n*Tahun:* ${anime.year_id}\n*Dibuat pada:* ${anime.created_at}\n*Diperbarui pada:* ${anime.updated_at}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("video" === feature) {
      if (!inputs) return m.reply("Input query anime");
      m.react(wait);
      try {
        const teks = (await fetchAnime(inputs, inputs_)).map((anime, index) => `*[ ${index + 1} ]*\n*Quality:* ${anime.quality}\n*Label:* ${anime.label}\n*Link:* ${anime.file}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("slugeps" === feature) {
      if (!inputs) return m.reply("Input query anime");
      m.react(wait);
      try {
        const teks = (await slugEpisode(inputs)).map((anime, index) => `*[ ${index + 1} ]*\n*Judul:* ${anime.anime_name}\n*Slug:* ${anime.slug}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("slugvid" === feature) {
      if (!inputs) return m.reply("Input query episode slug");
      m.react(wait);
      try {
        let outs = await slugVideo(inputs, inputs_);
        const teks = `*Slug:* ${outs.slug}\n*Episode:* 1 sampai ${outs.total}`;
        m.reply(teks);
      } catch (e) {
        m.reply(eror + "\nEpisode yang anda masukkan kebanyakan!");
      }
    }
    if ("getvid" === feature) {
      if (!inputs) return m.reply("Input query video slug");
      m.react(wait);
      try {
        const teks = (await getVideo(inputs)).map((anime, index) => `*[ ${index + 1} ]*\n*Quality:* ${anime.quality}\n*Label:* ${anime.label}\n*Link:* ${anime.file}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["animeiat type query"], handler.tags = ["internet"], handler.command = /^(animeiat)$/i;
export default handler;
async function searchAnime(query) {
  try {
    const response = await fetch(`https://api.animeiat.co/v1/anime?q=${query}`);
    return (await response.json()).data;
  } catch (error) {
    return console.error("Terjadi kesalahan:", error), null;
  }
}
async function fetchAnime(query, episodes = 1) {
  try {
    const response = await fetch("https://api.animeiat.co/v1/anime?q=" + query),
      sear = await response.json(),
      response1 = await fetch("https://api.animeiat.co/v1/episode/" + sear.data[0]?.slug + "-episode-" + episodes),
      slug = (await response1.json()).data.video.slug,
      response2 = await fetch("https://api.animeiat.co/v1/video/" + slug),
      data2 = await response2.json();
    return data2.data.sources;
  } catch (error) {
    return console.error(error), null;
  }
}
async function slugEpisode(query) {
  try {
    const response = await fetch("https://api.animeiat.co/v1/anime?q=" + query);
    return (await response.json()).data;
  } catch (error) {
    return console.error(error), null;
  }
}
async function slugVideo(query, episode = 1) {
  try {
    const response1 = await fetch("https://api.animeiat.co/v1/episode/" + query + "-episode-" + episode),
      data = await response1.json(),
      slug = data.data.video.slug;
    return {
      slug: slug,
      total: data.data.anime.total_episodes
    };
  } catch (error) {
    return console.error(error), null;
  }
}
async function getVideo(query) {
  try {
    const response2 = await fetch("https://api.animeiat.co/v1/video/" + query),
      data2 = await response2.json();
    return data2.data.sources;
  } catch (error) {
    return console.error(error), null;
  }
}