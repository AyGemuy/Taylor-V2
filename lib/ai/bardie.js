"use strict";
import axios from "axios";
const baseurl = "https://bard.rizzy.eu.org";
class Bardie {
  constructor() {}
  async question({
    ask
  }) {
    if (!ask) throw new Error("Please specify a question!");
    try {
      return (await axios.post(`${baseurl}/api/onstage`, {
        ask: ask
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })).data;
    } catch (err) {
      throw new Error("Error: " + err.message);
    }
  }
  async questionWithImage({
    ask,
    image
  }) {
    if (!ask) throw new Error("Please specify a question!");
    if (!image) throw new Error("Please specify a URL for the image!");
    try {
      return (await axios.post(`${baseurl}/api/onstage/image`, {
        ask: ask,
        image: image
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })).data;
    } catch (err) {
      throw new Error("Error: " + err.message);
    }
  }
}
export default Bardie;