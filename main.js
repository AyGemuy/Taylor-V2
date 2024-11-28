import os from "os";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { loadConfig } from "./config.js";
import Helper from "./lib/helper.js";
import { createRequire } from "module";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
import * as glob from "glob";
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  createWriteStream,
} from "fs";
import * as fs from "fs/promises";
import yargs from "yargs";
import { spawn } from "child_process";
import lodash from "lodash";
import chalk from "chalk";
import ora from "ora";
const spinner = ora({
  spinner: "moon",
  color: "blue",
  text: "Loading...\n",
  prefixText: chalk.bold.green("Progress:"),
  isEnabled: true,
  hideCursor: true,
});
import syntaxerror from "syntax-error";
import chokidar from "chokidar";
import { format, promisify } from "util";
import colors from "colors";
import { Boom } from "@hapi/boom";
import { default as Pino } from "pino";
import { default as PinoPretty } from "pino-pretty";
import moment from "moment-timezone";
moment.locale("id");
const stream = PinoPretty({
  sync: true,
  singleLine: false,
  colorize: true,
  levelFirst: false,
  messageKey: "msg",
  timestampKey: "time",
  translateTime: "dd-mmmm-yyyy hh:MM TT",
  ignore: "pid,hostname",
  customColors:
    "info:bgBlueBright,error:bgRedBright,fatal:bgRedBright,warn:bgYellowBright,debug:bgGreenBright,trace:bgCyanBright",
  messageFormat: "{msg}\n⤵️\n",
  customPrettifiers: {
    payload: (value) =>
      format(value, {
        depth: null,
        breakLength: 4,
        colors: true,
      }),
  },
});
import { makeWASocket, protoType, serialize } from "./lib/simple.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { mongoDB, mongoDBV2 } from "./lib/mongoDB.js";
import { cloudDBAdapter } from "./lib/cloudDBAdapter.js";
const {
  Browsers,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  proto,
  PHONENUMBER_MCC,
  delay,
  DisconnectReason,
  makeInMemoryStore,
  useMultiFileAuthState,
  MessageRetryMap,
} = await (
  await import("@whiskeysockets/baileys")
).default;
import NodeCache from "node-cache";
import inquirer from "inquirer";
import parsePhoneNumber from "awesome-phonenumber";
import single2multi from "./lib/single2multi.js";
import storeSystem from "./lib/store-multi.js";
const pairingCode = Helper.opts["pairing-code"];
const useMobile = Helper.opts["mobile"];
const useQr = Helper.opts["qr"];
const singleToMulti = Helper.opts["singleauth"];
const askQuestion = async (text) => {
  console.clear();
  const answer = await inquirer.prompt({
    type: "input",
    name: "input",
    message: text,
    prefix: "📱",
    validate: (value) => {
      if (!/^\+?\d+$/.test(value)) console.clear();
      return (
        /^\+?\d+$/.test(value) ||
        "Format nomor ponsel tidak valid. Masukkan nomor ponsel sesuai format internasional.\n(format internasional, contoh: +1234567890 atau 1234567890)"
      );
    },
    onClose: () => console.log(chalk.yellow("Prompt ditutup.")),
  });
  const result = answer.input;
  console.log(
    chalk.bgGreen.black("\n🎉 Berhasil untuk nomor:"),
    chalk.yellow(result),
  );
  return result;
};
const msgRetryCounterCache = new NodeCache();
const msgRetryCounterMap = (MessageRetryMap) => {};
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
protoType();
serialize();
await loadConfig();
global.API = Helper.API;
Object.assign(global, {
  ...Helper,
  timestamp: {
    start: Date.now(),
  },
});
const directoryName = Helper.__dirname(import.meta.url);
console.log("Directory Name: " + directoryName);
global.opts = new Object(Helper.opts);
global.prefix = Helper.prefix;
const dbUrl = opts.db || opts.dbv2 || "";
const dbName = opts._[0] ? `${opts._[0]}_database.json` : "database.json";
const dbInstance = !dbUrl
  ? new JSONFile(dbName)
  : /^https?:\/\//.test(dbUrl)
    ? new cloudDBAdapter(dbUrl)
    : /^mongodb(\+srv)?:\/\//i.test(dbUrl) && opts.db
      ? new mongoDB(dbUrl)
      : /^mongodb(\+srv)?:\/\//i.test(dbUrl) && opts.dbv2
        ? new mongoDBV2(dbUrl)
        : new JSONFile(dbName);
