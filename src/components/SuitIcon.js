import React from "react";
import heartIcon from "../resources/heart.svg";
import spadeIcon from "../resources/spade.svg";
import clubIcon from "../resources/club.svg";
import diamondIcon from "../resources/diamond.svg";

const icons = {
  hearts: heartIcon,
  spades: spadeIcon,
  clubs: clubIcon,
  diamonds: diamondIcon
};

const SuitIcon = ({suit}) => <img
  className="suit-icon"
  src={icons[suit]}
  alt={suit}
  draggable="false"/>;


export default SuitIcon;
