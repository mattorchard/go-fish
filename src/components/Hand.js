import React, {useState} from "react";
import Card from "./Card";
import "./Hand.css";


const Hand = ({cards, onChooseRank}) => {
  const [disabled, setDisabled] = useState(false);

  return <form className="hand">
    {disabled && "Waiting"}
    {cards.map(({suit, rank}) =>
      <button
        key={`${rank}-${suit}`}
        onClick={async () => {
          setDisabled(true);
          await onChooseRank(rank);
          setDisabled(false);
        }}
        type="button"
        className="hand__slot"
        disabled={disabled}>
        <Card suit={suit} rank={rank}/>
      </button>
    )}
  </form>
};

export default Hand;