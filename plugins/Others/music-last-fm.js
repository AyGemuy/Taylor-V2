import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  text,
  command,
  args
}) => {
  if (!text) throw "Input Endspoint\nCth: .lastfm trackSearch.Believe\n\n*[ ENDPOINT ]*\n" + await ArrClean(["artistEvents", "artistSearch", "artistTopFans", "artistTopTracks", "compareUserTaste", "compareUserToArtist", "eventAttendes", "eventInfo", "eventShout", "libraryAlbum", "libraryArtist", "libraryTracks", "metroArtistChart", "metroEvents", "metroHypeTrackChart", "metroTrackChart", "metros", "trackSearch", "trackSimilar", "trackTopFan", "userRecentTracks", "userRecommendedArtists", "userTopArtist", "userTopTracks", "userWeeklyArtistChart", "userWeeklyCharts", "userWeeklyTrackChart"]);
  let [a, b, c] = text.split(/[xzXZ/i!#\$%\+£¢€¥\^°=¶∆×÷π√✓©®:;\?&\.\\\-]+/);
  if ("artistEvents" === a) {
    m.react(wait);
    let links = await artistEvents(b);
    return await (await fetch(links)).json();
  }
  if ("artistSearch" === a) {
    m.react(wait);
    let links = await artistSearch(b);
    return await (await fetch(links)).json();
  }
  if ("artistTopFans" === a) {
    m.react(wait);
    let links = await artistTopFans(b);
    return await (await fetch(links)).json();
  }
  if ("artistTopTracks" === a) {
    m.react(wait);
    let links = await artistTopTracks(b);
    return await (await fetch(links)).json();
  }
  if ("compareUserTaste" === a) {
    m.react(wait);
    let links = await compareUserTaste(b, c);
    return await (await fetch(links)).json();
  }
  if ("compareUserToArtist" === a) {
    m.react(wait);
    let links = await compareUserToArtist(b, c);
    return await (await fetch(links)).json();
  }
  if ("eventAttendes" === a) {
    m.react(wait);
    let links = await eventAttendes(b);
    return await (await fetch(links)).json();
  }
  if ("eventInfo" === a) {
    m.react(wait);
    let links = await eventInfo(b);
    return await (await fetch(links)).json();
  }
  if ("eventShout" === a) {
    m.react(wait);
    let links = await eventShout(b);
    return await (await fetch(links)).json();
  }
  if ("libraryAlbum" === a) {
    m.react(wait);
    let links = await libraryAlbum(b);
    return await (await fetch(links)).json();
  }
  if ("libraryArtist" === a) {
    m.react(wait);
    let links = await libraryArtist(b);
    return await (await fetch(links)).json();
  }
  if ("libraryTracks" === a) {
    m.react(wait);
    let links = await libraryTracks(b);
    return await (await fetch(links)).json();
  }
  if ("metroArtistChart" === a) {
    m.react(wait);
    let links = await metroArtistChart(b, c);
    return await (await fetch(links)).json();
  }
  if ("metroEvents" === a) {
    m.react(wait);
    let links = await metroEvents(b);
    return await (await fetch(links)).json();
  }
  if ("metroHypeTrackChart" === a) {
    m.react(wait);
    let links = await metroHypeTrackChart(b, c);
    return await (await fetch(links)).json();
  }
  if ("metroTrackChart" === a) {
    m.react(wait);
    let links = await metroTrackChart(b, c);
    return await (await fetch(links)).json();
  }
  if ("metros" === a) {
    m.react(wait);
    let links = await metros(b);
    return await (await fetch(links)).json();
  }
  if ("trackSearch" === a) {
    m.react(wait);
    let links = await trackSearch(b);
    return await (await fetch(links)).json();
  }
  if ("trackSimilar" === a) {
    m.react(wait);
    let links = await trackSimilar(b, c);
    return await (await fetch(links)).json();
  }
  if ("trackTopFan" === a) {
    m.react(wait);
    let links = await trackTopFan(b, c);
    return await (await fetch(links)).json();
  }
  if ("userRecentTracks" === a) {
    m.react(wait);
    let links = await userRecentTracks(b);
    return await (await fetch(links)).json();
  }
  if ("userRecommendedArtists" === a) {
    m.react(wait);
    let links = await userRecommendedArtists(b);
    return await (await fetch(links)).json();
  }
  if ("userTopArtist" === a) {
    m.react(wait);
    let links = await userTopArtist(b);
    return await (await fetch(links)).json();
  }
  if ("userTopTracks" === a) {
    m.react(wait);
    let links = await userTopTracks(b);
    return await (await fetch(links)).json();
  }
  if ("userWeeklyArtistChart" === a) {
    m.react(wait);
    let links = await userWeeklyArtistChart(b);
    return await (await fetch(links)).json();
  }
  if ("userWeeklyCharts" === a) {
    m.react(wait);
    let links = await userWeeklyCharts(b);
    return await (await fetch(links)).json();
  }
  if ("userWeeklyTrackChart" === a) {
    m.react(wait);
    let links = await userWeeklyTrackChart(b);
    return await (await fetch(links)).json();
  }
};
handler.help = ["lastfm"], handler.tags = ["music"], handler.command = /^(lastfm)$/i;
export default handler;

function ArrClean(str) {
  return str.map((v, index) => ++index + ". " + v).join("\r\n");
}
var apiKey = "aac9268580d78ff419b26625d1150db3",
  apiUrl = "https://ws.audioscrobbler.com/2.0/";

function userRecentTracks(username) {
  return apiUrl + "?method=user.getrecenttracks&user=" + username + "&api_key=" + apiKey + "&format=json";
}

function userTopTracks(username) {
  return apiUrl + "?method=user.gettoptracks&user=" + username + "&api_key=" + apiKey + "&format=json";
}

function userRecommendedArtists(username) {
  return apiUrl + "?method=user.getRecommendedArtists&user=" + username + "&api_key=" + apiKey + "&format=json";
}

function userTopArtist(username) {
  return apiUrl + "?method=user.gettopartists&user=" + username + "&api_key=" + apiKey + "&limit=100&format=json";
}

function userWeeklyCharts(username) {
  return apiUrl + "?method=user.getweeklychartlist=" + username + "&api_key=" + apiKey + "&format=json";
}

function userWeeklyTrackChart(username) {
  return apiUrl + "?method=user.getweeklytrackchart=" + username + "&api_key=" + apiKey + "&format=json";
}

function userWeeklyArtistChart(username) {
  return apiUrl + "?method=user.getweeklyartistchart=" + username + "&api_key=" + apiKey + "&format=json";
}

function trackSearch(trackName) {
  return apiUrl + "?method=track.search&track=" + trackName + "&api_key=" + apiKey + "&format=json";
}

function trackTopFan(artist, trackName) {
  return apiUrl + "?method=track.gettopfans&artist=" + artist + "&track=" + trackName + "&api_key=" + apiKey + "=json";
}

function trackSimilar(artist, trackName) {
  return apiUrl + "?method=track.getsimilar&artist=" + artist + "&track=" + trackName + "&api_key=" + apiKey + "=json";
}

function compareUserTaste(user1, user2) {
  return apiUrl + "?method=tasteometer.compare&type1=user&type2=user&value1=" + user1 + "&value2=" + user2 + "&api_key=" + apiKey + "&format=json";
}

function compareUserToArtist(artist, user) {
  return apiUrl + "?method=tasteometer.compare&type1=artists&type2=user&value1=" + artist + "&value2=" + user + "&api_key=" + apiKey + "&format=json";
}

function libraryTracks(user) {
  return apiUrl + "?method=library.gettracks&api_key=" + apiKey + "&user=" + user + "&format=json";
}

function libraryArtist(user) {
  return apiUrl + "?method=library.getartist&api_key=" + apiKey + "&user=" + user + "&format=json";
}

function libraryAlbum(user) {
  return apiUrl + "?method=library.getalbums&api_key=" + apiKey + "&user=" + user + "&format=json";
}

function metros(country) {
  return apiUrl + "?method=geo.getmetros&country=" + country + "&api_key=" + apiKey + "&format=json";
}

function metroHypeTrackChart(metro, country) {
  return apiUrl + "?method=geo.getmetrohypetrackchart&country=" + country + "&metro=" + metro + "&api_key=" + apiKey + "&format=json";
}

function metroEvents(metro) {
  return apiUrl + "?method=geo.getevents&location=" + metro + "&api_key=" + apiKey + "&format=json";
}

function metroArtistChart(metro, country) {
  return apiUrl + "?method=geo.getmetroartistchart&country=" + country + "&metro=" + metro + "&api_key=" + apiKey + "&format=json";
}

function metroTrackChart(metro, country) {
  return apiUrl + "?method=geo.getmetrotrackchart&country=" + country + "&metro=" + metro + "&api_key=" + apiKey + "&format=json";
}

function eventInfo(eventId) {
  return apiUrl + "?method=event.getinfo&event=" + eventId + "&api_key=" + apiKey + "=json";
}

function eventAttendes(eventId) {
  return apiUrl + "?method=event.getattendees&event=" + eventId + "&api_key=" + apiKey + "=json";
}

function eventShout(eventId) {
  return apiUrl + "?method=event.getshouts&event=" + eventId + "&api_key=" + apiKey + "=json";
}

function artistSearch(artist) {
  return apiUrl + "?method=artist.search&artist=" + artist + "&api_key=" + apiKey + "&format=json";
}

function artistTopTracks(artist) {
  return apiUrl + "?method=artist.gettoptracks&artist=" + artist + "&api_key=" + apiKey + "&format=json";
}

function artistTopFans(artist) {
  return apiUrl + "?method=artist.gettopfans&artist=" + artist + "&api_key=" + apiKey + "&format=json";
}

function artistEvents(artist) {
  return apiUrl + "?method=artist.getevents&artist=" + artist + "&api_key=" + apiKey + "&format=json";
}