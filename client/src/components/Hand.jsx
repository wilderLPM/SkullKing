/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CardComponent from "./cards/CardComponent";
import FaceDownCard from "./cards/FaceDownCard";
import Cards from "../BDD/cards";

export default function Hand({ isResolved, setBoardCards }) {
  const playerNumber = 2;
  const [deck, setDeck] = useState(Cards); // le paquet de carte au fur et à mesure du tour
  const [isVisible, setIsVisible] = useState(false); // les cartes de la main sont visibles ?
  const [userIndex, setUserIndex] = useState(0); // le joueur en train de jouer son tour
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState(1);
  const [hands, setHands] = useState([[], []]); // Tableau contenant les mains de tous les joueurs au fur et à mesure du tour
  const [isRoundStart, setIsRoundStart] = useState(true); // Est-ce que le bidding stage est terminé ?
  const [isBidding, setIsBidding] = useState(false);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const getRandomCard = () => {
      const actualLength = deck.length; // Si il y a 3 cartes dans le deck actuellement,
      const indexToRemove = Math.floor(Math.random() * actualLength); // alors on obtient un nombre aléatoire entre 0 et 2 (   [0 - 1) * 3    )
      const [newCard] = deck.splice(indexToRemove, 1); // A AMELIORER
      return newCard;
    };

    const dealCards = async () => {
      const newHands = [[], []];

      for (let p = 0; p < playerNumber; p += 1) {
        // Pour chaque joueur p ...
        for (let c = 0; c < round; c += 1) {
          // ... autant de fois que le numéro du round ...
          const newCard = getRandomCard();
          newHands[p].push(newCard); // ... on distribue une carte.
        }
      }
      setHands(newHands);
    };

    dealCards();
    // console.log(hands)
  }, [deck, round]);

  const handleDiscoverHand = () => {
    // First time the player sees his hand this turn
    setIsVisible(true);
    setIsBidding(true);
  };

  const handleLookHand = () => {
    // During the turn = after bidding phase is over
    setIsVisible(true);
  };

  const handleBidding = (e) => {
    setBids((prevBids) => {
      const newBids = [...prevBids, e.target.value];
      if (newBids.length === playerNumber) {
        // Phase de bidding terminée, le premier joueur commence à jouer
        setIsRoundStart(false);
        setUserIndex(0);
      } else {
        setUserIndex((prevIndex) => prevIndex + 1);
      }

      return newBids;
    });

    setIsVisible(false);
    setIsBidding(false);
  };

  const handleEndTurn = () => {
    setTurn(turn + 1);
  };

  const handleEndRound = () => {
    /*         if (round === maxRound){
            console.log('Game finihed')
        } */
    setHands([[], []]); // On s'assure que les mains sont vides
    setRound(round + 1); // On passe au tour d'après, ce qui déclenche le useEffect et redistribue les cartes
    setDeck(Cards);
  };

  const handlePlayCard = (card) => {
    // eslint-disable-next-line no-param-reassign
    card.player = userIndex;
    setBoardCards((prevBoardCards) => [...prevBoardCards, card]);
    setIsVisible(false);
    setUserIndex(userIndex === 0 ? 1 : 0);
  };

  return (
    <div>
      {hands[userIndex].map((card) => {
        if (isVisible) {
          return !isRoundStart ? (
            <CardComponent card={card} key={card.id} onClick={handlePlayCard} />
          ) : (
            <CardComponent card={card} key={card.id} />
          );
        }
        return <FaceDownCard key={card.id} />;
      })}
      {!isVisible && !isBidding && (
        <button
          type="button"
          onClick={isRoundStart ? handleDiscoverHand : handleLookHand}
        >{`Player ${userIndex + 1}`}</button>
      )}
      {isBidding && (
        <ul>
          {[...Array(round + 1)].map((_, i) => (
            <li key={i}>
              <button type="button" onClick={handleBidding} value={i}>
                {i}
              </button>
            </li>
          ))}
        </ul>
      )}
      {isResolved &&
        (turn === round ? (
          <button type="button" onClick={handleEndRound}>
            End Round
          </button>
        ) : (
          <button type="button" onClick={handleEndTurn}>
            End Turn
          </button>
        ))}
    </div>
  );
}
