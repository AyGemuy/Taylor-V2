import { MyInstant } from "../../lib/tools/ai-gen.js";
const handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${_p}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const myInstant = new MyInstant();
    const results = await (text.toLowerCase() === "home"
      ? myInstant.home()
      : text.toLowerCase() === "best"
        ? myInstant.best()
        : text.toLowerCase() === "recent"
          ? myInstant.recent()
          : text.toLowerCase() === "category"
            ? myInstant.category(args[1])
            : text.toLowerCase() === "new"
              ? myInstant.new()
              : text.toLowerCase() === "fav"
                ? myInstant.fav()
                : myInstant.search(text));
    const [bestItem, ...videoItems] = results || [];
    const formattedData = {
      title: `*[ MyInstant Sound ]*\n*Best Match:* ${bestItem?.title}\n*Total Search:* ${results?.length}\n\n`,
      rows: [
        {
          title: "Best",
          highlight_label: "Best match",
          rows: [
            {
              header: bestItem?.title,
              id: `${_p}get ${bestItem?.soundLink}`,
              title: bestItem?.pageLink,
              description: "",
            },
          ],
        },
        {
          title: "More",
          rows: videoItems.map(({ title, soundLink, pageLink }, index) => ({
            header: `${index + 1}). ${title}`,
            id: `${_p}get ${soundLink}`,
            title: pageLink,
            description: "",
          })),
        },
      ],
    };
    await conn.sendButtonCta(
      m.chat,
      [
        [
          formattedData.title,
          wm,
          null,
          [],
          null,
          [],
          [["Result Here", formattedData.rows]],
        ],
      ],
      m,
    );
    m.react(sukses);
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.help = ["myinstant"];
handler.tags = ["tools"];
handler.command = /^(myinstant)$/i;
export default handler;
