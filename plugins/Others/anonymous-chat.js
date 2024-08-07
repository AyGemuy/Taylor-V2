const handler = async (m, {
  conn,
  command,
  args
}) => {
  try {
    const input = args[0] ? args[0]?.toLowerCase() : "";
    switch (conn.anonymous = conn.anonymous || {}, input) {
      case "next":
      case "leave": {
        let room = Object.values(conn.anonymous).find(room => room.check(m.sender));
        if (!room) throw "*Kamu tidak sedang berada di anonymous chat*";
        m.reply("Ok");
        let other = room.other(m.sender);
        if (other && await conn.reply(other, "*Partner meninggalkan chat*", m), delete conn.anonymous[room.id], "leave" === input) break;
      }
      case "start": {
        if (Object.values(conn.anonymous).find(room => room.check(m.sender))) throw "*Kamu masih berada di dalam anonymous chat, menunggu partner*";
        let room = Object.values(conn.anonymous).find(room => "WAITING" === room.state && !room.check(m.sender));
        if (room) await conn.reply(room.a, "*Partner ditemukan!*", m), room.b = m.sender,
          room.state = "CHATTING";
        else {
          let id = +new Date();
          conn.anonymous[id] = {
            id: id,
            a: m.sender,
            b: "",
            state: "WAITING",
            check: function(who = "") {
              return [this.a, this.b].includes(who);
            },
            other: function(who = "") {
              return who === this.a ? this.b : who === this.b ? this.a : "";
            }
          }, await conn.reply(m.chat, "*Menunggu partner...*", m);
        }
        break;
      }
      default:
        throw `Command tidak dikenal. Gunakan ${command} start/leave/next`;
    }
  } catch (error) {
    await conn.reply(m.chat, error, m);
  }
};
handler.help = ["anonymous start", "anonymous leave", "anonymous next"], handler.tags = ["anonymous"],
  handler.command = ["anonymous"], handler.private = !0;
export default handler;