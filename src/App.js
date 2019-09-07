import React from 'react';
import './App.css';
import Hand from "./components/Hand";
import OpponentHand from "./components/OponentHand";
import DrawPile from "./components/DrawPile";
import Pairs from "./components/Pairs";


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

const pairsExample = [
  [
    {suit: "diamonds", rank: 7},
    {suit: "hearts", rank: 7}
  ],
  [
    {suit: "clubs", rank: 8},
    {suit: "hearts", rank: 8}
  ],
  [
    {suit: "clubs", rank: "Q"},
    {suit: "spades", rank: "Q"}
  ]
];

function App() {
  return <>
    <OpponentHand cards={defaultHand}/>
    <Pairs pairs={pairsExample}/>
    <DrawPile cardCount={0}/>
    <Pairs pairs={pairsExample}/>
    <Hand cards={defaultHand}/>
  </>;
}

export default App;
