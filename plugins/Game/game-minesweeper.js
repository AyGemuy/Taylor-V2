const generate = (x, y, bombs) => {
    const field = Array.from({
      length: x
    }, () => Array(y).fill(0));
    for (let i = 0; i < bombs; i++) {
      let xBomb, yBomb;
      do {
        xBomb = Math.floor(Math.random() * x), yBomb = Math.floor(Math.random() * y);
      } while ("x" === field[xBomb][yBomb]);
      field[xBomb][yBomb] = "x";
    }
    for (let i = 0; i < x; i++)
      for (let j = 0; j < y; j++)
        if ("x" !== field[i][j])
          for (let k = -1; k <= 1; k++)
            for (let l = -1; l <= 1; l++) {
              const ni = i + k,
                nj = j + l;
              ni >= 0 && ni < x && nj >= 0 && nj < y && "x" === field[ni][nj] && field[i][j]++;
            }
    return field;
  },
  generateEmpty = (x, y) => Array.from({
    length: x
  }, () => Array(y).fill(0)),
  translate = value => {
    switch (value) {
      case 0:
        return "⬜";
      case 1:
        return "1️⃣";
      case 2:
        return "2️⃣";
      case 3:
        return "3️⃣";
      case 4:
        return "4️⃣";
      case 5:
        return "5️⃣";
      case 6:
        return "6️⃣";
      case 7:
        return "7️⃣";
      case 8:
        return "8️⃣";
      case "x":
        return "💣";
      case "e":
        return "⏹️";
      case "f":
        return "🚩";
    }
  },
  generateString = map => map.map(row => row.map(cell => translate(cell)).join("")).join("\n"),
  detectZero = (map, x, y) => {
    const queue = [
        [x, y]
      ],
      result = [],
      visited = new Set();
    for (; queue.length > 0;) {
      const [cx, cy] = queue.shift();
      if (!visited.has(`${cx},${cy}`) && (visited.add(`${cx},${cy}`), result.push([cx, cy]), 0 === map[cx][cy]))
        for (let i = -1; i <= 1; i++)
          for (let j = -1; j <= 1; j++) {
            const ni = cx + i,
              nj = cy + j;
            ni >= 0 && ni < map.length && nj >= 0 && nj < map[0]?.length && queue.push([ni, nj]);
          }
    }
    return result;
  },
  handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
  }) => {
    conn.minessweeper = conn.minessweeper || {};
    const orgs = args[0],
      oX = args[1],
      oY = args[2],
      F = args[3];
    if (!orgs) return await conn.reply(m.chat, `🕹️ *Minesweeper Game* 🕹️\n*▶️ ${usedPrefix + command} go* - Start the Game\n*🔓 ${usedPrefix + command} open* - Open a cell\n*🔽 ${usedPrefix + command} surrender* - Surrender\n\n*Example:* ${usedPrefix + command} go`, m);
    switch (orgs.toLowerCase()) {
      case "go":
      case "start":
        const map = generate(10, 10, 15),
          empty = generateEmpty(10, 10),
          {
            key
          } = await conn.reply(m.chat, "🕹️ *Minesweeper Game* 🕹️\n\n*Board*\n" + generateString(empty), m);
        return void(conn.minessweeper[m.chat] = {
          map: map,
          current: empty,
          key: key
        });
      case "surrender":
      case "stop":
      case "end":
        return conn.minessweeper[m.chat] ? (delete conn.minessweeper[m.chat], await conn.reply(m.chat, "🏳️ *You surrendered.*", m)) : await conn.reply(m.chat, "🚨 *No active game session.*", m);
      case "open":
      case "o":
      case "buka":
        if (!conn.minessweeper[m.chat]) return await conn.reply(m.chat, "🚨 *No active game session.*", m);
        if (oX > 10 || !oX || !oY) return await conn.reply(m.chat, `🚨 *Invalid parameters. Example: ${usedPrefix + command} open 2 5*`, m);
        const g = conn.minessweeper[m.chat];
        if ("f" === F) g.current[oY - 1][oX - 1] = "🚩";
        else {
          const openedCell = g.map[oX - 1][oY - 1];
          if (0 === openedCell) {
            const zero = detectZero(g.map, oX - 1, oY - 1);
            for (const coords of zero) g.current[coords[0]][coords[1]] = g.map[coords[0]][coords[1]];
          } else {
            if ("x" === openedCell) {
              delete conn.minessweeper[m.chat], db.data.users[m.sender].exp -= 9e3;
              const {
                key: loseKey
              } = await conn.reply(m.chat, "💥 *BOOM!* 💣 *You opened a bomb.*\n*Exp Points Deducted: 9000* 💔\n*Exp Points:* " + db.data.users[m.sender].exp, m);
              return void(conn.minessweeper[m.chat] = {
                key: loseKey
              });
            }
            g.current[oY - 1][oX - 1] = openedCell, db.data.users[m.sender].exp += 9e3;
          }
        }
        await conn.sendMessage(m.chat, {
          delete: g.key
        });
        const {
          key: newKey
        } = await conn.reply(m.chat, "🕹️ *Minesweeper Game* 🕹️\n\n*Board*\n" + generateString(g.current) + "\n\n*Exp Points:* +9000", m);
        return void(conn.minessweeper[m.chat].key = newKey);
    }
  };
handler.help = ["minesweeper", "mw"].map(v => v + " <command> <x> <y>"), handler.tags = ["game"],
  handler.command = /^(minesweeper|mw)$/i;
export default handler;