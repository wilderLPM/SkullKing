import CardsComponent from "../components/cards/CardsComponent";
import Cards from "../BDD/cards";

export default function GamePage() {
  return (
    <ul>
      {Cards.map((card) => (
        <li key={card.id}>
          <CardsComponent card={card} />
        </li>
      ))}
    </ul>
  );
}
