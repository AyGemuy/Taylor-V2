import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const lister = ["Adult Female #1, American English (TruVoice)", "Adult Female #2, American English (TruVoice)", "Adult Male #1, American English (TruVoice)", "Adult Male #2, American English (TruVoice)", "Adult Male #3, American English (TruVoice)", "Adult Male #4, American English (TruVoice)", "Adult Male #5, American English (TruVoice)", "Adult Male #6, American English (TruVoice)", "Adult Male #7, American English (TruVoice)", "Adult Male #8, American English (TruVoice)", "Female Whisper", "Male Whisper", "Mary", "Mary (for Telephone)", "Mary in Hall", "Mary in Space", "Mary in Stadium", "Mike", "Mike (for Telephone)", "Mike in Hall", "Mike in Space", "Mike in Stadium", "RoboSoft Five", "RoboSoft Four", "RoboSoft One", "RoboSoft Six", "RoboSoft Three", "RoboSoft Two", "Sam", "BonziBUDDY"],
    query = `Input query!\n\n*Example:*\n${usedPrefix + command} [number]|[text]\n\n*Choose a number from the list*\n` + String.fromCharCode(8206).repeat(4001) + lister.map((v, index) => `  ${index + 1}. ${v}`).join("\n");
  if (args.length < 1 && (!m.quoted || !m.quoted?.text)) throw query;
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text,
    [atas, bawah, kiri, kanan] = text.split("|");
  if (!atas || !bawah) return m.reply(query);
  m.reply(wait + "\n" + lister[atas - 1]);
  try {
    const res = await SayTTS(lister[atas - 1], bawah, kiri || 140, kanan || 157);
    res && await conn.sendFile(m.chat, res, "audio.mp3", "", m, !0, {
      mimetype: "audio/mp4",
      ptt: !0,
      waveform: [100, 0, 100, 0, 100, 0, 100],
      contextInfo: adReplyS.contextInfo
    });
  } catch (e) {
    m.reply("Error: " + e.message);
  }
};
handler.help = ["tetyys"], handler.tags = ["misc"], handler.command = /^(tetyys)$/i;
export default handler;
async function SayTTS(voice, text, pitch, speed) {
  try {
    pitch = parseInt(pitch), speed = parseInt(speed);
    const url = `https://tetyys.com/SAPI4/SAPI4?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}&pitch=${pitch}&speed=${speed}`;
    if (text.length > 4088) throw new Error("Text exceeds the maximum allowed length (1000 characters)");
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch audio: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    throw error;
  }
}
async function VoiceLimitations(voice) {
  try {
    const url = `https://tetyys.com/SAPI4/VoiceLimitations?voice=${encodeURIComponent(voice)}`,
      response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch voice limitations: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}