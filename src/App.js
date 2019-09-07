import React from 'react';
import './App.css';
import Hand from "./components/Hand";
import OponentHand from "./components/OponentHand";

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


function App() {
  return <>
    <OponentHand cards={defaultHand}/>

    {/*Stacks*/}
    {/*<DrawPile cardCount={52}/>*/}
    {/*Stacks*/}
    <Hand cards={defaultHand}/>
  </>;
}

export default App;
