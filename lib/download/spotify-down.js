import {
  fileURLToPath,
  URL
} from "url";
import chalk from "chalk";
import fs from "fs";
const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3",
  client_secret = "0e8439a1280a43aba9a5bc0a16f3f009",
  basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
  TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
async function getAccessToken() {
  return (await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials"
    })
  })).json();
}
const SpotifyAPI = async () => {
  const {
    access_token
  } = await getAccessToken();
  return {
    getUserData: async () => (await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token
      }
    })).json(),
    getUserPlaylists: async limit => (await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token
      }
    })).json(),
    getUserQueueData: async () => (await fetch("https://api.spotify.com/v1/me/player", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token
      }
    })).json(),
    addTrackToQueue: async trackId => (await fetch(`https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${trackId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })).json(),
    playPausePlayback: async action => (await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json"
      }
    })).json(),
    nextPlaybackTrack: async () => (await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json"
      }
    })).json(),
    trackSearch: async track => (await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=20`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token
      }
    })).json(),
    getPlaylistTracks: async playlistId => (await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token
      }
    })).json()
  };
};
export default SpotifyAPI;