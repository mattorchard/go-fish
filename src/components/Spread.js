import React from "react";
import Card from "./Card";

const Spread = ({cards}) => <ol
  className="spread"
  style={{"--child-count": cards.length}}>{
  cards.map(({suit, rank}) =>
    <li
      key={`${rank}-${suit}`}
      className="spread__slot">
      <Card
        suit={suit}
        rank={rank}
        size="small"/>
    </li>
  )}</ol>;

export default Spread;