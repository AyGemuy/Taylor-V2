import axios from "axios";
import {
  createHash
} from "node:crypto";

function md5(content, algo = "md5") {
  const hashFunc = createHash(algo);
  return hashFunc.update(content), hashFunc.digest("hex");
}
var userid = "4IBPmfPZ",
  apikey = "9WMugYrv57cppyyEAZmb0LVXcWagTjr6YGbFqBZd1WeHDq1tTxKLwc2R2t0l36GA",
  sign = md5(`${userid}${apikey}`),
  headers = {
    "user-agent": "FrierenDv NodeJS(18.1x)"
  },
  api = {
    prepaid: "https://ampangpedia.com/api/prepaid",
    social_media: "https://ampangpedia.com/api/social-media"
  };
async function profile() {
  let Response = {};
  const {
    data
  } = await axios.request({
    url: "https://ampangpedia.com/api/profile",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    },
    data: new URLSearchParams({
      key: apikey,
      sign: sign
    })
  }).catch(e => null == e ? void 0 : e.response);
  if (data.result && data.data) Object.assign(Response, {
    ...data
  });
  else {
    if ("object" != typeof data) return data;
    Object.assign(Response, {
      ...data
    });
  }
  return Response;
}
async function watch(trxid) {
  let Response, retry = 0;
  for (;;) {
    const {
      data
    } = await axios.request({
      url: api.prepaid,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers
      },
      data: new URLSearchParams({
        key: apikey,
        sign: sign,
        type: "status",
        trxid: trxid
      })
    }).catch(e => null == e ? void 0 : e.response);
    if (data.result) {
      const {
        status
      } = Array.isArray(data.data) ? data.data[0] : data.data;
      if ("success" === status) {
        Response = data;
        break;
      }
      if ("error" === status) {
        Response = data;
        break;
      }
    } else if (retry += 1, retry >= 20) {
      Response = !!data.data && data.data;
      break;
    }
  }
  return Response;
}
async function post(api, opts) {
  const {
    data
  } = await axios.request({
    url: api,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    },
    data: new URLSearchParams({
      key: apikey,
      sign: sign,
      ...opts
    })
  }).catch(e => null == e ? void 0 : e.response);
  return data && "object" == typeof data ? {
    ...data
  } : data;
}
async function prepaid() {
  return {
    order: async (service, id, server) => service && id ? post(api.prepaid, {
      type: "order",
      service: service,
      data_no: `${id}${server || ""}`
    }) : {
      status: !1,
      messagge: "Missing " + (service ? "data_no" : "service code")
    },
    status: async (trxid, limit) => post(api.prepaid, {
      type: "status",
      trxid: trxid || "",
      limit: "number" == typeof limit ? limit : ""
    }),
    services: async (filter_type, filter_value) => post(api.prepaid, {
      type: "services",
      filter_type: filter_type || "",
      filter_value: filter_value || ""
    })
  };
}
async function media() {
  return {
    order: async (service, id, server) => service && data_no ? post(api.social_media, {
      type: "order",
      service: service,
      data_no: `${id}${server || ""}`
    }) : {
      status: !1,
      messagge: "Missing " + (service ? "data_no" : "service code")
    },
    status: async (trxid, limit) => post(api.social_media, {
      type: "status",
      trxid: trxid || "",
      limit: limit || ""
    }),
    services: async (filter_type, filter_value) => post(api.social_media, {
      type: "services",
      filter_type: filter_type || "",
      filter_value: filter_value || ""
    })
  };
}
export {
  profile,
  watch,
  prepaid,
  post,
  media
};