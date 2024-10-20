/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CardComponent from "./cards/CardComponent";

export default function Board({ setIsResolved, boardCards }) {
  const playerNumber = 2;
  const [mainColor, setMainColor] = useState();
  const [highestNumber, setHighestNumber] = useState();
  const [winner, setWinner] = useState();
  useEffect(() => {
    const resolveTurn = () => {
      if (boardCards[0].type === "color") {
        setMainColor(boardCards[0].description); // "green"
        setHighestNumber(boardCards[0].attribut); // 14
      } else {
        setWinner(boardCards[0].player); // 0 ou 1
      }
      setIsResolved(true);
      // resolve bids => attribute points equal to (10 * round) to players with correct bid
    };

    if (boardCards.length === playerNumber) resolveTurn(); // Si chaque joueur a joué une carte ce tour-ci, alors on résoud le tour.
  }, [boardCards]);
  return (
    <div>
      {boardCards.length > 0 &&
        boardCards.map((card) => <CardComponent card={card} key={card.id} />)}
    </div>
  );
}
