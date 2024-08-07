import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix
}) => {
  if (!(m.quoted && m.quoted?.text && text)) return m.reply("*Example:*\n" + usedPrefix + command + " js (with reply code)");
  const model = text.trim(),
    question = m.quoted?.text;
  if ("zcodequest" === command) try {
    const payload = {
        p1: model,
        p2: question,
        option1: "3 - A detailed answer",
        option2: "Professional",
        option3: "Indonesian"
      },
      msg = await fetchAndParse(payload, "answer-question");
    m.reply(msg);
  } catch (e) {
    return m.react(eror);
  }
  if ("zcodegen" === command) try {
    const payload = {
        p1: model,
        p2: question,
        option1: "3 - A detailed answer",
        option2: "Professional",
        option3: "Indonesian"
      },
      msg = await fetchAndParse(payload, "code-generator");
    m.reply(msg);
  } catch (e) {
    return m.react(eror);
  }
  if ("zcodebug" === command) try {
    const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "find and explain bug",
        option2: "Professional",
        option3: "Indonesian"
      },
      msg = await fetchAndParse(payload, "code-debug");
    m.reply(msg);
  } catch (e) {
    return m.react(eror);
  }
  if ("zcoderef" === command) try {
    const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "Refactor my code and explain me",
        option2: "Professional",
        option3: "Indonesian"
      },
      msg = await fetchAndParse(payload, "code-refactor");
    m.reply(msg);
  } catch (e) {
    return m.react(eror);
  }
  if ("zcoderev" === command) try {
    const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "Make a full code review",
        option2: "Professional",
        option3: "Indonesian"
      },
      msg = await fetchAndParse(payload, "code-review");
    m.reply(msg);
  } catch (e) {
    return m.react(eror);
  }
  if ("zcodedoc" === command) try {
    const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "Add comment everwhere you can",
        option2: "Professional",
        option3: "Indonesian"
      },
      msg = await fetchAndParse(payload, "code-documentation");
    m.reply(msg);
  } catch (e) {
    return m.react(eror);
  }
};
handler.command = /^(zcode(quest|gen|bug|ref|rev|doc))$/i;
export default handler;
async function fetchAndParse(payload, tool) {
  try {
    const url = "https://zzzcode.ai/api/tools/" + tool,
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }),
      match = (await response.text()).match(/zzzredirectmessageidzzz:\s*([a-zA-Z0-9-]+)/),
      id = match ? match[1] : null,
      url2 = "https://zzzcode.ai/api/tools/" + tool,
      response2 = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      }),
      lines = (await response2.text()).split("\n").slice(1, -3);
    return lines.map(line => line.startsWith('data: "') ? JSON.parse(`{"msg": "${line.slice(7, -1)}"}`) : JSON.parse(`{"msg": "${line}"}`)).map(parsedLine => parsedLine.msg).join("");
  } catch (e) {
    return null;
  }
}