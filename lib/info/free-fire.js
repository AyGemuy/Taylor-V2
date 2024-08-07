import fetch from "node-fetch";
class FreeFire {
  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (error) {
      throw new Error("Error fetching data: " + error.message);
    }
  }
  async searchPlayerById(uid, region = "ID") {
    return await this.fetchData(`https://freefireapi.com.br/api/search_id?id=${uid}&region=${region}`);
  }
  async searchPlayerByNickname(nickname, region = "ID") {
    return await this.fetchData(`https://freefireapi.com.br/api/search_by_nick?nickname=${nickname}&region=${region}`);
  }
  async searchGuildById(clan_id, region = "ID") {
    return await this.fetchData(`https://freefireapi.com.br/api/search_guild_id?id=${clan_id}&region=${region}`);
  }
  async getProfile(id, region = "ID") {
    return await this.fetchData(`https://freefireapi.com.br/api/search_id?id=${id}&region=${region}`);
  }
  async getStats(id, mode, region = "ID") {
    return await this.fetchData(`https://freefireapi.com.br/api/stats?id=${id}&match_mode=${mode}&region=${region}`);
  }
  async checkBanned(id, region = "ID") {
    return await this.fetchData(`https://ff.garena.com/api/antihack/check_banned?lang=${region}&uid=${id}`);
  }
  async redeem(code, access_token) {
    const body = JSON.stringify({
        serialno: code
      }),
      headers = {
        "access-token": access_token,
        "Content-Type": "application/json"
      };
    return await this.fetchData("https://prod-api.reward.ff.garena.com/redemption/api/game/ff/redeem/", {
      method: "POST",
      headers: headers,
      body: body
    });
  }
  async verifyCode(code) {
    return await this.fetchData(`https://api.shay444ofc.vercel.app/api/freefire/v1/verifyRedeemCode?code=${code}`);
  }
  async getOverview() {
    return await this.fetchData("https://server.shay444ofc.vercel.app/api/freefire/normal/overview");
  }
  async getWebEvents(region = "ID") {
    return await this.fetchData(`https://freefireapi.com.br/api/freefire/external/WebEvents?region=${region}`);
  }
}
export {
  FreeFire
};