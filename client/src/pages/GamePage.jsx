import { useState } from "react";

// import styles from "./GamePage.module.css";
import Board from "../components/Board";
import Hand from "../components/Hand";

export default function GamePage() {
  const [isResolved, setIsResolved] = useState(false); // Est-ce que la résolution du tour a eu lieue ?
  const [boardCards, setBoardCards] = useState([]); // Tableau contenant les cartes jouées lors de ce tour
  return (
    <>
      <Board setIsResolved={setIsResolved} boardCards={boardCards} />
      <Hand isResolved={isResolved} setBoardCards={setBoardCards} />
    </>
  );
}
