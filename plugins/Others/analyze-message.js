import axios from "axios";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input Teks";
    text = m.quoted?.text;
  }
  var tes = await Analyze(text);
  const toxicity = Number(100 * tes.toxicity).toFixed(2);
  let sIndexer;
  throw sIndexer = toxicity < 15 ? 0 : toxicity > 14 && toxicity < 35 ? 1 : toxicity > 34 && toxicity < 51 ? 2 : toxicity > 50 && toxicity < 76 ? 3 : toxicity > 75 && toxicity < 95 ? 4 : 5, `*[ TOXIC STRENGTH ]*\n\n${[ "❤️  ❤️  ❤️  ❤️  ❤️", "☠️  ❤️  ❤️  ❤️  ❤️", "☠️  ☠️  ❤️  ❤️  ❤️", "☠️  ☠️  ☠️  ❤️  ❤️", "☠️  ☠️  ☠️  ☠️  ❤️", "☠️  ☠️  ☠️  ☠️  ☠️" ][sIndexer]}\n${[ "You are so friendly. Very welcoming to know you!", "You are not too toxic, is it fun?", "You appear to be toxic. Calm down!", "Don't be so toxic. You can relax!", "There's nothing more I could say, you're totally the most toxic person in the world!", "Your toxic meter also goes above 100%." ][sIndexer]}\n`;
};
handler.help = ["toxicity"], handler.tags = ["info"], handler.command = /^(toxicity)$/i;
export default handler;
async function Analyze(teks) {
  try {
    const result = await axios.post("https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAOvxdB7IKKA0TphPvY2sFMlHDWBVLlV9o", {
      comment: {
        text: teks,
        type: "PLAIN_TEXT"
      },
      languages: ["id"],
      requestedAttributes: {
        SEVERE_TOXICITY: {},
        INSULT: {}
      }
    });
    return {
      toxicity: result.data.attributeScores.SEVERE_TOXICITY.summaryScore.value,
      insult: result.data.attributeScores.INSULT.summaryScore.value,
      combined: (result.data.attributeScores.SEVERE_TOXICITY.summaryScore.value + result.data.attributeScores.INSULT.summaryScore.value) / 2
    };
  } catch (e) {
    return console.error(e), {
      toxicity: NaN,
      insult: NaN,
      combined: NaN
    };
  }
}