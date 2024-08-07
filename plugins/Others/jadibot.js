const {
  useMultiFileAuthState,
  DisconnectReason,
  Browsers
} = await import("@whiskeysockets/baileys");
import qrcode from "qrcode";
import fs from "fs";
import P from "pino";
import * as ws from "ws";
const {
  child,
  spawn,
  exec
} = await import("child_process");
const {
  CONNECTING
} = ws;
import {
  makeWASocket,
  protoType,
  serialize
} from "../../lib/simple.js";
let check1 = "NjBhZGVmZWI4N2M2";
let check2 = "ZThkMmNkOGVlMDFmZD";
let check3 = "UzYTI1MTQgIGluZ";
let check4 = "m8tZG9uYXIuanMK";
let check5 = "NzZjM2ZmMzU2MTEyMzM3OTczOWU5ZmFmMDZjYzUzO";
let check6 = "DcgIF9hdXRvcmVzcG9uZGVyLmpzCjU5Yzc0ZjFjNmEz";
let check8 = "NjNmYmJjYzA1YmFiY2MzZGU4MGRlICBpbmZvLWJvdC5qcwo";
let crm1 = "Y2QgcGx1Z2lucy";
let crm2 = "A7IG1kNXN1b";
let crm3 = "SBpbmZvLWRvbmFyLmpz";
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz";
let drm1 = "CkphZGlib3QsIEhlY2hv";
let drm2 = "IHBvciBAQWlkZW5fTm90TG9naWM";
let rtx = `${author}

*Pindai kode QR ini untuk menjadi Bot (SubBot), Anda dapat menggunakan perangkat lain untuk memindai*

*Langkah-langkah untuk memindai:*
*1.- Ketuk tiga titik di sudut kanan atas di beranda WhatsApp Anda*
*2.- Ketuk WhatsApp web atau perangkat yang sudah terhubung*
*3.- Pindai kode QR ini*
*Kode QR berlaku selama 60 detik!!*


*Anda dapat mengirimkan ID yang diberikan ke bot secara pribadi untuk menghubungkan kembali bot tanpa harus memindai kode lagi, kode ini dimulai dengan /serbot.*
*Ingatlah untuk keluar dari grup ketika Anda menjadi bot*

Proses ini 100% Aman.`;
let conns = [];
if (conns instanceof Array) console.log();
else conns = [];
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command,
  isOwner
}) => {
  let parentw = conn;
  if (conn.user.jid !== conn.user.jid) return parentw.reply(m.chat, "Perintah ini hanya dapat digunakan di bot utama! wa.me/" + conn.user.jid.split("@")[0], m);
  const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
  exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
    const buffdr = Buffer.from(check1 + check2 + check3 + check4 + check5 + check6 + check8 + "=", "base64");
    const drmer = Buffer.from(drm1 + drm2, "base64");
    async function jddt() {
      function randomString(length) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
        if (!length) {
          length = Math.floor(Math.random() * chars.length);
        }
        var str = "";
        for (var i = 0; i < length; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
      }
      let uniqid = randomString(10);
      if (!fs.existsSync("./jadibot/" + uniqid)) {
        fs.mkdirSync("./jadibot/" + uniqid, {
          recursive: true
        });
      }
      args[0] ? fs.writeFileSync("./jadibot/" + uniqid + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t")) : "";
      const {
        state,
        saveState,
        saveCreds
      } = await useMultiFileAuthState("./jadibot/" + uniqid);
      const connectionOptions = {
        printQRInTerminal: true,
        auth: state,
        logger: P({
          level: "silent"
        }),
        browser: ["Chrome (Linux)", "", ""]
      };
      let conn = makeWASocket(connectionOptions);
      conn.isInit = false;
      let isInit = true;
      async function connectionUpdate(update) {
        const {
          connection,
          lastDisconnect,
          isNewLogin,
          qr
        } = update;
        if (isNewLogin) conn.isInit = true;
        if (qr) parentw.sendMessage(m.chat, {
          image: await qrcode.toBuffer(qr, {
            scale: 8
          }),
          caption: rtx + drmer.toString("utf-8")
        }, {
          quoted: m
        });
        const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        console.log(code);
        if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONNECTING) {
          let i = conns.indexOf(conn);
          if (i < 0) return console.log(await creloadHandler(true).catch(console.error));
          delete conns[i];
          conns.splice(i, 1);
          if (code !== DisconnectReason.connectionClosed) {
            parentw.sendMessage(m.chat, {
              text: "Koneksi ditutup, akan mencoba untuk terhubung kembali secara otomatis..."
            }, {
              quoted: m
            });
            console.log(await creloadHandler(true).catch(console.error));
          } else {
            parentw.sendMessage(m.chat, {
              text: "Koneksi ditutup, Anda harus terhubung kembali secara manual..."
            }, {
              quoted: m
            });
          }
        }
        if (db.data === null) loadDatabase();
        if (connection === "open") {
          conn.isInit = true;
          conns.push(conn);
          await parentw.sendMessage(m.chat, {
            text: args[0] ? "Berhasil terhubung ✅" : "*Berhasil terhubung✅* Dalam beberapa detik, kami akan mengirimkan ID yang harus Anda gunakan untuk terhubung kembali... Kirimkan ini ke bot secara pribadi ketika bot terputus."
          }, {
            quoted: m
          });
          await sleep(5e3);
          if (!args[0]) parentw.sendMessage(m.chat, {
            text: usedPrefix + command + " " + Buffer.from(fs.readFileSync("./jadibot/" + uniqid + "/creds.json"), "utf-8").toString("base64")
          }, {
            quoted: m
          });
        }
      }
      setInterval(async () => {
        if (!conn.user) {
          try {
            conn.ws.close();
          } catch {}
          conn.ev.removeAllListeners();
          let i = conns.indexOf(conn);
          if (i < 0) return;
          delete conns[i];
          conns.splice(i, 1);
        }
      }, 6e4);
      let handler = await import("../../handler.js");
      let creloadHandler = async function(restatConn) {
        try {
          const Handler = await import(`../../handler.js?update=${Date.now()}`).catch(console.error);
          if (Object.keys(Handler || {}).length) handler = Handler;
        } catch (e) {
          console.error(e);
        }
        if (restatConn) {
          try {
            conn.ws.close();
          } catch {}
          conn.ev.removeAllListeners();
          conn = makeWASocket(connectionOptions);
          isInit = true;
        }
        if (!isInit) {
          conn.ev.off("messages.upsert", conn.handler);
          conn.ev.off("group-participants.update", conn.participantsUpdate);
          conn.ev.off("groups.update", conn.groupsUpdate);
          conn.ev.off("message.delete", conn.onDelete);
          conn.ev.off("connection.update", conn.connectionUpdate);
          conn.ev.off("creds.update", conn.credsUpdate);
        }
        conn.welcome = "*┊↳🔰┊ Selamat datang di grup!!*\n*━━━━━━━━━━━━━━━━*\n\n👤 *• Nama:* @user\n📝 *• Deskripsi:* \n\n• ❝@desc❞\n\n🥀 *Nikmati waktu Anda di grup ini.*";
        conn.bye = "*★════◈◈◈════★*\n┃• Selamat tinggal👋 *@user*\n┃• Pergilah dengan damai -*\n*★════◈◈◈════★*";
        conn.spromote = "*┊↳🔰┊ @user Sekarang adalah Admin 👻*";
        conn.sdemote = "*┊↳🔰┊ @user Tidak lagi menjadi Admin 〽️*";
        conn.sDesc = "*┊↳🔰┊ Deskripsi grup telah diubah*\n\n*Deskripsi baru:* @desc";
        conn.sSubject = "*┊↳🔰┊ Nama grup telah diubah*\n*Nama Baru:* @subject";
        conn.sIcon = "*┊↳🔰┊ Gambar grup diperbarui!!*";
        conn.sRevoke = "*┊↳🔰┊ Link grup telah diperbarui*\n*Link Baru:* @revoke";
        conn.handler = handler.handler.bind(conn);
        conn.participantsUpdate = handler.participantsUpdate.bind(conn);
        conn.groupsUpdate = handler.groupsUpdate.bind(conn);
        conn.onDelete = handler.deleteUpdate.bind(conn);
        conn.connectionUpdate = connectionUpdate.bind(conn);
        conn.credsUpdate = saveCreds.bind(conn, true);
        conn.ev.on("messages.upsert", conn.handler);
        conn.ev.on("group-participants.update", conn.participantsUpdate);
        conn.ev.on("groups.update", conn.groupsUpdate);
        conn.ev.on("message.delete", conn.onDelete);
        conn.ev.on("connection.update", conn.connectionUpdate);
        conn.ev.on("creds.update", conn.credsUpdate);
        isInit = false;
        return true;
      };
      creloadHandler(false);
    }
    jddt();
  });
};
handler.help = ["jadibot"];
handler.tags = ["jadibot"];
handler.command = /^(jadibot)/i;
handler.owner = true;
handler.private = true;
handler.limit = false;
export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}