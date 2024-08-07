import fetch from "node-fetch";
import {
  Lunicode
} from "./lunicode.js";
const luni = new Lunicode(),
  linkRegex = /(http[s]?:\/\/[^\s]+)/;
async function FancyText(text, page) {
  try {
    const response = await fetch("https://www.thefancytext.com/api/font", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        page: page,
        text: text,
        size: 1
      })
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data.results[0]?.text;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
async function FontList(text) {
  try {
    const response = await fetch("https://www.thefancytext.com/api/font", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text
      })
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    return (await response.json()).results;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
var alpha_default = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  keys = alpha_default.split(""),
  tinytext = {
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ⁱ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    q: "ᑫ",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ",
    A: "ᵃ",
    B: "ᵇ",
    C: "ᶜ",
    D: "ᵈ",
    E: "ᵉ",
    F: "ᶠ",
    G: "ᵍ",
    H: "ʰ",
    I: "ⁱ",
    J: "ʲ",
    K: "ᵏ",
    L: "ˡ",
    M: "ᵐ",
    N: "ⁿ",
    O: "ᵒ",
    P: "ᵖ",
    Q: "ᵠ",
    R: "ʳ",
    S: "ˢ",
    T: "ᵗ",
    U: "ᵘ",
    V: "ᵛ",
    X: "ˣ",
    W: "ʷ",
    Y: "ʸ",
    Z: "ᶻ",
    "!": "﹗",
    "@": "@",
    "#": "#",
    $: "﹩",
    "%": "﹪",
    "^": "^",
    "&": "﹠",
    "(": "⁽",
    ")": "⁾",
    "-": "⁻",
    "=": "⁼",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": "﹕",
    ";": "﹔",
    "?": "﹖",
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹"
  },
  smallcapstext = {
    a: "ᴀ",
    b: "ʙ",
    c: "ᴄ",
    d: "ᴅ",
    e: "ᴇ",
    f: "ꜰ",
    g: "ɢ",
    h: "ʜ",
    i: "ɪ",
    j: "ᴊ",
    k: "ᴋ",
    l: "ʟ",
    m: "ᴍ",
    n: "ɴ",
    o: "ᴏ",
    p: "ᴘ",
    q: "q",
    r: "ʀ",
    s: "s",
    t: "ᴛ",
    u: "ᴜ",
    v: "ᴠ",
    w: "ᴡ",
    x: "x",
    y: "ʏ",
    z: "ᴢ",
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
    H: "H",
    I: "I",
    J: "J",
    K: "K",
    L: "L",
    M: "M",
    N: "N",
    O: "O",
    P: "P",
    Q: "Q",
    R: "R",
    S: "S",
    T: "T",
    U: "U",
    V: "V",
    W: "W",
    X: "X",
    Y: "Y",
    Z: "Z",
    "!": "﹗",
    "@": "@",
    "#": "#",
    $: "﹩",
    "%": "﹪",
    "^": "^",
    "&": "﹠",
    "(": "⁽",
    ")": "⁾",
    "-": "⁻",
    "=": "⁼",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": "﹕",
    ";": "﹔",
    "?": "﹖",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  boldtext = {
    a: "𝐚",
    b: "𝐛",
    c: "𝐜",
    d: "𝐝",
    e: "𝐞",
    f: "𝐟",
    g: "𝐠",
    h: "𝐡",
    i: "𝐢",
    j: "𝐣",
    k: "𝐤",
    l: "𝐥",
    m: "𝐦",
    n: "𝐧",
    o: "𝐨",
    p: "𝐩",
    q: "𝐪",
    r: "𝐫",
    s: "𝐬",
    t: "𝐭",
    u: "𝐮",
    v: "𝐯",
    w: "𝐰",
    x: "𝐱",
    y: "𝐲",
    z: "𝐳",
    A: "𝐀",
    B: "𝐁",
    C: "𝐂",
    D: "𝐃",
    E: "𝐄",
    F: "𝐅",
    G: "𝐆",
    H: "𝐇",
    I: "𝐈",
    J: "𝐉",
    K: "𝐊",
    L: "𝐋",
    M: "𝐌",
    N: "𝐍",
    O: "𝐎",
    P: "𝐏",
    Q: "𝐐",
    R: "𝐑",
    S: "𝐒",
    T: "𝐓",
    U: "𝐔",
    V: "𝐕",
    X: "𝐗",
    W: "𝐖",
    Y: "𝐘",
    Z: "𝐙",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "𝟎",
    1: "𝟏",
    2: "𝟐",
    3: "𝟑",
    4: "𝟒",
    5: "𝟓",
    6: "𝟔",
    7: "𝟕",
    8: "𝟖",
    9: "𝟗"
  },
  circledtext = {
    a: "ⓐ",
    b: "ⓑ",
    c: "ⓒ",
    d: "ⓓ",
    e: "ⓔ",
    f: "ⓕ",
    g: "ⓖ",
    h: "ⓗ",
    i: "ⓘ",
    j: "ⓙ",
    k: "ⓚ",
    l: "ⓛ",
    m: "ⓜ",
    n: "ⓝ",
    o: "ⓞ",
    p: "ⓟ",
    q: "ⓠ",
    r: "ⓡ",
    s: "ⓢ",
    t: "ⓣ",
    u: "ⓤ",
    v: "ⓥ",
    w: "ⓦ",
    x: "ⓧ",
    y: "ⓨ",
    z: "ⓩ",
    A: "Ⓐ",
    B: "Ⓑ",
    C: "Ⓒ",
    D: "Ⓓ",
    E: "Ⓔ",
    F: "Ⓕ",
    G: "Ⓖ",
    H: "Ⓗ",
    I: "Ⓘ",
    J: "Ⓙ",
    K: "Ⓚ",
    L: "Ⓛ",
    M: "Ⓜ",
    N: "Ⓝ",
    O: "Ⓞ",
    P: "Ⓟ",
    Q: "Ⓠ",
    R: "Ⓡ",
    S: "Ⓢ",
    T: "Ⓣ",
    U: "Ⓤ",
    V: "Ⓥ",
    X: "Ⓧ",
    W: "Ⓦ",
    Y: "Ⓨ",
    Z: "Ⓩ",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "①",
    2: "②",
    3: "③",
    4: "④",
    5: "⑤",
    6: "⑥",
    7: "⑦",
    8: "⑧",
    9: "⑨"
  },
  invertedcircledtext = {
    a: "🅐",
    b: "🅑",
    c: "🅒",
    d: "🅓",
    e: "🅔",
    f: "🅕",
    g: "🅖",
    h: "🅗",
    i: "🅘",
    j: "🅙",
    k: "🅚",
    l: "🅛",
    m: "🅜",
    n: "🅝",
    o: "🅞",
    p: "🅟",
    q: "🅠",
    r: "🅡",
    s: "🅢",
    t: "🅣",
    u: "🅤",
    v: "🅥",
    w: "🅦",
    x: "🅧",
    y: "🅨",
    z: "🅩",
    A: "🅐",
    B: "🅑",
    C: "🅒",
    D: "🅓",
    E: "🅔",
    F: "🅕",
    G: "🅖",
    H: "🅗",
    I: "🅘",
    J: "🅙",
    K: "🅚",
    L: "🅛",
    M: "🅜",
    N: "🅝",
    O: "🅞",
    P: "🅟",
    Q: "🅠",
    R: "🅡",
    S: "🅢",
    T: "🅣",
    U: "🅤",
    V: "🅥",
    W: "🅦",
    X: "🅧",
    Y: "🅨",
    Z: "🅩",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "⓿",
    1: "➊",
    2: "➋",
    3: "➌",
    4: "➍",
    5: "➎",
    6: "➏",
    7: "➐",
    8: "➑",
    9: "➒"
  },
  vaporwavetext = {
    a: "ａ",
    b: "ｂ",
    c: "ｃ",
    d: "ｄ",
    e: "ｅ",
    f: "ｆ",
    g: "ｇ",
    h: "ｈ",
    i: "ｉ",
    j: "ｊ",
    k: "ｋ",
    l: "ｌ",
    m: "ｍ",
    n: "ｎ",
    o: "ｏ",
    p: "ｐ",
    q: "ｑ",
    r: "ｒ",
    s: "ｓ",
    t: "ｔ",
    u: "ｕ",
    v: "ｖ",
    w: "ｗ",
    x: "ｘ",
    y: "ｙ",
    z: "ｚ",
    A: "Ａ",
    B: "Ｂ",
    C: "Ｃ",
    D: "Ｄ",
    E: "Ｅ",
    F: "Ｆ",
    G: "Ｇ",
    H: "Ｈ",
    I: "Ｉ",
    J: "Ｊ",
    K: "Ｋ",
    L: "Ｌ",
    M: "Ｍ",
    N: "Ｎ",
    O: "Ｏ",
    P: "Ｐ",
    Q: "Ｑ",
    R: "Ｒ",
    S: "Ｓ",
    T: "Ｔ",
    U: "Ｕ",
    V: "Ｖ",
    X: "Ｘ",
    W: "Ｗ",
    Y: "Ｙ",
    Z: "Ｚ",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "０",
    1: "１",
    2: "２",
    3: "３",
    4: "４",
    5: "５",
    6: "６",
    7: "７",
    8: "８",
    9: "９"
  },
  emojitext = {
    a: "🅰",
    b: "🅱",
    c: "🌜",
    d: "🌛",
    e: "🎗",
    f: "🎏",
    g: "🌀",
    h: "♓",
    i: "🎐",
    j: "🎷",
    k: "🎋",
    l: "👢",
    m: "〽️",
    n: "🎵",
    o: "⚽",
    p: "🅿️",
    q: "🍳",
    r: "🌱",
    s: "💲",
    t: "🌴",
    u: "⛎",
    v: "✅",
    w: "🔱",
    x: "❎",
    y: "🍸",
    z: "💤",
    A: "🅰",
    B: "🅱",
    C: "🌜",
    D: "🌛",
    E: "🎗",
    F: "🎏",
    G: "🌀",
    H: "♓",
    I: "🎐",
    J: "🎷",
    K: "🎋",
    L: "👢",
    M: "〽️",
    N: "🎵",
    O: "⚽",
    P: "🅿️",
    Q: "🍳",
    R: "🌱",
    S: "💲",
    T: "🌴",
    U: "⛎",
    V: "✅",
    W: "🔱",
    X: "❎",
    Y: "🍸",
    Z: "💤",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  squaretext = {
    a: "🄰",
    b: "🄱",
    c: "🄲",
    d: "🄳",
    e: "🄴",
    f: "🄵",
    g: "🄶",
    h: "🄷",
    i: "🄸",
    j: "🄹",
    k: "🄺",
    l: "🄻",
    m: "🄼",
    n: "🄽",
    o: "🄾",
    p: "🄿",
    q: "🅀",
    r: "🅁",
    s: "🅂",
    t: "🅃",
    u: "🅄",
    v: "🅅",
    w: "🅆",
    x: "🅇",
    y: "🅈",
    z: "🅉",
    A: "🄰",
    B: "🄱",
    C: "🄲",
    D: "🄳",
    E: "🄴",
    F: "🄵",
    G: "🄶",
    H: "🄷",
    I: "🄸",
    J: "🄹",
    K: "🄺",
    L: "🄻",
    M: "🄼",
    N: "🄽",
    O: "🄾",
    P: "🄿",
    Q: "🅀",
    R: "🅁",
    S: "🅂",
    T: "🅃",
    U: "🅄",
    V: "🅅",
    W: "🅆",
    X: "🅇",
    Y: "🅈",
    Z: "🅉",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  blacksquaretext = {
    a: "🅰",
    b: "🅱",
    c: "🅲",
    d: "🅳",
    e: "🅴",
    f: "🅵",
    g: "🅶",
    h: "🅷",
    i: "🅸",
    j: "🅹",
    k: "🅺",
    l: "🅻",
    m: "🅼",
    n: "🅽",
    o: "🅾",
    p: "🅿",
    q: "🆀",
    r: "🆁",
    s: "🆂",
    t: "🆃",
    u: "🆄",
    v: "🆅",
    w: "🆆",
    x: "🆇",
    y: "🆈",
    z: "🆉",
    A: "🅰",
    B: "🅱",
    C: "🅲",
    D: "🅳",
    E: "🅴",
    F: "🅵",
    G: "🅶",
    H: "🅷",
    I: "🅸",
    J: "🅹",
    K: "🅺",
    L: "🅻",
    M: "🅼",
    N: "🅽",
    O: "🅾",
    P: "🅿",
    Q: "🆀",
    R: "🆁",
    S: "🆂",
    T: "🆃",
    U: "🆄",
    V: "🆅",
    W: "🆆",
    X: "🆇",
    Y: "🆈",
    Z: "🆉",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  invertedtext = {
    a: "ɐ",
    b: "q",
    c: "ɔ",
    d: "p",
    e: "ǝ",
    f: "ɟ",
    g: "ƃ",
    h: "ɥ",
    i: "ı",
    j: "ɾ",
    k: "ʞ",
    l: "ן",
    m: "ɯ",
    n: "u",
    o: "o",
    p: "d",
    q: "b",
    r: "ɹ",
    s: "s",
    t: "ʇ",
    u: "n",
    v: "ʌ",
    w: "ʍ",
    x: "x",
    y: "ʎ",
    z: "z",
    A: "ɐ",
    B: "q",
    C: "ɔ",
    D: "p",
    E: "ǝ",
    F: "ɟ",
    G: "ƃ",
    H: "ɥ",
    I: "ı",
    J: "ɾ",
    K: "ʞ",
    L: "ן",
    M: "ɯ",
    N: "u",
    O: "o",
    P: "d",
    Q: "b",
    R: "ɹ",
    S: "s",
    T: "ʇ",
    U: "n",
    V: "𐌡",
    X: "x",
    W: "ʍ",
    Y: "ʎ",
    Z: "z",
    "!": "¡",
    "@": "@",
    "#": "#",
    $: "﹩",
    "%": "﹪",
    "^": "^",
    "&": "⅋",
    "(": ")",
    ")": "(",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "}",
    "[": "]",
    "}": "{",
    "]": "[",
    ":": ":",
    ";": ";",
    "?": "¿",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  backwardstext = {
    a: "ɒ",
    b: "d",
    c: "ↄ",
    d: "b",
    e: "ɘ",
    f: "ʇ",
    g: "g",
    h: "⑁",
    i: "i",
    j: "j",
    k: "k",
    l: "l",
    m: "m",
    n: "ᴎ",
    o: "o",
    p: "q",
    q: "p",
    r: "ᴙ",
    s: "ƨ",
    t: "ɟ",
    u: "U",
    v: "v",
    w: "w",
    x: "x",
    y: "γ",
    z: "z",
    A: "A",
    B: "d",
    C: "Ↄ",
    D: "b",
    E: "Ǝ",
    F: "ꟻ",
    G: "G",
    H: "H",
    I: "I",
    J: "J",
    K: "K",
    L: "⅃",
    M: "M",
    N: "ᴎ",
    O: "O",
    P: "ꟼ",
    Q: "p",
    R: "ᴙ",
    S: "Ꙅ",
    T: "T",
    U: "U",
    V: "V",
    X: "X",
    W: "W",
    Y: "Y",
    Z: "Z",
    "!": "﹗",
    "@": "@",
    "#": "#",
    $: "﹩",
    "%": "﹪",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "⁻",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": "﹕",
    ";": "﹔",
    "?": "﹖",
    0: "0",
    1: "߁",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  boldcursivetext = {
    a: "𝓪",
    b: "𝓫",
    c: "𝓬",
    d: "𝓭",
    e: "𝓮",
    f: "𝓯",
    g: "𝓰",
    h: "𝓱",
    i: "𝓲",
    j: "𝓳",
    k: "𝓴",
    l: "𝓵",
    m: "𝓶",
    n: "𝓷",
    o: "𝓸",
    p: "𝓹",
    q: "𝓺",
    r: "𝓻",
    s: "𝓼",
    t: "𝓽",
    u: "𝓾",
    v: "𝓿",
    w: "𝔀",
    x: "𝔁",
    y: "𝔂",
    z: "𝔃",
    A: "𝓐",
    B: "𝓑",
    C: "𝓒",
    D: "𝓓",
    E: "𝓔",
    F: "𝓕",
    G: "𝓖",
    H: "𝓗",
    I: "𝓘",
    J: "𝓙",
    K: "𝓚",
    L: "𝓛",
    M: "𝓜",
    N: "𝓝",
    O: "𝓞",
    P: "𝓟",
    Q: "𝓠",
    R: "𝓡",
    S: "𝓢",
    T: "𝓣",
    U: "𝓤",
    V: "𝓥",
    W: "𝓦",
    X: "𝓧",
    Y: "𝓨",
    Z: "𝓩",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  cursivetext = {
    a: "𝒶",
    b: "𝒷",
    c: "𝒸",
    d: "𝒹",
    e: "ℯ",
    f: "𝒻",
    g: "ℊ",
    h: "𝒽",
    i: "𝒾",
    j: "𝒿",
    k: "𝓀",
    l: "𝓁",
    m: "𝓂",
    n: "𝓃",
    o: "ℴ",
    p: "𝓅",
    q: "𝓆",
    r: "𝓇",
    s: "𝓈",
    t: "𝓉",
    u: "𝓊",
    v: "𝓋",
    w: "𝓌",
    x: "𝓍",
    y: "𝓎",
    z: "𝓏",
    A: "𝒜",
    B: "ℬ",
    C: "𝒞",
    D: "𝒟",
    E: "ℰ",
    F: "ℱ",
    G: "𝒢",
    H: "ℋ",
    I: "ℐ",
    J: "𝒥",
    K: "𝒦",
    L: "ℒ",
    M: "ℳ",
    N: "𝒩",
    O: "𝒪",
    P: "𝒫",
    Q: "𝒬",
    R: "ℛ",
    S: "𝒮",
    T: "𝒯",
    U: "𝒰",
    V: "𝒱",
    W: "𝒲",
    X: "𝒳",
    Y: "𝒴",
    Z: "𝒵",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  italicstext = {
    a: "𝘢",
    b: "𝘣",
    c: "𝘤",
    d: "𝘥",
    e: "𝘦",
    f: "𝘧",
    g: "𝘨",
    h: "𝘩",
    i: "𝘪",
    j: "𝘫",
    k: "𝘬",
    l: "𝘭",
    m: "𝘮",
    n: "𝘯",
    o: "𝘰",
    p: "𝘱",
    q: "𝘲",
    r: "𝘳",
    s: "𝘴",
    t: "𝘵",
    u: "𝘶",
    v: "𝘷",
    w: "𝘸",
    x: "𝘹",
    y: "𝘺",
    z: "𝘻",
    A: "𝘈",
    B: "𝘉",
    C: "𝘊",
    D: "𝘋",
    E: "𝘌",
    F: "𝘍",
    G: "𝘎",
    H: "𝘏",
    I: "𝘐",
    J: "𝘑",
    K: "𝘒",
    L: "𝘓",
    M: "𝘔",
    N: "𝘕",
    O: "𝘖",
    P: "𝘗",
    Q: "𝘘",
    R: "𝘙",
    S: "𝘚",
    T: "𝘛",
    U: "𝘜",
    V: "𝘝",
    W: "𝘞",
    X: "𝘟",
    Y: "𝘠",
    Z: "𝘡",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  strikethroughtext = {
    a: "a̶",
    b: "b̶",
    c: "c̶",
    d: "d̶",
    e: "e̶",
    f: "f̶",
    g: "g̶",
    h: "h̶",
    i: "i̶",
    j: "j̶",
    k: "k̶",
    l: "l̶",
    m: "m̶",
    n: "n̶",
    o: "o̶",
    p: "p̶",
    q: "q̶",
    r: "r̶",
    s: "s̶",
    t: "t̶",
    u: "u̶",
    v: "v̶",
    w: "w̶",
    x: "x̶",
    y: "y̶",
    z: "z̶",
    A: "A̶",
    B: "B̶",
    C: "C̶",
    D: "D̶",
    E: "E̶",
    F: "F̶",
    G: "G̶",
    H: "H̶",
    I: "I̶",
    J: "J̶",
    K: "K̶",
    L: "L̶",
    M: "M̶",
    N: "N̶",
    O: "O̶",
    P: "P̶",
    Q: "Q̶",
    R: "R̶",
    S: "S̶",
    T: "T̶",
    U: "U̶",
    V: "V̶",
    X: "X̶",
    W: "W̶",
    Y: "Y̶",
    Z: "Z̶",
    "!": "!̶",
    "@": "@̶",
    "#": "#̶",
    $: "$̶",
    "%": "%̶",
    "^": "^̶",
    "&": "&̶",
    "(": "(̶",
    ")": ")̶",
    "-": "-̶",
    "=": "=̶",
    "+": "+̶",
    "{": "{̶",
    "[": "[̶",
    "}": "}̶",
    "]": "]̶",
    ":": ":̶",
    ";": ";̶",
    "?": "?̶",
    0: "0̶",
    1: "1̶",
    2: "2̶",
    3: "3̶",
    4: "4̶",
    5: "5̶",
    6: "6̶",
    7: "7̶",
    8: "8̶",
    9: "9̶"
  },
  underlinetext = {
    a: "a͟",
    b: "b͟",
    c: "c͟",
    d: "d͟",
    e: "e͟",
    f: "f͟",
    g: "g͟",
    h: "h͟",
    i: "i͟",
    j: "j͟",
    k: "k͟",
    l: "l͟",
    m: "m͟",
    n: "n͟",
    o: "o͟",
    p: "p͟",
    q: "q͟",
    r: "r͟",
    s: "s͟",
    t: "t͟",
    u: "u͟",
    v: "v͟",
    w: "w͟",
    x: "x͟",
    y: "y͟",
    z: "z͟",
    A: "A͟",
    B: "B͟",
    C: "C͟",
    D: "D͟",
    E: "E͟",
    F: "F͟",
    G: "G͟",
    H: "H͟",
    I: "I͟",
    J: "J͟",
    K: "K͟",
    L: "L͟",
    M: "M͟",
    N: "N͟",
    O: "O͟",
    P: "P͟",
    Q: "Q͟",
    R: "R͟",
    S: "S͟",
    T: "T͟",
    U: "U͟",
    V: "V͟",
    W: "W͟",
    X: "X͟",
    Y: "Y͟",
    Z: "Z͟",
    "!": "!͟",
    "@": "@͟",
    "#": "#͟",
    $: "$͟",
    "%": "%͟",
    "^": "^͟",
    "&": "&͟",
    "(": "(͟",
    ")": ")͟",
    "-": "-͟",
    "=": "=͟",
    "+": "+͟",
    "{": "{͟",
    "[": "[͟",
    "}": "}͟",
    "]": "]͟",
    ":": ":͟",
    ";": ";͟",
    "?": "?͟",
    0: "0͟",
    1: "1͟",
    2: "2͟",
    3: "3͟",
    4: "4͟",
    5: "5͟",
    6: "6͟",
    7: "7͟",
    8: "8͟",
    9: "9͟"
  },
  doubleunderlinetext = {
    a: "a͇",
    b: "b͇",
    c: "c͇",
    d: "d͇",
    e: "e͇",
    f: "f͇",
    g: "g͇",
    h: "h͇",
    i: "i͇",
    j: "j͇",
    k: "k͇",
    l: "l͇",
    m: "m͇",
    n: "n͇",
    o: "o͇",
    p: "p͇",
    q: "q͇",
    r: "r͇",
    s: "s͇",
    t: "t͇",
    u: "u͇",
    v: "v͇",
    w: "w͇",
    x: "x͇",
    y: "y͇",
    z: "z͇",
    A: "A͇",
    B: "B͇",
    C: "C͇",
    D: "D͇",
    E: "E͇",
    F: "F͇",
    G: "G͇",
    H: "H͇",
    I: "I͇",
    J: "J͇",
    K: "K͇",
    L: "L͇",
    M: "M͇",
    N: "N͇",
    O: "O͇",
    P: "P͇",
    Q: "Q͇",
    R: "R͇",
    S: "S͇",
    T: "T͇",
    U: "U͇",
    V: "V͇",
    W: "W͇",
    X: "X͇",
    Y: "Y͇",
    Z: "Z͇",
    "!": "!͇",
    "@": "@͇",
    "#": "#͇",
    $: "$͇",
    "%": "%͇",
    "^": "^͇",
    "&": "&͇",
    "(": "(͇",
    ")": ")͇",
    "-": "-͇",
    "=": "=͇",
    "+": "+͇",
    "{": "{͇",
    "[": "[͇",
    "}": "}͇",
    "]": "]͇",
    ":": ":͇",
    ";": ";͇",
    "?": "?͇",
    0: "0͇",
    1: "1͇",
    2: "2͇",
    3: "3͇",
    4: "4͇",
    5: "5͇",
    6: "6͇",
    7: "7͇",
    8: "8͇",
    9: "9͇"
  },
  bolditalic_serif = {
    a: "𝒂",
    b: "𝒃",
    c: "𝒄",
    d: "𝒅",
    e: "𝒆",
    f: "𝒇",
    g: "𝒈",
    h: "𝒉",
    i: "𝒊",
    j: "𝒋",
    k: "𝒌",
    l: "𝒍",
    m: "𝒎",
    n: "𝒏",
    o: "𝒐",
    p: "𝒑",
    q: "𝒒",
    r: "𝒓",
    s: "𝒔",
    t: "𝒕",
    u: "𝒖",
    v: "𝒗",
    w: "𝒘",
    x: "𝒙",
    y: "𝒚",
    z: "𝒛",
    A: "𝑨",
    B: "𝑩",
    C: "𝑪",
    D: "𝑫",
    E: "𝑬",
    F: "𝑭",
    G: "𝑮",
    H: "𝑯",
    I: "𝑰",
    J: "𝑱",
    K: "𝑲",
    L: "𝑳",
    M: "𝑴",
    N: "𝑵",
    O: "𝑶",
    P: "𝑷",
    Q: "𝑸",
    R: "𝑹",
    S: "𝑺",
    T: "𝑻",
    U: "𝑼",
    V: "𝑽",
    W: "𝑾",
    X: "𝑿",
    Y: "𝒀",
    Z: "𝒁",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  bolditalic_sans_serif = {
    a: "𝙖",
    b: "𝙗",
    c: "𝙘",
    d: "𝙙",
    e: "𝙚",
    f: "𝙛",
    g: "𝙜",
    h: "𝙝",
    i: "𝙞",
    j: "𝙟",
    k: "𝙠",
    l: "𝙡",
    m: "𝙢",
    n: "𝙣",
    o: "𝙤",
    p: "𝙥",
    q: "𝙦",
    r: "𝙧",
    s: "𝙨",
    t: "𝙩",
    u: "𝙪",
    v: "𝙫",
    w: "𝙬",
    x: "𝙭",
    y: "𝙮",
    z: "𝙯",
    A: "𝘼",
    B: "𝘽",
    C: "𝘾",
    D: "𝘿",
    E: "𝙀",
    F: "𝙁",
    G: "𝙂",
    H: "𝙃",
    I: "𝙄",
    J: "𝙅",
    K: "𝙆",
    L: "𝙇",
    M: "𝙈",
    N: "𝙉",
    O: "𝙊",
    P: "𝙋",
    Q: "𝙌",
    R: "𝙍",
    S: "𝙎",
    T: "𝙏",
    U: "𝙐",
    V: "𝙑",
    W: "𝙒",
    X: "𝙓",
    Y: "𝙔",
    Z: "𝙕",
    "!": "!",
    "@": "@",
    "#": "#",
    $: "$",
    "%": "%",
    "&": "&",
    "(": "(",
    ")": ")",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  },
  cursed_text = {
    chars: {
      0: ["̍", "̎", "̄", "̅", "̿", "̑", "̆", "̐", "͒", "͗", "͑", "̇", "̈", "̊", "͂", "̓", "̈́", "͊", "͋", "͌", "̃", "̂", "̌", "͐", "̀", "́", "̋", "̏", "̒", "̓", "̔", "̽", "̉", "ͣ", "ͤ", "ͥ", "ͦ", "ͧ", "ͨ", "ͩ", "ͪ", "ͫ", "ͬ", "ͭ", "ͮ", "ͯ", "̾", "͛", "͆", "̚"],
      1: ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̤", "̥", "̦", "̩", "̪", "̫", "̬", "̭", "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ", "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "̣"],
      2: ["̕", "̛", "̀", "́", "͘", "̡", "̢", "̧", "̨", "̴", "̵", "̶", "͏", "͜", "͝", "͞", "͟", "͠", "͢", "̸", "̷", "͡", "҉"]
    },
    random: function(len) {
      return 1 === len ? 0 : len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function(str) {
      return str.split("").map(function(a) {
        if (" " === a) return a;
        for (var i = 0, l = cursed_text.random(16); i < l; i++) {
          var rand = cursed_text.random(3);
          a += cursed_text.chars[rand][cursed_text.random(cursed_text.chars[rand].length)];
        }
        return a;
      }).join("");
    }
  };

function Flip(text) {
  return luni.tools.flip.encode(text);
}

function Mirror(text) {
  return luni.tools.mirror.encode(text);
}

function Creepify(text, maxHeight) {
  var encodedText = luni.tools.creepify.encode(text);
  return luni.tools.creepify.options.maxHeight = maxHeight || 8, encodedText;
}

function Bubbles(text) {
  return luni.tools.bubbles.encode(text);
}

function Squares(text) {
  return luni.tools.squares.encode(text);
}

function Roundsquares(text) {
  return luni.tools.roundsquares.encode(text);
}

function Bent(text) {
  return luni.tools.bent.encode(text);
}

function BlackCircled(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return invertedcircledtext.hasOwnProperty(a) ? invertedcircledtext[a] : a;
    }).join("");
  }).join("");
}

function Gothic(text) {
  return convert_text(text, keys, "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789");
}

function BoldGothic(text) {
  return convert_text(text, keys, "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅0123456789");
}

function DoubleStruck(text) {
  return convert_text(text, keys, "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡");
}

function Mono(text) {
  return convert_text(text, keys, "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿");
}

function Squiggle1(text) {
  return convert_text(text, keys, "αճcժҽբցհíյklตղօթզɾsԵմѵաxվzαճcժҽբցհíյklตղօթզɾsԵմѵաxվz0123456789");
}

function Squiggle2(text) {
  return convert_text(text, keys, "ԹՅՇԺeԲԳɧɿʝkʅʍՌԾρφՐՏԵՄעաՃՎՀԹՅՇԺeԲԳɧɿʝkʅʍՌԾρφՐՏԵՄעաՃՎՀ0123456789");
}

function Crazy1(text) {
  return convert_text(text, keys, "ꍏ♭☾◗€Ϝ❡♄♗♪ϰ↳♔♫⊙ρ☭☈ⓢ☂☋✓ω⌘☿☡ꍏ♭☾◗€Ϝ❡♄♗♪ϰ↳♔♫⊙ρ☭☈ⓢ☂☋✓ω⌘☿☡0123456789");
}

function Crazy2(text) {
  return convert_text(text, keys, "♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ0123456789");
}

function Ancient(text) {
  return convert_text(text, keys, "ልጌርዕቿቻኗዘጎጋጕረጠክዐየዒዪነፕሁሀሠሸሃጊልጌርዕቿቻኗዘጎጋጕረጠክዐየዒዪነፕሁሀሠሸሃጊ0123456789");
}

function Fireworks(text) {
  return convert_text(text, keys, "a҉b҉c҉d҉e҉f҉g҉h҉i҉j҉k҉l҉m҉n҉o҉p҉q҉r҉s҉t҉u҉v҉w҉x҉y҉z҉A҉B҉C҉D҉E҉F҉G҉H҉I҉J҉K҉L҉M҉N҉O҉P҉Q҉R҉S҉T҉U҉V҉W҉X҉Y҉Z҉0҉1҉2҉3҉4҉5҉6҉7҉8҉9҉");
}

function Stinky(text) {
  return convert_text(text, keys, "a̾b̾c̾d̾e̾f̾g̾h̾i̾j̾k̾l̾m̾n̾o̾p̾q̾r̾s̾t̾u̾v̾w̾x̾y̾z̾A̾B̾C̾D̾E̾F̾G̾H̾I̾J̾K̾L̾M̾N̾O̾P̾Q̾R̾S̾T̾U̾V̾W̾X̾Y̾Z̾0̾1̾2̾3̾4̾5̾6̾7̾8̾9̾");
}

function Seagull(text) {
  return convert_text(text, keys, "a̼b̼c̼d̼e̼f̼g̼h̼i̼j̼k̼l̼m̼n̼o̼p̼q̼r̼s̼t̼u̼v̼w̼x̼y̼z̼A̼B̼C̼D̼E̼F̼G̼H̼I̼J̼K̼L̼M̼N̼O̼P̼Q̼R̼S̼T̼U̼V̼W̼X̼Y̼Z̼0̼1̼2̼3̼4̼5̼6̼7̼8̼9̼");
}

function Musical(text) {
  return convert_text(text, keys, "♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ0123456789");
}

function Frame(text) {
  return convert_text(text, keys, "a̺͆b̺͆c̺͆d̺͆e̺͆f̺͆g̺͆h̺͆i̺͆j̺͆k̺͆l̺͆m̺͆n̺͆o̺͆p̺͆q̺͆r̺͆s̺͆t̺͆u̺͆v̺͆w̺͆x̺͆y̺͆z̺͆A̺͆B̺͆C̺͆D̺͆E̺͆F̺͆G̺͆H̺͆I̺͆J̺͆K̺͆L̺͆M̺͆N̺͆O̺͆P̺͆Q̺͆R̺͆S̺͆T̺͆U̺͆V̺͆W̺͆X̺͆Y̺͆Z̺͆0̺͆1̺͆2̺͆3̺͆4̺͆5̺͆6̺͆7̺͆8̺͆9̺͆");
}

function Bracket(text) {
  return convert_text(text, keys, "『a』『b』『c』『d』『e』『f』『g』『h』『i』『j』『k』『l』『m』『n』『o』『p』『q』『r』『s』『t』『u』『v』『w』『x』『y』『z』『A』『B』『C』『D』『E』『F』『G』『H』『I』『J』『K』『L』『M』『N』『O』『P』『Q』『R』『S』『T』『U』『V』『W』『X』『Y』『Z』『0』『1』『2』『3』『4』『5』『6』『7』『8』『9』");
}

function DarkBracket(text) {
  return convert_text(text, keys, "【a】【b】【c】【d】【e】【f】【g】【h】【i】【j】【k】【l】【m】【n】【o】【p】【q】【r】【s】【t】【u】【v】【w】【x】【y】【z】【A】【B】【C】【D】【E】【F】【G】【H】【I】【J】【K】【L】【M】【N】【O】【P】【Q】【R】【S】【T】【U】【V】【W】【X】【Y】【Z】【0】【1】【2】【3】【4】【5】【6】【7】【8】【9】");
}

function Asian(text) {
  return convert_text(text, keys, "卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙0123456789");
}

function Tribal(text) {
  return convert_text(text, keys, "ꍏꌃꉓꀸꍟꎇꁅꃅꀤꀭꀘ꒒ꂵꈤꂦꉣꆰꋪꌗ꓄ꀎꃴꅏꊼꌩꁴꍏꌃꉓꀸꍟꎇꁅꃅꀤꀭꀘ꒒ꂵꈤꂦꉣꆰꋪꌗ꓄ꀎꃴꅏꊼꌩꁴ0123456789");
}

function convert_text(text, keys, values) {
  let merged;
  return values = [...values], merged = 186 === values.length ? keys.reduce((obj, key, index) => ({
    ...obj,
    [key]: values[3 * index] + values[3 * index + 1] + values[3 * index + 2]
  }), {}) : 124 === values.length ? keys.reduce((obj, key, index) => ({
    ...obj,
    [key]: values[2 * index] + values[2 * index + 1]
  }), {}) : keys.reduce((obj, key, index) => ({
    ...obj,
    [key]: values[index]
  }), {}), text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return merged.hasOwnProperty(a) ? merged[a] : a;
    }).join("");
  }).join("");
}

function BoldItalicsSans(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return bolditalic_sans_serif.hasOwnProperty(a) ? bolditalic_sans_serif[a] : a;
    }).join("");
  }).join("");
}

