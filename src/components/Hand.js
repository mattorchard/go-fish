import React from "react";
import Card from "./Card";
import "./Hand.css";


const Hand = ({cards, disabled = false}) => {

  return <form className="hand">
    {cards.map(({suit, rank}) =>
      <button
        key={`${rank}-${suit}`}
        type="button"
        className="hand__slot"
        disabled={disabled}>
        <Card suit={suit} rank={rank}/>
      </button>
    )}
  </form>
};

export default Hand;