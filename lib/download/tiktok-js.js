class TiktokJs {
  constructor() {
    this.apiUrl = "https://tiktokjs-downloader.vercel.app/api/v1/";
  }
  async fetchData(tiktok, endpoint, method = "POST") {
    const url = `${this.apiUrl}${endpoint}${"GET" === method ? `?url=${encodeURIComponent(tiktok)}` : ""}`,
      options = {
        method: method,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        body: "POST" === method ? JSON.stringify({
          url: tiktok
        }) : null
      };
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return console.error(error.message), "POST" === method ? await this.fetchData(tiktok, endpoint, "GET") : Promise.reject(error);
    }
  }
  displayEndpoints() {
    return ["aweme", "musicaldown", "savetik", "snaptik", "snaptikpro", "ssstik", "tikcdn", "tikmate", "tiktokdownloadr", "tikwm", "ttdownloader"];
  }
  async aweme(link) {
    return await this.fetchData(link, "aweme");
  }
  async musicaldown(link) {
    return await this.fetchData(link, "musicaldown");
  }
  async savetik(link) {
    return await this.fetchData(link, "savetik");
  }
  async snaptik(link) {
    return await this.fetchData(link, "snaptik");
  }
  async snaptikpro(link) {
    return await this.fetchData(link, "snaptikpro");
  }
  async ssstik(link) {
    return await this.fetchData(link, "ssstik");
  }
  async tikcdn(link) {
    return await this.fetchData(link, "tikcdn");
  }
  async tikmate(link) {
    return await this.fetchData(link, "tikmate");
  }
  async tiktokdownloadr(link) {
    return await this.fetchData(link, "tiktokdownloadr");
  }
  async tikwm(link) {
    return await this.fetchData(link, "tikwm");
  }
  async ttdownloader(link) {
    return await this.fetchData(link, "ttdownloader");
  }
}
export {
  TiktokJs
};