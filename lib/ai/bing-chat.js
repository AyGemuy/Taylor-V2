import crypto from "crypto";
import fetch from "node-fetch";
import WebSocket from "ws";
import chalk from "chalk";
class BingChat {
  constructor(cookies) {
    this.cookies = cookies, this.EOL = "", this.json = {
      arguments: [{
        source: "cib",
        optionsSets: ["nlu_direct_response_filter", "deepleo", "disable_emoji_spoken_text", "responsible_ai_policy_235", "enablemm", "galileo", "dlwebtrunc", "glpromptv3plus", "serploc", "jbf101", "dv3sugg"],
        allowedMessageTypes: ["Chat", "InternalSearchQuery", "InternalSearchResult", "Disengaged", "InternalLoaderMessage", "RenderCardRequest", "AdsQuery", "SemanticSerp", "GenerateContentQuery", "SearchQuery"],
        sliceIds: ["ssoverlap25", "sspltop5", "sswebtop2", "chk1cln", "fstldsydaoltt", "nofbkcf", "sugdivdis", "sydpayajax", "fixsacodecf", "185fdbk", "321sloc", "324hlthmons0", "403jbf101", "notigersccf", "udsdserlc", "udstrclm10cmp", "udstrclm10", "329v3pwebtrunc"],
        verbosity: "verbose",
        traceId: crypto.randomBytes(16).toString("hex"),
        isStartOfSession: !0,
        message: {
          locationHints: [],
          author: "user",
          inputMethod: "Keyboard",
          text: null,
          messageType: "Chat"
        },
        conversationSignature: null,
        participant: {
          id: null
        },
        conversationId: null
      }],
      invocationId: "0",
      target: "chat",
      type: 4
    };
  }
  async suggest(query) {
    try {
      const response = await fetch("https://www.bingapis.com/api/v7/suggestions?appid=B1513F135D0D1D1FC36E8C31C30A31BB25E804D0&setmkt=fr-FR&q=" + encodeURIComponent(query), {
          method: "GET"
        }),
        json = await response.json();
      return json.suggestionGroups[0]?.searchSuggestions.map(suggestion => suggestion.displayText);
    } catch (error) {
      throw console.log(chalk.red("Error in suggest method:", error)), error;
    }
  }
  async createConversation() {
    try {
      const response = await fetch("https://www.bing.com/turing/conversation/create", {
          method: "GET",
          headers: {
            cookie: this.cookies
          }
        }),
        json = await response.json();
      this.json.arguments[0].conversationSignature = json.conversationSignature, this.json.arguments[0].participant.id = json.clientId,
        this.json.arguments[0].conversationId = json.conversationId;
    } catch (error) {
      throw console.log(chalk.red("Error in createConversation method:", error)), error;
    }
  }
  async sendMessage(msg) {
    try {
      return await new Promise((resolve, reject) => {
        this.json.arguments[0].message.text = msg;
        const chat = new WebSocket("wss://sydney.bing.com/sydney/ChatHub");
        chat.onopen = () => {
          chat.send('{"protocol":"json","version":1}' + this.EOL);
        }, chat.onmessage = event => {
          const message = event.data.toString().split(this.EOL)[0],
            json = JSON.parse(message);
          if ("{}" === message && (chat.send('{"type":6}' + this.EOL), chat.send(JSON.stringify(this.json) + this.EOL), this.json.invocationId = (parseInt(this.json.invocationId) + 1).toString(), this.json.arguments[0].isStartOfSession = !1), 2 === json.type) {
            const response = json.item.messages.filter(e => "Chat" === e.messageType).reverse()[0] || json.item.messages.filter(e => "bot" === e.author && "TextBlock" === e.adaptiveCards[0]?.body[0]?.type).reverse()[0];
            chat.close(), resolve({
              text: response.text.replace(/\[\^[0-9]\^\]/g, ""),
              suggestions: (response.suggestedResponses || {
                map: cb => {}
              }).map(e => e.text),
              card: (json.item.messages.filter(e => "InternalSearchResult" === e.messageType).reverse()[0] || {}).groundingInfo,
              spokenText: (json.item.messages.filter(e => null != e.spokenText).reverse()[0] || {}).spokenText
            });
          }
        };
      });
    } catch (error) {
      throw console.log(chalk.red("Error in sendMessage method:", error)), error;
    }
  }
}
export {
  BingChat
};