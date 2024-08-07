import axios from "axios";
import cheerio from "cheerio";
import PhoneNumber from "awesome-phonenumber";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) return await conn.reply(m.chat, "Masukkan Nomor!", null);
  const number = text.replace(/[^0-9]/g, "").replace(/^08/, "62");
  if (!number.startsWith("62")) return await conn.reply(m.chat, "Only INDONESIA number!", null);
  if (number + "@s.whatsapp.net" === conn.user.jid) return await conn.reply(m.chat, "Is that bot number ?", null);
  if (!await conn.isOnWhatsApp(number + "@s.whatsapp.net")) return await conn.reply(m.chat, "Number not in WhatsApp!", null);
  const internationalNumber = PhoneNumber("+" + number).getNumber("international");
  try {
    const {
      data,
      headers
    } = await axios.get("https://www.whatsapp.com/contact/noclient/"), email = (await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")).data[0], $form = cheerio.load(data)("form"), url = new URL($form.attr("action"), "https://www.whatsapp.com").href, form = new URLSearchParams({
      jazoest: $form.find("input[name=jazoest]").val(),
      lsd: $form.find("input[name=lsd]").val(),
      step: "submit",
      country_selector: "INDONESIA",
      phone_number: internationalNumber,
      email: email,
      email_confirm: email,
      platform: "ANDROID",
      your_message: "Perdido/roubado: desative minha conta",
      __user: "0",
      __a: "1",
      __csr: "",
      __req: "8",
      __hs: "19316.BP:whatsapp_www_pkg.2.0.0.0.0",
      dpr: "1",
      __ccg: "UNKNOWN",
      __rev: "1006630858",
      __comment_req: "0"
    }), {
      data: resData
    } = await axios.post(url, form, {
      headers: {
        cookie: headers["set-cookie"] || ""
      }
    }), payload = String(resData);
    payload.includes('"payload":true') ? await conn.reply(m.chat, "WhatsApp Support\nHai,\nTerima kasih atas pesan Anda.\nKami telah mengaktifkan kembali akun anda.", null) : payload.includes('"payload":false') ? await conn.reply(m.chat, "Halo, \nKami menerima pesan Anda.\nKami tahu bahwa saat ini Anda tidak memiliki akses ke WhatsApp dan kami sedang bekerja\nuntuk memenuhi pesanan Anda.\nKami berterima kasih atas kesabaran Anda dan akan menghubungi Anda sesegera mungkin.\nUntuk informasi lebih lanjut, silakan baca peraturan kami.", null) : await conn.reply(m.chat, await import("utils").format(resData), null);
  } catch (err) {
    await conn.reply(m.chat, `${err}`, null);
  }
};
handler.help = ["unbannedwa"], handler.tags = ["owner"], handler.command = /^(unbannedwa|unbanwa)$/i,
  handler.owner = !0;
export default handler;