import axios from "axios";
class DoodStream {
  constructor(apiKey, baseUrl = "https://doodapi.com/api/") {
    this.apiKey = apiKey, this.baseUrl = baseUrl;
  }
  async _req(url) {
    try {
      const response = await axios.get(url);
      if ("Wrong Auth" === response.data.msg) throw new Error("Invalid API key, please check your API key");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async accountInfo() {
    const url = `${this.baseUrl}account/info?key=${this.apiKey}`;
    return await this._req(url);
  }
  async accountReports(last = null, fromDate = null, toDate = null) {
    let url = `${this.baseUrl}account/stats?key=${this.apiKey}`;
    return null !== last && (url += `&last=${last}`), null !== fromDate && (url += `&from_date=${fromDate}`),
      null !== toDate && (url += `&to_date=${toDate}`), await this._req(url);
  }
  async dmcaList(perPage = null, page = null) {
    let url = `${this.baseUrl}dmca/list?key=${this.apiKey}`;
    return null !== perPage && (url += `&per_page=${perPage}`), null !== page && (url += `&page=${page}`),
      await this._req(url);
  }
  async localUpload(path) {
    const url = `${this.baseUrl}upload/server?key=${this.apiKey}`,
      urlForUpload = (await this._req(url)).result,
      filename = path.split("/").pop(),
      formData = new FormData();
    formData.append("api_key", this.apiKey), formData.append("file", new Blob([await fetch(path).then(r => r.blob())]), filename);
    const response = await axios.post(urlForUpload, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if ("OK" === response.data.msg) return response.data;
    throw new Error(`Unsupported video format ${filename}, please upload video with mkv, mp4, wmv, avi, mpeg4, mpegps, flv, 3gp, webm, mov, mpg & m4v format`);
  }
  async copyVideo(fileCode, fldId = null) {
    let url = `${this.baseUrl}file/clone?key=${this.apiKey}&file_code=${fileCode}`;
    return null !== fldId && (url += `&fld_id=${fldId}`), await this._req(url);
  }
  async remoteUpload(directLink, fldId = null, newTitle = null) {
    let url = `${this.baseUrl}upload/url?key=${this.apiKey}&url=${directLink}`;
    return null !== fldId && (url += `&fld_id=${fldId}`), null !== newTitle && (url += `&new_title=${newTitle}`),
      await this._req(url);
  }
  async remoteUploadList() {
    const url = `${this.baseUrl}urlupload/list?key=${this.apiKey}`;
    return await this._req(url);
  }
  async remoteUploadStatus(fileCode) {
    const url = `${this.baseUrl}urlupload/status?key=${this.apiKey}&file_code=${fileCode}`;
    return await this._req(url);
  }
  async remoteUploadSlots() {
    const url = `${this.baseUrl}urlupload/slots?key=${this.apiKey}`;
    return await this._req(url);
  }
  async remoteUploadAction(restartErrors, clearErrors = null, clearAll = null, deleteCode = null) {
    let url = `${this.baseUrl}urlupload/actions?key=${this.apiKey}&restart_errors=${restartErrors}`;
    return null !== clearErrors && (url += `&clear_errors=${clearErrors}`), null !== clearAll && (url += `&clear_all=${clearAll}`),
      null !== deleteCode && (url += `&delete_code=${deleteCode}`), await this._req(url);
  }
  async createFolder(name, parentId = null) {
    let url = `${this.baseUrl}folder/create?key=${this.apiKey}&name=${name}`;
    return null !== parentId && (url += `&parent_id=${parentId}`), await this._req(url);
  }
  async renameFolder(fldId, name) {
    const url = `${this.baseUrl}folder/rename?key=${this.apiKey}&fld_id=${fldId}&name=${name}`;
    return await this._req(url);
  }
  async listFiles(page = null, perPage = null, fldId = null) {
    let url = `${this.baseUrl}file/list?key=${this.apiKey}`;
    return null !== page && (url += `&page=${page}`), null !== perPage && (url += `&per_page=${perPage}`),
      null !== fldId && (url += `&fld_id=${fldId}`), await this._req(url);
  }
  async fileStatus(fileCode) {
    const url = `${this.baseUrl}file/check?key=${this.apiKey}&file_code=${fileCode}`;
    return await this._req(url);
  }
  async fileInfo(fileCode) {
    const url = `${this.baseUrl}file/info?key=${this.apiKey}&file_code=${fileCode}`;
    return await this._req(url);
  }
  async fileImage(fileCode) {
    const url = `${this.baseUrl}file/image?key=${this.apiKey}&file_code=${fileCode}`;
    return await this._req(url);
  }
  async fileRename(fileCode, title) {
    const url = `${this.baseUrl}file/rename?key=${this.apiKey}&file_code=${fileCode}&title=${title}`;
    return await this._req(url);
  }
  async fileSearch(searchTerm) {
    const url = `${this.baseUrl}search/videos?key=${this.apiKey}&search_term=${searchTerm}`;
    return await this._req(url);
  }
}
export default DoodStream;