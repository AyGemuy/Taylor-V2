import cheerio from "cheerio";
import axios from "axios";
const repoList = ["archive", "guardian", "iod", "kali", "main", "metatrans", "mobilsicher", "nit", "wind"];
const handler = async (m, {
  conn,
  text
}) => {
  try {
    const query = text.split(" ");
    if (query.length === 0) {
      return m.reply("Cara Penggunaan:\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
    }
    if (query.length === 1) {
      const page = parseInt(query[0]);
      if (isNaN(page) || page <= 0) {
        return m.reply("Cara Penggunaan:\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
      }
      const buttons = conn.ctaButton.setBody("Pilih repo dari daftar berikut:").addSelection("Pilih repo").makeSections("Daftar Repo", "Pilih salah satu repo");
      repoList.forEach((repo, index) => {
        buttons.makeRow("", `Repo ${index + 1}`, repo, `.izzysoft ${page} ${index + 1}`);
      });
      buttons.run(m.chat, conn, m);
      return;
    }
    if (query.length === 2) {
      const [pageStr, repoIndexStr] = query;
      const page = parseInt(pageStr);
      const repoIndex = parseInt(repoIndexStr);
      if (isNaN(page) || page <= 0) {
        return m.reply("Nomor halaman tidak valid. Gunakan angka positif.\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
      }
      if (isNaN(repoIndex) || repoIndex < 1 || repoIndex > repoList.length) {
        return m.reply("Repo tidak valid. Pilih angka yang sesuai untuk repo.\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
      }
      const repo = repoList[repoIndex - 1];
      m.react(wait);
      const apkList = await getApk(repo, page);
      if (apkList.length === 0) {
        return m.reply("Tidak ada APK yang ditemukan untuk repo ini pada halaman tersebut.\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
      }
      const buttons = conn.ctaButton.setBody("List APK:\n" + apkList.map((apk, index) => `${index + 1}. ${apk.title}`).join("\n")).addSelection("Pilih APK").makeSections("Daftar APK", "Pilih salah satu APK");
      apkList.forEach((apk, index) => {
        buttons.makeRow("", `APK ${index + 1}`, apk.title, `.izzysoft ${page} ${repoIndex} ${index + 1}`);
      });
      buttons.run(m.chat, conn, m);
      return;
    }
    if (query.length === 3) {
      const [pageStr, repoIndexStr, apkIndexStr] = query;
      const page = parseInt(pageStr);
      const repoIndex = parseInt(repoIndexStr);
      const apkIndex = parseInt(apkIndexStr);
      if (isNaN(page) || page <= 0) {
        return m.reply("Nomor halaman tidak valid. Gunakan angka positif.\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
      }
      if (isNaN(repoIndex) || repoIndex < 1 || repoIndex > repoList.length) {
        return m.reply("Repo tidak valid. Pilih angka yang sesuai untuk repo.\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
      }
      if (isNaN(apkIndex) || apkIndex < 1) {
        return m.reply("Index APK tidak valid. Pilih angka yang sesuai untuk APK.\nMasukkan nomor halaman terlebih dahulu dengan format 'izzysoft <page>'.\n\nContoh:\n`izzysoft 1`");
      }
      const repo = repoList[repoIndex - 1];
      const apkList = await getApk(repo, page);
      if (apkIndex > apkList.length) {
        return m.reply(`Index APK tidak valid. Pilih angka dari 1 hingga ${apkList.length}.`);
      }
      const selectedApk = apkList[apkIndex - 1];
      const message = `*📂 Hasil*\n\n- *Title:* ${selectedApk.title}\n- *Version:* ${selectedApk.version}\n- *Date:* ${selectedApk.date || "Tidak diketahui"}\n- *License:* ${selectedApk.license || "Tidak diketahui"}\n- *Info:* ${selectedApk.info || "Tidak diketahui"}\n- *Download Links:* ${selectedApk.downloadLinks[0] || "Tidak diketahui"}`;
      m.reply(message);
      m.react(sukses);
    } else {
      m.reply("Format input tidak valid. Gunakan format 'izzysoft <page> <repo> <apk>'.");
    }
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = ["izzysoft"];
handler.tags = ["tools"];
handler.command = /^(izzysoft)$/i;
export default handler;
async function getApk(repo, page) {
  try {
    const url = `https://apt.izzysoft.de/fdroid/index.php/list/page/${page}?limit=10;repo=${repo}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $(".approw").map((index, element) => {
      const title = $(element).find(".boldname").text().trim();
      const [version, date] = $(element).find(".minor-details").eq(0).text().trim().split(" / ");
      return {
        title: title,
        version: version,
        date: date,
        license: $(element).find(".minor-details").eq(1).text().trim(),
        info: $(element).find(".appdetailcell").eq(3).text().trim(),
        downloadLinks: $(element).find('.paddedlink[href^="https://"]').map((index, linkElement) => $(linkElement).attr("href")).get()
      };
    }).get();
  } catch (error) {
    console.error(error);
    return [];
  }
}