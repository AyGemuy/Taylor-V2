export async function before(m) {
  let user = db.data.users[m.sender];
  if (!(m.quoted?.fromMe && m.quoted?.isBaileys && m.text)) return true;
  this.registrasi = this.registrasi || {};
  if (!this.registrasi[m.sender] || m.quoted.id !== this.registrasi[m.sender].MSG.key.id) return;
  let txt = m.msg?.selectedDisplayText || m.text || "";
  if (!txt) {
    return await conn.reply(m.sender, "Masukkan input OTP!", m);
  }
  if (txt === this.registrasi[m.sender].OTP) {
    user.name = this.registrasi[m.sender].NAME.trim();
    user.age = this.registrasi[m.sender].AGE;
    user.regTime = +new Date();
    user.registered = true;
    let benar = `✨ OTP Benar!\n@${m.sender.split("@")[0]} telah diverifikasi!\n\n`;
    await this.sendMessage(m.sender, {
      image: this.registrasi[m.sender].VERIFIED,
      caption: benar + this.registrasi[m.sender].CAPTION,
      mentions: [m.sender]
    }, {
      quoted: m
    });
    clearTimeout(this.registrasi[m.sender].timeout);
    await this.sendMessage(m.sender, {
      delete: this.registrasi[m.sender].MSG.key
    });
    delete this.registrasi[m.sender];
  } else {
    let salah = `✖️ OTP Salah!\n@${m.sender.split("@")[0]} tidak diverifikasi!`;
    await this.sendMessage(m.sender, {
      text: salah,
      mentions: [m.sender]
    }, {
      quoted: m
    });
    clearTimeout(this.registrasi[m.sender].timeout);
    await this.sendMessage(m.sender, {
      delete: this.registrasi[m.sender].MSG.key
    });
    delete this.registrasi[m.sender];
  }
  return true;
}