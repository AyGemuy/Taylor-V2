import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command
}) => {
  let frep = {
      contextInfo: {
        externalAdReply: {
          title: wm,
          body: author,
          sourceUrl: snh,
          thumbnail: fs.readFileSync("./thumbnail.jpg")
        }
      }
    },
    imgr = flaaa.getRandom();
  if ("urlscan" === command) {
    if (!text) throw "Masukkan link";
    let json = await fetch(`https://urlscan.io/api/v1/search/?q=${text}`),
      caption = (await json.json()).results.map((x, index) => `*Result:* ke - ${1 + index}\n\n*visibility:* ${x.task.visibility}\n*method:* ${x.task.method}\n*domain:* ${x.task.domain}\n*time:* ${x.task.time}\n*uuid:* ${x.task.uuid}\n*url:* ${x.task.url}\n*uniqIPs:* ${x.stats.uniqIPs}\n*uniqCountries:* ${x.stats.uniqCountries}\n*dataLength:* ${x.stats.dataLength}\n*encodedDataLength:* ${x.stats.encodedDataLength}\n*country:* ${x.page.country}\n*ip:* ${x.page.ip}\n*url:* ${x.page.url}\n*result:* ${x.result}`.trim()).join("\n\n");
    await conn.reply(m.chat, caption, m, frep);
  }
  if ("fotoduck" === command) {
    let res = await fetch("https://random-d.uk/api/random"),
      x = await res.json();
    await conn.sendButton(m.chat, `*Duck:*\n  ${x.message}`, wm, x.url, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("fotobear" === command) {
    let nih = `Contoh:\n${usedPrefix + command} lebar tinggi\n${usedPrefix + command} 600 600`;
    if (!args[0]) throw nih;
    if (!args[1]) throw nih;
    let res = `https://placebear.com/${args[0]}/${args[1]}`;
    await conn.sendButton(m.chat, `*Bear:*\n  ${args[0]}`, wm, res, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("fotodog" === command) {
    let nih = `Contoh:\n${usedPrefix + command} lebar tinggi\n${usedPrefix + command} 600 600`;
    if (!args[0]) throw nih;
    if (!args[1]) throw nih;
    let res = `https://place.dog/${args[0]}/${args[1]}`;
    await conn.sendButton(m.chat, `*Dog:*\n  ${args[0]}`, wm, res, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("fotodog2" === command) {
    let res = await fetch("https://random.dog/woof.json"),
      x = await res.json();
    await conn.sendButton(m.chat, `*Dog:*\n  ${command}`, wm, x.url, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("fotodog3" === command) {
    let res = await fetch("https://dog.ceo/api/breeds/image/random"),
      x = await res.json();
    await conn.sendButton(m.chat, `*Dog:*\n  ${command}`, wm, x.message, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("fotofox" === command) {
    let res = await fetch("https://randomfox.ca/floof/"),
      x = await res.json();
    await conn.sendButton(m.chat, `*Fox:*\n  ${x.link}`, wm, x.image, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("fotoshibe" === command) {
    let res = await fetch("https://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true"),
      x = await res.json();
    await conn.sendButton(m.chat, `*Shibe:*\n  ${command}`, wm, x.getRandom(), [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("kitten" === command) {
    let nih = `Contoh:\n${usedPrefix + command} lebar tinggi\n${usedPrefix + command} 600 600`;
    if (!args[0]) throw nih;
    if (!args[1]) throw nih;
    let res = "https://placekitten.com/" + Number(args[0]) + "/" + Number(args[1]);
    await conn.sendButton(m.chat, `*Kitten:*\n  ${command}`, wm, res, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("drinks" === command) {
    let res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php"),
      x = await res.json();
    await conn.sendButton(m.chat, `*drinks:*\n\n  *idDrink:* ${x.drinks[0]?.idDrink}\n  *Drink:* ${x.drinks[0]?.strDrink}\n  *Category:* ${x.drinks[0]?.strCategory}\n  *Glass:* ${x.drinks[0]?.strGlass}\n  *Instructions:* ${x.drinks[0]?.strInstructions}`, wm, x.drinks[0]?.strDrinkThumb, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("rules" === command) {
    let caption = `${htki} *RULES* ${htka}\n\n_Kebijakan privasi atau Private without being in public_\n\n\n\n• *Kebijakan Privasi:*\n1. WhatsApp Bot tidak akan merekam data riwayat chat user.\n2. WhatsApp Bot tidak akan menyebarkan nomor users.\n3. WhatsApp Bot tidak akan menyimpan media yang dikirimkan oleh users.\n4. WhatsApp Bot tidak akan menyalah gunakan data data users.\n5. Owner WhatsApp Bot berhak melihat data riwayat chat users.\n6. Owner WhatsApp Bot berhak melihat status users.\n7. Owner WhatsApp Bot dapat melihat riwayat chat, dan media yang dikirimkan users.\n\n• Jika ada bug/eror di website kami saya mohon untuk Report nya, tanpa biaya dan aman\n\n_Cara penggunaan ${namebot} Agar terhindar dari Suspand_\n\n• *Peraturan WhatsApp Bot:*\n1. Users dilarang menelpon maupun memvideo call nomor bot.\n2. Users dilarang mengirimkan berbagai bug, virtex, dll ke nomor bot.\n3. Users diharap tidak melakukan spam dalam penggunaan bot.\n4. Users dilarang menambahkan nomor bot secara illegal, untuk menambahkan silahkan hubungi Owner.\n5. Users diharap untuk tidak menyalah gunakan fitur fitur bot.\n\n• *Note:*\n1. Jika ada yang menjual/beli/sewa bot atas nomor ini, harap segera hubungi owner!\n2. Jika ingin donasi bisa langsung aja ya social payment Dana \n3. Ketik .sewa Jika Ingin SewaBot \n\n•Agar terhindar dari Suspand/Ban kalian bisa membaca juga di Peraturan kami.\n\n•Perlu kalian tahu bahwa kami menjaga Privasi dari data-data anda!\n\n• *Syarat Ketentuan WhatsApp Bot:*\n\n1. WhatsApp Bot akan keluar dari group jika ada salah satu member melanggar peraturan.\n2. WhatsApp Bot dapan mem-ban users secara sepihak terlepas dari users salah atau tidak.\n3. WhatsApp Bot tidak akan bertanggungjawab atas apapun yang users lakukan terhadap fitur bot.\n4. WhatsApp Bot akan memberlakukan hukuman: block atau ban terhadap users yang melanggar peraturan.\n5. WhatsApp Bot bertanggung jawab atas kesalahan fatal dalam programing maupun owner.\n`;
    await conn.sendButton(m.chat, caption, wm, `${imgr + command}`, [
      ["Ok!", `${usedPrefix}tts id Oke`]
    ], fakes, adReply);
  }
  if ("repeat" === command) {
    if (!args[0]) throw "Cth. .repeat 7|Hai";
    let urut = text.split("|"),
      string = "\n" + urut[1],
      count = urut[0],
      caption = string.repeat(count);
    await conn.reply(m.chat, caption, m, frep);
  }
  if ("say" === command) {
    if (!args[0]) throw `Use example .${command} halo`;
    m.reply(`${text}`.trim(), null, m.mentionedJid ? {
      mentions: m.mentionedJid
    } : {});
  }
  if ("repeat2" === command) {
    if (!args[0]) throw "Cth. .repeat2 7|Hai";
    let urut = text.split("|"),
      caption = "",
      i = 1;
    for (; i < `${urut[0]}`;) caption += "\n" + i + " " + `${urut[1]}`, i++;
    await conn.reply(m.chat, caption, m, frep);
  }
  if ("dmpsearch" === command) {
    if (!text) throw "Masukkan Teks";
    let res = await fetch(`https://psbdmp.ws/api/v3/search/${text}`),
      teks = (await res.json()).data.map(v => {
        `\n*Result:*\n\n*ID:* ${v.id}\n*length:* ${v.length}\n*time:* ${v.time}\n*text:* ${v.text}\n      `.trim();
      }).filter(v => v).join("\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n");
    await conn.sendButton(m.chat, teks, wm, imgr + "Dmp", [
      ["dmpdown!", `${usedPrefix}dmpdown`]
    ], fakes, adReply);
  }
  if ("dmpdown" === command) {
    if (!text) throw "Masukkan ID \n*Cth ID:* on0uMeNd";
    let json = await fetch(`https://psbdmp.ws/api/v3/dump/${text}?key=6143730c1db586446444f0ec92799891`),
      x = await json.json(),
      caption = `*⎔┉━「 ${command} 」━┉⎔*\n`;
    caption += `*Result:*\n\n*ID:* ${x.id}\n*length:* ${x.length}\n*time:* ${x.date}\n*content:* ${x.content}\n  `,
      await conn.reply(m.chat, caption, m, frep);
  }
};
handler.command = handler.help = ["urlscan", "fotoduck", "fotobear", "fotodog", "fotodog2", "fotodog3", "fotofox", "fotoshibe", "kitten", "drinks", "rules", "say", "repeat", "repeat2", "dmpsearch", "dmpdown"],
  handler.tags = ["random"];
export default handler;