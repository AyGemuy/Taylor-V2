import mongoose from "mongoose";
import chalk from "chalk";
import { promisify } from "util";
import zlib from "zlib";
mongoose.set("strictQuery", false);
const { Schema, connect, model } = mongoose;
const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const compress = promisify(zlib.gzip);
const decompress = promisify(zlib.gunzip);
const log = {
  info: (message) =>
    console.log(chalk.blueBright(`[INFO] ${chalk.white(message)}`)),
  success: (message) =>
    console.log(chalk.greenBright(`[SUCCESS] ${chalk.white(message)}`)),
  error: (message) =>
    console.error(chalk.redBright(`[ERROR] ${chalk.white(message)}`)),
  warn: (message) =>
    console.warn(chalk.yellowBright(`[WARN] ${chalk.white(message)}`)),
};
class BaseMongoDB {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.data = {};
    this.schema = {};
    this.model = {};
    this.db = connect(this.url, this.options)
      .then(() => log.success("MongoDB connected"))
      .catch((err) => log.error(`MongoDB connection failed: ${err.message}`));
  }
  async read() {
    await this.db;
    this.schema = new Schema({
      data: {
        type: String,
        required: true,
        default: "{}",
      },
    });
    this.model = model("data", this.schema);
    let compressedData = await this.model.findOne({}).select("data").exec();
    if (!compressedData) {
      this.data = {};
      await this.write(this.data);
      compressedData = await this.model.findOne({}).select("data").exec();
      log.success("New data created and saved");
    }
    try {
      this.data = compressedData?.data
        ? JSON.parse(
            (
              await decompress(Buffer.from(compressedData.data, "base64"))
            ).toString(),
          )
        : {};
      log.info("Data retrieved");
    } catch (err) {
      log.error("Failed to decompress or parse data");
      this.data = {};
    }
    return this.data;
  }
  async write(data) {
    if (!data || typeof data !== "object") {
      log.warn("Invalid data provided for write operation");
      return Promise.reject("Invalid data");
    }
    try {
      const jsonData = JSON.stringify(data);
      const minifiedJsonData = JSON.stringify(JSON.parse(jsonData));
      const compressedData = await compress(Buffer.from(minifiedJsonData), {
        level: zlib.constants.Z_BEST_COMPRESSION,
      });
      await this.model.findOneAndUpdate(
        {},
        {
          $set: {
            data: compressedData.toString("base64"),
          },
        },
        {
          upsert: true,
          new: true,
          lean: true,
        },
      );
      log.success("Data successfully updated in the database");
      return true;
    } catch (err) {
      log.error(`Failed to write data: ${err.message}`);
      return Promise.reject(err);
    }
  }
}
export class mongoDB extends BaseMongoDB {}
export class mongoDBV2 extends BaseMongoDB {
  constructor(url, collections, options = defaultOptions) {
    super(url, options);
    this.collections = collections;
    this.data = {};
    this.schema = {};
    this.model = {};
  }
  async read() {
    await this.db;
    for (const collection of this.collections) {
      this.schema[collection] = new Schema({
        data: {
          type: String,
          required: true,
          default: "{}",
        },
      });
      this.model[collection] = model(collection, this.schema[collection]);
      let compressedData = await this.model[collection]
        .findOne({})
        .select("data")
        .exec();
      if (!compressedData) {
        this.data[collection] = {};
        await this.write(collection, this.data[collection]);
        compressedData = await this.model[collection]
          .findOne({})
          .select("data")
          .exec();
        log.success(
          `New data created and saved for collection ${chalk.magenta(collection)}`,
        );
      }
      try {
        this.data[collection] = compressedData?.data
          ? JSON.parse(
              (
                await decompress(Buffer.from(compressedData.data, "base64"))
              ).toString(),
            )
          : {};
        log.info(`Data retrieved for collection ${chalk.magenta(collection)}`);
      } catch (err) {
        log.error(
          `Failed to decompress or parse data for collection ${chalk.magenta(collection)}`,
        );
        this.data[collection] = {};
      }
    }
    return this.data;
  }
  async write(collection, data) {
    if (!data || typeof data !== "object") {
      log.warn(
        `Invalid data provided for write operation in collection ${chalk.magenta(collection)}`,
      );
      return Promise.reject("Invalid data");
    }
    try {
      const jsonData = JSON.stringify(data);
      const minifiedJsonData = JSON.stringify(JSON.parse(jsonData));
      const compressedData = await compress(Buffer.from(minifiedJsonData), {
        level: zlib.constants.Z_BEST_COMPRESSION,
      });
      await this.model[collection].findOneAndUpdate(
        {},
        {
          $set: {
            data: compressedData.toString("base64"),
          },
        },
        {
          upsert: true,
          new: true,
          lean: true,
        },
      );
      log.success(
        `Data successfully updated in the database for collection ${chalk.magenta(collection)}`,
      );
      return true;
    } catch (err) {
      log.error(
        `Failed to write data for collection ${chalk.magenta(collection)}: ${err.message}`,
      );
      return Promise.reject(err);
    }
  }
}
