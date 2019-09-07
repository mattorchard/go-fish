import React from 'react';
import './App.css';
import Hand from "./components/Hand";
import OpponentHand from "./components/OponentHand";
import Spread from "./components/Spread";
import DrawPile from "./components/DrawPile";


const defaultHand = [
  {suit: "hearts", rank: "A"},
  {suit: "diamonds", rank: 2},
  {suit: "clubs", rank: 3},
  {suit: "hearts", rank: 4},
  {suit: "clubs", rank: 5},
  {suit: "spades", rank: 6},
  {suit: "hearts", rank: 7},
  {suit: "spades", rank: 8},
  {suit: "spades", rank: 9},
  {suit: "hearts", rank: 10},
  {suit: "clubs", rank: "J"},
  {suit: "diamonds", rank: "Q"},
  {suit: "spades", rank: "K"},
];
const smallHand = [
  {suit: "spades", rank: 6},
  {suit: "hearts", rank: 7},
];

function App() {
  return <>
    <OpponentHand cards={defaultHand}/>
    <Spread cards={smallHand}/>
    <DrawPile cardCount={0}/>
    <Hand cards={defaultHand}/>
  </>;
}

export default App;
