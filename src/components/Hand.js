import React from "react";
import Card from "./Card";
import "./Hand.css";


// Todo: Switch to use event bubbling
const Hand = ({cards, onChooseRank, disabled}) =>
  <form className="hand">
    {cards.map(({suit, rank}) =>
      <button
        key={`${rank}-${suit}`}
        onClick={() => onChooseRank(rank)}
        type="button"
        className="hand__slot"
        disabled={disabled}>
        <Card suit={suit} rank={rank}/>
      </button>
    )}
  </form>;

export default Hand;