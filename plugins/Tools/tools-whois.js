import {
  default as ipRegex
} from "ip-regex";
import fetch from "node-fetch";
const handler = async (m, {
  text
}) => {
  try {
    if (!text) throw new Error("Input IP address format.");
    const IP = text;
    if (!isValidIP(IP)) throw new Error("Invalid IP address format.");
    const ipUrls = [`http://ip-api.com/json/${IP}?lang=id-ID`, `http://ipwho.is/${IP}?lang=id-ID`, `https://api.ipdata.co/${IP}?api-key=c6d4d04d5f11f2cd0839ee03c47c58621d74e361c945b5c1b4f668f3`, `https://ipinfo.io/${IP}/json?token=41c48b54f6d78f`, `https://api.ipgeolocation.io/ipgeo?apiKey=105fc2c7e8864ec08b98e1ad4e8cbc6d&ip=${IP}`, `https://ipapi.co/${IP}/json`, `https://sp1.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=${IP}&resource_id=5809`],
      result = await getData(ipUrls);
    m.reply(JSON.stringify(result, null, 4));
  } catch (error) {
    console.error("Error:", error.message), m.reply("An error occurred while processing your request.");
  }
};
handler.help = ["whois"], handler.tags = ["tools"], handler.command = /^(whois)$/i;
export default handler;
const isValidIP = ip => ipRegex({
    exact: !0
  }).test(ip),
  fetchData = async url => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
    } catch (error) {
      return console.error("Fetch operation error:", error.message), null;
    }
  }, getData = async urls => {
    try {
      const validResults = (await Promise.all(urls.map(url => fetchData(url)))).filter(result => null !== result);
      return Object.assign({}, ...validResults);
    } catch (error) {
      return console.error("Error combining data:", error.message), null;
    }
  };