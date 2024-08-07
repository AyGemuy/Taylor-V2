const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let enc = {
      a: "•-",
      b: "-•••",
      c: "-•-•",
      d: "-••",
      e: "•",
      f: "••-•",
      g: "--•",
      h: "••••",
      i: "••",
      j: "•---",
      k: "-•-",
      l: "•-••",
      m: "--",
      n: "-•",
      o: "---",
      p: "•--•",
      q: "--•-",
      r: "•-•",
      s: "•••",
      t: "-",
      u: "••-",
      v: "•••-",
      w: "•--",
      x: "-••-",
      y: "-•--",
      z: "--••",
      0: "-----",
      1: "•----",
      2: "••---",
      3: "•••--",
      4: "••••-",
      5: "•••••",
      6: "-••••",
      7: "--•••",
      8: "---••",
      9: "----•",
      "?": "••--••",
      "!": "-•-•--",
      ".": "•-•-•-",
      ",": "--••--",
      ";": "-•-•-•",
      ":": "---•••",
      "+": "•-•-•",
      "-": "-••••-",
      "/": "-••-•",
      "=": "-•••-",
      " ": "/"
    },
    dec = {
      "-----": "0",
      "•----": "1",
      "••---": "2",
      "•••--": "3",
      "••••-": "4",
      "•••••": "5",
      "-••••": "6",
      "--•••": "7",
      "---••": "8",
      "----•": "9",
      "•-": "a",
      "-•••": "b",
      "-•-•": "c",
      "-••": "d",
      "•": "e",
      "••-•": "f",
      "--•": "g",
      "••••": "h",
      "••": "i",
      "•---": "j",
      "-•-": "k",
      "•-••": "l",
      "--": "m",
      "-•": "n",
      "---": "o",
      "•--•": "p",
      "--•-": "q",
      "•-•": "r",
      "•••": "s",
      "-": "t",
      "••-": "u",
      "•••-": "v",
      "•--": "w",
      "-••-": "x",
      "-•--": "y",
      "--••": "z",
      "••--••": "?",
      "-•-•--": "!",
      "•-•-•-": ".",
      "--••--": ",",
      "-•-•-•": ";",
      "---•••": ":",
      "•-•-•": "+",
      "-••••-": "-",
      "-••-•": "/",
      "-•••-": "=",
      "/": " "
    },
    selected = text.toLowerCase().split(" ")[0] + " ";
  if ("encode " === selected) {
    let str = text.replace(selected, "").toLowerCase(),
      Output_Morse = "";
    for (let i of str) {
      enc[i] || (Output_Morse += i);
      for (let j in enc) j === i && (Output_Morse += enc[i] + " ");
    }
    m.reply(Output_Morse);
  } else if ("decode " === selected) {
    let str = text.replace(selected, "").replace(/[.]/g, "•"),
      Output_String = "";
    for (let i of str.split(" ")) {
      dec[i] || (Output_String += i);
      for (let j in dec) j === i && (Output_String += dec[i]);
    }
    m.reply(Output_String);
  } else m.reply(`Morsecode encode/decode\nExample:\n\nencode: ${usedPrefix}${command} encode Hallo Welt\ndecode: ${usedPrefix}${command} decode •••• • •-•• •-•• --- / •-- --- •-• •-•• -••`);
};
handler.help = ["morse"].map(v => v + " <encode|decode>"), handler.tags = ["tools"],
  handler.command = /^(morse)/i;
export default handler;