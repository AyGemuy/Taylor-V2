import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let imgr = flaaa.getRandom(),
    urut = text.split("|"),
    one = urut[1],
    two = urut[2],
    three = urut[3];
  if ("cts" === command) {
    if (!args[0]) {
      let caption = `*MASUKKAN TEKS:*\nContoh:\n${usedPrefix + command} popular\n\n*List:*\n${htjava} cat\n${htjava} tag\n${htjava} gif\n${htjava} say\n${htjava} tsay\n${htjava} csay\n${htjava} gsay\n${htjava} width\n${htjava} type\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("cat" === args[0]) {
      let res = "https://cataas.com/cat",
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("tag" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |white`);
      let res = "https://cataas.com/cat/" + one,
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("gif" === args[0]) {
      let res = "https://cataas.com/cat/gif",
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("say" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |halo`);
      let res = "https://cataas.com/cat/says/" + one,
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("tsay" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |cute|white`);
      let res = "https://cataas.com/cat/" + one + "/says/" + two,
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("csay" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |hello|50|red`);
      let res = "https://cataas.com/cat/says/" + one + "?size=" + two + "&color=" + three,
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("type" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |hq`);
      let res = "https://cataas.com/cat?type=" + one,
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("width" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |100`);
      let res = "https://cataas.com/cat?width=" + one,
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
    if ("gsay" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`);
      let res = "https://cataas.com/cat/gif/says/" + one + "?filter=sepia&color=orange&size=40&type=or",
        caption = "*Result:*";
      await conn.sendFile(m.chat, res, "", caption, m);
    }
  }
  if ("museum" === command) {
    if (!args[0]) {
      let caption = `*MASUKKAN TEKS:*\nContoh:\n${usedPrefix + command} q |Contoh\n\n*List:*\n${htjava} high\n${htjava} id\n${htjava} q\n${htjava} onview\n${htjava} aoc\n${htjava} med\n${htjava} img\n${htjava} loc\n${htjava} time\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("high" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=" + one,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("id" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |123456`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + one,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*accessionNumber:* ${json.accessionNumber}\n*accessionYear:* ${json.accessionYear}\n*artistAlphaSort:* ${json.artistAlphaSort}\n*artistBeginDate:* ${json.artistBeginDate}\n*artistDisplayBio:* ${json.artistDisplayBio}\n*artistDisplayName:* ${json.artistDisplayName}\n*artistEndDate:* ${json.artistEndDate}\n*artistGender:* ${json.artistGender}\n*artistNationality:* ${json.artistNationality}\n*artistPrefix:* ${json.artistPrefix}\n*artistRole:* ${json.artistRole}\n*artistSuffix:* ${json.artistSuffix}\n*artistULAN_URL:* ${json.artistULAN_URL}\n*artistWikidata_URL:* ${json.artistWikidata_URL}\n*city:* ${json.city}\n*classification:* ${json.classification}\n*constituents.constituentID:* ${json.constituents.constituentID}\n*constituents.constituentULAN_URL:* ${json.constituents.constituentULAN_URL}\n*constituents.constituentWikidata_URL:* ${json.constituents.constituentWikidata_URL}\n*constituents.gender:* ${json.constituents.gender}\n*constituents.name:* ${json.constituents.name}\n*constituents.role:* ${json.constituents.role}\n*country:* ${json.country}\n*county:* ${json.county}\n*creditLine:* ${json.creditLine}\n*culture:* ${json.culture}\n*department:* ${json.department}\n*dimensions:* ${json.dimensions}\n*dynasty:* ${json.dynasty}\n*excavation:* ${json.excavation}\n*GalleryNumber:* ${json.GalleryNumber}\n*geographyType:* ${json.geographyType}\n*isHighlight:* ${json.isHighlight}\n*isPublicDomain:* ${json.isPublicDomain}\n*isTimelineWork:* ${json.isTimelineWork}\n*linkResource:* ${json.linkResource}\n*locale:* ${json.locale}\n*locus:* ${json.locus}\n*medium:* ${json.medium}\n*metadataDate:* ${json.metadataDate}\n*objectBeginDate:* ${json.objectBeginDate}\n*objectDate:* ${json.objectDate}\n*objectEndDate:* ${json.objectEndDate}\n*objectID:* ${json.objectID}\n*objectName:* ${json.objectName}\n*objectURL:* ${json.objectURL}\n*objectWikidata_URL:* ${json.objectWikidata_URL}\n*period:* ${json.period}\n*portfolio:* ${json.portfolio}\n*primaryImageSmall:* ${json.primaryImageSmall}\n*primaryImage:* ${json.primaryImage}\n*region:* ${json.region}\n*reign:* ${json.reign}\n*repository:* ${json.repository}\n*rightsAndReproduction:* ${json.rightsAndReproduction}\n*river:* ${json.river}\n*state:* ${json.state}\n*subregion:* ${json.subregion}\n*title:* ${json.title}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("q" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + one,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("onview" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=" + one,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("aoc" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=" + one,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("med" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Medium|Query`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?medium=" + one + "&q=" + two,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("img" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=" + one,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("loc" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Location|Query`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=" + one + "&q=" + two,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
    if ("time" === args[0]) {
      if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Awal|Akhir|Query`);
      let res = "https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=" + one + "&dateEnd=" + two + "&q=" + three,
        gas = await fetch(res),
        json = await gas.json(),
        caption = `*Result:*\n*Total:* ${json.total}\n*ID:* ${Array.from(json.objectIDs)}\n`;
      await conn.sendFile(m.chat, imgr + command, "", caption, m);
    }
  }
};
handler.command = handler.help = ["cts", "museum"], handler.tags = ["internet"];
export default handler;