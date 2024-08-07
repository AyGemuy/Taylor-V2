import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  const domainConfig = [{
      zone: "57d742aa0cc2d83f18015d2c5d38dffa",
      apitoken: "yXX-1vM1JaJXgEiBuozDvEJxUtuSu-VEhoN0h7Kt",
      tld: "rzlmodz.biz.id"
    }, {
      zone: "bc676ed94040800b77b4ede30822138c",
      apitoken: "yXX-1vM1JaJXgEiBuozDvEJxUtuSu-VEhoN0h7Kt",
      tld: "rzlmodz.art"
    }, {
      zone: "ba86d80050aa5a2343a8e456c85c32f0",
      apitoken: "vvAcoh_BQOZ1u-jb7ORkH1YZDXOEoiA7dBovCcCs",
      tld: "kangpannel.xyz"
    }, {
      zone: "e03420325af30aaed049cbcc4c3381ed",
      apitoken: "SoEzG_hcx8trsYCG-YoxD3U3Tw6eKTbUxDZnokLn",
      tld: "rzlmodz.com"
    }, {
      zone: "92fffa5f2cce4005a30e3950620cb97d",
      apitoken: "DXKGBd9zzFMsQjCirVRqO8nwE06imW8KyGpOqnwC",
      tld: "rzlmodz.site"
    }, {
      zone: "6e54db622bb8682bdf42316953b5401d",
      apitoken: "OwvvvI_MTLmsl2O5NnlzvPOfJfkNJlU2IAwA3wGH",
      tld: "rzlmodz.xyz"
    }, {
      zone: "fbb7300781a84b11d6db8767d59c",
      apitoken: "jS5iwULl-Yr5H7miIYWhWVkF-4j5p1RzjwjyN",
      tld: "panellku.art"
    }, {
      zone: "4dab40fe5183e4c6bd7b9fd87582803c",
      apitoken: "95QUM8iFtLPZA-CgZplgvg19LhY-_QwxYdFNdotp",
      tld: "mypanel.biz.id"
    }, {
      zone: "c8a876bc10af3ce5ab11f2209121cf63",
      apitoken: "O8uR00EP6u4Rp9TtmwCSASwfkEHAIaNw2DVmIgAD",
      tld: "panellku.com"
    }, {
      zone: "b268933cdea4ffd662bc56dd84e46e21",
      apitoken: "v80Y6QMWDamHAg-u18z8IEMBp1kpodn_lZkyduJ8",
      tld: "panellku.biz.id"
    }, {
      zone: "512f917ecb9e0d4eb0085458fdcc95ee",
      apitoken: "a4hizwK6UjIi8MBEscAOVNG-njTDfJejAhOJlOFh",
      tld: "panellku.me"
    }, {
      zone: "a6c9cf9cd38077e52db6874200c5c0c4",
      apitoken: "DyQW84WhtZwTfWZCanO-MQNd6gglRwDHOmK8KRF2",
      tld: "5panellku.my.id"
    }, {
      zone: "d41a17e101c0f89f0aec609c31137f91",
      apitoken: "fjYUs5uWqoZBU-4fCfqiqXHXhdRRrr2Lc2GZ0dOj",
      tld: "sellerpannel.my.id"
    }, {
      zone: "edf8e5a66859e6a1f8ccbde07c415082",
      apitoken: "p0gm6UzsPw0Y0eudhfDr1ZBvV_WjX9eMpTp4ksXZ",
      tld: "didindev.my.id"
    }, {
      zone: "b263ae8b1bb47329a24aa3898de4f0b4",
      apitoken: "A4E0OuHCDuUy09QCENX2t6suDS5EIIi3urJO101r",
      tld: "didinsec.biz.id"
    }, {
      zone: "ab732313828957ac4dfa9dd05ecdbea4",
      apitoken: "wLoUr4uAAk_l2zOW03A_ePS0ishGEeLCjZrIXCdC",
      tld: "jasa-panel.my.id"
    }],
    contoh = "contoh: *.domain 1|host|ip*\n\nList:\n" + domainConfig.map((v, index) => ++index + ". " + v.tld).join("\n");
  if (!text) return m.reply(contoh);
  const parts = text.split("|");
  if (parts.length < 3) return m.reply(contoh);
  const part0 = parseInt(parts[0]),
    part1 = parts[1].trim(),
    part2 = parts[2].trim();
  if (isNaN(part0) || part0 < 1 || part0 > domainConfig.length) return m.reply("Invalid index. Please provide a valid number between 1 and " + domainConfig.length);
  const config = domainConfig[part0 - 1];
  if (!part1 || !part2) return m.reply("Please provide a valid host and ip");
  try {
    return await createSubDomain(config.zone, config.apitoken, config.tld, part1, part2);
  } catch (error) {
    throw error;
  }
};
handler.help = ["domain"], handler.tags = ["tools"], handler.command = ["domain"];
export default handler;
async function createSubDomain(zone, apitoken, tld, host, ip) {
  const headers = {
      Authorization: "Bearer " + apitoken,
      "Content-Type": "application/json"
    },
    data = {
      type: "A",
      name: `${host.replace(/[^a-z0-9.-]/gi, "")}.${tld}`,
      content: ip.replace(/[^0-9.]/gi, ""),
      ttl: 3600,
      priority: 10,
      proxied: !0
    },
    response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });
  return await response.json();
}