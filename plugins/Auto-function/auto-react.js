const handler = async (m, {}) => {
  try {
    m.quoted?.react(emojis) ?? m.react(emojis);
  } catch (error) {
    console.error("Error handling reaction:", error);
  }
};
handler.customPrefix = /^(anjir|((bil|ad)e|dec)k|tytyd|laik|banh|nihh)$/i;
handler.command = new RegExp();
handler.mods = false;
export default handler;