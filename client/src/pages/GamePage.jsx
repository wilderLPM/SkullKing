import CardsComponent from "../components/cards/CardComponent";
import Cards from "../BDD/cards";
import styles from "./GamePage.module.css";

export default function GamePage() {
  return (
    <ul id={styles.deckMap}>
      {Cards.map((card) => (
        <li className={styles.cardMap} key={card.id}>
          <CardsComponent card={card} />
        </li>
      ))}
    </ul>
  );
}
