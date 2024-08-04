import PropTypes from 'prop-types';
import styles from "./CardComponent.module.css";

const colorMap = {
  violet: styles.violet,
  yellow: styles.yellow,
  green: styles.green,
};

export default function CardsComponent({ card }) {
  const color = card.description;
  const backgroundFace = card.background;

  const colorClass = colorMap[color];

  return (
    <div
      className={`${styles.cardclass} ${colorClass}`}
      //   style à retirer quand on aura une image pour les personnages
      style={card.type === "face" ? { backgroundColor: backgroundFace } : {}}
    >
      <p className={card.type === "face" ? styles.faceName : styles.colorName}>
        {card.attribut}
      </p>
    </div>
  );
}

CardsComponent.propTypes = {
  card: PropTypes.shape({
    description: PropTypes.oneOf(['violet', 'yellow', 'green']).isRequired,
    background: PropTypes.string,
    type: PropTypes.oneOf(['face', 'color']).isRequired,
    attribut: PropTypes.string.isRequired,
  }).isRequired,
};
