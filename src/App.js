import React from 'react';
import './App.css';
import Hand from "./components/Hand";
import OpponentHand from "./components/OponentHand";
import DrawPile from "./components/DrawPile";
import Books from "./components/Books";
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
      <div className="play-table">
        {computer.books.length > 0 ? <Books books={computer.books}/> : <div/>}
        <DrawPile cardCount={drawPileSize}/>
        {human.books.length > 0 ? <Books books={human.books}/> : <div/>}
      </div>
      <Hand cards={sortCards([...human.hand])} onChooseRank={chooseRank} disabled={!canChoose}/>
    </main>
  </>;
}

export default App;
