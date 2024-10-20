import styles from "./CardComponent.module.css";
import Skull from "../../assets/images/skull.svg";

export default function FaceDownCard() {
  return (
    <div className={`${styles.cardclass} ${styles.faceDown}`}>
      <img src={Skull} alt="skull" />
    </div>
  );
}
