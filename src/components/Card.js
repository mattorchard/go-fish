import React from "react";
import {isFace} from "../helpers/card-helper";
import SuitIcon from "./SuitIcon";
import Repeat from "./Repeat";
import "./Cards.css"

const FaceCardArt = ({suit}) => <div className="face-card-art">
  <SuitIcon suit={suit}/>
</div>;

const Pips = ({rank, suit}) => <div className={`pips pips--${rank}`}>{
  Repeat(parseInt(rank), () => <SuitIcon suit={suit}/>)}
</div>;

const Card = ({suit, rank, flipped=false}) => <div className={`card ${flipped && "card--flipped"}`}>
  <div className="card__back"/>
  <div className={`card__face ${suit}`}>
      <div className="rank">{rank}</div>
      {isFace(rank) ? <FaceCardArt suit={suit} rank={rank}/> : <Pips suit={suit} rank={rank}/>}
      <div className="rank">{rank}</div>
  </div>
</div>;

export default Card;