import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "input text\nEx. .ttsp hello world\n<command> <tex>";
    text = m.quoted?.text;
  }
  let urut = text.split("|"),
    one = urut[0],
    two = urut[1],
    lis = (urut[2], ["Lotte", "Maxim", "Ayanda", "Salli", "Ola", "Arthur", "Ida", "Tomoko", "Remi", "Geraint", "Miguel", "Elin", "Giorgio", "Marlene", "Ines", "Kajal", "Zhiyu", "Zeina", "Suvi", "Karl", "Gwyneth", "Joanna", "Lucia", "Cristiano", "Astrid", "Andres", "Vicki", "Mia", "Vitoria", "Bianca", "Chantal", "Raveena", "Daniel", "Amy", "Liam", "Ruth", "Kevin", "Brian", "Russell", "Aria", "Matthew", "Aditi", "Dora", "Enrique", "Hans", "Hiujin", "Carmen", "Ivy", "Ewa", "Maja", "Gabrielle", "Nicole", "Filiz", "Camila", "Jacek", "Thiago", "Justin", "Celine", "Kazuha", "Kendra", "Arlet", "Ricardo", "Mads", "Hannah", "Mathieu", "Lea", "Sergio", "Hala", "Tatyana", "Penelope", "Naja", "Olivia", "Ruben", "Laura", "Takumi", "Mizuki", "Carla", "Conchita", "Jan", "Kimberly", "Liv", "Adriano", "Lupe", "Joey", "Pedro", "Seoyeon", "Emma", "Stephen"]);
  if ("ttsp" === command) {
    let listSections = [];
    return Object.keys(lis).map((v, index) => {
      listSections.push(["Model [ " + ++index + " ]", [
        [lis[v], usedPrefix + command + "get " + lis[v] + "|" + text, "➥"]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
  }
  if ("ttspget" === command) try {
    let res = `https://api.pawan.krd/tts?text=${encodeURIComponent(two)}&voice=${one}`;
    await conn.sendFile(m.chat, res, "audio.mp3", "", m, !0, {
      mimetype: "audio/mp4",
      ptt: !0,
      waveform: [100, 0, 100, 0, 100, 0, 100],
      contextInfo: adReplyS.contextInfo
    });
  } catch (e) {
    m.react(eror);
  }
  if ("ttsplist" === command) {
    let res = lis.map((v, index) => ++index + ". " + v).join("\n"),
      nah = `${htki} *L I S T* ${htka}\n*Example* ${usedPrefix + command} Brian|halo\n\n${res}`;
    m.reply(nah);
  }
};
handler.help = ["ttsp"], handler.tags = ["misc"], handler.command = /^(ttsp|ttspget|ttsplist)$/i;
export default handler;