import express from "express";
import {
  fileURLToPath
} from "url";
import {
  dirname,
  join,
  basename
} from "path";
import {
  createRequire
} from "module";
import {
  createInterface
} from "readline";
import {
  setupMaster,
  fork
} from "cluster";
import {
  watchFile,
  unwatchFile
} from "fs";
import chalk from "chalk";
import os from "os";
import fs, {
  promises as fsPromises,
  readdirSync
} from "fs";
import cfonts from "cfonts";
import * as glob from "glob";
import terminalImage from "terminal-image";
console.log("🐾 Starting...");
const {
  say
} = cfonts, rl = createInterface(process.stdin, process.stdout), __filename = fileURLToPath(import.meta.url), __dirname = dirname(__filename), require = createRequire(import.meta.url), {
  name,
  author
} = require(join(__dirname, "./package.json"));
say("Bot Whatsapp MD", {
  font: "chrome",
  align: "center",
  gradient: ["blue", "green"]
});
const taylorImage = fs.readFileSync(join(__dirname, "thumbnail.jpg"));
let isRunning = !1,
  server = null;
async function start(file) {
  const app = express(),
    port = process.env.PORT || process.env.SERVER_PORT || 3e3,
    htmlDir = join(__dirname, "html"),
    sendHtml = (req, res, name) => res.sendFile(join(htmlDir, `${name}.html`));
  if (app.get("/", (req, res) => sendHtml(0, res, "home")), app.get("/chat", (req, res) => sendHtml(0, res, "chat")), app.get("/game", (req, res) => sendHtml(0, res, "game")), app.get("/tools", (req, res) => sendHtml(0, res, "tools")), app.get("/music", (req, res) => sendHtml(0, res, "music")), server = app.listen(port, () => {
      console.log(chalk.green(`🌐 Port ${port} is open`));
    }), server.on("error", error => {
      "EADDRINUSE" === error.code ? (console.log(`Address localhost:${port} in use. Please retry when the port is available!`), server.close()) : console.error("Server error:", error);
    }), isRunning) return;
  isRunning = !0;
  const args = [join(__dirname, file), ...process.argv.slice(2)];
  say([process.argv[0], ...args].join(" "), {
    font: "console",
    align: "center",
    gradient: ["red", "magenta"]
  }), setupMaster({
    exec: args[0],
    args: args.slice(1)
  });
  const p = fork();
  p.on("message", data => {
    console.log("[✅RECEIVED]", data), "reset" === data ? (p.process.kill(), isRunning = !1, start(file)) : "uptime" === data && p.send(process.uptime());
  }), p.on("exit", (_, code) => {
    isRunning = !1, console.error("[❗] Exited with code:", code), 0 !== code ? start(file) : watchFile(args[0], () => {
      unwatchFile(args[0]), start(file);
    });
  });
  const pluginsFolder = join(__dirname, "plugins");
  try {
    const {
      fetchLatestBaileysVersion
    } = await import("@whiskeysockets/baileys"), {
      version
    } = await fetchLatestBaileysVersion();
    console.log(chalk.yellow(`🟡 Baileys library version ${version} is installed`));
  } catch (e) {
    console.error(chalk.red("❌ Baileys library is not installed")), shutdownServer();
  }
  console.log(chalk.yellow(`🖥️ ${os.type()}, ${os.release()} - ${os.arch()}`));
  const ramInGB = os.totalmem() / 1073741824;
  console.log(chalk.yellow(`💾 Total RAM: ${ramInGB.toFixed(2)} GB`));
  const freeRamInGB = os.freemem() / 1073741824;
  console.log(chalk.yellow(`💽 Free RAM: ${freeRamInGB.toFixed(2)} GB`)), console.log(chalk.yellow("📃 Script by wudysoft"));
  const packageJsonPath = join(__dirname, "./package.json");
  try {
    const packageJsonData = await fsPromises.readFile(packageJsonPath, "utf-8"),
      packageJsonObj = JSON.parse(packageJsonData);
    console.log(chalk.blue.bold("\n📦 Package Information")), console.log(chalk.cyan(`Name: ${packageJsonObj.name}`)),
      console.log(chalk.cyan(`Version: ${packageJsonObj.version}`)), console.log(chalk.cyan(`Description: ${packageJsonObj.description}`)),
      console.log(chalk.cyan(`Author: ${packageJsonObj.author.name}`));
  } catch (err) {
    console.error(chalk.red(`❌ Unable to read package.json: ${err}`)), shutdownServer();
  }
  const foldersInfo = getFoldersInfo(pluginsFolder);
  console.log(chalk.blue.bold('\n📂 Folders in "plugins" folder and Total Files'));
  foldersInfo.sort((a, b) => a.folder.localeCompare(b.folder));
  const tableData = foldersInfo.map(({
    folder,
    files
  }) => ({
    Folder: folder.slice(0, 15).padEnd(15),
    "Total Files": files.toString().slice(0, 10).padEnd(10)
  }));
  console.table(tableData, ["Folder", "Total Files"], ["color: yellow; background-color: blue; border-radius: 10px;", "color: green; background-color: yellow; border-radius: 10px;"]),
    console.log(chalk.blue.bold("\n⏰ Current Time"));
  const currentTime = new Date().toLocaleString();
  console.log(chalk.cyan(`${currentTime}`)), say("Taylor-V2", {
    font: "chrome",
    align: "center",
    gradient: ["blue", "green"]
  }), console.log(await terminalImage.buffer(taylorImage, {
    width: 60
  })), say("Have fun, thanks for using this script.", {
    font: "console",
    align: "center",
    gradient: ["blue", "green"]
  }), setInterval(() => {}, 1e3);
}

function getFoldersInfo(folderPath) {
  return glob.sync(join(folderPath, "*/")).map(folder => ({
    folder: basename(folder),
    files: getTotalFilesInFolder(folder)
  }));
}

function getTotalFilesInFolder(folderPath) {
  return readdirSync(folderPath).length;
}

function shutdownServer() {
  console.error(chalk.red("❌ Shutting down the server due to an error.")), server.close(() => {
    console.log(chalk.red("🛑 Server has been shut down.")), process.exit(1);
  });
}
start("main.js");
const tmpDir = "./tmp";
fs.existsSync(tmpDir) || (fs.mkdirSync(tmpDir), console.log("[33m%s[0m", `📁 Created directory ${tmpDir}`));