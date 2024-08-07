const {
  DisconnectReason,
  MessageRetryMap,
  useSingleFileAuthState,
  fetchLatestBaileysVersion,
  toBuffer
} = (await import("@whiskeysockets/baileys")).default;
import WebSocket from "ws";
import qrcode from "qrcode";
import {
  makeWASocket,
  protoType,
  serialize
} from "../../lib/simple.js";
import store from "../../lib/store-single.js";
import fs from "fs";
import {
  createRequire
} from "module";
const {
  groupsUpdate
} = await import("../../handler.js");
const isNumber = x => typeof x === "number" && !isNaN(x);
let tryConnect = [];
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command,
  isOwner
}) => {
  let conns = conn;
  if (conn.user.jid !== conns.user.jid) return m.reply("Tidak bisa membuat Bot pada user jadibot!");
  let auth = false;
  let authFile = "plugins/jadibot/" + m.sender.split("@")[0] + ".data.json";
  let isInit = !fs.existsSync(authFile);
  let id = conns.length;
  let {
    state,
    saveState
  } = store.useSingleFileAuthState(authFile);
  let {
    version
  } = await fetchLatestBaileysVersion();
  const config = {
    version: version,
    printQRInTerminal: false,
    auth: state,
    receivedPendingNotifications: false
  };
  conn = makeWASocket(config);
  let ev = conn.ev;
  let date = new Date();
  let timestamp = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  conn.timestamp = timestamp;
  async function needUpdate(update) {
    const {
      connection,
      lastDisconnect,
      qr
    } = update;
    date = new Date();
    console.log(update);
    timestamp = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    conn.timestamp = timestamp;
    if (qr) {
      if (!isNumber(tryConnect[m.sender])) tryConnect[m.sender] = 0;
      if (tryConnect[m.sender] === 3) {
        tryConnect[m.sender] = 0;
        return m.reply("Waktu scan qr kamu sudah habis!");
      }
      let scan = await conns.sendFile(m.chat, await qrcode.toDataURL(qr, {
        scale: 8
      }), "qrcode.png", "*[ JADI BOT ]*\n" + readMore + "\nScan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk Whatsapp Web\n3. Scan QR ini\nQR Expired dalam 20 detik\nKalau Sudah Scan ketik lagi .jadibot sampai notif berhasil terhubung", m);
      setTimeout(() => {
        conns.sendMessage(m.chat, {
          delete: scan.key
        });
      }, 3e4);
      tryConnect[m.sender] += 1;
    }
    if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
      tryConnect(true);
      m.reply("Connecting...");
    } else if (connection === "open") {
      conns.reply(m.chat, `Berhasil Tersambung dengan WhatsApp mu.\n*NOTE: Cuma Numpang!*\nNomor: ${conn.user.jid.split("@")[0]}\nJoin: ${timestamp}\n`, m);
      tryConnect[m.sender] = 0;
      conns[m.sender] = conn;
    } else if (connection === "close") {
      m.reply("koneksi terputus!! wait...");
    } else {
      m.reply("Report Owner! BugError: " + lastDisconnect.error.output);
    }
  }
  tryConnect = function tryConnect(restatConn, close) {
    conn.welcome = "Hai, @user!\nSelamat datang di grup @subject\n\n@desc";
    conn.bye = "Selamat tinggal @user!";
    conn.spromote = "@user sekarang admin!";
    conn.sdemote = "@user sekarang bukan admin!";
    conn.handler = handler.bind(conn);
    conn.connectionUpdate = needUpdate.bind(conn);
    conn.credsUpdate = saveState.bind(conn);
    conn.onGroupUpdate = groupsUpdate.bind(conn);
    if (restatConn) {
      try {
        conn.ws.close();
      } catch {}
      conn = {
        ...conn,
        ...simple.makeWASocket(config)
      };
    }
    if (!isInit || !close) {
      ev.off("messages.upsert", conn.handler);
      ev.off("group-participants.update", conn.onGroupUpdate);
      ev.off("connection.update", conn.connectionUpdate);
      ev.off("creds.update", conn.credsUpdate);
    }
    ev.on("messages.upsert", conn.handler);
    ev.on("connection.update", conn.connectionUpdate);
    ev.on("creds.update", conn.credsUpdate);
    ev.on("group-participants.update", conn.onGroupUpdate);
    isInit = false;
    return true;
  };
  await tryConnect();
};
handler.help = ["scanbot"];
handler.tags = ["jadibot", "baileys"];
handler.command = /^scanbot$/i;
handler.private = true;
export default handler;
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);