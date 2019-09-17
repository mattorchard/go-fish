const ranks = new Set(["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]);
const suits = new Set(["hearts", "spades", "clubs", "diamonds"]);
const standardDeck = [...suits].flatMap(suit => [...ranks].map(rank => ({rank, suit})));

// Orderings
const sharedRankOrder = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13};
const aceFirstRankOrder = {A: 1, ...sharedRankOrder};
const aceLastRankOrder = {A: 14, ...sharedRankOrder};
const suitOrder = {clubs: 0, diamonds: 1, hearts: 2, spades: 3};



const forAllCards = callback => standardDeck.forEach(callback);

const isFace = rank => isNaN(rank);

const createDeck = () => {
  const deck = [];
  forAllCards(({rank, suit}) => deck.push({rank, suit}));
  return shuffle(deck);
};

const shuffle = array => {
  const shuffledArray = [...array];
  shuffledArray.forEach((value, index) => {
    const otherIndex = Math.floor(array.length * Math.random());
    shuffledArray[index] = shuffledArray[otherIndex];
    shuffledArray[otherIndex] = value;
  });
  return shuffledArray;
};

const getCardComparator = rankOrder => (cardA, cardB) => {
  if (cardA.rank !== cardB.rank) {
    return rankOrder[cardA.rank] - rankOrder[cardB.rank];
  }
  return suitOrder[cardA.suit] - suitOrder[cardB.suit];
};

const sortCards = cards=> cards.sort(getCardComparator(aceFirstRankOrder));
const sortCardsAceLast = cards=> cards.sort(getCardComparator(aceLastRankOrder));

export {isFace, createDeck, ranks, suits, sortCards, sortCardsAceLast};