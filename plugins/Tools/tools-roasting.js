import fetch from "node-fetch";
import * as cheerio from "cheerio";
const handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    let [username, provider] = text.trim().split("|");
    provider = provider?.toLowerCase();
    if (!username || !provider) {
      const buttons = conn.ctaButton
        .setBody(
          `⚙️ *Pilih layanan roasting:*\n- Instagram\n- TikTok\n- Threads\n\nGunakan format berikut untuk memilih layanan:\n\n*roasting [instagram/tiktok/threads] | [username]*`,
        )
        .addSelection("🔍 Pilih layanan")
        .makeSections("📜 Daftar Layanan", "Pilih layanan");
      const services = [
        {
          name: "Instagram",
          key: "instagram",
        },
        {
          name: "TikTok",
          key: "tiktok",
        },
        {
          name: "Threads",
          key: "threads",
        },
      ];
      services.forEach((service) => {
        buttons.makeRow(
          "",
          service.name,
          "Pilih: " + service.name,
          `${usedPrefix}${command} ${username || "username"}|${service.key}`,
        );
      });
      return buttons.run(m.chat, conn, m);
    }
    let result;
    switch (provider) {
      case "instagram":
        result = await roastInstagramUser(username);
        break;
      case "tiktok":
        result = await roastTiktokUser(username);
        break;
      case "threads":
        result = await roastThreadsUser(username);
        break;
      default:
        return m.reply(
          "⚠️ Provider tidak dikenal! Gunakan: *instagram*, *tiktok*, atau *threads*.",
        );
    }
    if (!result) {
      return m.reply("⚠️ Tidak ada data ditemukan.");
    }
    const {
      namaLengkap,
      fotoProfil,
      username: userName,
      followers,
      followings,
      postingan,
      roastingText,
    } = result;
    const output = `*🔥 Roasting User ${provider.charAt(0).toUpperCase() + provider.slice(1)} 🔥*\n\n*Nama:* \`${namaLengkap || "N/A"}\`\n*Username:* \`${userName || "N/A"}\`\n*Pengikut:* \`${followers || 0}\`\n*Mengikuti:* \`${followings || 0}\`\n*Postingan:* \`${postingan || 0}\`\n\n*Roasting:*\n- ${roastingText}`;
    await conn.sendFile(m.chat, fotoProfil || logo, "", output, m);
  } catch (e) {
    console.log(e);
  }
};
handler.help = ["roasting *[instagram/tiktok/threads] | [username]*"];
handler.tags = ["tools"];
handler.command = /^(roasting)$/i;
export default handler;

function formatNumber(num) {
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`;
  }
  return num.toString();
}
async function roastInstagramUser(username) {
  const apiURL = `https://akhirpetang.vercel.app/api/ig?username=${encodeURIComponent(username)}`;
  try {
    const response = await fetch(apiURL, {
      headers: {
        Authorization: "Bearer akhirpetang-09853773678853385327Ab63",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(
        `Akun Instagram dengan username ${username} tidak ditemukan.`,
      );
    }
    const {
      nama_lengkap: namaLengkap,
      username: userNameData,
      jumlah_pengikut: jumlahPengikut,
      jumlah_diikuti: jumlahDiikuti,
      jumlah_postingan: jumlahPostingan,
      foto_profil: fotoProfil,
    } = data;
    const roastingApiURL = `https://roastiges.vercel.app/api/roasting?username=${encodeURIComponent(userNameData)}&biodata=${encodeURIComponent(JSON.stringify(data))}&language=indonesia`;
    const roastingResponse = await fetch(roastingApiURL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!roastingResponse.ok) {
      throw new Error(`HTTP error! Status: ${roastingResponse.status}`);
    }
    const roastingData = await roastingResponse.json();
    const roastingText = roastingData.roasting || "Tidak ada data roasting.";
    return {
      namaLengkap: namaLengkap || "N/A",
      fotoProfil: fotoProfil || "N/A",
      username: userNameData || "N/A",
      followers: formatNumber(jumlahPengikut) || "0 Pengikut",
      followings: formatNumber(jumlahDiikuti) || "0 Mengikuti",
      postingan: formatNumber(jumlahPostingan) || "0 Postingan",
      roastingText: roastingText,
    };
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error.message}`);
  }
}
async function roastTiktokUser(username) {
  const profileUrl = `https://tiktok-roasting.vercel.app/api/tiktok-profile?username=${username}`;
  const roastUrl = `https://tiktok-roasting.vercel.app/api/generate-roast`;
  try {
    const profileResponse = await fetch(profileUrl);
    if (!profileResponse.ok) {
      throw new Error(`HTTP error! Status: ${profileResponse.status}`);
    }
    const profileData = await profileResponse.json();
    if (!profileData || profileData.error) {
      throw new Error("Akun tidak ditemukan.");
    }
    const body = {
      username: profileData.username,
      profile: profileData,
      language: "indonesian",
    };
    const roastResponse = await fetch(roastUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!roastResponse.ok) {
      throw new Error(`HTTP error! Status: ${roastResponse.status}`);
    }
    const roastData = await roastResponse.json();
    const roastingText = roastData.roasting || "Tidak ada data roasting.";
    return {
      namaLengkap: profileData.namaLengkap || "N/A",
      fotoProfil: profileData.fotoProfil || "N/A",
      username: profileData.username || "N/A",
      followers: formatNumber(profileData.pengikut) || "0 Pengikut",
      followings: formatNumber(profileData.mengikuti) || "0 Mengikuti",
      postingan: formatNumber(profileData.postingan) || "0 Postingan",
      roastingText: roastingText,
    };
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error.message}`);
  }
}
async function roastThreadsUser(username) {
  const url = `https://threads-roaster.vercel.app/?u=${encodeURIComponent(username)}&l=id`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const result = {};
    result.username = $(".card-title").text().trim();
    if (!result.username) {
      throw new Error("Akun pengguna tidak ditemukan");
    }
    result.roasting = $(".card-body p").eq(1).text().trim();
    result.postLink = $(".card-actions a").attr("href") || "Tidak ada tautan";
    return {
      namaLengkap: result.username || "N/A",
      fotoProfil: "N/A",
      username: result.username || "N/A",
      followers: "N/A",
      followings: "N/A",
      postingan: "N/A",
      roastingText: result.roasting || "Tidak ada data roasting.",
    };
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error.message}`);
  }
}
