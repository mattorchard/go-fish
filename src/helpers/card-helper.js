const ranks = new Set(["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]);
const suits = new Set(["hearts", "spades", "clubs", "diamonds"]);
const standardDeck = [...suits].flatMap(suit => [...ranks].map(rank => ({rank, suit})));


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

export {isFace, createDeck, ranks, suits};