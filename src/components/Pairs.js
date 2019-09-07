import React from "react";
import Spread from "./Spread";

const Pairs = ({pairs}) => <ul className="pairs">{
    pairs.map((pair, index) => <li key={index} className="pairs__slot">
      <Spread cards={pair}/>
    </li>)

  }</ul>;


export default Pairs;