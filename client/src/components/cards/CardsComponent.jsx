import styles from "./CardsComponent.module.css";

const colorClassMap = {
  violet: styles.violet,
  yellow: styles.yellow,
  green: styles.green,
};

export default function CardsComponent({ card }) {
  const color = card.description;
  const backgroundFace = card.background;

  const colorClass = colorClassMap[color];

  const dynamicStyle =
    card.type === "face" ? { backgroundColor: backgroundFace } : {};

  return (
    <div className={`${styles.cardclass} ${colorClass}`} style={dynamicStyle}>
      {card.attribut}
    </div>
  );
}
