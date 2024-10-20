/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CardComponent from "./cards/CardComponent";

export default function Board({
  setIsResolved,
  boardCards,
  firstColor,
  setFirstColor,
  round,
  turn,
  bids,
}) {
  const playerNumber = 2;
  const [highestNumber, setHighestNumber] = useState();
  const [winner, setWinner] = useState(); // Correspond au userIndex du joueur qui a gagné le tour
  const [roundScore, setRoundScore] = useState([]); // Le nombre de manches gangnées par chaque joueur ce round ex: [2, O, 1, 0]
  const [gameScore, setGameScore] = useState([]); // Les scores de la partie de chaque joueur ex: [-50, 90, 30, 200]

  useEffect(() => {
    // S'exécute à chaque carte jouée
    const resolvePlay = () => {
      // Ne s'exécute que si le tour est fini
      for (let i = 0; i < playerNumber; i = +1) {
        if (boardCards[i].description === "pirate") {
            setFirstColor(null);
          setWinner(i);
          break;
        } else if (
          boardCards[i].description === "siren" &&
          i === playerNumber - 1
        ) {
          // Pas de pirate en jeu et place une sirène
          setFirstColor(null);
          setWinner(i);
          break;
        } else if (firstColor === null) {
          // Il n'y a ni tête, ni carte de couleur, autrement dit c'est la première carte jouée
          setFirstColor(boardCards[i].description);
          setHighestNumber(boardCards[i].attribut);
          setWinner(i);
        } else if (
          boardCards[i].description === firstColor &&
          boardCards[i].attribut > highestNumber
        ) {
          setHighestNumber(boardCards[i].attribut);
          setWinner(i);
        }
      }
    };
    
    const resolveTurn = () => {
        // resolve bids => attribute points equal to (10 * round) to players with correct bid
    }

    if (boardCards.length > 0) resolvePlay();

    if (boardCards.length === playerNumber) {
      // Si chaque joueur a joué une carte ce tour-ci, alors on résoud le tour.
      resolveTurn();
      setRoundScore((prevRoundScore) => [
        ...prevRoundScore,
        prevRoundScore[winner] + 1,
      ]);
      if (
        roundScore.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ) === round
      ) {
        // set
      }
    }
  }, [boardCards]);
  return (
    <>
      {boardCards.length > 0 &&
        boardCards.map((card) => <CardComponent card={card} key={card.id} />)}
      <p>Hello</p>
    </>
  );
}
