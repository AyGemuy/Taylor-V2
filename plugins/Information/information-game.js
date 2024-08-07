import fetch from "node-fetch";
const handler = async (m, {
  usedPrefix,
  command,
  text,
  args
}) => {
  if ("cekcodid" === command) {
    if (!text) return await conn.reply(m.chat, "Harap Masukan ID COD", m);
    let res = await cekcodid(text);
    await conn.sendFile(m.chat, logo, "result", "*Result:*\n" + res.result, m);
  }
  if ("cekffid" === command) {
    if (!text) return await conn.reply(m.chat, "Harap Masukan ID FF", m);
    let res = await cekffid(text);
    await conn.sendFile(m.chat, logo, "result", "*Result:*\n" + res.result, m);
  }
  if ("cekmlid" === command) {
    if (!text) return await conn.reply(m.chat, "Harap Masukan ID ML", m);
    let res = await cekmlid(text);
    await conn.sendFile(m.chat, logo, "result", "*Result:*\n" + res.result, m);
  }
};
handler.help = ["cekcodid", "cekffid", "cekmlid"].map(v => v + " <id>"), handler.tags = ["internet"],
  handler.command = ["cekcodid", "cekffid", "cekmlid"];
export default handler;
let dt;
async function cekcodid(t) {
  return 0 !== (dt = await (await fetch("https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store", {
    method: "POST",
    body: new URLSearchParams(Object.entries({
      catalogId: 144,
      gameId: t,
      itemId: 88,
      paymentId: 828,
      productId: 18,
      product_ref: "CMS",
      product_ref_denom: "REG"
    }))
  })).json()).status.code ? {
    status: 400,
    message: "Invalid ID",
    result: null
  } : {
    status: 200,
    message: "success",
    result: dt.data.gameDetail.userName
  };
}
async function cekffid(t) {
  return 0 !== (dt = await (await fetch("https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store", {
    method: "POST",
    body: new URLSearchParams(Object.entries({
      catalogId: 66,
      gameId: t,
      itemId: 11,
      paymentId: 750,
      productId: 3,
      product_ref: "AE",
      product_ref_denom: "AE"
    }))
  })).json()).status.code ? {
    status: 400,
    message: "Invalid ID",
    result: null
  } : {
    status: 200,
    message: "success",
    result: dt.data.gameDetail.userName
  };
}
async function cekmlid(t, u) {
  return 0 !== (dt = await (await fetch("https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store", {
    method: "POST",
    body: new URLSearchParams(Object.entries({
      catalogId: 121,
      gameId: t,
      zoneId: u,
      itemId: 66,
      paymentId: 805,
      productId: 1,
      product_ref: "CMS",
      product_ref_denom: "AE"
    }))
  })).json()).status.code ? {
    status: 400,
    message: "Invalid ID",
    result: null
  } : {
    status: 200,
    message: "success",
    result: dt.data.gameDetail.userName
  };
}