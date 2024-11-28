const handler = async (m, { conn, command, args, usedPrefix }) => {
  const input = args[0] ? args[0]?.toLowerCase() : "";
  switch (((db.data.game.anonymous = db.data.game.anonymous || {}), input)) {
    case "next":
    case "leave": {
      let room = Object.values(db.data.game.anonymous).find((room) =>
        room.check(m.sender),
      );
      if (!room) {
        await conn.reply(
          m.chat,
          `🚫 *Tidak ada sesi anonymous chat yang aktif.*\n\nGunakan *${usedPrefix}${command} start* untuk memulai sesi baru.`,
          m,
          {
            ...adReplyS,
            contextInfo: {},
          },
        );
        return;
      }
      m.reply("✔️ *Sesi chat telah ditinggalkan.*");
      let other = room.other(m.sender);
      if (other) {
        await conn.reply(
          other,
          `❗ *Partner meninggalkan chat.*\n\nJika ingin melanjutkan, gunakan *${usedPrefix}${command} start* untuk mencari partner baru.`,
          m,
          {
            ...adReplyS,
            contextInfo: {},
          },
        );
      }
      delete db.data.game.anonymous[room.id];
      if (input === "leave") return;
      break;
    }
    case "start": {
      if (
        Object.values(db.data.game.anonymous).find((room) =>
          room.check(m.sender),
        )
      ) {
        await conn.reply(
          m.chat,
          `⚠️ *Anda masih berada di dalam sesi chat.*\n\nTunggu partner atau gunakan *${usedPrefix}${command} leave* untuk keluar dari sesi aktif.`,
          m,
          {
            ...adReplyS,
            contextInfo: {},
          },
        );
        return;
      }
      let room = Object.values(db.data.game.anonymous).find(
        (room) => "WAITING" === room.state && !room.check(m.sender),
      );
      if (room) {
        await conn.reply(
          room.a,
          `🎉 *Partner ditemukan!*\n\nSesi chat dimulai, selamat berkomunikasi.`,
          m,
          {
            ...adReplyS,
            contextInfo: {},
          },
        );
        room.b = m.sender;
        room.state = "CHATTING";
      } else {
        let id = +new Date();
        db.data.game.anonymous[id] = {
          id: id,
          a: m.sender,
          b: "",
          state: "WAITING",
          check: function (who = "") {
            return [this.a, this.b].includes(who);
          },
          other: function (who = "") {
            return who === this.a ? this.b : who === this.b ? this.a : "";
          },
        };
        await conn.reply(
          m.chat,
          `⏳ *Menunggu partner baru...*\n\nKami sedang mencari partner untuk Anda. Harap tunggu sebentar.`,
          m,
          {
            ...adReplyS,
            contextInfo: {},
          },
        );
      }
      break;
    }
    default:
      await conn.reply(
        m.chat,
        `❓ *Perintah tidak dikenali.*\n\nGunakan *${usedPrefix}${command} start*, *${usedPrefix}${command} leave*, atau *${usedPrefix}${command} next* untuk mengelola sesi chat Anda.`,
        m,
        {
          ...adReplyS,
          contextInfo: {},
        },
      );
  }
};
handler.help = ["anonymous start", "anonymous leave", "anonymous next"];
handler.tags = ["anonymous"];
handler.command = ["anonymous"];
handler.private = true;
export default handler;
