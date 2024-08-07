import jsbeautify from "js-beautify";
const {
  js,
  css,
  html,
  js_beautify,
  css_beautify,
  html_beautify
} = jsbeautify, handler = async (m, {
  args,
  command,
  usedPrefix
}) => {
  const usage = "*Example:*\n" + usedPrefix + command + " (Input text or reply text to enc code)";
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) return m.reply(usage);
    text = m.quoted?.text;
  }
  if ("beautyjs" === command) try {
    const beautifulJS = js(text);
    m.reply(beautifulJS);
  } catch (e) {
    try {
      const beautifulJS = js_beautify(text);
      m.reply(beautifulJS);
    } catch (e) {
      m.react(eror);
    }
  }
  if ("beautycss" === command) try {
    const beautifulCSS = css(text);
    m.reply(beautifulCSS);
  } catch (e) {
    try {
      const beautifulCSS = css_beautify(text);
      m.reply(beautifulCSS);
    } catch (e) {
      m.react(eror);
    }
  }
  if ("beautyhtml" === command) try {
    const beautifulHTML = html(text);
    m.reply(beautifulHTML);
  } catch (e) {
    try {
      const beautifulHTML = html_beautify(text);
      m.reply(beautifulHTML);
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["beauty *[js/css/html]*"], handler.tags = ["tools"], handler.command = /^beauty(js|css|html)$/i;
export default handler;