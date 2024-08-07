import request from "request";
import cheerio from "cheerio";
const tema = {
  shadow: "https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html",
  romantic: "https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html",
  smoke: "https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html",
  burnPapper: "https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html",
  naruto: "https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html",
  loveMsg: "https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html",
  msgGrass: "https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html",
  Glitch: "https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html",
  doubleHeart: "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
  coffeCup: "https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html",
  loveText: "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
  butterFly: "https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html"
};
async function pShadow(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.shadow,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pRomantic(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.romantic,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pSmoke(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.smoke,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pBurnPapper(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.burnPapper,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pNaruto(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.naruto,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_2: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pLoveMsg(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.loveMsg,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pMsgGrass(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.msgGrass,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pGlitch(text1, text2) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.Glitch,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        text_2: text2,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pDoubleHeart(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.doubleHeart,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pCoffeCup(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.coffeCup,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pLoveText(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.loveText,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function pButterfly(text1) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: tema.butterFly,
      headers: {
        "content-type": "application/x-www-from-urlencoded"
      },
      formData: {
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
export {
  pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pGlitch,
  pDoubleHeart,
  pCoffeCup,
  pLoveText,
  pButterfly
};