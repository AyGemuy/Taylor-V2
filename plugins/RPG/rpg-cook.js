const handler = async (m, {
  args,
  conn
}) => {
  let user = db.data.users[m.sender],
    type = (args[0] || "").toLowerCase(),
    count = args[1] && args[1].length > 0 ? Math.min(5, Math.max(parseInt(args[1]), 1)) : 1;
  try {
    switch (type) {
      case "ayambakar":
      case "gulaiayam":
      case "rendang":
      case "ayamgoreng":
      case "oporayam":
      case "steak":
      case "babipanggang":
      case "ikanbakar":
      case "lelebakar":
      case "nilabakar":
      case "bawalbakar":
      case "udangbakar":
      case "pausbakar":
      case "kepitingbakar":
        let needed = {
            ayam: type.includes("ayam") ? 2 * count : 0,
            sapi: type.includes("sapi") ? 2 * count : 0,
            babi: type.includes("babi") ? 2 * count : 0,
            ikan: type.includes("ikan") ? 2 * count : 0,
            udang: type.includes("udang") ? 2 * count : 0,
            paus: type.includes("paus") ? 2 * count : 0,
            kepiting: type.includes("kepiting") ? 2 * count : 0,
            coal: count
          },
          errMsg = "";
        for (let item in needed) user[item] < needed[item] && (errMsg += `${item.replace(/^./, item[0]?.toUpperCase())} (${needed[item]}), `);
        if (errMsg) await conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak ${type} 🥲\nAnda memerlukan: ${errMsg.slice(0, -2)}`, m);
        else {
          for (let item in needed) user[item] -= needed[item];
          user[type] += count, await conn.reply(m.chat, `Sukses memasak ${count} ${type.replace(/^./, type[0]?.toUpperCase())} 🍳`, m);
        }
        break;
      default:
        await conn.reply(m.chat, cookingMenu, m);
    }
  } catch (e) {
    console.log(e), await conn.reply(m.chat, "Sepertinya ada yang error, coba laporin ke owner ya", m);
  }
};
handler.help = ["masak <masakan> <jumlah>", "cook <masakan> <jumlah>"], handler.tags = ["rpg"],
  handler.command = /^(masak|cook)$/i;
export default handler;
const cookingMenu = "「 *C O O K I N G* 」\n\n▧ Ayam Bakar 🍖\n〉Need 2 ayam 🐓 & 1 Coal 🕳️\n\n▧ Ayam Goreng 🍗\n〉Need 2 ayam 🐓 & 1 Coal 🕳️\n\n▧ Opor Ayam 🍜\n〉Need 2 ayam 🐓 & 1 Coal 🕳️\n\n▧ Steak 🥩\n〉Need 2 sapi 🐮 & 1 Coal 🕳️\n\n▧ Rendang 🥘\n〉Need 2 sapi 🐮 & 1 Coal 🕳️\n\n▧ Gulai Ayam 🍲\n〉Need 2 ayam 🐓 & 1 Coal 🕳️\n\n▧ Babipanggang 🥠\n〉Need 2 babi 🐖 & 1 Coal 🕳️\n\n▧ Ikan Bakar 🐟\n〉Need 2 ikan 🐟 & 1 Coal 🕳️\n\n▧ Lele Bakar 🐟\n〉Need 2 lele 🐟 & 1 Coal 🕳️\n\n▧ Nila Bakar 🐟\n〉Need 2 nila 🐟 & 1 Coal 🕳️\n\n▧ Bawal Bakar 🐟\n〉Need 2 bawal 🐟 & 1 Coal 🕳️\n\n▧ Udang Bakar 🦐\n〉Need 2 udang 🦐 & 1 Coal 🕳️\n\n▧ Paus Bakar 🐳\n〉Need 2 paus 🐳 & 1 Coal 🕳️\n\n▧ Kepiting Bakar 🦀\n〉Need 2 kepiting 🦀 & 1 Coal 🕳️\n".trim();