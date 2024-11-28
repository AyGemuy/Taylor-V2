import fetch from "node-fetch";
import * as cheerio from "cheerio";
const fetchDomainDetails = async (url, domains) => {
  try {
    const requests = domains.map((domain) =>
      fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          domains: domain,
        }),
      }).then((response) => response.text()),
    );
    const responses = await Promise.all(requests);
    const results = responses.map((body) => {
      const $ = cheerio.load(body);
      return {
        totalLines: $("#totalLines").text() || "",
        domains: $("#resultsTable tbody tr")
          .map((i, el) => ({
            domain: $(el).find("td").eq(0).text() || "",
            status: $(el).find("td").eq(1).text() || "",
          }))
          .get(),
      };
    });
    const combinedResults = results.flatMap((result) => result.domains);
    return {
      totalLines: results.map((result) => result.totalLines).join(", "),
      domains: combinedResults,
    };
  } catch (error) {
    console.error("Error fetching domain details:", error);
    return null;
  }
};
const handler = async (m, { args, usedPrefix, command }) => {
  try {
    if (!args.length)
      throw `Contoh: ${usedPrefix + command} nekopoi.care example.com`;
    const domains = args.map(
      (arg) => new URL(arg.startsWith("http") ? arg : `http://${arg}`).hostname,
    );
    const data = await fetchDomainDetails(
      "https://nawalacheck.skiddle.id/check",
      domains,
    );
    if (data) {
      const message = data.domains
        .map((v) => `🌐 *Domain:* ${v.domain}\n🛡️ *Status:* ${v.status}`)
        .join("\n\n");
      m.reply(message);
    } else {
      m.reply("Tidak ada data yang ditemukan.");
    }
  } catch (error) {
    m.reply(error);
  }
};
handler.command = /^web(check|cek)|(check|cek)web$/i;
export default handler;
