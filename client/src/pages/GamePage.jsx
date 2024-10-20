import { useState } from "react";

// import styles from "./GamePage.module.css";
import Board from "../components/Board";
import Hand from "../components/Hand";
import Cards from "../BDD/cards";

export default function GamePage() {
  const [isResolved, setIsResolved] = useState(false); // Est-ce que la résolution du tour actuel a eu lieue ?
  const [boardCards, setBoardCards] = useState([]); // les cartes jouées lors de ce tour
  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);
  const [isRoundStart, setIsRoundStart] = useState(true); // round start = bidding stage du premier tour du round
  const [hands, setHands] = useState([[], []]); // les mains des joueurs
  const [deck, setDeck] = useState([...Cards]); // la pioche
  const [bids, setBids] = useState([]); // les enchères des joueurs
  const [userIndex, setUserIndex] = useState(0); // le joueur en train de jouer son tour

  const handleResolveTurn = () => {
    setBoardCards([]); // On nettoie le board

    if (turn === round) {
      setHands([[], []]); // On nettoie les mains des joueurs (normalement déjà vides)
      setDeck([...Cards]); // On réinitialise le deck
      setBids([]); // nouveau round = nouveaux bids

      setRound(round + 1); // On passe au round suivant
      setTurn(1);
      setUserIndex(0);
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
        userIndex={userIndex}
        setUserIndex={setUserIndex}
      />
    </>
  );
}
