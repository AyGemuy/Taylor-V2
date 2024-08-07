import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["videotogif", "giftovideo", "optijpeg"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.ezgif search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("videotogif" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .ezgif videotogif|link");
      try {
        let item = await VideoToGif(inputs),
          cap = `🔍 [ RESULT ]\n\n📁 *fileSize:* ${item.fileSize}\n📏 *width:* ${item.width}\n📐 *height:* ${item.height}\n🖼️ *frames:* ${item.frames}\n📄 *fileType:* ${item.fileType}\n\n ${item.outputImageUrl}\n`,
          urlgif = item.outputImageUrl;
        await conn.sendMessage(m.chat, {
          video: {
            url: urlgif
          },
          gifPlayback: !0,
          gifAttribution: ~~(2 * Math.random()),
          caption: cap
        }, {
          quoted: m
        });
      } catch (e) {
        m.react(eror);
      }
    }
    if ("giftovideo" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .ezgif videotogif|link");
      try {
        let item = await GifToVideo(inputs),
          cap = `🔍 [ RESULT ]\n\n📁 *fileSize:* ${item.fileSize}\n ${item.outputImageUrl}\n`,
          urlgif = item.outputImageUrl;
        await conn.sendMessage(m.chat, {
          video: {
            url: urlgif
          },
          caption: cap
        }, {
          quoted: m
        });
      } catch (e) {
        m.react(eror);
      }
    }
    if ("optijpeg" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .ezgif videotogif|link");
      try {
        let item = await OptiJpeg(inputs, inputs_, inputs__),
          cap = `🔍 [ RESULT ]\n\n📁 *fileSize:* ${item.fileSize}\n ${item.outputImageUrl}\n`,
          urlgif = item.outputImageUrl;
        await conn.sendMessage(m.chat, {
          image: {
            url: urlgif
          },
          caption: cap
        }, {
          quoted: m
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["ezgif"], handler.tags = ["internet"], handler.command = /^(ezgif)$/i;
export default handler;
async function VideoToGif(video_url) {
  const response = await fetch("https://ezgif.com/video-to-gif?url=" + video_url),
    html = await response.text(),
    $ = cheerio.load(html),
    data = new URLSearchParams({
      file: $('input[name="file"]').val(),
      start: $("#start").val(),
      end: $("#end").val(),
      size: $("#size").val(),
      fps: $("#fps").val(),
      method: $("#method").val(),
      diff: $('input[name="diff"]').prop("checked") ? "on" : ""
    }),
    postResponse = await fetch($("form.ajax-form").attr("action"), {
      method: "POST",
      body: data
    }),
    postHtml = await postResponse.text(),
    $$ = cheerio.load(postHtml);
  return {
    outputImageUrl: "https:" + $$("#output .outfile img").attr("src"),
    fileSize: $$("#output .filestats strong").text(),
    width: $$("#output .filestats").text().match(/width: (\d+)/)[1],
    height: $$("#output .filestats").text().match(/height: (\d+)/)[1],
    frames: $$("#output .filestats").text().match(/frames: (\d+)/)[1],
    fileType: $$("#output .filestats").text().match(/type: (\w+)/)[1]
  };
}
async function GifToVideo(video_url) {
  const response = await fetch("https://ezgif.com/gif-to-mp4?url=" + video_url),
    html = await response.text(),
    form = cheerio.load(html)("form.form"),
    action = form.attr("action"),
    file = form.find('input[name="file"]').val(),
    data = new URLSearchParams({
      file: file
    }),
    postResponse = await fetch("https://ezgif.com" + action, {
      method: "POST",
      body: data
    }),
    postHtml = await postResponse.text(),
    $$ = cheerio.load(postHtml),
    outfileHtml = $$("#output .outfile").html(),
    filestatsText = $$("#output .filestats").text();
  return {
    outputImageUrl: "https:" + outfileHtml.match(/src="([^"]+)"/)[1],
    fileSize: filestatsText.match(/File size: ([^,]+)/)[1].trim()
  };
}
async function OptiJpeg(video_url, percent, sizes) {
  const response = await fetch("https://ezgif.com/optijpeg?url=" + video_url),
    html = await response.text(),
    form = cheerio.load(html)(".ajax-form"),
    action = form.attr("action"),
    fileValue = form.find('input[type="hidden"][name="file"]').val(),
    losslessChecked = form.find('input[name="lossless"]').prop("checked"),
    toKBChecked = form.find('input[name="tokb"]').prop("checked"),
    toKBCustomValue = form.find('input[name="tokb_custom_value"]').val(),
    toPercentChecked = form.find('input[name="topercent"]').prop("checked"),
    percentageValue = form.find('input[name="percentage"]').val(),
    formData = new FormData();
  formData.append("file", fileValue), formData.append("lossless", losslessChecked ? "on" : "off"),
    formData.append("tokb", toKBChecked ? "on" : "off"), formData.append("tokb_custom_value", sizes || toKBCustomValue),
    formData.append("topercent", toPercentChecked ? "on" : "off"), formData.append("percentage", percent || percentageValue);
  const requestOptions = {
      method: "POST",
      body: formData
    },
    postResponse = await fetch(action, requestOptions),
    postHtml = await postResponse.text(),
    $$ = cheerio.load(postHtml),
    outfileHtml = $$("#output .outfile").html(),
    filestatsText = $$("#output .filestats").text();
  return {
    outputImageUrl: "https:" + outfileHtml.match(/src="([^"]+)"/)[1],
    fileSize: filestatsText.match(/File size: ([^,]+)/)[1].trim()
  };
}