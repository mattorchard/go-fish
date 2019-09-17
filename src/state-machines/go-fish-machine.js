// import {createDeck} from "../helpers/card-helper";
import {Machine, assign} from "xstate";

const createDeck = () => [{"rank": 6, "suit": "spades"}, {"rank": "Q", "suit": "hearts"}, {
  "rank": 3,
  "suit": "diamonds"
}, {"rank": 3, "suit": "clubs"}, {"rank": 9, "suit": "spades"}, {"rank": 4, "suit": "clubs"}, {
  "rank": 10,
  "suit": "hearts"
}, {"rank": 3, "suit": "spades"}, {"rank": 6, "suit": "clubs"}, {"rank": 8, "suit": "spades"}, {
  "rank": 9,
  "suit": "clubs"
}, {"rank": 4, "suit": "hearts"}, {"rank": 10, "suit": "clubs"}, {"rank": 5, "suit": "spades"}, {
  "rank": 7,
  "suit": "hearts"
}, {"rank": "K", "suit": "hearts"}, {"rank": "A", "suit": "spades"}, {"rank": "J", "suit": "spades"}, {
  "rank": 9,
  "suit": "diamonds"
}, {"rank": 7, "suit": "clubs"}, {"rank": 6, "suit": "diamonds"}, {"rank": 8, "suit": "clubs"}, {
  "rank": 2,
  "suit": "clubs"
}, {"rank": 8, "suit": "diamonds"}, {"rank": 8, "suit": "hearts"}, {"rank": "Q", "suit": "clubs"}, {
  "rank": 5,
  "suit": "diamonds"
}, {"rank": 7, "suit": "spades"}, {"rank": 5, "suit": "hearts"}, {"rank": 10, "suit": "spades"}, {
  "rank": 9,
  "suit": "hearts"
}, {"rank": 4, "suit": "spades"}, {"rank": 7, "suit": "diamonds"}, {"rank": "Q", "suit": "diamonds"}, {
  "rank": 2,
  "suit": "diamonds"
}, {"rank": "K", "suit": "diamonds"}, {"rank": "J", "suit": "hearts"}, {"rank": 5, "suit": "clubs"}, {
  "rank": "A",
  "suit": "diamonds"
}, {"rank": "K", "suit": "clubs"}, {"rank": "J", "suit": "diamonds"}, {"rank": "A", "suit": "hearts"}, {
  "rank": "J",
  "suit": "clubs"
}, {"rank": "A", "suit": "clubs"}, {"rank": 2, "suit": "hearts"}, {"rank": 3, "suit": "hearts"}, {
  "rank": 4,
  "suit": "diamonds"
}, {"rank": 6, "suit": "hearts"}, {"rank": 10, "suit": "diamonds"}, {"rank": "Q", "suit": "spades"}, {
  "rank": 2,
  "suit": "spades"
}, {"rank": "K", "suit": "spades"}];

const DELAYS = {
  ANNOUNCE: 2000,
  DRAW: 2000,
  MATCHING: 2000,
};


// Helpers
const bisect = (list, callback) => {
  const includes = [];
  const excludes = [];
  list.forEach((item, ...rest) => callback(item, ...rest) ? includes.push(item) : excludes.push(item));
  return [includes, excludes];
};

const getMatches = cards =>
  cards.reduce((matches, card) => {
    if (card.rank in matches) {
      matches[card.rank].push(card);
    } else {
      matches[card.rank] = [card];
    }
    return matches;
  }, {});

const applyMatches = ({hand: initialHand, books: initialBooks}) => {
  const hand = [];
  const books = [...initialBooks];
  Object.entries(getMatches(initialHand)).forEach(([, cards]) => {
    if (cards.length === 4) {
      books.push(cards);
    } else {
      hand.push(...cards);
    }
  });
  return {
    hand, books
  }
};

// Actions
const saveChosenRank = assign((context, event) => ({chosenRank: event.rank || "WHUT"}));

const deal = assign(() => {
  const deck = createDeck();
  const players = new Array(2).fill(null).map(() =>
    applyMatches({
      hand: deck.splice(0, 5),
      books: []
    }));

  return {
    deck,
    players
  }
});

const draw = assign(({players, deck, turnIndex}) => {
  const [drawnCard, ...remainingDeck] = deck;
  const drawnRank = drawnCard.rank;

  const currentPlayer = players[turnIndex];
  currentPlayer.hand = [...currentPlayer.hand, drawnCard];

  return {
    message: `Drew a ${drawnCard.rank} of ${drawnCard.suit}`,
    deck: remainingDeck,
    drawnRank,
    players
  }
});


const steal = assign(({players, turnIndex, chosenRank}) => {
  const currentPlayer = players[turnIndex];
  const otherPlayer = players[turnIndex ? 0 : 1];

  const [stolenCards, remainingHand] = bisect(otherPlayer.hand, card => card.rank === chosenRank);
  const stealSucceeded = stolenCards.length > 0;

  otherPlayer.hand = remainingHand;
  currentPlayer.hand.push(...stolenCards);

  return {
    players,
    stealSucceeded,
    message: stealSucceeded ? `Stole ${stolenCards.length} cards` : "Go Fish"
  };
});

const match = assign(({players}) => ({
  message: "Matches have been applied",
  players: players.map(applyMatches)
}));

const resetTurn = assign(() => ({
  message: "Resetting turn",
  chosenRank: null,
  drawnRank: null,
  stealSucceed: false
}));

const flipTurn = assign(context => ({
  message: context.turnIndex ? "Your turn now" : "Computer's turn now",
  turnIndex: context.turnIndex ? 0 : 1
}));

// Guards
const stealSucceed = context => context.stealSucceeded;

const drewRequestedRank = ({chosenRank, drawnRank}) => chosenRank !== null && chosenRank === drawnRank;

const playerWon = ({players}) => players[0].hand.length === 0;
const playerLost = ({players}) => players[1].hand.length === 0;

const goFishMachine = Machine({
    id: "goFishTurn",
    initial: "setup",
    context: {
      turnIndex: 0,
      chosenRank: null,
      drawnRank: null,
      stealSucceeded: false,
      message: ""
    },
    states: {
      setup: {
        on: {
          "": {
            actions: "deal",
            target: "choosing"
          }
        }
      },
      choosing: {
        on: {CHOOSE_RANK: {target: "announce", actions: "saveChosenRank"}}
      },
      announce: {
        after: {
          [DELAYS.ANNOUNCE]: {target: "stealing", actions: "steal"}
        }
      },
      stealing: {
        on: {
          "": [
            {cond: "stealSucceed", target: "matching"},
            {target: "drawing"}
          ]
        }
      },
      drawing: {
        after: {
          [DELAYS.DRAW]: {target: "matching", actions: "draw"}
        }
      },
      matching: {
        after: {
          [DELAYS.MATCHING]: {
            target: "endTurn", actions: "match"
          }
        }
      },
      endTurn: {
        after: {
          "": [
            {cond: "playerWon", target: "won"},
            {cond: "playerLost", target: "lost"},
            {cond: "drewRequestedRank", target: "choosing", actions: ["resetTurn"]},
            {target: "choosing", actions: ["resetTurn", "flipTurn"]}
          ]
        }
      },
      lost: {
        type: "final"
      },
      won: {
        type: "final"
      }
    }
  },
  {
    actions: {
      saveChosenRank,
      steal,
      deal,
      match,
      draw,
      resetTurn,
      flipTurn
    },
    guards: {
      playerWon,
      playerLost,
      stealSucceed,
      drewRequestedRank
    }
  }
);

export default goFishMachine;
