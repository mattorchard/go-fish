import React from "react";
import "./Card.css"
import CardSvg from "./CardSvg";


const Card = ({suit, rank, size = "large"}) =>
  <div className={`card card--${size}`}>
    {rank && suit && <CardSvg suit={suit} rank={rank}/>}
  </div>;

export default Card;