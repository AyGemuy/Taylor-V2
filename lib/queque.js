import EventEmitter from "events";
const isNumber = x => "number" == typeof x && !isNaN(x),
  delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms)),
  QUEQUE_DELAY = 5e3;
export default class Queque extends EventEmitter {
  _queque = new Set();
  constructor() {
    super();
  }
  add(item) {
    this._queque.add(item);
  }
  has(item) {
    return this._queque.has(item);
  }
  delete(item) {
    this._queque.delete(item);
  }
  first() {
    return [...this._queque].shift();
  }
  isFirst(item) {
    return this.first() === item;
  }
  last() {
    return [...this._queque].pop();
  }
  isLast(item) {
    return this.last() === item;
  }
  getIndex(item) {
    return [...this._queque].indexOf(item);
  }
  getSize() {
    return this._queque.size;
  }
  isEmpty() {
    return 0 === this.getSize();
  }
  unqueue(item) {
    let queque;
    if (item) {
      if (this.has(item)) {
        queque = item;
        if (!this.isFirst(item)) throw new Error("Item is not first in queque");
      }
    } else queque = this.first();
    queque && (this.delete(queque), this.emit(queque));
  }
  waitQueue(item) {
    return new Promise((resolve, reject) => {
      if (this.has(item)) {
        const solve = async (removeQueque = !1) => {
          await delay(5e3), removeQueque && this.unqueue(item), this.isEmpty() || this.unqueue(),
            resolve();
        };
        this.isFirst(item) ? solve(!0) : this.once(item, solve);
      } else reject(new Error("item not found"));
    });
  }
}