global.db = new Low(dbInstance);
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  return db.READ
    ? new Promise((resolve) => {
        const intervalId = setInterval(async () => {
          if (!db.READ) {
            clearInterval(intervalId);
            resolve(db.data === null ? await loadDatabase() : db.data);
          }
        }, 1 * 1e3);
      })
    : db.data === null
      ? ((db.READ = true),
        await db.read().catch((e) => console.log(e)),
        (db.READ = null),
        (db.data = {
          users: {},
          chats: {},
          stats: {},
          msgs: {},
          sticker: {},
          settings: {},
          database: {},
          dbai: {},
          rpg: {},
          game: {},
          dbbot: {},
          ...db.data,
        }),
        (db.chain = lodash.chain(db.data)),
        null)
      : null;
};
await loadDatabase();
global.authFolder = storeSystem.fixFileName(
  `${Helper.opts._[0] || ""}TaylorSession`,
);
global.authFile = `${Helper.opts._[0] || "session"}.data.json`;
const [isCredsExist, isAuthSingleFileExist, authState] = await Promise.all([
  Helper.checkFilesExist(authFolder + "/creds.json"),
  Helper.checkFilesExist(authFile),
  useMultiFileAuthState(authFolder) ||
    storeSystem.useMultiFileAuthState(authFolder),
]);
const logger = Pino(
  {
    level: "fatal",
    serializers: {
      err: Pino.stdSerializers.err,
    },
  },
  stream,
);
process
  .on("unhandledRejection", (err, promise) =>
    logger.error(
      {
        err: err,
        promise: promise,
      },
      "Unhandled Rejection",
    ),
  )
  .on("rejectionHandled", (promise) =>
    logger.error(
      {
        promise: promise,
      },
      "Rejection Handled",
    ),
  )
  .on("uncaughtException", (err, origin) =>
    logger.error(
      {
        err: err,
        origin: origin,
      },
      "Uncaught Exception",
    ),
  )
  .on("unhandledPromiseRejection", (reason, promise) =>
    logger.error(
      {
        reason: reason,
        promise: promise,
      },
      "Unhandled Promise Rejection",
    ),
  )
  .on("SIGTERM", () => logger.error("Received SIGTERM signal"))
  .on("SIGINT", () => logger.error("Received SIGINT signal"))
  .on("SIGUSR1", () => logger.error("Received SIGUSR1 signal"))
  .on("SIGUSR2", () => logger.error("Received SIGUSR2 signal"))
  .on("beforeExit", (code) =>
    logger.warn(
      {
        code: code,
      },
      "Process Before Exit",
    ),
  )
  .on("exit", (code) =>
    logger.error(
      {
        code: code,
      },
      "Process Exit",
    ),
  )
  .on("warning", (warning) => null)
  .on("disconnect", () => logger.warn("Node Disconnected"))
  .on("message", (message) =>
    logger.info(
      {
        message: message,
      },
      "Node Message",
    ),
  )
  .on("multipleResolves", (type, promise) => null)
  .on("childProcess", (childProcess) =>
    logger.info(
      {
        childProcess: childProcess,
      },
      "Child Process Event",
    ),
  );
global.store =
  makeInMemoryStore({
    logger: logger,
  }) ||
  storeSystem.makeInMemoryStore({
    logger: logger,
  });
