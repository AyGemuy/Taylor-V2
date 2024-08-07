import {
  resolve,
  dirname as _dirname
} from "path";
import _fs, {
  existsSync,
  readFileSync
} from "fs";
const {
  promises: fs
} = _fs;
class Database {
  constructor(filepath, ...args) {
    this.file = resolve(filepath), this.logger = console, this._load(), this._jsonargs = args,
      this._state = !1, this._queue = [], this._interval = setInterval(async () => {
        !this._state && this._queue && this._queue[0] && (this._state = !0, await this[this._queue.shift()]().catch(this.logger.error), this._state = !1);
      }, 1e3);
  }
  get data() {
    return this._data;
  }
  set data(value) {
    this._data = value, this.save();
  }
  load() {
    this._queue.push("_load");
  }
  save() {
    this._queue.push("_save");
  }
  _load() {
    try {
      return this._data = existsSync(this.file) ? JSON.parse(readFileSync(this.file)) : {};
    } catch (e) {
      return this.logger.error(e), this._data = {};
    }
  }
  async _save() {
    let dirname = _dirname(this.file);
    return existsSync(dirname) || await fs.mkdir(dirname, {
        recursive: !0
      }), await fs.writeFile(this.file, JSON.stringify(this._data, ...this._jsonargs)),
      this.file;
  }
}
export default Database;