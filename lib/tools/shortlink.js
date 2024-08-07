import {
  fetch
} from "undici";
class ShortLink {
  async tinyurl(url) {
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
      return await response.text();
    } catch (error) {
      return console.error(error), null;
    }
  }
  async linkpoi(url) {
    try {
      const response = await fetch(`https://linkpoi.me/api.php?url=${url}`);
      return (await response.json()).shorturl.replace("/", "/");
    } catch (error) {
      return console.error(error), null;
    }
  }
  async bitly(url) {
    try {
      const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 7e22401ef9e6777813e43a52dfef0ade98c6d3f9"
        },
        body: JSON.stringify({
          long_url: url
        })
      });
      return (await response.json()).link;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async ouo(url) {
    try {
      const response = await fetch(`http://ouo.io/api/KzDtJCvY?s=${url}`);
      return await response.text();
    } catch (error) {
      return console.error(error), null;
    }
  }
  async onept(url) {
    try {
      const response = await fetch(`https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${encodeURIComponent(url)}`);
      return `https://1pt.co/${(await response.json()).short}`;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async cleanuri(url) {
    try {
      const response = await fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        body: new URLSearchParams({
          url: url
        })
      });
      return (await response.json()).result_url;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async gotiny(url) {
    try {
      const response = await fetch("https://gotiny.cc/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            input: url
          })
        }),
        result = await response.json();
      return `https://gotiny.cc/${result[0]?.code}`;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async isgd(url) {
    try {
      const response = await fetch(`https://is.gd/create.php?format=json&url=${url}`);
      return (await response.json()).shorturl;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async vgd(url) {
    try {
      const response = await fetch(`https://v.gd/create.php?format=json&url=${url}`);
      return (await response.json()).shorturl;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async tnyim(url) {
    try {
      const response = await fetch(`https://tny.im/yourls-api.php?format=json&action=shorturl&url=${url}`);
      return (await response.json()).shorturl;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async kutt(url) {
    try {
      const config = {
          headers: {
            "X-API-KEY": "VcMiC4tZGdD1Lgu1KTiYfSNrs3Q_K3TMdVuSnStl",
            "Content-Type": "application/json"
          }
        },
        jsonBody = {
          target: url
        },
        body = JSON.stringify(jsonBody),
        response = await fetch("https://kutt.it/api/v2/links", {
          method: "POST",
          headers: config.headers,
          body: body
        });
      return (await response.json()).link;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async rebrandly(url) {
    try {
      const encoded = encodeURIComponent(url),
        response = await fetch(`https://api.rebrandly.com/v1/links/new?destination=${encoded}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: "c95033066865402eb6d1dc40a4c4547f",
            Host: "api.rebrandly.com"
          }
        });
      return (await response.json()).shortUrl;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async multishort(url) {
    try {
      const response = await fetch("https://short-link-api.vercel.app/?query=" + url),
        result = await response.json(),
        linkList = Object.entries(result).map(([name, link]) => ({
          nama: name,
          link: link
        }));
      return `${linkList.map((v, index) => "  ○ " + v.link).join("\n")}`;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async shrtco(url) {
    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`),
        result = await response.json(),
        linkArray = Object.values(result.result).filter(value => !value.startsWith("https"));
      return `${linkArray.map((v, index) => "  ○ " + v).join("\n")}`;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async vurl(url) {
    try {
      const response = await fetch(`https://vurl.com/api.php?url=${url}`);
      return await response.text();
    } catch (error) {
      return console.error(error), null;
    }
  }
  async cuttly(url) {
    try {
      const response = await fetch("https://cutt.ly/scripts/shortenUrl.php", {
        method: "POST",
        body: new URLSearchParams({
          url: url,
          domain: 0
        })
      });
      return await response.text();
    } catch (error) {
      return console.error(error), null;
    }
  }
  async shorte(url) {
    try {
      const response = await fetch("https://shorte.st/shortener/shorten", {
        method: "POST",
        body: new URLSearchParams({
          url: url
        })
      });
      return await response.json();
    } catch (error) {
      return console.error(error), null;
    }
  }
  async adfoc(url) {
    try {
      const response = await fetch(`https://adfoc.us/api/?key=3dda30eb032141a2b2b3100a3dbfb3c9&url=${url}`);
      return await response.text();
    } catch (error) {
      return console.error(error), null;
    }
  }
  async dxyz(url) {
    try {
      return await (await fetch("https://d.131213.xyz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url
        })
      })).json();
    } catch (error) {
      return console.error(error), null;
    }
  }
  async shorturl(url) {
    try {
      const headers = {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.125 Safari/537.36",
          "content-type": "application/x-www-form-urlencoded",
          origin: "https://www.shorturl.at",
          referer: "https://www.shorturl.at/",
          "Accept-Language": "en-US,en;q=0.9"
        },
        response = await fetch("https://www.shorturl.at/shortener.php", {
          method: "POST",
          headers: headers,
          body: new URLSearchParams({
            u: url
          })
        });
      return (await response.text()).split('id="shortenurl" type="text" value="')[1].split('"')[0];
    } catch (error) {
      return console.error(error), null;
    }
  }
  async ssur(url) {
    try {
      const keys = ["nZ9ZzSa4LZ4o", "Ed8nLSFpNVGB", "YJimrVqxmExf", "L9YRXGPugtet", "HR7RDeKNVgTX", "RKqh9qcjDoe4", "XoWtP22exnmy", "GGFedvn7yhFZ", "yJpFtTfXNZVi", "MqQsBMbCvthf", "MqQsBMbCvthf", "vMd8zBusHzKk", "ZYhVdSnyyEH6", "4XKRnpnNEUYX", "84zd7S9HP7CF", "PtpgRsxM5ozh"],
        shortenerUrl = `https://ssur.cc/api.php?appkey=${keys[Math.floor(Math.random() * keys.length)]}&format=json&longurl=${url}`,
        response = await fetch(shortenerUrl);
      return (await response.json()).ae_url;
    } catch (error) {
      return console.error(error), null;
    }
  }
  async adfly(url) {
    try {
      const keys = ["9a283dafe534bddccc556153a37ed678", "d8a2283a6bbafbe31b442776fdc108ab", "9f7a757edc77cda2a8394aa6088c5c1a", "7efadeae65372322ee0205a4d9e2616a"],
        shortenerUrl = `https://api.adf.ly/api.php?key=${keys[Math.floor(Math.random() * keys.length)]}&uid=343503&advert_type=int&domain=adf.ly&url=${url}`,
        response = await fetch(shortenerUrl);
      return await response.text();
    } catch (error) {
      return console.error(error), null;
    }
  }
}
export {
  ShortLink
};