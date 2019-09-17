import React from "react";
import CardBack from "./CardBack";
import Repeat from "./Repeat"

const OpponentHand = ({cardCount}) => <ol
  className="opponent-hand"
  style={{"--child-count": cardCount}}>
  {
  <Repeat count={cardCount} render={(index =>
    <li
      className="opponent-hand__slot"
      style={{ "--child-index": index }}>
      <CardBack
        size="medium"
        flipped/>
    </li>
  )}/>}</ol>;

export default OpponentHand;