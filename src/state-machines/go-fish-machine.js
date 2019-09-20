import {createDeck} from "../helpers/card-helper";
import {Machine, assign} from "xstate";


const DELAYS = {
  COMPUTER_CHOOSING: 1000,
  ANNOUNCING: 1000,
  STEALING: 1000,
  DRAWING: 1000,
  MATCHING: 500,
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
const choose = assign((context, event) => ({chosenRank: event.rank, message: `Got any ${event.rank}s`}));

const deal = assign(() => {
  const deck = createDeck();
  const players = new Array(2).fill(null).map(() =>
    applyMatches({
      hand: deck.splice(0, 7),
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
  currentPlayer.hand.push(drawnCard);

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
    message: stealSucceeded
      ? `Stole ${stolenCards.length} card${stolenCards.length > 1 ? "s" : ""}`
      : "Go Fish"
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

const computerChoose = assign(context => {
  const hand = context.players[1].hand;
  const randomCard = hand[Math.floor(Math.random() * hand.length)];
  console.log("Random Choice", randomCard);
  return {chosenRank: randomCard.rank, message: `Got any ${randomCard.rank}s?`};
});

const chooseAgain = assign(() => ({
  message: "Fish My Wish! Choose again"
}));

// Guards
const isComputer = context => context.turnIndex === 1;

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
        on: {CHOOSE_RANK: {target: "announcing", actions: "choose"}},
        after: {
          [DELAYS.COMPUTER_CHOOSING]: {cond: "isComputer", target: "announcing", actions: "computerChoose"}
        }
      },
      announcing: {
        after: {
          [DELAYS.ANNOUNCING]: "stealing"
        }
      },
      stealing: {
        entry: "steal",
        after: {
          [DELAYS.STEALING]: [
            {cond: "stealSucceed", target: "matching"},
            {target: "drawing"}
          ]
        }
      },
      drawing: {
        entry: "draw",
        after: {
          [DELAYS.DRAWING]: "matching"
        }
      },
      matching: {
        entry: "match",
        after: {
          [DELAYS.MATCHING]: "endTurn"
        }
      },
      endTurn: {
        on: {
          "": [
            {cond: "playerWon", target: "won"},
            {cond: "playerLost", target: "lost"},
            {cond: "drewRequestedRank", target: "choosing", actions: ["resetTurn", "chooseAgain"]},
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
      computerChoose,
      chooseAgain,
      choose,
      steal,
      deal,
      match,
      draw,
      resetTurn,
      flipTurn
    },
    guards: {
      isComputer,
      playerWon,
      playerLost,
      stealSucceed,
      drewRequestedRank
    }
  }
);

export default goFishMachine;