if (Helper.opts["singleauth"] || Helper.opts["singleauthstate"]) {
  if (!isCredsExist && isAuthSingleFileExist) {
    console.debug(
      chalk.bold.blue("- singleauth -"),
      chalk.bold.yellow("creds.json not found"),
      chalk.bold.green("compiling singleauth to multiauth..."),
    );
    await single2multi(authFile, authFolder, authState);
    console.debug(
      chalk.bold.blue("- singleauth -"),
      chalk.bold.green("compiled successfully"),
    );
    authState =
      (await useMultiFileAuthState(authFolder)) ||
      (await storeSystem.useMultiFileAuthState(authFolder));
  } else if (!isAuthSingleFileExist)
    console.error(
      chalk.bold.blue("- singleauth -"),
      chalk.bold.red("singleauth file not found"),
    );
}
const storeFile = `${Helper.opts._[0] || "data"}.store.json`;
store.readFromFile(storeFile);
const { version, isLatest } = await fetchLatestBaileysVersion();
console.log(`Using WA v${version.join(".")}, isLatest: ${isLatest}`);
const connectionOptions = {
  version,
  logger: logger,
  ...(!pairingCode &&
    !useMobile &&
    !useQr && {
      printQRInTerminal: false,
      mobile: !useMobile,
    }),
  ...(pairingCode && {
    printQRInTerminal: !pairingCode,
  }),
  ...(useMobile && {
    mobile: !useMobile,
  }),
  ...(useQr && {
    printQRInTerminal: true,
  }),
  auth: {
    creds: authState.state.creds,
    keys: makeCacheableSignalKeyStore(
      authState.state.keys,
      logger.child({
        level: "fatal",
      }),
    ),
  },
  browser: Browsers.ubuntu("Chrome"),
  generateHighQualityLinkPreview: true,
  defaultQueryTimeoutMs: 0,
  markOnlineOnConnect: true,
  getMessage: async (key) =>
    (
      (await store.loadMessage(key.remoteJid, key.id)) ||
      (await store.loadMessage(key.id)) ||
      {}
    ).message || undefined,
};
global.conn = makeWASocket(connectionOptions);
store.bind(conn.ev);
conn.isInit = false;
if (pairingCode && !conn.authState.creds.registered) {
  if (useMobile) {
    console.log("\nCannot use pairing code with mobile api");
  }
  console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
  console.log(
    chalk.bold.redBright(`📨 ${"Please type your WhatsApp number"}:`),
  );
  console.log(chalk.bold.cyan("├──────────────────────────────────────···"));
  let phoneNumber = await askQuestion(`   ${chalk.bold.cyan("- Number")}: `);
  console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
  phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
  if (!Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))) {
    console.log(
      chalk.bold.cyan("╭─────────────────────────────────────────────────···"),
    );
    console.log(
      chalk.bold.redBright(
        `💬 ${"Start with your country's WhatsApp code, Example 62xxx"}:`,
      ),
    );
    console.log(
      chalk.bold.cyan("╰─────────────────────────────────────────────────···"),
    );
    console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
    console.log(
      chalk.bold.redBright(`📨 ${"Please type your WhatsApp number"}:`),
    );
    console.log(chalk.bold.cyan("├──────────────────────────────────────···"));
    phoneNumber = await askQuestion(`   ${chalk.bold.cyan("- Number")}: `);
    console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
  }
  await delay(3e3);
  let code = await conn.requestPairingCode(phoneNumber);
  code = code.match(/.{1,4}/g).join("-") || code;
  console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
  console.log(` 💻 ${chalk.bold.redBright("Your Pairing Code")}:`);
  console.log(chalk.bold.cyan("├──────────────────────────────────────···"));
  console.log(`   ${chalk.bold.cyan("- Code")}: ${code}`);
  console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
}
if (useMobile && !conn.authState.creds.registered) {
  const { registration } = conn.authState.creds || {
    registration: {},
  };
  if (!registration.phoneNumber) {
    console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
    console.log(
      chalk.bold.redBright(`📨 ${"Please type your WhatsApp number"}:`),
    );
    console.log(chalk.bold.cyan("├──────────────────────────────────────···"));
    let phoneNumber = await askQuestion(`   ${chalk.bold.cyan("- Number")}: `);
    console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (!Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))) {
      console.log(
        chalk.bold.cyan(
          "╭─────────────────────────────────────────────────···",
        ),
      );
      console.log(
        chalk.bold.redBright(
          `💬 ${"Start with your country's WhatsApp code, Example 62xxx"}:`,
        ),
      );
      console.log(
        chalk.bold.cyan(
          "╰─────────────────────────────────────────────────···",
        ),
      );
      console.log(
        chalk.bold.cyan("╭──────────────────────────────────────···"),
      );
      console.log(
        chalk.bold.redBright(`📨 ${"Please type your WhatsApp number"}:`),
      );
      console.log(
        chalk.bold.cyan("├──────────────────────────────────────···"),
      );
      phoneNumber = await askQuestion(`   ${chalk.bold.cyan("- Number")}: `);
      console.log(
        chalk.bold.cyan("╰──────────────────────────────────────···"),
      );
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    }
    registration.phoneNumber = "+" + phoneNumber;
  }
  const phoneNumber = parsePhoneNumber(registration.phoneNumber);
  if (!phoneNumber.isValid()) {
    console.log("\nInvalid phone number: " + registration.phoneNumber);
  }
  registration.phoneNumber = phoneNumber.format("E.164");
  registration.phoneNumberCountryCode = phoneNumber.countryCallingCode;
  registration.phoneNumberNationalNumber = phoneNumber.nationalNumber;
  const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode];
  registration.phoneNumberMobileCountryCode = mcc;
  async function enterCode() {
    try {
      console.log(
        chalk.bold.cyan("╭──────────────────────────────────────···"),
      );
      console.log(`📨 ${chalk.bold.redBright("Please Enter Your OTP Code")}:`);
      console.log(
        chalk.bold.cyan("├──────────────────────────────────────···"),
      );
      const code = await askQuestion(`   ${chalk.bold.cyan("- Code")}: `);
      console.log(
        chalk.bold.cyan("╰──────────────────────────────────────···"),
      );
      const response = await conn.register(
        code
          .replace(/[^0-9]/g, "")
          .trim()
          .toLowerCase(),
      );
      console.log(
        chalk.bold.cyan(
          "╭─────────────────────────────────────────────────···",
        ),
      );
      console.log(
        `💬 ${chalk.bold.redBright("Successfully registered your phone number.")}`,
      );
      console.log(
        chalk.bold.cyan(
          "╰─────────────────────────────────────────────────···",
        ),
      );
      console.log(response);
    } catch (error) {
      console.error(
        "\nFailed to register your phone number. Please try again.\n",
        error,
      );
      await enterCode();
    }
  }
  async function askOTP() {
    console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
    console.log(
      `📨 ${chalk.bold.redBright('What method do you want to use? "sms" or "voice"')}:`,
    );
    console.log(chalk.bold.cyan("├──────────────────────────────────────···"));
    let code = await askQuestion(`   ${chalk.bold.cyan("- Method")}: `);
    console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
    code = code.replace(/["']/g, "").trim().toLowerCase();
    if (code !== "sms" && code !== "voice") return await askOTP();
    registration.method = code;
    try {
      await conn.requestRegistrationCode(registration);
      await enterCode();
    } catch (error) {
      console.error(
        "\nFailed to request registration code. Please try again.\n",
        error,
      );
      await askOTP();
    }
  }
  await askOTP();
}
let timeout = 0;
async function connectionUpdate(update) {
  const {
    connection,
    lastDisconnect,
    isNewLogin,
    qr,
    isOnline,
    receivedPendingNotifications,
  } = update;
  if (receivedPendingNotifications) conn.ev?.flush();
  if (connection)
    console.info(
      "Taylor-V2".main,
      ">>".yellow,
      `Connection Status: ${connection}`.info,
    );
  if (isNewLogin) conn.isInit = true;
  const code =
    lastDisconnect?.error?.output?.statusCode ||
    lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason?.loggedOut && !conn.ws?.socket) {
    await reloadHandler(true)?.catch((e) => console.log(e));
  }
  if (!db?.data) await loadDatabase();
  if (connection === "connecting") {
    spinner.text = chalk.bgYellow.black("Connecting...\n");
    spinner.start();
    timeout++;
    console.log(
      chalk.bold.redBright("⚡ Mengaktifkan Bot, Mohon tunggu sebentar..."),
    );
    if (timeout > 30) {
      console.log(
        "Taylor-V2".main,
        ">>".yellow,
        "Session logout after 30 times reconnecting. Saving your number from being banned!"
          .warn,
      );
      setImmediate(() => process.exit(1));
    }
  }
  if (connection === "open") {
    try {
      const { jid } = conn.user;
      const name = conn.getName(jid) || "Taylor-V2";
      conn.user.name = name;
      db.data.dbbot.temamenu = {
        id: 4,
      };
      spinner.succeed(chalk.bgYellow.black(`Connected as ${name}\n`));
      const currentTime = moment.tz("Asia/Makassar");
      const pingSpeed = new Date() - currentTime;
      const formattedPingSpeed = pingSpeed < 0 ? "N/A" : `${pingSpeed}ms`;
      console.log(
        "Taylor-V2".main,
        ">>".yellow,
        `Client connected on: ${conn.user.id.split(":")[0] || namebot}`.info,
      );
      conn.ev.flush();
      await conn.uploadPreKeysToServerIfRequired();
      const infoMsg = `🤖 *Bot Info* 🤖\n🕰️ *Current Time:* ${currentTime.format("HH:mm:ss")}\n👤 *Name:* *${name}*\n🏷️ *Tag:* *@${jid.split("@")[0]}*\n⚡ *Ping Speed:* *${formattedPingSpeed}*\n📅 *Date:* ${currentTime.format("YYYY-MM-DD")}\n📝 *Description:* Bot *${name}* is now active.`;
      const messg = await conn.sendMessage(`${nomorown}@s.whatsapp.net`, {
        text: infoMsg,
        mentions: [`${nomorown}@s.whatsapp.net`, jid],
      });
      if (!messg) logger.error(`Error Send Message: ${format(e)}`);
    } catch (e) {
      logger.error(`Error Connection: ${format(e)}`);
    }
    console.log(chalk.bold.green("Connected! 🔒✅"));
    await runTasks();
    Object.freeze(reloadHandler);
    await watchFiles();
  }
  if (connection === "close" || code) {
    spinner.fail(chalk.bgRed.white("Can't connect to WebSocket\n"));
    try {
      const reason = lastDisconnect.error
        ? new Boom(lastDisconnect.error)?.output?.statusCode
        : 500;
      await reloadHandler(true)?.catch((e) => console.log(e));
      const reasons = {
        [DisconnectReason.connectionClosed]: "Connection closed! 🔒",
        [DisconnectReason.connectionLost]: "Connection lost from server! 📡",
        [DisconnectReason.restartRequired]:
          "Restart required, restarting... 🔄",
        [DisconnectReason.timedOut]: "Connection timed out! ⌛",
      };
      console.log(
        chalk.bold(
          reasons[reason] ||
            "Connection closed with bot. Trying to run again. ⚠️",
        ),
      );
    } catch (error) {
      console.error(
        chalk.bold.red("Error occurred during connection close:"),
        error.message,
      );
    }
  }
  logger[isOnline ? "info" : "error"](
    chalk.bold[isOnline ? "green" : "red"](
      isOnline ? "Status Aktif" : "Status Mati",
    ),
  );
  if (receivedPendingNotifications)
    logger.warn(chalk.bold.yellow("Menunggu Pesan Baru"));
  if (
    ((!pairingCode && !useMobile) || useQr) &&
    qr !== 0 &&
    connection === "close"
  ) {
    const logFn = useMobile ? "info" : "error";
    logger[logFn](
      chalk.bold.yellow(
        `\n🚩 ${useMobile ? "Pindai kode QR ini, kode QR akan kedaluwarsa dalam 60 detik." : `Koneksi ditutup, hapus folder ${authFolder} dan pindai ulang kode QR`}`,
      ),
    );
    setImmediate(() => process.exit(1));
  }
}
let isInit = true;
let handler = await import("./handler.js")?.catch((e) => console.log(e));
global.reloadHandler = async function reloadHandler(restatConn) {
  try {
    const Handler = await (
      await import(`./handler.js?updated=${Date.now()}`)
    )?.catch((e) => console.log(e));
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (error) {
    console.error;
  }
  if (restatConn) {
    const oldChats = conn.chats;
    conn.ws.close()?.catch((e) => console.log(e));
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {
      chats: oldChats,
    });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off("messages.upsert", conn.handler);
    conn.ev.off("messages.update", conn.pollUpdate);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    conn.ev.off("message.delete", conn.onDelete);
    conn.ev.on("call", conn.onCall);
    conn.ev.off("presence.update", conn.presenceUpdate);
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }
  const emoji = {
    welcome: "👋",
    bye: "👋",
    promote: "👤👑",
    demote: "👤🙅‍♂️",
    desc: "📝",
    subject: "📌",
    icon: "🖼️",
    revoke: "🔗",
    announceOn: "🔒",
    announceOff: "🔓",
    restrictOn: "🚫",
    restrictOff: "✅",
  };
  conn.welcome = `${emoji.welcome} Hallo @user\n\n   *W E L C O M E*\n⫹⫺ Di grup @subject\n\n⫹⫺ Baca *DESKRIPSI*\n@desc`;
  conn.bye = `   *G O O D B Y E*\n${emoji.bye} Sampai jumpa @user`;
  conn.spromote = `${emoji.promote} @user sekarang menjadi admin!`;
  conn.sdemote = `${emoji.demote} @user tidak lagi menjadi admin!`;
  conn.sDesc = `${emoji.desc} Deskripsi telah diubah menjadi:\n@desc`;
  conn.sSubject = `${emoji.subject} Judul grup telah diubah menjadi:\n@subject`;
  conn.sIcon = `${emoji.icon} Icon grup telah diubah!`;
  conn.sRevoke = `${emoji.revoke} Link grup telah diubah ke:\n@revoke`;
  conn.sAnnounceOn = `${emoji.announceOn} Grup telah ditutup!\nSekarang hanya admin yang dapat mengirim pesan.`;
  conn.sAnnounceOff = `${emoji.announceOff} Grup telah dibuka!\nSekarang semua peserta dapat mengirim pesan.`;
  conn.sRestrictOn = `${emoji.restrictOn} Edit Info Grup diubah ke hanya admin!`;
  conn.sRestrictOff = `${emoji.restrictOff} Edit Info Grup diubah ke semua peserta!`;
  conn.handler = handler?.handler.bind(conn);
  conn.pollUpdate = handler?.pollUpdate.bind(conn);
  conn.participantsUpdate = handler?.participantsUpdate.bind(conn);
  conn.groupsUpdate = handler?.groupsUpdate.bind(conn);
  conn.onDelete = handler?.deleteUpdate.bind(conn);
  conn.onCall = handler?.callUpdate.bind(conn);
  conn.presenceUpdate = handler?.presenceUpdate.bind(conn);
  conn.connectionUpdate = connectionUpdate?.bind(conn);
  conn.credsUpdate = authState?.saveCreds.bind(conn, true);
  const currentDateTime = new Date();
  const messageDateTime = new Date(conn.ev);
  let chats;
  if (lodash.gte(currentDateTime, messageDateTime)) {
    chats = lodash
      .chain(conn.chats)
      ?.omitBy((chat, jid) => jid.endsWith("@g.us") || !chat.isChats)
      ?.keys()
      ?.value();
  } else {
    chats = lodash
      .chain(conn.chats)
      ?.omitBy((chat, jid) => jid.endsWith("@g.us") || !chat.isChats)
      ?.keys()
      ?.value();
  }
  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("messages.update", conn.pollUpdate);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("message.delete", conn.onDelete);
  conn.ev.on("call", conn.onCall);
  conn.ev.on("presence.update", conn.presenceUpdate);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  isInit = false;
  return true;
};
await reloadHandler();
console.log("Reload Handler: true");
async function runTasks() {
  const tasks = [
    {
      func: _quickTest,
      message: "Quick Test",
      run: true,
    },
    {
      func: writeDatabase,
      message: "Write database",
      run: true,
    },
    {
      func: loadConfig,
      message: "Reload Config",
      run: true,
    },
    {
      func: loadPlugins,
      message: "Initializing files",
      run: true,
    },
    {
      func: loadLibs,
      message: "Loading library files",
      run: true,
    },
    {
      func: clearTmp,
      message: "Clearing temporary files",
      run: true,
    },
    {
      func: clearSessions,
      message: "Clearing sessions",
      run: true,
    },
  ];
  const results = [];
  try {
    await Promise.all(
      tasks
        .filter((t) => t.run)
        .map(async (task) => {
          try {
            spinner.start(
              chalk.bgYellow.black(`Running task: ${task.message}\n`),
            );
            await task.func();
            spinner.succeed(
              chalk.bgYellow.black(`${task.message} completed\n`),
            );
            results.push({
              status: "fulfilled",
              message: task.message,
            });
          } catch (error) {
            spinner.fail(`Error in ${task.message}`);
            console.error(`Error in ${task.message}:`, error);
            results.push({
              status: "rejected",
              message: task.message,
              error: error,
            });
          }
        }),
    );
    console.log("All tasks processed");
  } catch (error) {
    console.error("Error occurred while running tasks:", error);
  }
}
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function loadPlugins() {
  const CommandsFiles = glob.sync(
    path.resolve(path.resolve(directoryName, "plugins"), "**/*.js"),
    {
      ignore: ["**/node_modules/**", "**/run.js"],
    },
  );
  const importPromises = lodash.map(CommandsFiles, async (file) => {
    const moduleName = path.join(
      "/plugins",
      path.relative(path.resolve(directoryName, "plugins"), file),
    );
    try {
      const fileContent = readFileSync(file, "utf-8");
      const err = syntaxerror(fileContent, file, {
        sourceType: "module",
        ecmaVersion: 2020,
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        allowImportExportEverywhere: true,
      });
      if (err) {
        return {
          moduleName: moduleName,
          filePath: file,
          message: err.message,
          error: err,
          success: false,
        };
      } else {
        const module = await import(`${file}`);
        plugins[moduleName] = module.default ? module.default : module;
        return {
          moduleName: moduleName,
          filePath: file,
          success: true,
        };
      }
    } catch (e) {
      logger.error(e);
      return {
        moduleName: moduleName,
        filePath: file,
        message: e.message,
        error: e,
        success: false,
      };
    }
  });
  try {
    const results = await Promise.all(importPromises);
    const successResults = results.filter((result) => result.success);
    const errorResults = results.filter((result) => !result.success);
    plugins = lodash
      .chain(plugins)
      ?.toPairs()
      ?.sortBy(([a]) => a)
      ?.fromPairs()
      ?.value();
    const loadedPluginsMsg = `Loaded ${CommandsFiles.length} JS Files total.`;
    const successPluginsMsg = `✅ Success Plugins:\n${successResults.length} total.`;
    const errorPluginsMsg = `❌ Error Plugins:\n${errorResults.length} total`;
    logger.warn(loadedPluginsMsg);
    logger.info(successPluginsMsg);
    logger.error(errorPluginsMsg);
    const errorMessagesText = errorResults
      .map(
        (error, index) =>
          `❗ *Error ${index + 1}:* ${error.filePath}\n - ${error.error}`,
      )
      .join("\n");
    const messageText =
      `- 🤖 *Loaded Plugins Report* 🤖\n` +
      `🔧 *Total Plugins:* ${CommandsFiles.length}\n` +
      `✅ *Success:* ${successResults.length}\n` +
      `❌ *Error:* ${errorResults.length}\n` +
      (errorResults.length > 0 ? errorMessagesText : "");
    const messg = await conn.sendMessage(
      `${nomorown}@s.whatsapp.net`,
      {
        text: messageText,
      },
      {},
    );
    if (!messg) logger.error(`\nError sending message`);
  } catch (e) {
    logger.error(`\nError sending message: ${e}`);
  }
}
global.lib = {};
async function loadLibs() {
  const LibsFiles = glob.sync(path.resolve(directoryName, "lib/**/*.js"), {
    ignore: ["**/node_modules/**", "**/run.js"],
  });
  const importPromises = lodash.map(LibsFiles, async (file) => {
    const moduleName = path.join(
      "/lib",
      path.relative(path.resolve(directoryName, "lib"), file),
    );
    try {
      const fileContent = readFileSync(file, "utf-8");
      const err = syntaxerror(fileContent, file, {
        sourceType: "module",
        ecmaVersion: 2020,
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        allowImportExportEverywhere: true,
      });
      if (err) {
        delete lib[moduleName.slice(0, -3)];
        return {
          moduleName: moduleName,
          filePath: file,
          error: err.message,
          success: false,
        };
      } else {
        const module = await import(`${file}`);
        setNestedObject(
          lib,
          moduleName.slice(0, -3),
          module.default ? module.default : module,
        );
        return {
          moduleName: moduleName,
          filePath: file,
          success: true,
        };
      }
    } catch (e) {
      logger.error(e);
      delete lib[moduleName.slice(0, -3)];
      return {
        moduleName: moduleName,
        filePath: file,
        error: e.message,
        success: false,
      };
    }
  });
  try {
    const results = await Promise.all(importPromises);
    const successResults = results.filter((result) => result.success);
    const errorResults = results.filter((result) => !result.success);
    lib = lodash
      .chain(lib[""].lib)
      ?.toPairs()
      ?.sortBy(([a]) => a)
      ?.fromPairs()
      ?.value();
    const loadedLibsMsg = `Loaded ${LibsFiles.length} JS Files total.`;
    const successLibsMsg = `✅ Success Libs:\n${successResults.length} total.`;
    const errorLibsMsg = `❌ Error Libs:\n${errorResults.length} total.`;
    logger.warn(loadedLibsMsg);
    logger.info(successLibsMsg);
    logger.error(errorLibsMsg);
    const errorMessagesText = errorResults
      .map(
        (error, index) =>
          `❗ *Error ${index + 1}:* ${error.filePath}\n - ${error.error}`,
      )
      .join("\n");
    const messageText =
      `- 🤖 *Loaded Libs Report* 🤖\n` +
      `🔧 *Total Libs:* ${LibsFiles.length}\n` +
      `✅ *Success:* ${successResults.length}\n` +
      `❌ *Error:* ${errorResults.length}\n` +
      (errorResults.length > 0 ? errorMessagesText : "");
    logger.info(messageText);
  } catch (e) {
    logger.error(`Error occurred while importing libraries: ${e}`);
  }
}
const setNestedObject = (obj, filePath, value) =>
  filePath
    .split("/")
    ?.reduce(
      (acc, key, index, keys) =>
        index === keys.length - 1
          ? (acc[key] = value)
          : (acc[key] = acc[key] || {}),
      obj,
    );
