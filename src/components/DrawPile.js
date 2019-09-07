import React from "react";
import Card from "./Card";

const DrawPile = ({cardCount}) => <div className="draw-pile" style={{
  boxShadow: `0 0 ${cardCount / 52}rem rgba(20,20,20,${cardCount / 100})`
}}>
  <Card flipped />
</div>;

export default DrawPile;