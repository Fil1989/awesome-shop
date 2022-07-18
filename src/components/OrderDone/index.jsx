import { Component } from "react";
import styles from "./OrderDone.module.scss";
class OrderDone extends Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <h1
          className={`animate__animated animate__bounceInDown ${styles.congratulations}`}
        >
          Congratulations! You've made an order
        </h1>
        <div className={styles.confetti}>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
          <div className={styles.confetti_piece}></div>
        </div>
      </>
    );
  }
}
export default OrderDone;
