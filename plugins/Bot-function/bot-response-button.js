const {
  proto,
  generateWAMessage,
  areJidsSameUser
} = (await import("@whiskeysockets/baileys")).default;
export async function all(m, chatUpdate) {
  try {
    if (m.isBaileys) return;
    if (!m.message) return;
    if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage)) return;
    let id = m.message.buttonsResponseMessage?.selectedButtonId ?? m.message.templateButtonReplyMessage?.selectedId ?? m.message.listResponseMessage?.singleSelectReply?.selectedRowId ?? (() => {
      try {
        const params = JSON.parse(m.message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || "{}");
        return params?.id ?? null;
      } catch (error) {
        return null;
      }
    })();
    let text = m.message.buttonsResponseMessage?.selectedDisplayText ?? m.message.templateButtonReplyMessage?.selectedDisplayText ?? m.message.listResponseMessage?.title ?? m.message.interactiveResponseMessage?.body?.text ?? null;
    const toCmd = id || text;
    if (!toCmd) return;
    await this.appenTextMessage(m, m.prefix ? m.command?.match?.[0]?.[0] + toCmd : toCmd, chatUpdate);
  } catch (error) {
    console.error("Error in processing message:", error);
  }
}