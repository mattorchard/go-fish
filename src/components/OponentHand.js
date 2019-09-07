import React from "react";
import Card from "./Card";

const OpponentHand = ({cards}) => <ol
  className="opponent-hand card--medium"
  style={{"--child-count": cards.length}}>
  {
  cards.map(({suit, rank}, index) =>
    <li
      key={`${rank}-${suit}`}
      className="opponent-hand__slot"
      style={{ "--child-index": index }}>
      <Card
        suit={suit}
        rank={rank}
        size="medium"
        flipped/>
    </li>
  )}</ol>;

export default OpponentHand;