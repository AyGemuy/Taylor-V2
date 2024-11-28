import fetch from "node-fetch";
const headers = {
  "CF-Client-Version": "a-6.11-2223",
  Host: "api.cloudflareclient.com",
  Connection: "Keep-Alive",
  "Accept-Encoding": "gzip",
  "User-Agent": "okhttp/3.12.1",
};
async function getLicenseData(key) {
  try {
    const r1 = await fetch("https://api.cloudflareclient.com/v0a2223/reg", {
      method: "POST",
      headers: headers,
    });
    const {
      id,
      account: { license },
      token,
    } = await r1.json();
    const r2 = await fetch("https://api.cloudflareclient.com/v0a2223/reg", {
      method: "POST",
      headers: headers,
    });
    const { id: id2, token: token2 } = await r2.json();
    const headersPost = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
      ...headers,
    };
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}`, {
      method: "PATCH",
      headers: headersPost,
      body: JSON.stringify({
        referrer: id2,
      }),
    });
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id2}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token2}`,
        ...headers,
      },
    });
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}/account`, {
      method: "PUT",
      headers: headersPost,
      body: JSON.stringify({
        license: key,
      }),
    });
    const r3 = await fetch(
      `https://api.cloudflareclient.com/v0a2223/reg/${id}/account`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      },
    );
    const licenseData = await r3.json();
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });
    return {
      license: licenseData.license,
      quota: licenseData.quota,
      type: licenseData.account_type,
    };
  } catch (e) {
    return null;
  }
}
const handler = async (m, { conn, text }) => {
  if (!text)
    return await conn.reply(
      m.chat,
      "Masukkan key yang ingin di-check, pisahkan dengan koma.",
      m,
    );
  const keyList = text.includes(",") ? text.split(",") : [text];
  const results = [];
  for (const key of keyList) {
    const data = await getLicenseData(key.trim());
    if (data) results.push(data);
  }
  const formattedResults = results
    .map(
      ({ license, quota, type }) =>
        `• License: ${license}\n• Quota: ${quota}\n• Type: ${type}`,
    )
    .join("\n\n");
  const message =
    results.length > 0
      ? `Hasil warp:\n\n${formattedResults}`
      : "Tidak ada data yang ditemukan untuk key yang diberikan.";
  await conn.reply(m.chat, message, m);
};
handler.help = ["warp"].map((v) => v + " <key>");
handler.tags = ["tools"];
handler.command = /^warp$/i;
handler.owner = false;
handler.exp = 0;
handler.limit = false;
export default handler;
