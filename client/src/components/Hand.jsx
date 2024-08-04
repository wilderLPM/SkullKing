/* import {useState, useEffect} from 'react';
import CardComponent from "./Cards/CardComponent";
import CardComponent from "./Cards/FaceDownCard";
import Cards from "../BDD/Cards"

export default function Hand() {
    let Deck = Cards;
    const [isVisible, setIsVisible] = useState(false);
    const [userIndex, setUserIndex] = useState(0);
    const [turn, setTurn] = useState(1);
    const [hands, setHands] = useState([[],[]]);
    
    useEffect(() => {      
        const getRandomCard = () => {
            const actualLength = Deck.length; // Si il y a 3 cartes dans le deck actuellement,
            const indexToRemove = Math.floor(Math.random() * actualLength); // alors on obtient un nombre aléatoire entre 0 et 2 (   [0 - 1) * 3    )
            const [newCard] = Deck.splice(indexToRemove, 1);
            return newCard;
        };

        const dealCards = async () => {
            const newHands = [[],[]];

            for (let p = 0; p < 2; p+=1){ // Pour chaque joueur (À l'avenir il faudra remplacer 2 par une variable qui correspond au nombre de joueurs)
                for (let t = 0; t < turn; t+=1){ // Autant de fois que le numéro de la manche
                    const newCard = getRandomCard();
                    newHands[p].push(newCard);
                }
            }
            setHands(newHands) // on distribue une carte
        };

        dealCards();
    }, [Deck, turn])

    const handleEndTurn = () => {
        setUserIndex(userIndex === 0 ? 1 : 0);
    }

    const handleEndRound = () => {
/*         if (turn === 10){
            console.log('Game finihed')
        } 
        setHands([[],[]]); // On s'assure que les mains sont vides
        setTurn(turn + 1); // On passe au tour d'après, ce qui déclenche le useEffect et redistribue les cartes
    }

    return (
        <div>
            {hands[userIndex].map((card) => {
                isVisible === true ?
                <CardComponent card={card} key={card.id}/>
                : <FaceDownCard key={card.id}/>
            })}
        </div>
    );
} */