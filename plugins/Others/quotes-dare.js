import fetch from "node-fetch";
const handler = async function (m, { conn, text, command, usedPrefix }) {
  "dare" === command && (await conn.reply(m.chat, await dare(), m)),
    "truth" === command && (await conn.reply(m.chat, await truth(), m)),
    "bucin" === command && (await conn.reply(m.chat, await bucin(), m));
};
(handler.command = handler.help = ["dare", "truth", "bucin"]),
  (handler.tags = ["quotes", "fun"]);
export default handler;
let darejson = [];
let truthjson = [];
let bucinjson = [];
async function dare() {
  if (!darejson.length) {
    const response = await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    darejson = await response.json();
  }
  return darejson[Math.round(darejson.length * Math.random())];
}
async function truth() {
  if (!truthjson.length) {
    const response = await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    truthjson = await response.json();
  }
  return truthjson[Math.floor(truthjson.length * Math.random())];
}
async function bucin() {
  if (!bucinjson.length) {
    const response = await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    bucinjson = await response.json();
  }
  return bucinjson[Math.floor(bucinjson.length * Math.random())];
}
