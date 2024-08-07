import cheerio from "cheerio";
import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) {
    return m.reply(`🔍 *Masukkan query Anda!* 
Contoh: \`${usedPrefix + command} masak\` 

*Jika Anda ingin mencari pekerjaan atau detail lowongan, gunakan format berikut:* 
- Untuk detail lowongan: \`https://www.jobstreet.co.id/id/job/77475250\` 
- Untuk pencarian pekerjaan: \`masak\``);
  }
  m.react(wait);
  try {
    const pattern = /^https:\/\/www\.jobstreet\.co\.id\/id\/job\/\d+$/;
    text = normalizeJobUrl(text);
    if (pattern.test(text)) {
      const details = await getJobDetails(text);
      const output = createJobDetailsMessage(details);
      const info = output || "Tidak ada hasil yang ditemukan.";
      details.logoUrl ? await conn.sendFile(m.chat, details.logoUrl, "logo.jpg", info, m) : m.reply(info);
    } else {
      const results = await searchJobs(text);
      const resultsText = createJobResultsMessage(results);
      m.reply(resultsText || "Tidak ada hasil yang ditemukan.");
    }
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["infoloker"];
handler.tags = ["internet"];
handler.command = /^(infoloker)$/i;
export default handler;

function normalizeJobUrl(url) {
  const match = url.match(/^https:\/\/www\.jobstreet\.co\.id\/id\/job\/\d+/);
  return match ? match[0] : url;
}
async function searchJobs(query) {
  const url = `https://www.jobstreet.co.id/id/job-search/${query}-jobs/`;
  try {
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);
    return $("article").map((_, article) => {
      const $article = $(article);
      return {
        title: $article.find("h3 a").text().trim() || "Tidak diketahui",
        company: $article.find("span:contains('di')").next("a").text().trim() || "Tidak diketahui",
        location: $article.find("span[data-automation='jobCardLocation']").map((_, el) => $(el).text().trim()).get().join(", ") || "Tidak diketahui",
        detailLink: new URL($article.find("h3 a").attr("href"), url).href || "Tidak diketahui",
        uploadDate: $article.find("span[data-automation='jobListingDate']").text().trim() || "Tidak diketahui",
        salary: $article.find("span[data-automation='jobSalary']").text().trim() || "Tidak diketahui",
        jobType: $article.find("p:contains('Full time')").text().trim() || "Tidak diketahui",
        classification: $article.find("span:contains('classification:')").next("a").text().trim() || "Tidak diketahui",
        subClassification: $article.find("span:contains('subClassification:')").next("a").text().trim() || "Tidak diketahui",
        companyLogo: $article.find("img._1a0uxm90").attr("src") || "Tidak diketahui"
      };
    }).get();
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return [];
  }
}
async function getJobDetails(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const scriptContent = $('script[data-automation="server-state"]').html();
    const jsonObjects = extractJSON(_.split(_.split(scriptContent, "window.SEEK_REDUX_DATA")[1], "window.SEEK_APP_CONFIG")[0]);
    return _.reduce(jsonObjects, (acc, obj) => {
      switch (obj.__typename) {
        case "JobTrackingClassificationInfo":
          acc.classification = obj.classification;
          acc.subClassification = obj.subClassification;
          break;
        case "JobTrackingLocationInfo":
          acc.location = obj.location;
          break;
        case "SeekDateTime":
          if (!acc.dateTimeUtc) acc.dateTimeUtc = obj.dateTimeUtc;
          break;
        case "JobSalary":
          acc.salary = obj.label;
          break;
        case "JobWorkTypes":
          acc.workType = obj.label;
          break;
        case "Advertiser":
          acc.company = obj.name;
          break;
        case "LocationInfo":
          acc.locationLabel = obj.label;
          break;
        case "ClassificationInfo":
          acc.classificationLabel = obj.label;
          break;
        case "JobProductBrandingImage":
          acc.imageUrls = _.concat(acc.imageUrls || [], obj.url);
          break;
        case "JobQuestionnaire":
          acc.questions = obj.questions;
          break;
        case "Branding":
          acc.logoUrl = obj.logo;
          break;
        case "Description":
          acc.paragraphs = obj.paragraphs;
          break;
        case "CompanySize":
          acc.companySize = obj.description;
          break;
        case "Website":
          acc.website = obj.url;
          break;
        case "PerkAndBenefit":
          acc.perks = _.concat(acc.perks || [], obj.title);
          break;
        case "GFJLocation":
          acc.country = obj.country;
          acc.state = obj.state;
          break;
        case "GFJWorkTypes":
          acc.workTypes = obj.label;
          break;
        default:
          if (obj.title && obj.landingPage) acc.title = obj.title;
      }
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    return {};
  }
}

function extractJSON(str) {
  const regex = /{(?:[^{}]|(R))*}/g;
  const matches = str.match(regex) || [];
  return matches.map(match => {
    try {
      return JSON.parse(match);
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
}

function createJobDetailsMessage(details) {
  return `*\`Informasi lowongan\`*\n\n` + `📰 *Title:* ${details.title ?? ""}\n` + `🏢 *Perusahaan:* ${details.company ?? ""}\n` + `📍 *Daerah:* ${details.location ?? details.locationLabel ?? ""}\n` + `🏷 *Klasifikasi:* ${details.classification ?? ""}\n` + `🏷 *Sub-Klasifikasi:* ${details.subClassification ?? ""}\n` + `⏰ *Tanggal:* ${details.dateTimeUtc ?? ""}\n` + `💵 *Gaji:* ${details.salary ?? ""}\n` + `🕒 *Tipe Pekerjaan:* ${details.workType ?? ""}\n` + `🏷 *Label Klasifikasi:* ${details.classificationLabel ?? ""}\n` + `🖼 *URL Gambar:* ${details.imageUrls?.join(", ") ?? ""}\n` + `🖼 *URL Logo:* ${details.logoUrl ?? ""}\n` + `📄 *Deskripsi:* ${details.paragraphs?.join("\n") ?? ""}\n` + `🏢 *Ukuran Perusahaan:* ${details.companySize ?? ""}\n` + `🌐 *Website:* ${details.website ?? ""}\n` + `🎁 *Keuntungan:* ${details.perks?.join(", ") ?? ""}\n` + `🌍 *Negara:* ${details.country ?? ""}\n` + `🏞 *Provinsi:* ${details.state ?? ""}\n` + `🕒 *Tipe Pekerjaan:* ${details.workTypes?.join(", ") ?? ""}\n` + `❓ *Pertanyaan:* ${details.questions?.join("\n") ?? ""}\n`;
}

function createJobResultsMessage(results) {
  return results?.map((item, index) => `*\`Hasil ${index + 1}\`*\n\n` + `📰 *Title:* ${item.title}\n` + `🏢 *Perusahaan:* ${item.company}\n` + `📍 *Daerah:* ${item.location}\n` + `🔗 *Link Detail:* ${item.detailLink}\n` + `📅 *Upload:* ${item.uploadDate}\n` + `💰 *Gaji:* ${item.salary}\n` + `📝 *Jenis Pekerjaan:* ${item.jobType}\n` + `📊 *Klasifikasi:* ${item.classification}\n` + `🔎 *Sub Klasifikasi:* ${item.subClassification}\n` + `${item.companyLogo ? `🖼️ *Logo Perusahaan:* ${item.companyLogo}` : ""}`).join("\n________________________\n") || "Tidak ada hasil yang ditemukan.";
}