import fetch from "node-fetch";
import {
  parse
} from "node-html-parser";
class Wattpad {
  constructor() {
    this.baseURL = {
      api_v2: "https://www.wattpad.com/apiv2/",
      api_v3: "https://www.wattpad.com/api/v3/",
      api_v4: "https://api.wattpad.com/v4/",
      api_v5: "https://api.wattpad.com/v5/"
    };
  }
  async makeRequest(api, path, params, options = {}) {
    try {
      const url = `${this.baseURL[api]}${path}?${new URLSearchParams(params)}`,
        response = await fetch(url, {
          method: options.method || "GET",
          ...options
        });
      return await response.json() || "";
    } catch (error) {
      throw console.error(`Error in makeRequest: ${error}`), error;
    }
  }
  async search(query = "", limit = 20, offset = 0, mature = !0, language = "20") {
    try {
      const params = {
        query: query,
        limit: limit,
        offset: offset,
        mature: mature,
        language: language,
        fields: "stories(id,title,voteCount,readCount,commentCount,description,completed,mature,cover,url,isPaywalled,length,language(id),user(name),numParts,lastPublishedPart(createDate),promoted,sponsor(name,avatar),tags,tracking(clickUrl,impressionUrl,thirdParty(impressionUrls,clickUrls)),contest(endDate,ctaLabel,ctaURL)),total,tags,nexturl"
      };
      return await this.makeRequest("api_v4", "search/stories", params) || "";
    } catch (error) {
      throw console.error(`Error in search: ${error}`), error;
    }
  }
  async detail(id) {
    try {
      const params = {
        fields: "id,url,title,length,createDate,modifyDate,voteCount,readCount,commentCount,promoted,sponsor,language,user,description,cover,highlight_colour,completed,isPaywalled,categories,numParts,readingPosition,deleted,dateAdded,lastPublishedPart(createDate),tags,copyright,rating,story_text_url(text),parts(id,title,voteCount,commentCount,videoId,readCount,photoUrl,modifyDate,length,voted,deleted,text_url(text),dedication)"
      };
      return await this.makeRequest("api_v3", `stories/${id}/`, params) || "";
    } catch (error) {
      throw console.error(`Error in detail: ${error}`), error;
    }
  }
  async viewParts(id) {
    try {
      const params = {
        fields: "id,title,url,modifyDate,wordCount,photoUrl,commentCount,voteCount,readCount,voted,pages,text_url,rating,group(id,title,cover,url,user(username,name,avatar,twitter,authorMessage),rating,parts(title,url,id)),source(url,label)"
      };
      return await this.makeRequest("api_v4", `parts/${id}`, params) || "";
    } catch (error) {
      throw console.error(`Error in viewParts: ${error}`), error;
    }
  }
  async read(id) {
    try {
      const params = {
          id: id,
          include_paragraph_id: "1",
          output: "json"
        },
        json = await this.makeRequest("api_v2", "storytext", params) || "";
      return {
        text: parse(json.text).textContent || "" || "",
        text_hash: json.text_hash || ""
      };
    } catch (error) {
      throw console.error(`Error in read: ${error}`), error;
    }
  }
}
export {
  Wattpad
};