function BoldItalicsSerif(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return bolditalic_serif.hasOwnProperty(a) ? bolditalic_serif[a] : a;
    }).join("");
  }).join("");
}

function Emoji(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return emojitext.hasOwnProperty(a) ? emojitext[a] : a;
    }).join("");
  }).join("");
}

function Vaporwave(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return vaporwavetext.hasOwnProperty(a) ? vaporwavetext[a] : a;
    }).join("");
  }).join("");
}

function Square(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return squaretext.hasOwnProperty(a) ? squaretext[a] : a;
    }).join("");
  }).join("");
}

function BlackSquare(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return blacksquaretext.hasOwnProperty(a) ? blacksquaretext[a] : a;
    }).join("");
  }).join("");
}

function Strikethrough(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return strikethroughtext.hasOwnProperty(a) ? strikethroughtext[a] : a;
    }).join("");
  }).join("");
}

function Underline(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return underlinetext.hasOwnProperty(a) ? underlinetext[a] : a;
    }).join("");
  }).join("");
}

function DoubleUnderline(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return doubleunderlinetext.hasOwnProperty(a) ? doubleunderlinetext[a] : a;
    }).join("");
  }).join("");
}

function BoldCursive(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return boldcursivetext.hasOwnProperty(a) ? boldcursivetext[a] : a;
    }).join("");
  }).join("");
}

