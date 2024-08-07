class Lunicode {
  constructor() {
    for (var i in this.tools = {
        flip: {
          init: function() {
            for (var i in this.map) this.map[this.map[i]] = i;
          },
          encode: function(text) {
            for (var ch, ret = [], i = 0, len = text.length; i < len; i++) ch = text.charAt(i),
              i > 0 && ("̤" === ch || "̗" === ch || "̖" === ch || "̮" === ch) ? (ch = this.map[text.charAt(i - 1) + ch], ret.pop()) : void 0 === (ch = this.map[ch]) && (ch = text.charAt(i)), ret.push(ch);
            return ret.reverse().join("");
          },
          decode: function(text) {
            for (var ch, ret = [], i = 0, len = text.length; i < len; i++) ch = text.charAt(i),
              i > 0 && ("̤" === ch || "̗" === ch || "̖" === ch || "̮" === ch) ? (ch = this.map[text.charAt(i - 1) + ch], ret.pop()) : void 0 === (ch = this.map[ch]) && (ch = text.charAt(i)), ret.push(ch);
            return ret.reverse().join("");
          },
          map: {
            a: "ɐ",
            b: "q",
            c: "ɔ",
            d: "p",
            e: "ǝ",
            f: "ɟ",
            g: "ɓ",
            h: "ɥ",
            i: "ı",
            j: "ɾ",
            k: "ʞ",
            l: "l",
            m: "ɯ",
            n: "u",
            r: "ɹ",
            t: "ʇ",
            v: "ʌ",
            w: "ʍ",
            y: "ʎ",
            A: "∀",
            B: "á™ ",
            C: "Ɔ",
            D: "á—¡",
            E: "Ǝ",
            F: "Ⅎ",
            G: "⅁",
            J: "ſ",
            K: "⋊",
            L: "˥",
            M: "W",
            P: "Ԁ",
            Q: "Ό",
            R: "ᴚ",
            T: "⊥",
            U: "∩",
            V: "Λ",
            Y: "⅄",
            1: "⇂",
            2: "ᄅ",
            3: "Ɛ",
            4: "ㄣ",
            5: "ގ",
            6: "9",
            7: "ㄥ",
            "&": "⅋",
            ".": "˙",
            '"': "„",
            ";": "؛",
            "[": "]",
            "(": ")",
            "{": "}",
            "?": "¿",
            "!": "¡",
            "'": ",",
            "<": ">",
            "‾": "_",
            "¯": "_",
            "‿": "⁀",
            "⁅": "⁆",
            "∴": "∵",
            "\r": "\n",
            "ÃŸ": "á™ ",
            "̈": "̤",
            "Ã¤": "É̤",
            "Ã¶": "o̤",
            "Ã¼": "n̤",
            "Ã„": "∀̤",
            "Ã–": "O̤",
            "Ãœ": "∩̤",
            "Â´": " ̗",
            "Ã©": "ǝ̗",
            "Ã¡": "ɐ̗",
            "Ã³": "o̗",
            "Ãº": "n̗",
            "Ã‰": "Ǝ̗",
            "Ã": "∀̗",
            "Ã“": "O̗",
            "Ãš": "∩̗",
            "`": " ̖",
            "Ã¨": "ǝ̖",
            "Ã ": "ɐ̖",
            "Ã²": "o̖",
            "Ã¹": "n̖",
            "Ãˆ": "Ǝ̖",
            "Ã€": "∀̖",
            "Ã’": "O̖",
            "Ã™": "∩̖",
            "^": " ̮",
            "Ãª": "ǝ̮",
            "Ã¢": "ɐ̮",
            "Ã´": "o̮",
            "Ã»": "n̮",
            "ÃŠ": "Ǝ̮",
            "Ã‚": "∀̮",
            "Ã”": "O̮",
            "Ã›": "∩̮"
          }
        },
        mirror: {
          init: function() {
            for (var i in this.map) this.map[this.map[i]] = i;
          },
          encode: function(text) {
            for (var ch, ret = [], newLines = [], i = 0, len = text.length; i < len; i++) ch = text.charAt(i),
              i > 0 && ("̈" === ch || "̀" === ch || "́" === ch || "̂" === ch) ? (ch = this.map[text.charAt(i - 1) + ch], ret.pop()) : void 0 === (ch = this.map[ch]) && (ch = text.charAt(i)), "\n" === ch ? (newLines.push(ret.reverse().join("")), ret = []) : ret.push(ch);
            return newLines.push(ret.reverse().join("")), newLines.join("\n");
          },
          decode: function(text) {
            for (var ch, ret = [], newLines = [], i = 0, len = text.length; i < len; i++) ch = text.charAt(i),
              i > 0 && ("̈" === ch || "̀" === ch || "́" === ch || "̂" === ch) ? (ch = this.map[text.charAt(i - 1) + ch], ret.pop()) : void 0 === (ch = this.map[ch]) && (ch = text.charAt(i)), "\n" === ch ? (newLines.push(ret.reverse().join("")), ret = []) : ret.push(ch);
            return newLines.push(ret.reverse().join("")), newLines.join("\n");
          },
          map: {
            a: "É’",
            b: "d",
            c: "É”",
            e: "É˜",
            f: "áŽ¸",
            g: "Ç«",
            h: "Êœ",
            j: "êž",
            k: "Êž",
            l: "|",
            n: "á´Ž",
            p: "q",
            r: "É¿",
            s: "ê™…",
            t: "Æš",
            y: "Ê",
            z: "Æ¹",
            B: "á™ ",
            C: "Æ†",
            D: "á—¡",
            E: "ÆŽ",
            F: "êŸ»",
            G: "áŽ®",
            J: "á‚±",
            K: "â‹Š",
            L: "â…ƒ",
            N: "Í¶",
            P: "êŸ¼",
            Q: "á»Œ",
            R: "Ð¯",
            S: "ê™„",
            Z: "Æ¸",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            "&": "",
            ";": "",
            "[": "]",
            "(": ")",
            "{": "}",
            "?": "â¸®",
            "<": ">",
            "Ã¤": "É’̈",
            "ÃŸ": "á™ ",
            "Â´": "`",
            "Ã©": "É˜̀",
            "Ã¡": "É’̀",
            "Ã³": "Ã²",
            "Ãº": "Ã¹",
            "Ã‰": "ÆŽ̀",
            "Ã": "Ã€",
            "Ã“": "Ã’",
            "Ãš": "Ã™",
            "`": "Â´",
            "Ã¨": "É˜́",
            "Ã ": "É’́",
            "Ãˆ": "ÆŽ́",
            "Ãª": "É˜̂",
            "Ã¢": "É’̂",
            "ÃŠ": "ÆŽ̂",
            "Ã˜": "á´“",
            "Ã¸": "á´“"
          }
        },
        creepify: {
          init: function() {
            for (var i = 768; i <= 789; i++) this.diacriticsTop.push(String.fromCharCode(i));
            for (i = 790; i <= 819; i++) 794 != i && 795 != i && this.diacriticsBottom.push(String.fromCharCode(i));
            this.diacriticsTop.push(String.fromCharCode(794)), this.diacriticsTop.push(String.fromCharCode(795));
            for (i = 820; i <= 824; i++) this.diacriticsMiddle.push(String.fromCharCode(i));
            for (i = 825; i <= 828; i++) this.diacriticsBottom.push(String.fromCharCode(i));
            for (i = 829; i <= 836; i++) this.diacriticsTop.push(String.fromCharCode(i));
            this.diacriticsTop.push(String.fromCharCode(836)), this.diacriticsBottom.push(String.fromCharCode(837)),
              this.diacriticsTop.push(String.fromCharCode(838)), this.diacriticsBottom.push(String.fromCharCode(839)),
              this.diacriticsBottom.push(String.fromCharCode(840)), this.diacriticsBottom.push(String.fromCharCode(841)),
              this.diacriticsTop.push(String.fromCharCode(842)), this.diacriticsTop.push(String.fromCharCode(843)),
              this.diacriticsTop.push(String.fromCharCode(844)), this.diacriticsBottom.push(String.fromCharCode(845)),
              this.diacriticsBottom.push(String.fromCharCode(846)), this.diacriticsTop.push(String.fromCharCode(848)),
              this.diacriticsTop.push(String.fromCharCode(849)), this.diacriticsTop.push(String.fromCharCode(850)),
              this.diacriticsBottom.push(String.fromCharCode(851)), this.diacriticsBottom.push(String.fromCharCode(852)),
              this.diacriticsBottom.push(String.fromCharCode(853)), this.diacriticsBottom.push(String.fromCharCode(854)),
              this.diacriticsTop.push(String.fromCharCode(855)), this.diacriticsTop.push(String.fromCharCode(856)),
              this.diacriticsBottom.push(String.fromCharCode(857)), this.diacriticsBottom.push(String.fromCharCode(858)),
              this.diacriticsTop.push(String.fromCharCode(859)), this.diacriticsBottom.push(String.fromCharCode(860)),
              this.diacriticsTop.push(String.fromCharCode(861)), this.diacriticsTop.push(String.fromCharCode(861)),
              this.diacriticsBottom.push(String.fromCharCode(863)), this.diacriticsTop.push(String.fromCharCode(864)),
              this.diacriticsTop.push(String.fromCharCode(865));
          },
          encode: function(text) {
            var newChar, newText = "";
            for (var i in text) {
              if (newChar = text[i], this.options.middle && (newChar += this.diacriticsMiddle[Math.floor(Math.random() * this.diacriticsMiddle.length)]), this.options.top)
                for (var diacriticsTopLength = this.diacriticsTop.length - 1, count = 0, len = this.options.maxHeight - Math.random() * (this.options.randomization / 100 * this.options.maxHeight); count < len; count++) newChar += this.diacriticsTop[Math.floor(Math.random() * diacriticsTopLength)];
              if (this.options.bottom) {
                var diacriticsBottomLength = this.diacriticsBottom.length - 1;
                for (count = 0, len = this.options.maxHeight - Math.random() * (this.options.randomization / 100 * this.options.maxHeight); count < len; count++) newChar += this.diacriticsBottom[Math.floor(Math.random() * diacriticsBottomLength)];
              }
              newText += newChar;
            }
            return newText;
          },
          decode: function(text) {
            var charCode, newText = "";
            for (var i in text)((charCode = text[i].charCodeAt(0)) < 768 || charCode > 865) && (newText += text[i]);
            return newText;
          },
          diacriticsTop: [],
          diacriticsMiddle: [],
          diacriticsBottom: [],
          options: {
            top: !0,
            middle: !0,
            bottom: !0,
            maxHeight: 15,
            randomization: 100
          }
        },
        bubbles: {
          init: function() {
            for (var i = 49; i <= 57; i++) this.map[String.fromCharCode(i)] = String.fromCharCode(i + 9263);
            this.map[0] = "⓪";
            for (i = 65; i <= 90; i++) this.map[String.fromCharCode(i)] = String.fromCharCode(i + 9333);
            for (i = 97; i <= 122; i++) this.map[String.fromCharCode(i)] = String.fromCharCode(i + 9327);
            for (var i in this.map) this.mapInverse[this.map[i]] = i;
          },
          encode: function(text) {
            var ch, ret = "",
              first = !0;
            for (var i in text) void 0 === (ch = this.map[text[i]]) && (text[i].charCodeAt(0) >= 33 ? (ch = text[i] + String.fromCharCode(8413), first || (ch = String.fromCharCode(8239) + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(8239) + ch)) : ch = text[i]),
              ret += ch, first = "\n" === ch;
            return ret;
          },
          decode: function(text) {
            var ch, ret = "",
              newRet = "";
            for (var i in text) ret += void 0 === (ch = this.mapInverse[text[i]]) ? text[i] : ch;
            for (var i in ret) 160 != (ch = ret[i].charCodeAt(0)) && 8239 != ch && 8413 != ch && (newRet += ret[i]);
            return newRet;
          },
          map: {},
          mapInverse: {}
        },
        squares: {
          init: function() {},
          encode: function(text) {
            var ch, ret = "",
              first = !0;
            for (var i in text) text[i].charCodeAt(0) >= 33 ? (ch = text[i] + String.fromCharCode(8414), first || (ch = String.fromCharCode(8239) + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(8239) + ch)) : ch = text[i],
              ret += ch, first = "\n" === ch;
            return ret;
          },
          decode: function(text) {
            var ch, ret = "";
            for (var i in text) 160 != (ch = text[i].charCodeAt(0)) && 8239 != ch && 8414 != ch && (ret += text[i]);
            return ret;
          }
        },
        roundsquares: {
          init: function() {},
          encode: function(text) {
            var ch, ret = "",
              first = !0;
            for (var i in text) text[i].charCodeAt(0) >= 33 ? (ch = text[i] + String.fromCharCode(8419), first || (ch = String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160) + ch)) : ch = text[i],
              ret += ch, first = "\n" === ch;
            return ret;
          },
          decode: function(text) {
            var ch, ret = "";
            for (var i in text) 160 != (ch = text[i].charCodeAt(0)) && 8239 != ch && 8419 != ch && (ret += text[i]);
            return ret;
          }
        },
        bent: {
          init: function() {
            for (var i in this.map) this.map[this.map[i]] = i;
          },
          encode: function(text) {
            for (var ch, ret = "", i = 0, len = text.length; i < len; i++) void 0 === (ch = this.map[text.charAt(i)]) && (ch = text.charAt(i)),
              ret += ch;
            return ret;
          },
          decode: function(text) {
            for (var ch, ret = "", i = 0, len = text.length; i < len; i++) void 0 === (ch = this.map[text.charAt(i)]) && (ch = text.charAt(i)),
              ret += ch;
            return ret;
          },
          map: {
            a: "Ä…",
            b: "Ò",
            c: "Ã§",
            d: "Õª",
            e: "Ò½",
            f: "Æ’",
            g: "Ö",
            h: "Õ°",
            i: "Ã¬",
            j: "Ê",
            k: "ÒŸ",
            l: "Ó€",
            m: "Ê",
            n: "Õ²",
            o: "Ö…",
            p: "Ö„",
            q: "Õ¦",
            r: "É¾",
            s: "Ê‚",
            t: "Õ§",
            u: "Õ´",
            v: "Ñµ",
            w: "Õ¡",
            x: "Ã—",
            y: "Õ¾",
            z: "Õ€",
            A: "Èº",
            B: "Î²",
            C: "â†»",
            D: "áŽ ",
            E: "Æ",
            F: "Æ‘",
            G: "Æ“",
            H: "Ç¶",
            I: "Ä¯",
            J: "Ù„",
            K: "Ò ",
            L: "êˆ",
            M: "â±®",
            N: "áž ",
            O: "à¶§",
            P: "Ï†",
            Q: "Ò¨",
            R: "à½ ",
            S: "Ïš",
            T: "Í²",
            U: "Ô±",
            V: "á»¼",
            W: "à°š",
            X: "áƒ¯",
            Y: "Ó‹",
            Z: "É€",
            0: "âŠ˜",
            1: "ï¿½ï¿½",
            2: "Ï©",
            3: "Ó ",
            4: "à¥«",
            5: "Æ¼",
            6: "Ï¬",
            7: "7",
            8: "ï¿½ï¿½",
            9: "à¥¯",
            "&": "â…‹",
            "(": "{",
            ")": "}",
            "{": "(",
            "}": ")",
            "Ã¤": "Ä…̈",
            "Ã¶": "Ö…̈",
            "Ã¼": "Õ´̈",
            "Ã„": "Èº̈",
            "Ã–": "à¶§̈",
            "Ãœ": "Ô±̈",
            "Ã©": "Ò½́",
            "Ã¡": "Ä…́",
            "Ã³": "Ö…́",
            "Ãº": "Õ´́",
            "Ã‰": "Æ́",
            "Ã": "Èº́",
            "Ã“": "à¶§́",
            "Ãš": "Ô±́",
            "Ã¨": "Ò½̀",
            "Ã ": "Ä…̀",
            "Ã²": "Ö…̀",
            "Ã¹": "Õ´̀",
            "Ãˆ": "Æ̀",
            "Ã€": "Èº̀",
            "Ã’": "à¶§̀",
            "Ã™": "Ô±̀",
            "Ãª": "Ò½̂",
            "Ã¢": "Ä…̂",
            "Ã´": "Ö…̂",
            "Ã»": "Õ´̂",
            "ÃŠ": "Æ̂",
            "Ã‚": "Èº̂",
            "Ã”": "à¶§̂",
            "Ã›": "Ô±̂"
          }
        },
        tiny: {
          init: function() {
            for (var i in this.map) this.map[this.map[i]] = i;
          },
          encode: function(text) {
            for (var ch, ret = "", i = 0, len = (text = text.toUpperCase()).length; i < len; i++) void 0 === (ch = this.map[text.charAt(i)]) && (ch = text.charAt(i)),
              ret += ch;
            return ret;
          },
          decode: function(text) {
            for (var ch, ret = "", i = 0, len = text.length; i < len; i++) void 0 === (ch = this.map[text.charAt(i)]) && (ch = text.charAt(i)),
              ret += ch;
            return ret;
          },
          map: {
            A: "á´€",
            B: "Ê™",
            C: "á´„",
            D: "á´…",
            E: "á´‡",
            F: "êœ°",
            G: "É¢",
            H: "Êœ",
            I: "Éª",
            J: "á´Š",
            K: "á´‹",
            L: "ÊŸ",
            M: "á´",
            N: "É´",
            O: "á´",
            P: "á´˜",
            Q: "Q",
            R: "Ê€",
            S: "êœ±",
            T: "á´›",
            U: "á´œ",
            V: "á´ ",
            W: "á´¡",
            X: "x",
            Y: "Ê",
            Z: "á´¢"
          }
        }
      }, this.tools) this.tools[i].init();
    this.getHTML = function(text) {
      for (var ch, html = "", lastSpaceWasNonBreaking = !0, highSurrogate = 0, codepoint = 0, i = 0, len = text.length; i < len; i++) 10 === (ch = text.charCodeAt(i)) || 13 === ch ? (html += "<br>\n", lastSpaceWasNonBreaking = !0) : 32 === ch ? lastSpaceWasNonBreaking ? (html += " ", lastSpaceWasNonBreaking = !1) : (html += "&nbsp;", lastSpaceWasNonBreaking = !0) : (ch >= 55296 && ch <= 56319 ? (highSurrogate = ch, codepoint = 0) : highSurrogate > 0 ? (ch >= 56320 && ch <= 57343 && (codepoint = 1024 * (highSurrogate - 55296) + (ch - 56320) + 65536), highSurrogate = 0) : codepoint = ch, 0 != codepoint && (html += "&#x" + codepoint.toString(16) + ";", lastSpaceWasNonBreaking = !0));
      return html;
    };
  }
}
export {
  Lunicode
};