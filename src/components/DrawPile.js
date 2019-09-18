import React from "react";
import CardBack from "./CardBack";

const DrawPile = ({cardCount}) =>
  <div className="ui-border">
    <div className="ui-border__label">{cardCount} cards</div>
    <div className="draw-pile" style={{
      boxShadow: `0 0 ${cardCount / 52}rem rgba(20,20,20,${cardCount / 100})`
    }}>
      <CardBack size="medium"/>
    </div>
  </div>;

export default DrawPile;