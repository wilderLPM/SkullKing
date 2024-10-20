import { useState } from "react";

// import styles from "./GamePage.module.css";
import Board from "../components/Board";
import Hand from "../components/Hand";

export default function GamePage() {
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState(1);
  const [bids, setBids] = useState([]);
  const [boardCards, setBoardCards] = useState([]); // Tableau contenant les cartes jouées lors de ce tour
  const [firstColor, setFirstColor] = useState(null);
  const [isResolved, setIsResolved] = useState(false); // Est-ce que la résolution du tour a eu lieue ?
  return (
    <>
      <Board
        setIsResolved={setIsResolved}
        boardCards={boardCards}
        firstColor={firstColor}
        setFirstColor={setFirstColor}
        round={round}
        turn={turn}
        bids={bids}
      />
      <Hand
        isResolved={isResolved}
        setBoardCards={setBoardCards}
        firstColor={firstColor}
        round={round}
        setRound={setRound}
        turn={turn}
        setTurn={setTurn}
        setBids={setBids}
      />
    </>
  );
}
