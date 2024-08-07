import stripAnsi from "strip-ansi";
import path from "path";
import {
  readFileSync
} from "fs";
import * as glob from "glob";
import chalk from "chalk";
import ora from "ora";
import syntaxError from "syntax-error";
const {
  url
} = import.meta, {
  dirname
} = path, __filename = url, __dirname = dirname(url), ECMA_VERSION = 2020, NOT_APPLICABLE = "N/A";

function startSpinner() {
  const spinner = ora({
    text: chalk.bold.blue("🚀 Starting test..."),
    spinner: "moon"
  }).start();
  let startTime = new Date();
  const intervalId = setInterval(() => {
    const elapsedTime = Math.round((new Date() - startTime) / 1e3);
    spinner.text = chalk.bold.blue(`Checking files... ( ${elapsedTime}s )`);
  }, 1e3);
  return {
    spinner: spinner,
    intervalId: intervalId,
    startTime: startTime
  };
}

function stopSpinner(spinnerInfo) {
  return spinnerInfo ? (spinnerInfo.spinner.stop(), clearInterval(spinnerInfo.intervalId), console.log(chalk.bold.green("All files checked successfully.")), spinnerInfo.startTime) : null;
}
const runSyntaxCheck = async () => {
  const errorResults = [];
  let spinnerInfo;
  try {
    spinnerInfo = startSpinner();
    const testFile = async file => {
      try {
        const content = readFileSync(file, "utf8"),
          syntaxErrorResult = syntaxError(content, file, {
            sourceType: "module",
            ecmaVersion: 2020,
            allowAwaitOutsideFunction: !0,
            allowReturnOutsideFunction: !0,
            allowImportExportEverywhere: !0
          });
        if (syntaxErrorResult) {
          const result = {
            "File Name": path.basename(file),
            Line: "N/A",
            Status: "Error",
            Size: "N/A",
            Path: path.dirname(file),
            "Error Message": syntaxErrorResult.message
          };
          errorResults.push(result), console.error(chalk.bold.red("An error occurred:"), syntaxErrorResult);
        }
      } catch (fileReadError) {
        const result = {
          "File Name": path.basename(file),
          Line: "N/A",
          Status: "Error",
          Size: "N/A",
          Path: path.dirname(file),
          "Error Message": `File read error: ${fileReadError.message}`
        };
        console.error(chalk.bold.red("An error occurred:"), fileReadError), errorResults.push(result);
      }
    }, files = glob.sync("**/*.js", {
      cwd: __dirname,
      ignore: ["node_modules/**", __filename, "**/run.js"]
    });
    for (const file of files) {
      await testFile(file);
      const progressPercentage = (files.indexOf(file) + 1) / files.length * 100;
      spinnerInfo.spinner.text = `${chalk.bold.blue("🚀 Starting test...")} ${chalk.bold.gray("Checking files...")} ${chalk.bold.magenta(` ${Math.floor(progressPercentage)}% `)}`,
        spinnerInfo.spinner.render();
    }
    stopSpinner(spinnerInfo), errorResults.length > 0 ? (console.log(chalk.bold.red(`\nTotal Errors: ${errorResults.length}`)), console.log("List Errors:"), errorResults.forEach((result, index) => {
      console.log(`${index + 1}. ${formatResult(result)}\nError Message: ${chalk.bold.red(result["Error Message"])}`);
    })) : console.log(chalk.bold.magenta("\nNo syntax errors found.")), console.log(chalk.bold.magenta("All processes completed."));
  } catch (error) {
    console.error(chalk.bold.red("An error occurred:"), error);
  }
}, formatResult = result => {
  const {
    "File Name": fileName,
    Line,
    Status,
    Size,
    Path
  } = result;
  return [chalk.bold.white(`File Name: ${chalk.bold.yellow(fileName)}`), "N/A" !== Line ? chalk.bold.yellow(`Line: ${chalk.bold.yellow(Line)}`) : "", "Success" === Status ? chalk.bold.green(`Status: ${chalk.bold.blue(Status)}`) : chalk.bold.red(`Status: ${chalk.bold.blue(Status)}`), chalk.bold.blue(`Size: ${chalk.bold.green(Size)}`), chalk.bold.yellow(`Path: ${chalk.bold.blue(Path)}`)].join(" ");
};
runSyntaxCheck();