function Cursive(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return cursivetext.hasOwnProperty(a) ? cursivetext[a] : a;
    }).join("");
  }).join("");
}

function Italics(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return italicstext.hasOwnProperty(a) ? italicstext[a] : a;
    }).join("");
  }).join("");
}

function SmallCaps(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return smallcapstext.hasOwnProperty(a) ? smallcapstext[a] : a;
    }).join("");
  }).join("");
}

function TinyText(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return tinytext.hasOwnProperty(a) ? tinytext[a] : a;
    }).join("");
  }).join("");
}

function Bold(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return boldtext.hasOwnProperty(a) ? boldtext[a] : a;
    }).join("");
  }).join("");
}

function Circled(text) {
  return text.split(linkRegex).map(function(part) {
    return linkRegex.test(part) ? part : part.split("").map(function(a) {
      return circledtext.hasOwnProperty(a) ? circledtext[a] : a;
    }).join("");
  }).join("");
}

function Backwards(text) {
  return reverseString(text.split("").map(function(a) {
    return backwardstext.hasOwnProperty(a) ? backwardstext[a] : a;
  }).join(""));
}

function Inverted(text) {
  return reverseString(text.split("").map(function(a) {
    return invertedtext.hasOwnProperty(a) ? invertedtext[a] : a;
  }).join(""));
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function snake_case(title) {
  return title = (title = (title = title.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
  })).replace(/[\s]/g, "_")).replace(/[^\w]/gi, ""), console.log("snake case"), title.charAt(0).toLowerCase() + title.substr(1);
}

