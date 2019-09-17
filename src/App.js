import React from 'react';
import './App.css';
import Hand from "./components/Hand";
import OpponentHand from "./components/OponentHand";
import DrawPile from "./components/DrawPile";
import Pairs from "./components/Pairs";
import goFishMachine from "./state-machines/go-fish-machine";
import {useMachine} from "@xstate/react";
import {sortCards} from "./helpers/card-helper";
import ActivityLog from "./components/ActivityLog";


const useGoFish = () => {
  const [{context, value}, send] = useMachine(goFishMachine);
  console.log("State machine", value, context);

  const chooseRank = rank => send({type: "CHOOSE_RANK", rank});
  const {deck, players, message, turnIndex} = context;
  const drawPileSize = deck.length;
  const canChoose = turnIndex === 0 && value === "choosing";

  return {
    chooseRank,
    canChoose,
    drawPileSize,
    players,
    message
  }
};



function App() {
  const {chooseRank, canChoose, drawPileSize, players, message} = useGoFish();
  const [human, computer] = players;


  return <>
    <aside>
      <ActivityLog message={message} messageCount={10}/>
    </aside>
    <main>
      <OpponentHand cardCount={computer.hand.length}/>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Pairs pairs={computer.books}/>
        <DrawPile cardCount={drawPileSize}/>
        <Pairs pairs={human.books}/>
      </div>
      <Hand cards={sortCards([...human.hand])} onChooseRank={chooseRank} disabled={!canChoose}/>
    </main>
  </>;
}

export default App;
