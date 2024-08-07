import {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC,
  DisconnectReason
} from "@whiskeysockets/baileys";
import {
  makeWASocket
} from "../../lib/simple.js";
import path from "path";
import {
  fileURLToPath,
  pathToFileURL
} from "url";
import fs from "fs";
import pino from "pino";
import NodeCache from "node-cache";
import yargs from "yargs";
let isInit = !1;
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply(`Masukkan Nomor!\n\nContoh: *${usedPrefix + command}* ${m.sender.split("@")[0]}`);
  if (!conn.user.jid) return m.reply(`Tidak dapat membuat *Jadibot* pada ${conn.user.jid.split("@")[0]}`);
  const __dirname = await __dirname(process.argv[1]),
    {
      state,
      saveCreds
    } = await useMultiFileAuthState("jadibot/" + m.sender.split("@")[0]),
    {
      version
    } = await fetchLatestBaileysVersion(),
    config = {
      printQRInTerminal: !1,
      mobile: !1,
      version: version,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      markOnlineOnConnect: !0,
      generateHighQualityLinkPreview: !0,
      msgRetryCounterCache: new NodeCache(),
      defaultQueryTimeoutMs: void 0,
      logger: pino({
        level: "fatal"
      }),
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino().child({
          level: "silent",
          stream: "store"
        }))
      }
    };
  async function reloadHandler(restartConn) {
    let handler = await import("../../handler.js");
    if (restartConn) {
      try {
        connection.ws.close();
      } catch {}
      return connection = {
          ...connection,
          ...makeWASocket(config)
        }, isInit || (connection.ev.off("messages.upsert", connection.handler), connection.ev.off("group-participants.update", connection.participantsUpdate), connection.ev.off("message.delete", connection.onDelete), connection.ev.off("connection.update", connection.connectionUpdate), connection.ev.off("creds.update", connection.credsUpdate)), connection.handler = handler.handler.bind(connection),
        connection.participantsUpdate = handler.participantsUpdate.bind(connection), connection.onDelete = handler.deleteUpdate.bind(connection),
        connection.connectionUpdate = connectionUpdate.bind(connection), connection.credsUpdate = saveCreds.bind(connection),
        connection.ev.on("messages.upsert", connection.handler), connection.ev.on("group-participants.update", connection.participantsUpdate),
        connection.ev.on("message.delete", connection.onDelete), connection.ev.on("connection.update", connection.connectionUpdate),
        connection.ev.on("creds.update", connection.credsUpdate), isInit = !1, !0;
    }
  }
  connection = makeWASocket(config), connection.ev.on("connection.update", async update => {
    const {
      connection,
      lastDisconnect
    } = update;
    "connecting" === connection ? await conn.reply(m.chat, `Menghubungkan dengan Jadibot...\n*${wait}*`, m) : "open" === connection ? await conn.reply(m.chat, `Terhubung dengan *Jadibot*\n\n• Peserta: *@${m.sender.split("@")[0]}*`, m) : "close" === connection && await conn.reply(m.chat, "Tidak terhubung dengan *Jadibot*.", m),
      lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && console.log(await reloadHandler(!0));
  }), connection.authState.creds.registered || setTimeout(async () => {
    let phoneNumber = text.replace(/[^0-9]/g, "");
    Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)) || (phoneNumber = text.replace(/[^0-9]/g, ""));
    try {
      const code = await connection.requestPairingCode(phoneNumber),
        yourCode = code?.match(/.{1,4}/g)?.join("-") || code,
        msgReply = await conn.reply(m.chat, "```Masukkan kode dibawah ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk perangkat tertaut\n3. Ketuk tautkan perangkat\n4. Ketuk tautkan dengan nomer telepon saja\n5. Masukkan kode di bawah ini\n\nNote: kode dapat expired kapan saja!```", m);
      await conn.reply(m.chat, yourCode, msgReply);
    } catch (error) {
      console.error("Error requesting pairing code:", error), await conn.reply(m.chat, "Gagal membuat bot sementara, coba lagi nanti.", m);
    }
  }, 3e3), reloadHandler();
};
handler.help = ["pairing"], handler.tags = ["owner"], handler.command = /^(pairing)$/i,
  handler.owner = !0;
export default handler;