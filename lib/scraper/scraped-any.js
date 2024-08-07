import axios from "axios";
export default class APIManager {
  #openWeatherMapBaseUrl = "https://api.openweathermap.org/data/2.5/";
  #openWeatherMapApiKey = "e1868383596238a03a9fcf1a7f12bf30";
  #ipInfoBaseUrl = "https://ipinfo.io";
  #ipInfoApiKey = "8851da7fd8c9f0";
  #unsplashBaseUrl = "https://api.unsplash.com/photos";
  #unsplashApiKey = "Gr-Tp-fAy1z5zJ7f1u7dTi3-i6PHLzfDrEZ4tA-e_EY";
  async fetchCityWeather(cityName, unit) {
    try {
      const {
        data
      } = await axios.get(`${this.#openWeatherMapBaseUrl}weather`, {
        params: {
          q: cityName,
          appid: this.#openWeatherMapApiKey,
          units: unit
        }
      });
      return data;
    } catch (error) {
      return void console.error(error, "fetchCityWeather");
    }
  }
  async fetchIp() {
    try {
      const {
        data
      } = await axios.get(`${this.#ipInfoBaseUrl}/json`, {
        params: {
          token: this.#ipInfoApiKey
        }
      });
      return data;
    } catch (error) {
      return void console.error(error, "fetchIp");
    }
  }
  async fetchImage(city) {
    try {
      const {
        data
      } = await axios.get(`${this.#unsplashBaseUrl}/random`, {
        params: {
          query: city,
          count: 1,
          orientation: "landscape",
          client_id: this.#unsplashApiKey
        }
      });
      return data;
    } catch (error) {
      return void console.error(error, "fetchImage");
    }
  }
  async getSocialSearcherPosts({
    q,
    networks
  }, {
    limit = 80,
    page,
    requestid
  } = {}) {
    if (!(limit < 0 || limit > 100)) try {
      const {
        data
      } = await axios.get("https://api.social-searcher.com/v2/search", {
        params: {
          q: q.join("OR"),
          lang: "pt-BR",
          network: networks.join(","),
          limit: limit,
          page: page,
          requestid: requestid
        }
      });
      return data.posts || [];
    } catch (error) {
      return console.dir(error), [];
    }
  }
  async getSocialSearcherUserPosts({
    userId,
    networks
  }, {
    limit = 20,
    page,
    requestid
  }) {
    if (limit < 0 || limit > 100) return [];
    try {
      const {
        data
      } = await axios.get(`https://api.social-searcher.com/v2/users/${userId}/posts`, {
        params: {
          lang: "pt-BR",
          network: networks.join(","),
          limit: limit,
          page: page,
          requestid: requestid
        }
      });
      return data.posts || [];
    } catch (error) {
      return [];
    }
  }
  async searchSocialSearcherUsers(accountName, networks) {
    try {
      const {
        data
      } = await axios.get("https://api.social-searcher.com/v2/users", {
        params: {
          q: accountName,
          network: networks.join(",")
        }
      });
      return data || [];
    } catch (error) {
      return [];
    }
  }
  async FBGET(leiam) {
    try {
      const {
        data
      } = await axios.post("https://www.thetechlearn.com/video-downloader/wp-json/aio-dl/video-data/", {
        url: leiam
      });
      return {
        sd: data.medias && data.medias[0] ? data.medias[0]?.url : void 0,
        hd: data.medias && data.medias[1] ? data.medias[1].url : void 0
      };
    } catch (error) {
      return console.error(error, "FBGET"), {};
    }
  }
  async IMGUR(leiam) {
    try {
      const {
        data
      } = await axios.post("https://api.imgur.com/3/image", leiam, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Client-ID fc9369e9aea767c"
        }
      });
      return data.data ? data.data.link : void 0;
    } catch (error) {
      return void console.error(error, "IMGUR");
    }
  }
}