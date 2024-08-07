import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  args
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input Teks";
    text = m.quoted?.text;
  }
  if (m.react(wait), "digicollget" === command) {
    let outs = await getData(text),
      output = Object.entries(outs).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join("\n");
    m.reply(output);
  } else {
    let outs = await searchData(text);
    const teks = outs.map((v, index) => `*[ ${index + 1} ]*\n*title:* ${v.title}\n*shelfmark:* ${v.shelfmark}\n*published:* ${v.published}\n*href:* ${v.href}\n*thumbnailUrl:* ${v.thumbnailUrl}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    await conn.sendFile(m.chat, outs[0]?.thumbnailUrl, "", teks, m);
  }
};
handler.help = ["digicoll query"], handler.tags = ["internet"], handler.command = /^(digicoll|digicollget)$/i;
export default handler;
async function searchData(query) {
  const url = "https://digitalcollections.universiteitleiden.nl";
  try {
    const response = await fetch(`${url}/search/${query}?type=edismax`),
      html = await response.text(),
      $ = cheerio.load(html),
      results = [];
    return $("tr.islandora-solr-search-result").each((index, element) => {
      const $element = $(element),
        item = {
          thumbnailUrl: $element.find("img").attr("data-src"),
          title: $element.find("dd.solr-value a").text().trim(),
          href: `${url}${$element.find("dd.solr-value a").attr("href")}`,
          shelfmark: $element.find("dd.mods-relateditem-otherformat-identifier-ms").text().trim(),
          published: $element.find("dd.mods-relateditem-otherformat-origininfo-publisher-ms").text().trim()
        };
      results.push(item);
    }), results;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getData(query) {
  try {
    const response = await fetch(query),
      data = await response.text(),
      $ = cheerio.load(data),
      downloadLinks = $(".dc-sidebox-right .item-list ul.dc-detail-tools li").map((index, element) => {
        const linkElement = $(element).find("a"),
          linkText = linkElement.attr("href");
        return {
          title: linkElement.attr("title"),
          link: linkText
        };
      }).get(),
      persistentUrl = $(".dc-metadata .mods_identifier_hdl_ms a").attr("href"),
      title = $(".dc-metadata .mods_titleInfo_title_custom_ms td").text().trim(),
      persistentUrlMetadata = $(".islandora-metadata .mods_identifier_hdl_ms p a").attr("href"),
      extent = $(".islandora-metadata .mods_physicalDescription_extent_ms td").text().trim(),
      subtitle = $(".islandora-metadata .mods_titleInfo_subTitle_ms td").text().trim(),
      creator = $(".islandora-metadata .mods_name_namePart_custom_ms td").text().trim(),
      shelfmark = $(".islandora-metadata .mods_relatedItem_otherFormat_identifier_ms td").text().trim(),
      geographicSubject = $(".islandora-metadata .mods_subject_geographic_ms td").text().trim(),
      note = $(".islandora-metadata .mods_note_ms td").text().trim(),
      language = $(".islandora-metadata .mods_language_languageTerm_text_authority_iso639-2b_ms td").text().trim(),
      country = $(".islandora-metadata .mods_originInfo_place_placeTerm_text_authority_marccountry_ms td").text().trim(),
      published = $(".islandora-metadata .mods_relatedItem_otherFormat_originInfo_publisher_ms td").text().trim(),
      digitalPublished = $(".islandora-metadata .mods_originInfo_publisher_ms td").text().trim();
    return {
      downloadLinks: "https://digitalcollections.universiteitleiden.nl" + downloadLinks[0]?.link,
      persistentUrl: persistentUrl,
      title: title,
      persistentUrl: persistentUrlMetadata,
      extent: extent,
      subtitle: subtitle,
      creator: creator,
      shelfmark: shelfmark,
      geographicSubject: geographicSubject,
      note: note,
      language: language,
      country: country,
      published: published,
      digitalPublished: digitalPublished
    };
  } catch (error) {
    console.error("Error:", error);
  }
}