import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  if ("food" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} burger`;
    try {
      let f = await fetch(`https://api.spoonacular.com/food/menuItems/search?apiKey=da321822ad4040d1addcb3237db2aeba&query=${text}`),
        xx = await f.json(),
        str = xx.menuItems.map((v, index) => `*${htki} ${1 + index} ${htka}*\n*title:* ${v.title}\n*id:* ${v.id}\n*image:* ${v.image}\n*restaurantChain:* ${v.restaurantChain}\n*servings:* ${v.servings.number}\n`.trim()).join("\n\n");
      await conn.sendFile(m.chat, xx.menuItems[0]?.image, "food.png", str, m);
    } catch {
      m.react(eror);
    }
  }
  if ("ingredients" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} sugar`;
    try {
      let f = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=da321822ad4040d1addcb3237db2aeba&ingredients=${text}`),
        xx = await f.json(),
        str = xx.map((v, index) => `*${htki} ${1 + index} ${htka}*\n*title:* ${v.title}\n*id:* ${v.id}\n*image:* ${v.image}\n*usedIngredientCount:* ${v.usedIngredientCount}\n*missedIngredientCount:* ${v.missedIngredientCount}\n\n*missedIngredients*\n*id:* ${v.missedIngredients[0]?.id}\n*amount:* ${v.missedIngredients[0]?.amount}\n*unit:* ${v.missedIngredients[0]?.unit}\n*aisle:* ${v.missedIngredients[0]?.aisle}\n*name:* ${v.missedIngredients[0]?.name}\n*original:* ${v.missedIngredients[0]?.original}\n`.trim()).join("\n\n");
      await conn.sendFile(m.chat, xx[0]?.image, "food.jpg", str, m);
    } catch {
      m.react(eror);
    }
  }
  if ("recipes" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} 1003464`;
    try {
      let f = await fetch(`https://api.spoonacular.com/recipes/${text}/ingredientWidget.json?apiKey=da321822ad4040d1addcb3237db2aeba`),
        xx = await f.json(),
        str = xx.ingredients.map((v, index) => `*${htki} ${1 + index} ${htka}*\n*name:* ${v.name}\n*metric value:* ${v.amount.metric.value}\n*metric unit:* ${v.amount.metric.unit}\n*us value:* ${v.amount.us.value}\n*us unit:* ${v.amount.us.unit}\n*image: https://spoonacular.com/cdn/ingredients_100x100/${v.image}\n`.trim()).join("\n\n");
      await conn.sendFile(m.chat, `https://spoonacular.com/cdn/ingredients_100x100/${xx.ingredients[0]?.image}`, "food.jpg", str, m);
    } catch {
      m.react(eror);
    }
  }
};
handler.help = ["food", "ingredients", "recipes"].map(v => v + " <apa>"), handler.command = ["food", "ingredients", "recipes"],
  handler.tags = ["internet"];
export default handler;