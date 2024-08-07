import {
  spawn
} from "child_process";
const start = cmd => spawn(cmd, [], {
    stdio: ["inherit", "inherit", "inherit", "ipc"]
  }),
  displayWelcomeMessage = () => {
    process.stdout.write("[36m───────────────────────────────────────────────────────\n"),
      process.stdout.write("[36m   [32mWelcome to Taylor-V2 Terminal[36m                                \n"),
      process.stdout.write("[36m╰───────────────────────────────────────────────────────╯\n[0m");
  },
  displayTable = () => {
    process.stdout.write("[36m───────────────────────────────────────────────────────\n"),
      process.stdout.write("[36m   [31mInformasi Terminal yang Berjalan[36m                         \n"),
      process.stdout.write("[36m╰───────────────────────────────────────────────────────╯\n[0m");
  },
  startBash = () => {
    start("bash").on("exit", () => {
      process.stdout.write("[36m───────────────────────────────────────────────────────\n"),
        process.stdout.write("[36m   [31mInformasi Terminal telah Ditutup[36m                             \n"),
        process.stdout.write("[36m╰───────────────────────────────────────────────────────╯\n[0m");
    });
  },
  displaySystemInfo = () => {
    const platform = process.platform,
      nodeVersion = process.version,
      runtime = process.env.RUNTIME || "Node.js",
      currentDate = new Date().toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta"
      }),
      currentTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta"
      }),
      currentDay = new Date().toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
        weekday: "long"
      });
    process.stdout.write(`[36mSistem Platform: [32m${platform}\n`), process.stdout.write(`Versi ${runtime}: [32m${nodeVersion}\n`),
      process.stdout.write(`Tanggal: [33m${currentDate}\n`), process.stdout.write(`Jam: [33m${currentTime}\n`),
      process.stdout.write(`Hari: [33m${currentDay}\n`), process.stdout.write("Author: [32mTaylor-V2\n[0m");
  };
console.clear(), displayWelcomeMessage(), startBash(), displayTable(), displaySystemInfo();