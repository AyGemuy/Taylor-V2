import fetch from "node-fetch";
export const sendWebhookRequest = async value => {
  const randomId = Date.now().toString() + Math.random().toString(36).substr(2, 5),
    currentTime = new Date(),
    payload = {
      app: {
        id: "blaael9y3cu1684390361270",
        time: currentTime,
        data: {
          sender: {
            id: randomId
          },
          message: [{
            id: randomId,
            time: currentTime,
            type: "text",
            value: value
          }]
        }
      }
    },
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8"
    };
  try {
    const response = await fetch("https://webhook.botika.online/webhook/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      }),
      webhookResponse = await response.json();
    if (!webhookResponse) return console.error("Webhook error:", webhookResponse.error),
      null;
    {
      const messages = webhookResponse.app.data.message;
      if (Array.isArray(messages)) {
        const responseMessages = messages.map(message => message.value);
        return responseMessages.join("\n\n").replace(/<BR>|<br>/gi, "\n").replace(/```/g, "\n");
      }
    }
  } catch (error) {
    return console.error("Error:", error), null;
  }
};