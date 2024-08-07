export async function before(m) {
  try {
    let id = m.chat,
      timeout = 18e4,
      reward = randomInt(100, 8e4),
      users = db.data.users[m.sender],
      body = "string" == typeof m.text && !isNaN(m.text) && parseInt(m.text);
    if (this.bomb = this.bomb ? this.bomb : {}, /^((me)?nyerah|surr?ender)$/i.test(m.text) && this.bomb && id in this.bomb && (await this.reply(m.chat, "🚩 Menyerah", m), clearTimeout(this.bomb[id][2]), delete this.bomb[id]), this.bomb[id] && m.quoted && m.quoted?.id === this.bomb[id][3].id && !isNaN(body)) {
      let json = this.bomb[id][1].find(v => v.position === body);
      if (!this.bomb[id][1].find(v => v.player === m.sender)) return await this.reply(m.chat, "🚩 Bukan sesi permainanmu.", m);
      if (!json) return await this.reply(m.chat, "🚩 Untuk membuka kotak kirim angka 1 - 9", this.bomb[id][0]);
      if (!1 === body || body < 1 || body > 9) return await this.reply(m.chat, "🚩 Masukkan angka antara 1 - 9.", m);
      if ("💥" === json.emot) {
        json.state = !0;
        let bomb = this.bomb[id][1],
          teks = "乂  *B O M B*\n\n";
        teks += bomb.slice(0, 3).map(v => v.state ? v.emot : v.number).join("") + "\n",
          teks += bomb.slice(3, 6).map(v => v.state ? v.emot : v.number).join("") + "\n",
          teks += bomb.slice(6).map(v => v.state ? v.emot : v.number).join("") + "\n\n", teks += `Timeout : [ *${timeout / 1e3 / 60} menit* ]\n`,
          teks += `*Permainan selesai!*, kotak berisi bom terbuka : (- *${formatNumber(reward)}*)`,
          await this.reply(m.chat, teks, this.bomb[id][0]).then(() => {
            users.exp < reward ? users.exp = 0 : users.exp -= reward, clearTimeout(this.bomb[id][2]),
              delete this.bomb[id];
          });
      } else {
        if (json.state) return await this.reply(m.chat, `🚩 Kotak ${json.number} sudah di buka silahkan pilih kotak yang lain.`, this.bomb[id][0]);
        {
          json.state = !0;
          let changes = this.bomb[id][1];
          if (changes.filter(v => v.state && "💥" != v.emot).length >= 8) {
            let teks = "乂  *B O M B*\n\n";
            teks += "Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n",
              teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join("") + "\n",
              teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join("") + "\n",
              teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join("") + "\n\n",
              teks += `Timeout : [ *${timeout / 1e3 / 60} menit* ]\n`, teks += `*Permainan selesai!* kotak berisi bom tidak terbuka : (+ *${formatNumber(reward)}*)`,
              await this.reply(m.chat, teks, this.bomb[id][0]).then(() => {
                users.exp += reward, clearTimeout(this.bomb[id][2]), delete this.bomb[id];
              });
          } else {
            let teks = "乂  *B O M B*\n\n";
            teks += "Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n",
              teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join("") + "\n",
              teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join("") + "\n",
              teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join("") + "\n\n",
              teks += `Timeout : [ *${timeout / 1e3 / 60} menit* ]\n`, teks += `Kotak berisi bom tidak terbuka : (+ *${formatNumber(reward)}*)`,
              this.sendMessage(m.chat, {
                text: teks,
                edit: this.bomb[id][3]
              }).then(() => {
                users.exp += reward;
              });
          }
        }
      }
    }
  } catch (e) {
    return await this.reply(m.chat, e, m);
  }
  return !0;
}
export const exp = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
  return number.toLocaleString();
}