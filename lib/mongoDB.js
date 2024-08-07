import mongoose from "mongoose";
import chalk from "chalk";
import _ from "lodash";
const {
  STATES
} = mongoose;
const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 6e4
};
export class mongoDB {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.data = {};
    this.datas = {};
    this.schema = new mongoose.Schema({
      data: {
        type: Object,
        required: true,
        default: {}
      }
    });
    this.model = {};
    this.schemas = {};
    this.collections = [];
    this.db = mongoose.createConnection(this.url, {
      ...this.options
    });
    this.logDBState();
    this.delete = {
      collection: async collectionName => {
        try {
          await this.db.dropCollection(collectionName);
          console.log(chalk.bgGreen.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgYellow.black(`Collection '${collectionName}' deleted successfully`));
        } catch (error) {
          console.log(chalk.bgRed.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgRed.black(`Error deleting collection '${collectionName}': ${error}`));
        }
      }
    };
    this.collection = mongoose.model;
  }
  async read() {
    try {
      await this.db;
      this.model = this.db.model("data", this.schema);
      const document = await this.model.findOne({});
      this.data = document?.data ?? {};
      const datasSchema = new mongoose.Schema({
        data: Object
      });
      const datasModel = this.db.model("datas", datasSchema);
      const datasCollection = await datasModel.find({});
      this.datas = _.merge({}, ...datasCollection.map(doc => doc.data));
      _.merge(this.data, this.datas);
      console.log(chalk.bgGreen.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgYellow.black("Read successful"));
      return this.data;
    } catch (error) {
      console.log(chalk.bgRed.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgRed.black(`Read error: ${error}`));
    }
  }
  async write(data) {
    try {
      if (!data) throw new Error("Invalid data");
      const savedData = this.data ? await this.model.findOneAndUpdate({
        _id: this.data?._id
      }, {
        data: data
      }, {
        new: true
      }) : await new this.model({
        data: data
      }).save();
      this.data = savedData?.data ?? {};
      console.log(chalk.bgGreen.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgYellow.black("Write successful"));
      return savedData;
    } catch (error) {
      console.log(chalk.bgRed.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgRed.black(`Write error: ${error}`));
      throw error;
    }
  }
  logDBState() {
    const statusMessages = {
      [STATES.connecting]: chalk.bgBlue.black("MongoDB connecting..."),
      [STATES.connected]: chalk.bgGreen.black("MongoDB connected"),
      [STATES.disconnecting]: chalk.bgYellow.black("MongoDB disconnecting..."),
      [STATES.disconnected]: chalk.bgRed.black("MongoDB disconnected")
    };
    const status = this.db.readyState;
    console.log(chalk.bgYellow.black(" MongoDB \n"), chalk.yellow(">>\n"), statusMessages[status] || chalk.bgRed.black("Unknown MongoDB state"));
  }
}
export class mongoDBV2 {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.models = [];
    this.data = {};
    this.lists = null;
    this.list = null;
    this.datas = {};
    this.schemas = {};
    this.collections = [];
    this.db = mongoose.createConnection(this.url, {
      ...this.options
    });
    this.logDBState();
    this.delete = {
      collection: async collectionName => {
        try {
          await this.db.dropCollection(collectionName);
          console.log(chalk.bgGreen.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgYellow.black(`Collection '${collectionName}' deleted successfully`));
        } catch (error) {
          console.log(chalk.bgRed.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgRed.black(`Error deleting collection '${collectionName}': ${error}`));
        }
      }
    };
    this.collection = this.db.model;
  }
  async read() {
    try {
      await this.db;
      const schema = new mongoose.Schema({
        data: [{
          name: String
        }]
      });
      this.list = this.db.model("lists", schema);
      this.lists = await this.list.findOne({});
      if (!this.lists?.data) {
        await this.list.create({
          data: []
        });
        this.lists = await this.list.findOne({});
      }
      const garbage = [];
      for (const {
          name
        }
        of this.lists?.data ?? []) {
        let collection;
        try {
          collection = this.db.model(name, new mongoose.Schema({
            data: Array
          }));
        } catch (e) {
          console.log(chalk.bgGreen.black(" MongoDB \n"), chalk.yellow(">>\n"), e);
          try {
            collection = this.db.model(name);
          } catch (e) {
            garbage.push(name);
            console.log(chalk.bgRed.black(" MongoDB \n"), chalk.yellow(">>\n"), e);
          }
        }
        if (collection) {
          this.models.push({
            name: name,
            model: collection
          });
          const collectionsData = await collection.find({});
          this.data[name] = _.fromPairs(collectionsData.map(v => v.data));
        }
      }
      const datasSchema = new mongoose.Schema({
        data: Object
      });
      const datasModel = this.db.model("datas", datasSchema);
      const datasCollection = await datasModel.find({});
      this.datas = _.merge({}, ...datasCollection.map(doc => doc.data));
      _.merge(this.data, this.datas);
      await this.list.findOneAndUpdate({
        _id: this.lists?._id
      }, {
        data: this.lists.data.filter(v => !garbage.includes(v.name))
      }, {
        new: true
      });
      console.log(chalk.bgGreen.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgYellow.black("Read successful"));
      return this.data;
    } catch (error) {
      console.log(chalk.bgRed.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgRed.black(`Read error: ${error}`));
    }
  }
  async write(data) {
    try {
      if (!this.lists || !data) throw new Error("Invalid data or lists");
      const listDoc = [];
      for (const key of Object.keys(data)) {
        const index = _.findIndex(this.models, {
          name: key
        });
        const doc = index !== -1 ? this.models[index].model : this.db.model(key, new mongoose.Schema({
          data: Array
        }));
        this.models[index === -1 ? this.models.length : index] = {
          name: key,
          model: doc
        };
        const docData = _.map(data[key], (v, k) => ({
          data: [k, v]
        }));
        await doc.deleteMany().catch(console.error);
        await doc.insertMany(docData);
        if (doc && key) listDoc.push({
          name: key
        });
      }
      const listDocData = listDoc.map(doc => ({
        ...doc,
        _id: doc._id || new mongoose.Types.ObjectId()
      }));
      await this.list.findOneAndUpdate({
        _id: this.lists?._id
      }, {
        data: listDocData
      }, {
        new: true
      });
      console.log(chalk.bgGreen.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgYellow.black("Write successful"));
      return true;
    } catch (error) {
      console.log(chalk.bgRed.black(" MongoDB \n"), chalk.yellow(">>\n"), chalk.bgRed.black(`Write error: ${error}`));
      throw error;
    }
  }
  logDBState() {
    const statusMessages = {
      [STATES.connecting]: chalk.bgBlue.black("MongoDB connecting..."),
      [STATES.connected]: chalk.bgGreen.black("MongoDB connected"),
      [STATES.disconnecting]: chalk.bgYellow.black("MongoDB disconnecting..."),
      [STATES.disconnected]: chalk.bgRed.black("MongoDB disconnected")
    };
    const status = this.db.readyState;
    console.log(chalk.bgYellow.black(" MongoDB \n"), chalk.yellow(">>\n"), statusMessages[status] || chalk.bgRed.black("Unknown MongoDB state"));
  }
}