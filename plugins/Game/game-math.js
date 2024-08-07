const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  conn.math = conn.math ? conn.math : {};
  Object.keys(modes).map(v => [v, `${usedPrefix}${command} ${v}`]);
  if (args.length < 1) return await conn.reply(m.chat, `\n  Mode: ${Object.keys(modes).join(" | ")}\n  Contoh penggunaan: ${usedPrefix}math medium\n  `.trim(), m);
  let mode = args[0]?.toLowerCase();
  if (!(mode in modes)) return await conn.reply(m.chat, `\n  Mode: ${Object.keys(modes).join(" | ")}\n  Contoh penggunaan: ${usedPrefix}math medium\n    `.trim(), m);
  let id = m.chat;
  if (id in conn.math) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.math[id][0]);
  let math = genMath(mode);
  conn.math[id] = [await conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1e3).toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} XP`, m), math, 4, setTimeout(async () => {
    conn.math[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${math.result}`, conn.math[id][0]),
      delete conn.math[id];
  }, math.time)];
};
handler.help = ["math"].map(v => v + " <mode>"), handler.tags = ["game"], handler.command = /^math/i;
let modes = {
    noob: [-3, 3, -3, 3, "+-", 15e3, 10],
    easy: [-10, 10, -10, 10, "*/+-", 2e4, 40],
    medium: [-40, 40, -20, 20, "*/+-", 4e4, 150],
    hard: [-100, 100, -70, 70, "*/+-", 6e4, 350],
    extreme: [-999999, 999999, -999999, 999999, "*/", 99999, 9999],
    impossible: [-99999999999, 99999999999, -99999999999, 999999999999, "*/", 3e4, 35e3],
    impossible2: [-999999999999999, 999999999999999, -999, 999, "/", 3e4, 5e4]
  },
  operators = {
    "+": "+",
    "-": "-",
    "*": "×",
    "/": "÷"
  };

function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode], a = randomInt(a1, a2), b = randomInt(b1, b2), op = pickRandom([...ops]), result = new Function(`return ${a} ${op.replace("/", "*")} ${b < 0 ? `(${b})` : b}`)();
  return "/" === op && ([a, result] = [result, a]), {
    str: `${a} ${operators[op]} ${b}`,
    mode: mode,
    time: time,
    bonus: bonus,
    result: result
  };
}

function randomInt(from, to) {
  return from > to && ([from, to] = [to, from]), from = Math.floor(from), to = Math.floor(to),
    Math.floor((to - from) * Math.random() + from);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
handler.modes = modes;
export default handler;