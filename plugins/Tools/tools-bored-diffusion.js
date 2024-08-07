import fetch from "node-fetch";
import {
  FormData
} from "formdata-node";
const modelOptions = ["stablediffusion", "midjourney", "pokemon"],
  postData = async (index, input) => {
    try {
      const selectedmodel = modelOptions[index],
        formData = new FormData();
      formData.append("prompt", encodeURIComponent(input)), formData.append("model", encodeURIComponent(selectedmodel)),
        formData.append("prompt_improver", "true");
      const response = await fetch("https://boredhumans.com/api_text-to-image.php", {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("Request failed with status code " + response.status);
      const base64Data = await response.text();
      return JSON.parse(base64Data);
    } catch (error) {
      throw console.error("Error:", error), error;
    }
  }, handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
  }) => {
    try {
      let text;
      if (args.length >= 1) text = args.slice(0).join(" ");
      else {
        if (!m.quoted || !m.quoted?.text) {
          console.log("Select a model by entering the corresponding number:");
          const listMessage = `Select a model:\n${modelOptions.map((model, index) => `${index + 1}. ${model}`).join("\n")}`;
          return void m.reply(listMessage);
        }
        text = m.quoted?.text;
      }
      m.react(wait);
      const inputArray = text.split("|");
      if (2 !== inputArray.length) {
        const errorMessage = 'Invalid input format. Please use "index|input".';
        m.reply(errorMessage);
        const helpMessage = "Please use the format: index|input. For example: 3|Hello";
        m.reply(helpMessage);
      } else {
        const selectedIndex = parseInt(inputArray[0]),
          userInput = inputArray[1];
        if (!isNaN(selectedIndex) && selectedIndex >= 1 && selectedIndex <= modelOptions.length) {
          const result = await postData(selectedIndex - 1, userInput),
            tag = `@${m.sender.split("@")[0]}`;
          await conn.sendMessage(m.chat, {
            image: {
              url: result.output
            },
            caption: `Nih effect *${modelOptions[selectedIndex - 1]}* nya\nRequest by: ${tag}`,
            mentions: [m.sender]
          }, {
            quoted: m
          });
        } else {
          const errorMessage = "Invalid selection. Please enter a valid number.";
          m.reply(errorMessage);
          const helpMessage = "Please use the format: index|input. For example: 3|Hello";
          m.reply(helpMessage);
        }
      }
    } catch (error) {
      console.error("Error in main code:", error), m.reply(`Error: ${error}`);
    }
  };
handler.help = ["boreddiff"], handler.tags = ["tools"], handler.command = /^(boreddiff)$/i;
export default handler;