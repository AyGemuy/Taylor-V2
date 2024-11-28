import axios from "axios";
class Brainly {
  async getData(query, limit = 10) {
    const graphqlQuery = `query SearchQuery($query: String!, $first: Int!, $after: ID) {
      questionSearch(query: $query, first: $first, after: $after) {
        edges {
          node {
            content
            attachments {
              url
            }
            answers {
              nodes {
                content
                attachments {
                  url
                }
              }
            }
          }
        }
      }
    }`;
    const config = {
      url: "https://brainly.com/graphql/id",
      method: "POST",
      headers: {
        host: "brainly.com",
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0",
      },
      data: {
        operationName: "SearchQuery",
        variables: {
          query: query,
          after: null,
          first: limit,
        },
        query: graphqlQuery,
      },
    };
    try {
      const response = await axios.request(config);
      const { edges } = response.data.data.questionSearch;
      const results = edges.map((edge) => ({
        question: edge.node.content.replace(/(<br \/>)/gi, "\n"),
        attachments: edge.node.attachments,
        answers: edge.node.answers.nodes.map((node) => ({
          text: node.content
            .replace(/(<br \/>)/gi, "\n")
            .replace(/(<([^>]+)>)/gi, ""),
          attachments: node.attachments,
        })),
      }));
      return {
        status: "Success",
        total: results.length,
        result: results.length ? results : "Didn't find any result",
      };
    } catch (err) {
      return {
        status: "Error",
        total: 0,
        result: err.message,
      };
    }
  }
}
const brainly = new Brainly();
const handler = async (m, { conn, text }) => {
  if (!text) throw "Input Query";
  m.react(wait);
  try {
    const answer = (await brainly.getData(text, 10)).result
      .map(
        ({ question, answers }, i) =>
          `\n*Pertanyaan${question.grade ? ` (${question.grade})` : ""}*\n${question.content.replace(/(<br \/>)/gi, "\n")}` +
          `${answers.map((v, i) => `\n*Jawaban Ke ${i + 1}*${v.verification ? " (Verified)" : ""}${v.isBest ? " (Best)" : ""}\n` + `${v.content.replace(/(<br \/>)/gi, "\n").replace(/(<([^>]+)>)/gi, "")}` + `${v.attachments.length > 0 ? `\n*Media Url*: ${v.attachments.join(", ")}` : ""}`).join("")}`,
      )
      .join("\n" + "-".repeat(45));
    m.reply(answer.trim());
  } catch (e) {
    m.react(eror);
  }
};
handler.help = handler.alias = ["brainly"];
handler.tags = ["tools"];
handler.command = /^(brainly)$/i;
export default handler;
