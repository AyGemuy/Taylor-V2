import fetch from "node-fetch";
const endpoints = {
  eightball: "https://api.popcat.xyz/8ball",
  ad: "https://api.popcat.xyz/ad",
  alert: "https://api.popcat.xyz/alert",
  biden: "https://api.popcat.xyz/biden",
  popblur: "https://api.popcat.xyz/blur",
  car: "https://api.popcat.xyz/car",
  caution: "https://api.popcat.xyz/caution",
  chatbot: "https://api.popcat.xyz/chatbot",
  clown: "https://api.popcat.xyz/clown",
  color: "https://api.popcat.xyz/color",
  colorify: "https://api.popcat.xyz/colorify",
  communism: "https://api.popcat.xyz/communism",
  decode: "https://api.popcat.xyz/decode",
  doublestruck: "https://api.popcat.xyz/doublestruck",
  drake: "https://api.popcat.xyz/drake",
  drip: "https://api.popcat.xyz/drip",
  encode: "https://api.popcat.xyz/encode",
  popfact: "https://api.popcat.xyz/fact",
  popfacts: "https://api.popcat.xyz/facts",
  popgithub: "https://api.popcat.xyz/github",
  greyscale: "https://api.popcat.xyz/greyscale",
  gun: "https://api.popcat.xyz/gun",
  hue: "https://api.popcat.xyz/hue-rotate",
  imdb: "https://api.popcat.xyz/imdb",
  invert: "https://api.popcat.xyz/invert",
  popitunes: "https://api.popcat.xyz/itunes",
  jail: "https://api.popcat.xyz/jail",
  popjoke: "https://api.popcat.xyz/joke",
  jokeoverhead: "https://api.popcat.xyz/jokeoverhead",
  lulcat: "https://api.popcat.xyz/lulcat",
  poplyrics: "https://api.popcat.xyz/lyrics",
  popmeme: "https://api.popcat.xyz/meme",
  mnm: "https://api.popcat.xyz/mnm",
  mock: "https://api.popcat.xyz/mock",
  nokia: "https://api.popcat.xyz/nokia",
  popnpm: "https://api.popcat.xyz/npm",
  oogway: "https://api.popcat.xyz/oogway",
  opinion: "https://api.popcat.xyz/opinion",
  periodic: "https://api.popcat.xyz/periodic-table/random",
  periodicElement: "https://api.popcat.xyz/periodic-table",
  poppet: "https://api.popcat.xyz/pet",
  pickuplines: "https://api.popcat.xyz/pickuplines",
  pikachu: "https://api.popcat.xyz/pikachu",
  pooh: "https://api.popcat.xyz/pooh",
  popquote: "https://api.popcat.xyz/quote",
  randomcolor: "https://api.popcat.xyz/randomcolor",
  popreverse: "https://api.popcat.xyz/reverse",
  sadcat: "https://api.popcat.xyz/sadcat",
  popscreenshot: "https://api.popcat.xyz/screenshot",
  ship: "https://api.popcat.xyz/ship",
  showerthoughts: "https://api.popcat.xyz/showerthoughts",
  popsteam: "https://api.popcat.xyz/steam",
  popsubreddit: "https://api.popcat.xyz/subreddit",
  texttomorse: "https://api.popcat.xyz/texttomorse",
  poptranslate: "https://api.popcat.xyz/translate",
  uncover: "https://api.popcat.xyz/uncover",
  unforgivable: "https://api.popcat.xyz/unforgivable",
  wanted: "https://api.popcat.xyz/wanted",
  weather: "https://api.popcat.xyz/weather",
  welcomecard: "https://api.popcat.xyz/welcomecard",
  whowouldwin: "https://api.popcat.xyz/whowouldwin",
  wyr: "https://api.popcat.xyz/wyr",
};
const genApi = (command, text, mime, mediaUrl) => {
  const params = new URLSearchParams();
  let missingParams = [];
  switch (command) {
    case "welcomecard":
      if (text.includes("|")) {
        const [text1, text2, text3, avatar, background] = text.split("|");
        if (!background) missingParams.push("background");
        if (!text1) missingParams.push("text1");
        if (!text2) missingParams.push("text2");
        if (!text3) missingParams.push("text3");
        if (!avatar) missingParams.push("avatar");
        if (background) params.append("background", background);
        if (text1) params.append("text1", text1);
        if (text2) params.append("text2", text2);
        if (text3) params.append("text3", text3);
        if (avatar) params.append("avatar", avatar);
      }
      break;
    case "color":
      params.append(text);
      break;
    case "popquote":
      const [quoteImage, quoteText, font, name] = text.split("|");
      if (!quoteImage) missingParams.push("image");
      if (!quoteText) missingParams.push("text");
      if (!font) missingParams.push("font");
      if (!name) missingParams.push("name");
      params.append("image", quoteImage || mediaUrl);
      params.append("text", quoteText);
      params.append("font", font);
      params.append("name", name);
      break;
    case "poplyrics":
      params.append("song", text);
      break;
    case "periodic-table":
      params.append("element", text);
      break;
    case "random":
      break;
    case "hue-rotate":
      const [hueImage, deg] = text.split("|");
      if (!hueImage) missingParams.push("img");
      if (!deg) missingParams.push("deg");
      params.append("img", hueImage || mediaUrl);
      params.append("deg", deg);
      break;
    case "nokia":
      params.append("image", mediaUrl);
      break;
    case "pickuplines":
      break;
    case "imdb":
      params.append("q", text);
      break;
    case "jail":
      params.append("image", mediaUrl);
      break;
    case "unforgivable":
      params.append("text", text);
      break;
    case "popscreenshot":
      params.append("url", text);
      break;
    case "randomcolor":
      break;
    case "popsteam":
      params.append("q", text);
      break;
    case "sadcat":
      params.append("text", text);
      break;
    case "oogway":
      params.append("text", text);
      break;
    case "communism":
      params.append("image", mediaUrl);
      break;
    case "car":
      break;
    case "chatbot":
      const [msgc, ownerc, botnamec] = text.split("|");
      if (!msgc) missingParams.push("msg");
      if (!ownerc) missingParams.push("owner");
      if (!botnamec) missingParams.push("botname");
      params.append("msg", msgc);
      params.append("owner", ownerc);
      params.append("botname", botnamec);
      break;
    case "pooh":
      const [text1, text2] = text.split("|");
      if (!text1) missingParams.push("text1");
      if (!text2) missingParams.push("text2");
      params.append("text1", text1);
      params.append("text2", text2);
      break;
    case "showerthoughts":
      break;
    case "wanted":
      params.append("image", mediaUrl);
      break;
    case "popsubreddit":
      params.append(text);
      break;
    case "jnsp-vsc":
      break;
    case "weather":
      params.append("q", text);
      break;
    case "whowouldwin":
      const [image1, image2] = text.split("|");
      if (!image1) missingParams.push("image1");
      if (!image2) missingParams.push("image2");
      params.append("image1", image1 || mediaUrl);
      params.append("image2", image2 || mediaUrl);
      break;
    case "gun":
      params.append("image", mediaUrl);
      break;
    case "lulcat":
      params.append("text", text);
      break;
    case "opinion":
      const [opinionImage, opinionText] = text.split("|");
      if (!opinionImage) missingParams.push("image");
      if (!opinionText) missingParams.push("text");
      params.append("image", opinionImage || mediaUrl);
      params.append("text", opinionText);
      break;
    case "drake":
      const [drakeText1, drakeText2] = text.split("|");
      if (!drakeText1) missingParams.push("text1");
      if (!drakeText2) missingParams.push("text2");
      params.append("text1", drakeText1);
      params.append("text2", drakeText2);
      break;
    case "popnpm":
      params.append("q", text);
      break;
    case "popfact":
      break;
    case "ship":
      const [user1, user2] = text.split("|");
      if (!user1) missingParams.push("user1");
      if (!user2) missingParams.push("user2");
      params.append("user1", user1 || mediaUrl);
      params.append("user2", user2 || mediaUrl);
      break;
    case "popjoke":
      break;
    case "biden":
      params.append("text", text);
      break;
    case "pikachu":
      params.append("text", text);
      break;
    case "mock":
      params.append("text", text);
      break;
    case "wyr":
      break;
    case "popmeme":
      break;
    case "colorify":
      const [colorifyImage, color] = text.split("|");
      if (!colorifyImage) missingParams.push("image");
      if (!color) missingParams.push("color");
      params.append("image", colorifyImage || mediaUrl);
      params.append("color", color);
      break;
    case "drip":
      params.append("image", mediaUrl);
      break;
    case "clown":
      params.append("image", mediaUrl);
      break;
    case "poptranslate":
      const [toLang, translateText] = text.split("|");
      if (!toLang) missingParams.push("to");
      if (!translateText) missingParams.push("text");
      params.append("to", toLang);
      params.append("text", translateText);
      break;
    case "encode":
      params.append("text", text);
      break;
    case "decode":
      params.append("binary", text);
      break;
    case "uncover":
      params.append("image", mediaUrl);
      break;
    case "ad":
      params.append("image", mediaUrl);
      break;
    case "popblur":
      params.append("image", mediaUrl);
      break;
    case "invert":
      params.append("image", mediaUrl);
      break;
    case "greyscale":
      params.append("image", mediaUrl);
      break;
    case "8ball":
      break;
    case "popitunes":
      params.append("q", text);
      break;
    case "popreverse":
      params.append("text", text);
      break;
    case "jokeoverhead":
      params.append("image", mediaUrl);
      break;
    case "doublestruck":
      params.append("text", text);
      break;
    case "mnm":
      params.append("image", mediaUrl);
      break;
    case "poppet":
      params.append("image", mediaUrl);
      break;
    case "texttomorse":
      params.append("text", text);
      break;
    case "popfacts":
      params.append("text", text);
      break;
    case "alert":
      params.append("text", text);
      break;
    case "caution":
      params.append("text", text);
      break;
  }
  if (missingParams.length > 0) {
    return {
      error: `❌ *Missing Parameters* \nPlease provide: *${missingParams.join(", ")}*!`,
    };
  }
  return {
    url: `${endpoints[command]}?${params.toString()}`,
  };
};
const handler = async (m, { conn, command, text }) => {
  try {
    let mediaUrl = "";
    let mime = "";
    if (
      [
        "ad",
        "popblur",
        "clown",
        "colorify",
        "communism",
        "drip",
        "greyscale",
        "gun",
        "invert",
        "jail",
        "jokeoverhead",
        "mnm",
        "nokia",
        "opinion",
        "poppet",
        "popquote",
        "uncover",
        "wanted",
      ].includes(command)
    ) {
      const q = m.quoted || m;
      mime = q.mimetype || "";
      if (!/image/.test(mime)) {
        return conn.reply(
          m.chat,
          `🚫 *Invalid Input* \nPlease send or reply with an image and use the command *.${command}*`,
          m,
        );
      }
      mediaUrl = await q.upload();
    }
    const apiResponse = genApi(command, text, mime, mediaUrl);
    if (apiResponse.error) {
      return conn.reply(m.chat, apiResponse.error, m);
    }
    if (mime) {
      const imageResponse = await fetch(apiResponse.url);
      const buffer = Buffer.from(await imageResponse.arrayBuffer());
      await conn.sendFile(m.chat, buffer, "", `✨ Here is the ${command}`, m);
    } else {
      const response = await fetch(apiResponse.url);
      const contentType = response.headers.get("Content-Type");
      if (contentType.includes("application/json")) {
        const result = await response.json();
        if (result.error) {
          return conn.reply(m.chat, result.error, m);
        }
        if (command === "poplyrics") {
          replyText = result.lyrics;
        } else if (command === "popfact") {
          replyText = result.fact;
        } else if (command === "eightball") {
          replyText = result.answer;
        } else if (command === "popjoke") {
          replyText = result.joke;
        } else {
          replyText = `${JSON.stringify(result, null, 4)}`;
        }
        conn.reply(m.chat, replyText, m);
      } else if (
        contentType.includes("image/") ||
        contentType.includes("video/")
      ) {
        const buffer = Buffer.from(await response.arrayBuffer());
        await conn.sendFile(m.chat, buffer, "", `✨ Here is the ${command}`, m);
      } else {
        const text = await response.text();
        conn.reply(m.chat, `${text}`, m);
      }
    }
  } catch (e) {
    console.error(e);
    conn.reply(
      m.chat,
      "⚠️ *Error* \nAn unexpected error occurred. Please try again later.",
      m,
    );
  }
};
handler.tags = ["tools"];
handler.command = handler.help = [
  "ad",
  "alert",
  "biden",
  "popblur",
  "car",
  "caution",
  "chatbot",
  "clown",
  "color",
  "colorify",
  "communism",
  "decode",
  "doublestruck",
  "drake",
  "drip",
  "eightball",
  "encode",
  "popfact",
  "popfacts",
  "popgithub",
  "greyscale",
  "gun",
  "hue",
  "imdb",
  "invert",
  "popitunes",
  "jail",
  "popjoke",
  "jokeoverhead",
  "lulcat",
  "poplyrics",
  "popmeme",
  "mnm",
  "mock",
  "nokia",
  "popnpm",
  "oogway",
  "opinion",
  "periodic",
  "periodicElement",
  "poppet",
  "pickuplines",
  "pikachu",
  "pooh",
  "popquote",
  "randomcolor",
  "popreverse",
  "sadcat",
  "popscreenshot",
  "ship",
  "showerthoughts",
  "popsteam",
  "popsubreddit",
  "texttomorse",
  "translate",
  "uncover",
  "unforgivable",
  "wanted",
  "weather",
  "welcomecard",
  "whowouldwin",
  "wyr",
];
export default handler;
