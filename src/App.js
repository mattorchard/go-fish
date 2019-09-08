import React from 'react';
import './App.css';
import Hand from "./components/Hand";
import OpponentHand from "./components/OponentHand";
import DrawPile from "./components/DrawPile";
import Pairs from "./components/Pairs";
import useGoFish from "./helpers/use-go-fish";

function App() {
  const {chooseRank, playerCards, opponentCards, playerPairs, opponentPairs, drawPileSize} = useGoFish();
  return <>
    <OpponentHand cards={opponentCards}/>
    <div style={{display: "flex"}}>
    <Pairs pairs={opponentPairs}/>
    <DrawPile cardCount={drawPileSize}/>
    <Pairs pairs={playerPairs}/>
    </div>
    <Hand cards={playerCards} onChooseRank={chooseRank}/>
  </>;
}

export default App;
