import React from "react";
import Card from "./Card";

const OpponentHand = ({cards}) => <ul className="opponent-hand card-sized">{
  cards.map(({suit, rank}, index) =>
    <li
      key={`${rank}-${suit}`}
      className="opponent-hand__slot"
      style={{
        "--child-index": index,
        "--child-count": cards.length
      }}>
      <Card
        suit={suit}
        rank={rank}
        flipped/>
    </li>
  )}</ul>;

export default OpponentHand;