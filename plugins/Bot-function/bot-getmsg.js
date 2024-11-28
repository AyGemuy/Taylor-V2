export async function before(m, { isAdmin, isBotAdmin }) {
  try {
    let chat = db.data.chats[m.chat];
    if (
      m.chat?.endsWith("broadcast") ||
      chat.isBanned ||
      !chat.getmsg ||
      db.data.users[m.sender].banned ||
      m.isBaileys
    )
      return;
    let msgs = db.data.msgs;
    msgs = Object.fromEntries(
      Object.entries(msgs).filter(([, msg]) => msg.message),
    );
    if (!(m.text in msgs)) return;
    let _m = this.serializeM(
      JSON.parse(JSON.stringify(msgs[m.text]), (_, v) =>
        v !== null &&
        typeof v === "object" &&
        "type" in v &&
        v.type === "Buffer" &&
        "data" in v &&
        Array.isArray(v.data)
          ? Buffer.from(v.data)
          : v,
      ),
    );
    await _m.copyNForward(m.chat, false);
  } catch (error) {
    console.error("Error in before function:", error);
  }
}
