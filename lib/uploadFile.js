import {
  Uploader
} from "./tools/uploader.js";
import ora from "ora";
import chalk from "chalk";
import _ from "lodash";
const upload = new Uploader();
const asyncFunctions = _(Object.getOwnPropertyNames(Object.getPrototypeOf(upload))).filter(prop => typeof upload[prop] === "function" && prop !== "constructor").map(func => [func, upload[func].bind(upload)]).fromPairs().value();
const createSpinner = q => ora({
  text: q,
  spinner: "moon"
});
export default async function(inp, option = "all") {
  const spinner = createSpinner("Uploading...").start();
  try {
    const providers = Object.entries(asyncFunctions).map(([name, func]) => ({
      name: name,
      func: func
    }));
    const selectedProviders = option === "all" ? providers : _.isNumber(option) && _.inRange(option, 1, providers.length + 1) ? [providers[option - 1]] : (() => {
      throw new Error(`Invalid input. Please provide 'all' or a valid index.\nAvailable Indexes:\n${providers.map((p, i) => `${i + 1}: ${p.name}`).join("\n")}`);
    })();
    for (const {
        name,
        func
      }
      of selectedProviders) {
      try {
        const result = await func(inp);
        if (result) {
          spinner.succeed(chalk.green(`Upload successful with ${name}`));
          return result;
        }
        throw new Error("Upload result is empty or null");
      } catch (e) {
        spinner.fail(chalk.red(`Upload failed with ${name}: ${e.message}`));
      }
    }
    throw new Error("All providers failed to upload.");
  } catch (error) {
    spinner.stop();
    throw new Error(`Error during upload: ${error.message}`);
  }
}