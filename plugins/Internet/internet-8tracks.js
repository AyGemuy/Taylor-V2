import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["users", "artists", "mixes", "self", "collections", "play"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.8tracks self|hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("users" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello");
      m.react(wait);
      try {
        let item = await search8Tracks(inputs, "users"),
          teks = `🔍 *[ RESULT ]*\n\n🔗 *Name:* ${item.mix_set.name || "Tidak diketahui"}\n📝 *Path:* ${item.mix_set.path || "Tidak diketahui"}\n👨‍💻 *Collection:* ${item.sponsored_collection.path || "Tidak diketahui"}\n📅 *Description:* ${cleanText(item.sponsored_collection.description) || "Tidak diketahui"}\n\n*MIX:*\n${item.sponsored_collection.mixes.map((v, index) => "*ID:* " + v.id + "\n*NAME:* " + v.name).filter(v => v).join("\n") || "Tidak diketahui"}\n`;
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("artists" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello");
      m.react(wait);
      try {
        let item = await search8Tracks(inputs, "artists"),
          teks = `🔍 *[ RESULT ]*\n\n🔗 *Name:* ${item.mix_set.name || "Tidak diketahui"}\n📝 *Path:* ${item.mix_set.path || "Tidak diketahui"}\n👨‍💻 *Collection:* ${item.sponsored_collection.path || "Tidak diketahui"}\n📅 *Description:* ${cleanText(item.sponsored_collection.description) || "Tidak diketahui"}\n\n*MIX:*\n${item.sponsored_collection.mixes.map((v, index) => "*ID:* " + v.id + "\n*NAME:* " + v.name).filter(v => v).join("\n") || "Tidak diketahui"}\n`;
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("mixes" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello");
      m.react(wait);
      try {
        let item = await search8Tracks(inputs, "mixes"),
          teks = `🔍 *[ RESULT ]*\n\n🔗 *Name:* ${item.mix_set.name || "Tidak diketahui"}\n📝 *Path:* ${item.mix_set.path || "Tidak diketahui"}\n👨‍💻 *Collection:* ${item.sponsored_collection.path || "Tidak diketahui"}\n📅 *Description:* ${cleanText(item.sponsored_collection.description) || "Tidak diketahui"}\n\n*MIX:*\n${item.sponsored_collection.mixes.map((v, index) => "*ID:* " + v.id + "\n*NAME:* " + v.name).filter(v => v).join("\n") || "Tidak diketahui"}\n`;
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("self" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello");
      m.react(wait);
      try {
        let item = await search8Tracks(inputs, "self"),
          teks = `🔍 *[ RESULT ]*\n\n🔗 *Name:* ${item.mix_set.name || "Tidak diketahui"}\n📝 *Path:* ${item.mix_set.path || "Tidak diketahui"}\n👨‍💻 *Collection:* ${item.sponsored_collection.path || "Tidak diketahui"}\n📅 *Description:* ${cleanText(item.sponsored_collection.description) || "Tidak diketahui"}\n\n*MIX:*\n${item.sponsored_collection.mixes.map((v, index) => "*ID:* " + v.id + "\n*NAME:* " + v.name).filter(v => v).join("\n") || "Tidak diketahui"}\n`;
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("collections" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello");
      m.react(wait);
      try {
        let item = await search8Tracks(inputs, "collections"),
          teks = `🔍 *[ RESULT ]*\n\n🔗 *Name:* ${item.mix_set.name || "Tidak diketahui"}\n📝 *Path:* ${item.mix_set.path || "Tidak diketahui"}\n👨‍💻 *Collection:* ${item.sponsored_collection.path || "Tidak diketahui"}\n📅 *Description:* ${cleanText(item.sponsored_collection.description) || "Tidak diketahui"}\n\n*MIX:*\n${item.sponsored_collection.mixes.map((v, index) => "*ID:* " + v.id + "\n*NAME:* " + v.name).filter(v => v).join("\n") || "Tidak diketahui"}\n`;
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("play" === feature) {
      if (!isNumberOnly(inputs)) return m.reply("Input query link\nExample: .8tracks self|hello");
      m.react(wait);
      try {
        let item = await play8Tracks(inputs),
          teks = `🔍 *[ RESULT ]*\n\n🔗 *Name:* ${item.set.track.name || "Tidak diketahui"}\n📝 *Performer:* ${item.set.track.performer || "Tidak diketahui"}\n👨‍💻 *ID:* ${item.set.track.id || "Tidak diketahui"}\n📅 *URL:* ${item.set.track.url || "Tidak diketahui"}\n`;
        m.reply(teks), await conn.sendFile(m.chat, item.set.track.track_file_stream_url || logo, item.set.track.name || "Tidak diketahui", "", m, !1, {
          asDocument: !0
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["8tracks"], handler.tags = ["internet"], handler.command = /^(8tracks)$/i;
export default handler;

function cleanText(html) {
  return html.replace(/<[^>]+>/g, "");
}

function isNumberOnly(input) {
  return /^\d+$/.test(input);
}
async function search8Tracks(term, endpoint) {
  const url = `http://8tracks.com/search/${term}/${endpoint}?format=jsonh`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}
async function play8Tracks(term) {
  const additionalEndpoint = `sets/${term}/play?player=sm&mix_id=${term}&format=jsonh`;
  try {
    const response = await fetch(`http://8tracks.com/${additionalEndpoint}`);
    return await response.json();
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}