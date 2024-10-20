import { useState } from "react";

// import styles from "./GamePage.module.css";
import Board from "../components/Board";
import Hand from "../components/Hand";
import Cards from "../BDD/cards";

export default function GamePage() {
  const [isResolved, setIsResolved] = useState(false); // Est-ce que la résolution du tour a eu lieue ?
  const [boardCards, setBoardCards] = useState([]); // Tableau contenant les cartes jouées lors de ce tour
  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);
  const [isRoundStart, setIsRoundStart] = useState(true); // Est-ce que le bidding stage est terminé ?
  const [hands, setHands] = useState([[], []]); // Tableau contenant les mains de tous les joueurs au fur et à mesure du round
  const [deck, setDeck] = useState([...Cards]); // le paquet de carte au fur et à mesure du round
  const [bids, setBids] = useState([]);

  const handleResolveTurn = () => {
    setBoardCards([]); // On nettoie le board

    if (turn === round) {
      setHands([[], []]); // On nettoie les mains des joueurs (normalement déjà vides)
      setDeck([...Cards]); // On réinitialise le deck
      setBids([]); // nouveau round = nouveaux bids

      setRound(round + 1); // On passe au round suivant
      setTurn(1);
      setIsRoundStart(true);
    } else {
      setTurn(turn + 1); // On passe au tour suivant
    }
    setIsResolved(false); // nouveau tour = pas encore résolu
  };
  return (
    <>
      <Board
        setIsResolved={setIsResolved}
        boardCards={boardCards}
        bids={bids} // pour attribuer les points aux joueurs
      />
      <Hand
        isResolved={isResolved}
        setBoardCards={setBoardCards}
        handleResolveTurn={handleResolveTurn}
        hands={hands}
        setHands={setHands}
        deck={deck}
        setDeck={setDeck} // sera utile pour les pouvoirs de pirates
        turn={turn}
        round={round}
        isRoundStart={isRoundStart}
        setIsRoundStart={setIsRoundStart}
        setBids={setBids}
      />
    </>
  );
}
