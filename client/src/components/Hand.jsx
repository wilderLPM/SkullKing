/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CardComponent from "./cards/CardComponent";
import FaceDownCard from "./cards/FaceDownCard";

export default function Hand({
  isResolved,
  setBoardCards,
  deck,
  round,
  setHands,
  setDeck, // sera utile pour les pouvoirs de pirates
  hands,
  turn,
  handleResolveTurn,
  isRoundStart,
  setIsRoundStart,
  setBids,
  userIndex,
  setUserIndex,
}) {
  const playerNumber = 2;
  const maxRound = 3;
  const [isVisible, setIsVisible] = useState(false); // les cartes de la main sont visibles ?
  const [isBidding, setIsBidding] = useState(false);

  useEffect(() => {
    const getRandomCard = () => {
      const actualLength = deck.length; // ex: S'il y a 3 cartes dans le deck actuellement,
      const indexToRemove = Math.floor(Math.random() * actualLength); // alors on obtient un nombre aléatoire entre 0 et 2 (   [0 - 1) * 3    )
      const [newCard] = deck.splice(indexToRemove, 1); // A AMELIORER
      return newCard;
    };

    const dealCards = async () => {
      // fonctionne MAIS distribue toutes les cartes d'un joueur avant de passer au suivant
      const newHands = [[], []];

      for (let p = 0; p < playerNumber; p += 1) {
        // Pour chaque joueur p ...
        for (let c = 0; c < round; c += 1) {
          // ... autant de fois que le numéro du round
          const newCard = getRandomCard();
          newCard.index = c; // On ajoute un index à la carte pour pouvoir la retrouver dans la main du joueur
          newHands[p].push(newCard); // on distribue une carte.
        }
      }
      setHands(newHands);
    };
    dealCards();
  }, [deck, round]);

  const handleDiscoverHand = () => {
    // First time the player sees his hand this round
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
        setUserIndex(userIndex + 1);
      }

      return newBids;
    });

    setIsVisible(false);
    setIsBidding(false);
  };

  const handlePlayCard = (card) => {
    // eslint-disable-next-line no-param-reassign
    card.player = userIndex;
    hands[userIndex].splice(card.index, 1); // On retire la carte de la main du joueur
    setBoardCards((prevBoardCards) => [...prevBoardCards, card]);
    setIsVisible(false);
    setUserIndex(userIndex === playerNumber - 1 ? 0 : userIndex + 1);
  };

  const handleEndGame = () => {
    console.info("The winner is ...");
  };

  return (
    <div>
      {hands &&
        hands[userIndex].map((card) => {
          if (isVisible) {
            return !isRoundStart ? (
              <CardComponent
                card={card}
                key={card.id}
                onClick={handlePlayCard}
              />
            ) : (
              <CardComponent card={card} key={card.id} />
            );
          }
          return <FaceDownCard key={card.id} />;
        })}
      {!isVisible && !isBidding && !isResolved && (
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
        (turn === round && round === maxRound ? ( // Si on est au dernier tour du dernier round
          <button type="button" onClick={handleEndGame}>
            End Game
          </button>
        ) : (
          <button type="button" onClick={handleResolveTurn}>
            {turn === round ? "Next Round" : "Next Turn"}
          </button>
        ))}
    </div>
  );
}