async function watchFiles() {
  try {
    const mainDir = path.resolve(directoryName, "");
    console.log(`Main Dir: ${mainDir}`);
    const watcher = chokidar.watch(mainDir, {
      ignored: (filePath, stats) =>
        stats?.isFile() &&
        (filePath?.match(/node_modules/) ||
          filePath?.startsWith(".") ||
          !filePath?.endsWith(".js")),
      persistent: true,
      ignoreInitial: true,
      alwaysState: true,
    });
    watcher
      .on("add", async (filePath) => {
        if (!filePath.endsWith(".js")) return;
        try {
          const dir = filePath.match(/plugins/)
            ? "plugins"
            : filePath.match(/lib/)
              ? "lib"
              : "main";
          const resolvedFile = path.join(
            `/${dir}`,
            path.relative(
              path.dirname(path.dirname(filePath)),
              path.dirname(filePath),
            ),
            path.basename(filePath),
          );
          const module = await import(`${filePath}?updated=${Date.now()}`);
          if (dir === "plugins") {
            plugins[resolvedFile] = module.default ? module.default : module;
            console.log(`New plugin: ${resolvedFile}`);
            logger.info(`New plugin: ${resolvedFile}`);
          } else if (dir === "lib") {
            setNestedObject(
              lib,
              resolvedFile.slice(0, -3),
              module.default ? module.default : module,
            );
            console.log(`New lib detected: ${resolvedFile}`);
            logger.info(`New lib detected: ${resolvedFile}`);
          } else if (dir === "main") {
            console.log(`Changed main: ${resolvedFile}`);
            logger.info(`Changed main: ${resolvedFile}`);
          } else {
            console.warn(
              `File added outside of recognized directories: ${filePath}`,
            );
            logger.warn(
              `File added outside of recognized directories: ${filePath}`,
            );
          }
        } catch (e) {
          console.error(`Error handling 'add' event for '${filePath}': ${e}`);
          logger.error(`\nError handling 'add' event for '${filePath}': ${e}`);
        }
      })
      .on("change", async (filePath) => {
        if (!filePath.endsWith(".js")) return;
        try {
          const dir = filePath.match(/plugins/)
            ? "plugins"
            : filePath.match(/lib/)
              ? "lib"
              : "main";
          const resolvedFile = path.join(
            `/${dir}`,
            path.relative(
              path.dirname(path.dirname(filePath)),
              path.dirname(filePath),
            ),
            path.basename(filePath),
          );
          const module = await import(`${filePath}?updated=${Date.now()}`);
          if (dir === "plugins") {
            plugins[resolvedFile] = module.default ? module.default : module;
            console.log(`Changed plugin: ${resolvedFile}`);
            logger.info(`Changed plugin: ${resolvedFile}`);
          } else if (dir === "lib") {
            setNestedObject(
              lib,
              resolvedFile.slice(0, -3),
              module.default ? module.default : module,
            );
            console.log(`Changed lib: ${resolvedFile}`);
            logger.info(`Changed lib: ${resolvedFile}`);
          } else if (dir === "main") {
            console.log(`Changed main: ${resolvedFile}`);
            logger.info(`Changed main: ${resolvedFile}`);
          } else {
            console.warn(
              `File changed outside of recognized directories: ${filePath}`,
            );
            logger.warn(
              `File changed outside of recognized directories: ${filePath}`,
            );
          }
        } catch (e) {
          console.error(
            `Error handling 'change' event for '${filePath}': ${e}`,
          );
          logger.error(
            `\nError handling 'change' event for '${filePath}': ${e}`,
          );
        }
      })
      .on("unlink", async (filePath) => {
        if (!filePath.endsWith(".js")) return;
        try {
          const dir = filePath.match(/plugins/)
            ? "plugins"
            : filePath.match(/lib/)
              ? "lib"
              : "main";
          const resolvedFile = path.join(
            `/${dir}`,
            path.relative(
              path.dirname(path.dirname(filePath)),
              path.dirname(filePath),
            ),
            path.basename(filePath),
          );
          if (dir === "plugins") {
            delete plugins[resolvedFile];
            console.warn(`Plugin deleted: ${resolvedFile}`);
            logger.warn(`Plugin deleted: ${resolvedFile}`);
          } else if (dir === "lib") {
            delete lib[resolvedFile.slice(0, -3)];
            console.warn(`Lib deleted: ${resolvedFile}`);
            logger.warn(`Lib deleted: ${resolvedFile}`);
          } else if (dir === "main") {
            console.log(`Processed main (delete): ${resolvedFile}`);
            logger.info(`Processed main (delete): ${resolvedFile}`);
          } else {
            console.warn(
              `File deleted outside of recognized directories: ${filePath}`,
            );
            logger.warn(
              `File deleted outside of recognized directories: ${filePath}`,
            );
          }
        } catch (e) {
          console.error(
            `Error handling 'unlink' event for '${filePath}': ${e}`,
          );
          logger.error(
            `\nError handling 'unlink' event for '${filePath}': ${e}`,
          );
        }
      })
      .on("error", (error) => {
        console.error(`Watcher error: ${error.message}`);
        logger.error(`\nWatcher error: ${error.message}`);
      })
      .on("ready", () => {
        console.log("Initial scan complete. Ready for changes.");
        logger.info("\nInitial scan complete. Ready for changes.\n");
      });
  } catch (e) {
    console.error(`Error watching files: ${e}`);
    logger.error(`\nError watching files: ${e}`);
  }
}
async function writeDatabase() {
  try {
    const prevData = lodash.cloneDeep(db.tempData ?? db.data);
    await new Promise((resolve) => setTimeout(resolve, 1 * 1e3));
    const newData = lodash.cloneDeep(db.data);
    global.db.tempData = newData;
    const isTrueEqual = lodash.isEqual(prevData, newData);
    await Promise.allSettled([
      isTrueEqual ? Promise.resolve() : db.write(newData),
    ]);
  } catch (error) {
    console.error("Error in writeDatabase:", error);
  } finally {
    setTimeout(writeDatabase, 15 * 60 * 1e3);
  }
}
if (opts["server"]) {
  await (await import("./server.js")).default(conn, PORT);
}
async function clearTmp() {
  try {
    const tmp = [os.tmpdir(), path.join(directoryName, "./tmp")];
    msgRetryCounterCache.flushAll();
    const filenames = await Promise.all(
      tmp.map(async (dirname) => {
        try {
          const files = readdirSync(dirname);
          const filePromises = files.map(async (file) => {
            try {
              const filePath = path.join(dirname, file);
              const stats = statSync(filePath);
              if (stats.isFile()) {
                unlinkSync(filePath);
                return filePath;
              }
            } catch (err) {
              console.error(`Error processing ${file}: ${err.message}`);
              return null;
            }
          });
          return await Promise.all(filePromises);
        } catch (err) {
          console.error(`Error reading directory ${dirname}: ${err.message}`);
          return [];
        }
      }),
    );
    const flattenedFilenames = lodash.filter(
      lodash.flatten(filenames),
      (file) => file !== null,
    );
    logger.info(`Total files cleared: ${flattenedFilenames.length}`);
    return flattenedFilenames;
  } catch (err) {
    console.error(`Error in clearTmp: ${err.message}`);
    return [];
  } finally {
    setTimeout(clearTmp, 35 * 60 * 1e3);
  }
}
async function clearSessions(folder = "./" + authFolder) {
  try {
    const filenames = readdirSync(folder);
    msgRetryCounterCache.flushAll();
    const deletedFiles = await Promise.all(
      filenames.map(async (file) => {
        try {
          const filePath = path.join(folder, file);
          const stats = statSync(filePath);
          if (
            stats.isFile() &&
            file.endsWith(".json") &&
            file !== "creds.json"
          ) {
            unlinkSync(filePath);
            return filePath;
          }
        } catch (err) {
          console.error(`Error processing ${file}: ${err.message}`);
          return null;
        }
      }),
    );
    const filteredDeletedFiles = lodash.filter(
      deletedFiles,
      (file) => file !== null,
    );
    logger.info(`Total sessions deleted: ${filteredDeletedFiles.length}`);
    return filteredDeletedFiles;
  } catch (err) {
    console.error(`Error in Clear Sessions: ${err.message}`);
    return [];
  } finally {
    setTimeout(() => clearSessions(folder), 65 * 60 * 1e3);
  }
}
async function _quickTest() {
  let commands = [
    spawn("ffmpeg"),
    spawn("ffprobe"),
    spawn("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-filter_complex",
      "color",
      "-frames:v",
      "1",
      "-f",
      "webp",
      "-",
    ]),
    spawn("convert"),
    spawn("magick"),
    spawn("gm"),
    spawn("find", ["--version"]),
  ];
  let test = await Promise.allSettled(
    lodash.map(commands, (p) => {
      return Promise.race([
        new Promise((resolve) => {
          p.on("close", (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on("error", (_) => resolve(false));
        }),
      ]);
    }),
  );
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = lodash.map(
    test,
    (result) => (result.status === "fulfilled" ? result.value : false),
  );
  let s = (global.support = {
    ffmpeg: ffmpeg,
    ffprobe: ffprobe,
    ffmpegWebp: ffmpegWebp,
    convert: convert,
    magick: magick,
    gm: gm,
    find: find,
  });
  Object.freeze(support);
  if (!s.ffmpeg)
    (conn.logger || console).warn(
      "Please install ffmpeg for sending videos (pkg install ffmpeg)",
    );
  if (s.ffmpeg && !s.ffmpegWebp)
    (conn.logger || console).warn(
      "Stickers may not animate without libwebp on ffmpeg (--enable-libwebp while compiling ffmpeg)",
    );
  if (!s.convert && !s.magick && !s.gm)
    (conn.logger || console).warn(
      "Stickers may not work without imagemagick if libwebp on ffmpeg isn't installed (pkg install imagemagick)",
    );
}
