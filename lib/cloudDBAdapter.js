import got from "got";
const stringify = obj => JSON.stringify(obj, null, 2),
  parse = str => JSON.parse(str, (_, v) => null !== v && "object" == typeof v && "type" in v && "Buffer" === v.type && "data" in v && Array.isArray(v.data) ? Buffer.from(v.data) : v);
export const cloudDBAdapter = class {
  constructor(url, {
    serialize = stringify,
    deserialize = parse,
    fetchOptions = {}
  } = {}) {
    this.url = url, this.serialize = serialize, this.deserialize = deserialize, this.fetchOptions = fetchOptions;
  }
  async read() {
    try {
      let res = await got(this.url, {
        method: "GET",
        headers: {
          Accept: "application/json;q=0.9,text/plain"
        },
        ...this.fetchOptions
      });
      if (200 !== res.statusCode) throw res.statusMessage;
      return this.deserialize(res.body);
    } catch (e) {
      return null;
    }
  }
  async write(obj) {
    let res = await got(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      ...this.fetchOptions,
      body: this.serialize(obj)
    });
    if (200 !== res.statusCode) throw res.statusMessage;
    return res.body;
  }
};