import {
  fetch
} from "undici";
import FakeUserAgent from "fake-useragent";
async function query(url, ...opt) {
  const payload = {
    url: url,
    v_codec: "h264",
    v_quality: "1080",
    a_format: "best",
    is_no_ttwatermark: !0,
    ...opt
  };
  try {
    const {
      status,
      url: responseUrl,
      picker,
      text
    } = await (await fetch("https://co.wuk.sh/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": FakeUserAgent()
      },
      body: JSON.stringify(payload)
    })).json();
    switch (status) {
      case "Stream":
      case "Redirect":
        return [responseUrl];
      case "Picker":
        return picker.map(({
          url
        }) => url);
      case "Success":
      case "Error":
      case "RateLimit":
        throw text;
      default:
        throw "Unexpected status";
    }
  } catch (error) {
    throw error.toString();
  }
}
export {
  query
};