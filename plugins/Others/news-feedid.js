import feedid from "feedid";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if ("antaranews" === command) {
    let antaranews, ar = ["terbaru", "politik", "hukum", "ekonomi", "metro", "bola", "olahraga", "humaniora", "lifestyle", "hiburan", "dunia", "tekno", "otomotif"],
      er = `\n${htjava} *Pilihan Kategori AntaraNews* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} politik\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (antaranews = await feedid.antara.terbaru()), /politik/.test(text) && (antaranews = await feedid.antara.politik()), /hukum/.test(text) && (antaranews = await feedid.antara.hukum()), /ekonomi/.test(text) && (antaranews = await feedid.antara.ekonomi()), /metro/.test(text) && (antaranews = await feedid.antara.metro()), /bola/.test(text) && (antaranews = await feedid.antara.bola()), /olahraga/.test(text) && (antaranews = await feedid.antara.olahraga()), /humaniora/.test(text) && (antaranews = await feedid.antara.humaniora()), /lifestyle/.test(text) && (antaranews = await feedid.antara.lifestyle()), /hiburan/.test(text) && (antaranews = await feedid.antara.hiburan()), /dunia/.test(text) && (antaranews = await feedid.antara.dunia()), /tekno/.test(text) && (antaranews = await feedid.antara.tekno()), /otomotif/.test(text) && (antaranews = await feedid.antara.otomotif()), !1 === antaranews.success) throw antaranews.message;
    let Array = antaranews.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "antaranews.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("cnbc" === command) {
    let cnbc, ar = ["terbaru", "investment", "news", "market", "enterpreneur", "syariah", "tech", "lifestyle", "opini", "profil"],
      er = `\n${htjava} *Pilihan Kategori CNBC* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} investment\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (cnbc = await feedid.cnbc.terbaru()), /investment/.test(text) && (cnbc = await feedid.cnbc.investment()), /news/.test(text) && (cnbc = await feedid.cnbc.news()), /market/.test(text) && (cnbc = await feedid.cnbc.market()), /enterpreneur/.test(text) && (cnbc = await feedid.cnbc.enterpreneur()), /syariah/.test(text) && (cnbc = await feedid.cnbc.syariah()), /tech/.test(text) && (cnbc = await feedid.cnbc.tech()), /lifestyle/.test(text) && (cnbc = await feedid.cnbc.lifestyle()), /opini/.test(text) && (cnbc = await feedid.cnbc.opini()), /profil/.test(text) && (cnbc = await feedid.cnbc.profil()), !1 === cnbc.success) throw cnbc.message;
    let Array = cnbc.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "cnbc.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("cnn" === command) {
    let CNN, ar = ["terbaru", "nasional", "internasional", "ekonomi", "olahraga", "teknologi", "hiburan", "gayaHidup"],
      er = `\n${htjava} *Pilihan Kategori CNN* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\n\nContoh:\n${usedPrefix}${command} investment\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (CNN = await feedid.cnn.terbaru()), /nasional/.test(text) && (CNN = await feedid.cnn.nasional()), /internasional/.test(text) && (CNN = await feedid.cnn.internasional()), /ekonomi/.test(text) && (CNN = await feedid.cnn.ekonomi()), /olahraga/.test(text) && (CNN = await feedid.cnn.olahraga()), /teknologi/.test(text) && (CNN = await feedid.cnn.teknologi()), /hiburan/.test(text) && (CNN = await feedid.cnn.hiburan()), /gayaHidup/.test(text) && (CNN = await feedid.cnn.gayaHidup()), !1 === CNN.success) throw CNN.message;
    let Array = CNN.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "cnn.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("jpnn" === command) {
    let JPNN = await feedid.jpnn.terbaru();
    if (!1 === JPNN.success) throw JPNN.message;
    let Array = JPNN.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "JPNN.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("kumparan" === command) {
    let kumparan = await feedid.kumparan.terbaru();
    if (!1 === kumparan.success) throw kumparan.message;
    let Array = kumparan.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "kumparan.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("merdeka" === command) {
    let merdekadotcom, ar = ["terbaru", "jakarta", "dunia", "gaya", "olahraga", "teknologi", "otomotif", "khas", "sehat", "jabar", "jatim", "jateng", "sumut"],
      er = `\n${htjava} *Pilihan Kategori Merdeka* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} bisnis\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (merdekadotcom = await feedid.merdeka.terbaru()), /jakarta/.test(text) && (merdekadotcom = await feedid.merdeka.jakarta()), /dunia/.test(text) && (merdekadotcom = await feedid.merdeka.dunia()), /gaya/.test(text) && (merdekadotcom = await feedid.merdeka.gaya()), /olahraga/.test(text) && (merdekadotcom = await feedid.merdeka.olahraga()), /teknologi/.test(text) && (merdekadotcom = await feedid.merdeka.teknologi()), /otomotif/.test(text) && (merdekadotcom = await feedid.merdeka.otomotif()), /khas/.test(text) && (merdekadotcom = await feedid.merdeka.khas()), /sehat/.test(text) && (merdekadotcom = await feedid.merdeka.sehat()), /jabar/.test(text) && (merdekadotcom = await feedid.merdeka.jabar()), /jatim/.test(text) && (merdekadotcom = await feedid.merdeka.jatim()), /jateng/.test(text) && (merdekadotcom = await feedid.merdeka.jateng()), /sumut/.test(text) && (merdekadotcom = await feedid.merdeka.sumut()), !1 === merdekadotcom.success) throw merdekadotcom.message;
    let Array = merdekadotcom.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "merdekadotcom.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("okezone" === command) {
    let okezonedotcom, ar = ["terbaru", "celebrity", "sports", "otomotif", "economy", "techno", "lifestyle", "bola"],
      er = `\n${htjava} *Pilihan Kategori Okezone* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} bisnis\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (okezonedotcom = await feedid.okezone.terbaru()), /celebrity/.test(text) && (okezonedotcom = await feedid.okezone.celebrity()), /sports/.test(text) && (okezonedotcom = await feedid.okezone.sports()), /otomotif/.test(text) && (okezonedotcom = await feedid.okezone.otomotif()), /economy/.test(text) && (okezonedotcom = await feedid.okezone.economy()), /techno/.test(text) && (okezonedotcom = await feedid.okezone.techno()), /lifestyle/.test(text) && (okezonedotcom = await feedid.okezone.lifestyle()), /bola/.test(text) && (okezonedotcom = await feedid.okezone.bola()), !1 === okezonedotcom.success) throw okezonedotcom.message;
    let Array = okezonedotcom.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "okezonedotcom.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("republika" === command) {
    let republikadotcom, ar = ["terbaru", "news", "daerah", "khazanah", "islam", "internasional", "leisure", "bola"],
      er = `\n${htjava} *Pilihan Kategori Republika* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} bisnis\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (republikadotcom = await feedid.republika.terbaru()), /news/.test(text) && (republikadotcom = await feedid.republika.news()), /daerah/.test(text) && (republikadotcom = await feedid.republika.daerah()), /khazanah/.test(text) && (republikadotcom = await feedid.republika.khazanah()), /islam/.test(text) && (republikadotcom = await feedid.republika.islam()), /internasional/.test(text) && (republikadotcom = await feedid.republika.internasional()), /leisure/.test(text) && (republikadotcom = await feedid.republika.leisure()), /bola/.test(text) && (republikadotcom = await feedid.republika.bola()), !1 === republikadotcom.success) throw republikadotcom.message;
    let Array = republikadotcom.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "republikadotcom.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("sindo" === command) {
    let sindonews, ar = ["terbaru", "nasional", "metro", "ekbis", "international", "daerah", "sports", "otomotif", "tekno", "sains", "edukasi", "lifestyle", "kalam"],
      er = `\n${htjava} *Pilihan Kategori sindonews* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} bisnis\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (sindonews = await feedid.sindonews.terbaru()), /nasional/.test(text) && (sindonews = await feedid.sindonews.nasional()), /metro/.test(text) && (sindonews = await feedid.sindonews.metro()), /ekbis/.test(text) && (sindonews = await feedid.sindonews.ekbis()), /international/.test(text) && (sindonews = await feedid.sindonews.international()), /daerah/.test(text) && (sindonews = await feedid.sindonews.daerah()), /sports/.test(text) && (sindonews = await feedid.sindonews.sports()), /otomotif/.test(text) && (sindonews = await feedid.sindonews.otomotif()), /tekno/.test(text) && (sindonews = await feedid.sindonews.tekno()), /sains/.test(text) && (sindonews = await feedid.sindonews.sains()), /edukasi/.test(text) && (sindonews = await feedid.sindonews.edukasi()), /lifestyle/.test(text) && (sindonews = await feedid.sindonews.lifestyle()), /kalam/.test(text) && (sindonews = await feedid.sindonews.kalam()), !1 === sindonews.success) throw sindonews.message;
    let Array = sindonews.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "sindonews.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("suara" === command) {
    let suaradotcom, ar = ["terbaru", "bisnis", "bola", "lifestyle", "entertaiment", "otomotif", "tekno", "health"],
      er = `\n${htjava} *Pilihan Kategori Suara.com* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} bisnis\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (suaradotcom = await feedid.suara.terbaru()), /bisnis/.test(text) && (suaradotcom = await feedid.suara.bisnis()), /bola/.test(text) && (suaradotcom = await feedid.suara.bola()), /lifestyle/.test(text) && (suaradotcom = await feedid.suara.lifestyle()), /entertaiment/.test(text) && (suaradotcom = await feedid.suara.entertaiment()), /tekno/.test(text) && (suaradotcom = await feedid.suara.tekno()), /otomotif/.test(text) && (suaradotcom = await feedid.suara.otomotif()), /health/.test(text) && (suaradotcom = await feedid.suara.health()), !1 === suaradotcom.success) throw suaradotcom.message;
    let Array = suaradotcom.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "suaradotcom.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("temponews" === command) {
    let tempo, ar = ["nasional", "bisnis", "metro", "dunia", "bola", "cantik", "tekno", "otomotif", "seleb", "gaya", "travel", "difabel", "creativelab", "inforial", "event"],
      er = `\n${htjava} *Pilihan Kategori TEMPO* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} recent\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/nasional/.test(text) && (tempo = await feedid.tempo.nasional()), /bisnis/.test(text) && (tempo = await feedid.tempo.bisnis()), /metro/.test(text) && (tempo = await feedid.tempo.metro()), /dunia/.test(text) && (tempo = await feedid.tempo.dunia()), /bola/.test(text) && (tempo = await feedid.tempo.bola()), /cantik/.test(text) && (tempo = await feedid.tempo.cantik()), /tekno/.test(text) && (tempo = await feedid.tempo.tekno()), /otomotif/.test(text) && (tempo = await feedid.tempo.otomotif()), /seleb/.test(text) && (tempo = await feedid.tempo.seleb()), /gaya/.test(text) && (tempo = await feedid.tempo.gaya()), /travel/.test(text) && (tempo = await feedid.tempo.travel()), /difabel/.test(text) && (tempo = await feedid.tempo.difabel()), /creativelab/.test(text) && (tempo = await feedid.tempo.creativelab()), /inforial/.test(text) && (tempo = await feedid.tempo.inforial()), /event/.test(text) && (tempo = await feedid.tempo.event()), !1 === tempo.success) throw tempo.message;
    let Array = tempo.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "tempo.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
  if ("tribunnews" === command) {
    let tribun, ar = ["terbaru", "bisnis", "superskor", "sport", "seleb", "lifestyle", "travel", "parapuan", "otomotif", "techno", "kesehatan"],
      er = `\n${htjava} *Pilihan Kategori tribun* ${htjava}\n${ar.map(v => cmenub + v).join`\n`}\n${cmenuf}\n\nContoh:\n${usedPrefix}${command} bisnis\n`.trim();
    if (!text) throw er;
    if (!ar.includes(text)) throw er;
    if (/terbaru/.test(text) && (tribun = await feedid.tribun.terbaru()), /bisnis/.test(text) && (tribun = await feedid.tribun.bisnis()), /superskor/.test(text) && (tribun = await feedid.tribun.superskor()), /sport/.test(text) && (tribun = await feedid.tribun.sport()), /travel/.test(text) && (tribun = await feedid.tribun.travel()), /parapuan/.test(text) && (tribun = await feedid.tribun.parapuan()), /otomotif/.test(text) && (tribun = await feedid.tribun.otomotif()), /techno/.test(text) && (tribun = await feedid.tribun.techno()), /lifestyle/.test(text) && (tribun = await feedid.tribun.lifestyle()), /kesehatan/.test(text) && (tribun = await feedid.tribun.kesehatan()), !1 === tribun.success) throw tribun.message;
    let Array = tribun.data.posts,
      news = Array[Math.floor(Math.random() * Array.length)];
    if (!news.thumbnail) throw "ERROR\nGagal Mengambil Berita";
    await conn.sendFile(m.chat, news.thumbnail, "tribun.png", `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m);
  }
};
handler.tags = ["news"], handler.help = ["antaranews", "cnbc", "cnn", "jpnn", "kumparan", "merdeka", "okezone", "republika", "sindo", "suara", "temponews", "tribunnews"].map(v => v + " <query>"),
  handler.command = ["antaranews", "cnbc", "cnn", "jpnn", "kumparan", "merdeka", "okezone", "republika", "sindo", "suara", "temponews", "tribunnews"];
export default handler;