function UpperCamel(title) {
  return title = (title = (title = title.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  })).replace(/[^A-Za-z]/gi, "")).replace(" ", "");
}

function lowerCamel(title) {
  return (title = UpperCamel(title)).charAt(0).toLowerCase() + title.substr(1);
}

function lower(word) {
  return word.toLowerCase();
}

function upper(word) {
  var pad_front = word.search(/\S|$/);
  return word.substring(0, pad_front) + word.substr(pad_front, 1).toUpperCase() + word.substring(pad_front + 1).toLowerCase();
}

function SentenceCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
let style = [Ancient, Asian, Backwards, Bent, BlackCircled, BlackSquare, Bold, BoldCursive, BoldGothic, BoldItalicsSans, BoldItalicsSerif, Bracket, Circled, Crazy1, Crazy2, Cursive, DarkBracket, DoubleStruck, DoubleUnderline, Emoji, Fireworks, Flip, Frame, Gothic, Inverted, Italics, Mirror, Mono, Musical, Seagull, SentenceCase, SmallCaps, Square, Squiggle1, Squiggle2, Stinky, Strikethrough, TinyText, Tribal, Underline, UpperCamel, Vaporwave];

function FancyTextV2(input, num) {
  return "number" != typeof num || isNaN(num) || num < 1 || num > style.length ? "Invalid input for 'num'. Please provide a valid number." : style[num - 1](input);
}

