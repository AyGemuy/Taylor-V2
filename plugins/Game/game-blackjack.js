import _ from "lodash";
class Blackjack {
  constructor(decks) {
    this.decks = validateDeck(decks);
    this.state = "waiting";
    this.player = [];
    this.dealer = [];
    this.table = {
      player: {
        total: 0,
        cards: []
      },
      dealer: {
        total: 0,
        cards: []
      },
      bet: 0,
      payout: 0,
      doubleDowned: false
    };
    this.endHandlers = [];
  }
  placeBet(bet) {
    if (bet <= 0) throw new Error("Taruhan harus lebih dari 0");
    this.table.bet = bet;
  }
  start() {
    if (this.table.bet <= 0) throw new Error("Anda harus memasang taruhan sebelum memulai permainan");
    this.cards = new Deck(this.decks);
    this.cards.shuffleDeck(2);
    this.player = this.cards.dealCard(2);
    let dealerFirstCard;
    do {
      dealerFirstCard = this.cards.dealCard(1)[0];
    } while (dealerFirstCard.value > 11);
    this.dealer = [dealerFirstCard, ...this.cards.dealCard(1)];
    this.updateTable();
    return this.table;
  }
  hit() {
    if (this.state === "waiting") {
      const newCard = this.cards.dealCard(1)[0];
      this.player.push(newCard);
      this.updateTable();
      const playerSum = sumCards(this.player);
      if (playerSum > 21) {
        this.state = "dealer_win";
      } else if (playerSum === 21) {
        this.state = "player_blackjack";
      } else if (playerSum === sumCards(this.dealer)) {
        this.state = "draw";
      }
      if (this.state !== "waiting") this.emitEndEvent();
      return this.table;
    }
  }
  stand() {
    let dealerSum = sumCards(this.dealer);
    const playerSum = sumCards(this.player);
    if (playerSum <= 21) {
      while (dealerSum < 17) {
        this.dealer.push(...this.cards.dealCard(1));
        dealerSum = sumCards(this.dealer);
        this.updateTable();
      }
    }
    this.state = playerSum > 21 ? "dealer_win" : dealerSum > 21 || dealerSum < playerSum ? playerSum === 21 ? "player_blackjack" : "player_win" : dealerSum === playerSum ? "draw" : dealerSum === 21 ? "dealer_blackjack" : "dealer_win";
    this.emitEndEvent();
  }
  doubleDown() {
    if (!this.canDoubleDown()) throw new Error("Anda hanya dapat double down pada giliran pertama");
    this.table.doubleDowned = true;
    this.player.push(...this.cards.dealCard(1));
    this.updateTable();
    this.stand();
  }
  calculatePayout() {
    switch (this.state) {
      case "player_blackjack":
        this.table.payout = 1.5 * this.table.bet;
        break;
      case "player_win":
        this.table.payout = this.table.bet;
        break;
      case "dealer_win":
      case "dealer_blackjack":
        this.table.payout = 0;
        break;
      case "draw":
        this.table.payout = this.table.bet;
        break;
    }
    if (this.table.doubleDowned && this.state !== "draw") {
      this.table.payout *= 2;
    }
    this.table.payout = Math.round(this.table.payout);
  }
  canDoubleDown() {
    return this.state === "waiting" && this.player.length === 2;
  }
  onEnd(handler) {
    this.endHandlers.push(handler);
  }
  emitEndEvent() {
    this.calculatePayout();
    this.endHandlers.forEach(handler => handler({
      state: this.state,
      player: formatCards(this.player),
      dealer: formatCards(this.dealer),
      bet: this.table.bet,
      payout: this.table.payout
    }));
  }
  updateTable() {
    this.table.player = formatCards(this.player);
    this.table.dealer = formatCards(this.dealer);
  }
}
class Deck {
  constructor(decks) {
    this.deck = [];
    this.dealtCards = [];
    for (let i = 0; i < decks; i++) this.createDeck();
  }
  createDeck() {
    const card = (suit, value) => ({
      name: `${value} of ${suit}`,
      suit: suit,
      value: value.toUpperCase() === "A" ? 11 : ["J", "Q", "K"].includes(value.toUpperCase()) ? 10 : +value
    });
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const suits = ["♣️", "♦️", "♠️", "♥️"];
    suits.forEach(suit => values.forEach(value => this.deck.push(card(suit, value))));
  }
  shuffleDeck(amount = 1) {
    for (let i = 0; i < amount; i++) {
      for (let c = this.deck.length - 1; c >= 0; c--) {
        const tempVal = this.deck[c];
        let randomIndex = _.random(this.deck.length - 1);
        while (randomIndex === c) randomIndex = _.random(this.deck.length - 1);
        [this.deck[c], this.deck[randomIndex]] = [this.deck[randomIndex], tempVal];
      }
    }
  }
  dealCard(numCards) {
    return _.times(numCards, () => {
      const dealtCard = this.deck.shift();
      if (dealtCard) this.dealtCards.push(dealtCard);
      return dealtCard;
    }).filter(Boolean);
  }
}
const sumCards = cards => {
  let value = 0;
  let numAces = 0;
  cards.forEach(card => {
    value += card.value;
    numAces += card.value === 11 ? 1 : 0;
  });
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }
  return value;
};
const formatCards = cards => ({
  total: sumCards(cards),
  cards: cards
});
const validateDeck = decks => {
  if (!decks) throw new Error("Jumlah deck harus ditentukan");
  if (decks < 1) throw new Error("Jumlah deck harus lebih dari 0");
  if (decks > 8) throw new Error("Jumlah deck maksimal adalah 8");
  return decks;
};
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR"
});
const templateBlackjackMessage = (usedPrefix, command, conn, m, blackjack) => {
  const {
    table,
    state
  } = blackjack;
  const {
    bet,
    dealer,
    player,
    payout
  } = table;
  const dealerCards = dealer.cards.map(card => card.name).join(", ");
  const dealerTotal = dealer.total;
  const playerCards = player.cards.map(card => card.name).join(", ");
  const playerTotal = player.total;
  const hiddenDealerCards = dealer.cards.length > 1 ? `${dealer.cards.slice(0, -1).map(card => card.name).join(", ")}, ❓` : `${dealer.cards[0]?.name}`;
  let resultMessage;
  switch (state) {
    case "player_blackjack":
      resultMessage = `Anda mendapatkan Blackjack dengan total 21! 🎉`;
      break;
    case "dealer_blackjack":
      resultMessage = `Dealer mendapatkan Blackjack dengan total 21. 😔`;
      break;
    case "player_win":
      resultMessage = dealerTotal > 21 ? `Dealer BUST (melebihi 21) dan Anda menang dengan total ${playerTotal}! 🎉` : `Anda menang dengan total ${playerTotal} dibanding dealer ${dealerTotal}! 🎉`;
      break;
    case "dealer_win":
      resultMessage = playerTotal > 21 ? `Anda BUST (melebihi 21) dan dealer menang dengan total ${dealerTotal}. 😔` : `Dealer menang dengan total ${dealerTotal} dibandingkan total Anda ${playerTotal}. 😔`;
      break;
    case "draw":
      resultMessage = `Seri! Keduanya memiliki total ${playerTotal}. 🤝`;
      break;
    default:
      resultMessage = "";
  }
  const message = resultMessage ? `*\`🃏 • B L A C K J A C K •\`*\n\n╭───┈ •\n│ *Kartu Anda:*\n│ \`${playerCards}\`\n│ *Total Anda:*\n│ \`${playerTotal}\`\n├───┈ •\n│ *Kartu Dealer:*\n│ \`${dealerCards}\`\n│ *Total Dealer:*\n│ \`${dealerTotal > 21 ? "BUST" : dealerTotal}\`\n╰───┈ •\n\n> *\`${resultMessage.toUpperCase()}\`*\n*Taruhan:*\n- \`\`\`${formatter.format(bet)}\`\`\`\n*Payout:*\n- \`\`\`${formatter.format(payout)}\`\`\`\n` : `*\`🃏 • B L A C K J A C K •\`*\n\n╭───┈ •\n│ *Kartu Anda:*\n│ \`${playerCards}\`\n│ *Total Anda:*\n│ \`${playerTotal}\`\n├───┈ •\n│ *Kartu Dealer:*\n│ \`${hiddenDealerCards}\`\n│ *Total Dealer:*\n│ \`${dealerTotal > 21 ? "BUST" : "❓"}\`\n╰───┈ •\n\n*Taruhan:*\n- \`\`\`${formatter.format(bet)}\`\`\`\n\nKetik *\`${usedPrefix + command} hit\`* untuk menarik kartu.\nKetik *\`${usedPrefix + command} stand\`* untuk mengakhiri giliran Anda.`;
  return message;
};
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  conn.blackjack = conn.blackjack || {};
  let [aksi, argumen] = args;
  const gameSession = conn.blackjack[m.chat];
  const isActive = gameSession && gameSession.idPemain === m.sender;
  const isStarted = !!gameSession;
  const state = gameSession ? gameSession.state : null;
  let isOver = false;
  try {
    switch (aksi) {
      case "end":
        if (isActive) {
          delete conn.blackjack[m.chat];
          await conn.sendButton(m.chat, "*Anda keluar dari sesi blackjack.* 👋", "⚡ Pilih opsi berikut:", null, [
            ["Mulai Lagi", `${usedPrefix + command} start`]
          ], m);
        } else {
          await conn.sendButton(m.chat, "*Tidak ada sesi blackjack atau Anda bukan pemainnya.*", "⚡ Pilih opsi berikut:", null, [
            ["Mulai Sesi", `${usedPrefix + command} start`]
          ], m);
        }
        break;
      case "start":
        if (isStarted) {
          await conn.sendButton(m.chat, `*Sesi blackjack sudah berlangsung.* Gunakan *${usedPrefix + command} end* untuk keluar.`, "⚡ Pilih opsi berikut:", null, [
            ["Akhiri Game", `${usedPrefix + command} end`]
          ], m);
        } else {
          conn.blackjack[m.chat] = new Blackjack(1);
          conn.blackjack[m.chat].idPemain = m.sender;
          let betAmount = argumen ? parseInt(argumen) : 1e3;
          conn.blackjack[m.chat].placeBet(betAmount);
          conn.blackjack[m.chat].start();
          const table = conn.blackjack[m.chat];
          const pesanStart = templateBlackjackMessage(usedPrefix, command, conn, m, table);
          isOver = ["player_blackjack", "dealer_blackjack", "player_win", "dealer_win", "draw"].includes(table.state);
          const buttons = isOver ? [
            ["Akhiri Game", `${usedPrefix + command} end`],
            ["Mulai Lagi", `${usedPrefix + command} start`]
          ] : [
            ["Hit", `${usedPrefix + command} hit`],
            ["Stand", `${usedPrefix + command} stand`],
            ["Double", `${usedPrefix + command} double`]
          ];
          await conn.sendButton(m.chat, pesanStart, "⚡ Pilih opsi berikut:", null, buttons, m);
          if (isOver) {
            delete conn.blackjack[m.chat];
          }
        }
        break;
      case "hit":
      case "stand":
      case "double":
        if (!isActive) {
          await conn.sendButton(m.chat, "*Anda tidak sedang bermain blackjack atau bukan pemainnya.*", "⚡ Pilih opsi berikut:", null, [
            ["Mulai Sesi", `${usedPrefix + command} start`]
          ], m);
          break;
        }
        const table = conn.blackjack[m.chat];
        if (aksi === "hit") gameSession.hit();
        if (aksi === "stand") gameSession.stand();
        if (aksi === "double") gameSession.doubleDown();
        const updatedTable = conn.blackjack[m.chat];
        const updatedPesan = templateBlackjackMessage(usedPrefix, command, conn, m, updatedTable);
        isOver = ["player_blackjack", "dealer_blackjack", "player_win", "dealer_win", "draw"].includes(updatedTable.state);
        const buttons = isOver ? [
          ["Akhiri Game", `${usedPrefix + command} end`],
          ["Mulai Lagi", `${usedPrefix + command} start`]
        ] : [
          ["Hit", `${usedPrefix + command} hit`],
          ["Stand", `${usedPrefix + command} stand`],
          ["Double", `${usedPrefix + command} double`]
        ];
        await conn.sendButton(m.chat, updatedPesan, "⚡ Pilih opsi berikut:", null, buttons, m);
        if (isOver) {
          delete conn.blackjack[m.chat];
        }
        break;
      default:
        await conn.sendButton(m.chat, `*Perintah tidak valid.*\nGunakan *${usedPrefix + command} start* untuk memulai sesi blackjack.`, "⚡ Pilih opsi berikut:", null, [
          ["Mulai Sesi", `${usedPrefix + command} start`],
          ["Bantuan", `${usedPrefix + command} help`]
        ], m);
    }
  } catch (err) {
    console.error(err);
    await conn.sendButton(m.chat, "*Terjadi kesalahan saat memproses perintah.*", "⚡ Pilih opsi berikut:", null, [
      ["Help", `${usedPrefix + command} help`]
    ], m);
  }
};
handler.command = ["blackjack"];
handler.tags = ["game"];
handler.help = ["blackjack"];
export default handler;