import {useState} from "react";
import {createDeck} from "./card-helper";

const INITIAL_HAND_SIZE = 5;
const OPPONENT_TURN_TIME = 2000;

const getByRank = (cards, rank) => {
  const cardsWithRank = [];
  const remainingCards = [];

  cards.forEach(card => (card.rank === rank
      ? cardsWithRank
      : remainingCards
  ).push(card));

  return [cardsWithRank, remainingCards]
};

const getPairs = cards => {
  const pairs = [];
  const remainingCards = [];

  const byRank = cards.reduce((byRank, card) => {
    if (card.rank in byRank) {
      byRank[card.rank].push(card);
    } else {
      byRank[card.rank] = [card];
    }
    return byRank;
  }, {});

  Object.values(byRank).forEach(cardsOfRank => {
    while (cardsOfRank.length >= 2) {
      pairs.push(cardsOfRank.splice(cardsOfRank.length - 2));
    }
    remainingCards.push(...cardsOfRank);
  });

  return [pairs, remainingCards];
};

const createInitialState = () => {
  console.count("Create Initial State");
  const deck = createDeck();

  const playerCardsInitial = deck.splice(deck.length - INITIAL_HAND_SIZE);
  const opponentCardsInitial = deck.splice(deck.length - INITIAL_HAND_SIZE);

  const [playerPairs, playerCards] = getPairs(playerCardsInitial);
  const [opponentPairs, opponentCards] = getPairs(opponentCardsInitial);

  return {
    playerPairs,
    opponentPairs,
    playerCards,
    opponentCards,
    deck,
    opponentTurn: false
  }
};


const playerTurn = ({playerCards, playerPairs, opponentPairs, opponentCards, deck}, rank) => {
  const [stolenCards, remainingOpponentCards] = getByRank(opponentCards, rank);

  if (stolenCards.length > 0) {
    playerCards.push(...stolenCards);
    opponentCards = remainingOpponentCards;
  } else {
    playerCards.push(deck.pop());
  }

  const [pairs, cards] = getPairs(playerCards);
  playerPairs.push(...pairs);
  playerCards = cards;

  return {
    playerPairs,
    opponentPairs,
    playerCards,
    opponentCards,
    deck
  }
};

const randomRank = cards => {
  return cards[Math.floor(Math.random() * cards.length)].rank;
};

const opponentTurn = ({playerCards, playerPairs, opponentPairs, opponentCards, deck}) => {
  const rank = randomRank(opponentCards);
  console.log("Got any", rank);

  const [stolenCards, remainingPlayerCards] = getByRank(playerCards, rank);
  if (stolenCards.length > 0) {
    opponentCards.push(...stolenCards);
    playerCards = remainingPlayerCards;
  } else {
    opponentCards.push(deck.pop());
  }
  const [pairs, cards] = getPairs(opponentCards);
  opponentPairs.push(...pairs);
  opponentCards = cards;

  return {
    playerPairs,
    opponentPairs,
    playerCards,
    opponentCards,
    deck
  }
};
const initialState = createInitialState();
const useGoFish = () => {
  const [state, setWholeState] = useState(initialState);

  const chooseRank = async rank => {
    return new Promise(resolve => {
      console.log("Player chose:", rank);
      const postPlayerTurnState = playerTurn(state, rank);
      setWholeState({...postPlayerTurnState, opponentTurn: true});
      setTimeout(() => {
        const postOpponentTurnState = opponentTurn(postPlayerTurnState);
        setWholeState({...postOpponentTurnState, opponentTurn: false});
        resolve();
      }, OPPONENT_TURN_TIME)
    });

  };

  return {...state, chooseRank}
};

export default useGoFish;