function FontListV2() {
  return [{
    name: "Ancient",
    text: "ቿሸልጠየረቿ"
  }, {
    name: "Asian",
    text: "乇乂卂爪卩ㄥ乇"
  }, {
    name: "Backwards",
    text: "ɘlqmɒxƎ"
  }, {
    name: "Bent",
    text: "ÆÃ—Ä…ÊÖ„Ó€Ò½"
  }, {
    name: "BlackCircled",
    text: "🅔🅧🅐🅜🅟🅛🅔"
  }, {
    name: "BlackSquare",
    text: "🅴🆇🅰🅼🅿🅻🅴"
  }, {
    name: "Bold",
    text: "𝐄𝐱𝐚𝐦𝐩𝐥𝐞"
  }, {
    name: "BoldCursive",
    text: "𝓔𝔁𝓪𝓶𝓹𝓵𝓮"
  }, {
    name: "BoldGothic",
    text: "𝕰𝖝𝖆𝖒𝖕𝖑𝖊"
  }, {
    name: "BoldItalicsSans",
    text: "𝙀𝙭𝙖𝙢𝙥𝙡𝙚"
  }, {
    name: "BoldItalicsSerif",
    text: "𝑬𝒙𝒂𝒎𝒑𝒍𝒆"
  }, {
    name: "Bracket",
    text: "『E』『x』『a』『m』『p』『l』『e』"
  }, {
    name: "Circled",
    text: "Ⓔⓧⓐⓜⓟⓛⓔ"
  }, {
    name: "Crazy1",
    text: "€⌘ꍏ♔ρ↳€"
  }, {
    name: "Crazy2",
    text: "៩✗♬៣ᖰɭ៩"
  }, {
    name: "Cursive",
    text: "ℰ𝓍𝒶𝓂𝓅𝓁ℯ"
  }, {
    name: "DarkBracket",
    text: "【E】【x】【a】【m】【p】【l】【e】"
  }, {
    name: "DoubleStruck",
    text: "𝔼𝕩𝕒𝕞𝕡𝕝𝕖"
  }, {
    name: "DoubleUnderline",
    text: "E͇x͇a͇m͇p͇l͇e͇"
  }, {
    name: "Emoji",
    text: "🎗❎🅰〽️🅿️👢🎗"
  }, {
    name: "Fireworks",
    text: "E҉x҉a҉m҉p҉l҉e҉"
  }, {
    name: "Flip",
    text: "ǝldɯɐxƎ"
  }, {
    name: "Frame",
    text: "E̺͆x̺͆a̺͆m̺͆p̺͆l̺͆e̺͆"
  }, {
    name: "Gothic",
    text: "𝔈𝔵𝔞𝔪𝔭𝔩𝔢"
  }, {
    name: "Inverted",
    text: "ǝןdɯɐxǝ"
  }, {
    name: "Italics",
    text: "𝘌𝘹𝘢𝘮𝘱𝘭𝘦"
  }, {
    name: "Mirror",
    text: "É˜|qmÉ’xÆŽ"
  }, {
    name: "Mono",
    text: "𝙴𝚡𝚊𝚖𝚙𝚕𝚎"
  }, {
    name: "Musical",
    text: "៩✗♬៣ᖰɭ៩"
  }, {
    name: "Seagull",
    text: "E̼x̼a̼m̼p̼l̼e̼"
  }, {
    name: "SentenceCase",
    text: "Example"
  }, {
    name: "SmallCaps",
    text: "Exᴀᴍᴘʟᴇ"
  }, {
    name: "Square",
    text: "🄴🅇🄰🄼🄿🄻🄴"
  }, {
    name: "Squiggle1",
    text: "ҽxαตթlҽ"
  }, {
    name: "Squiggle2",
    text: "eՃԹʍρʅe"
  }, {
    name: "Stinky",
    text: "E̾x̾a̾m̾p̾l̾e̾"
  }, {
    name: "Strikethrough",
    text: "E̶x̶a̶m̶p̶l̶e̶"
  }, {
    name: "TinyText",
    text: "ᵉˣᵃᵐᵖˡᵉ"
  }, {
    name: "Tribal",
    text: "ꍟꊼꍏꂵꉣ꒒ꍟ"
  }, {
    name: "Underline",
    text: "E͟x͟a͟m͟p͟l͟e͟"
  }, {
    name: "UpperCamel",
    text: "Example"
  }, {
    name: "Vaporwave",
    text: "Ｅｘａｍｐｌｅ"
  }];
}
export {
  FancyText,
  FancyTextV2,
  FontList,
  FontListV2
};