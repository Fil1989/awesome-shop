import { PureComponent } from "react";
import styles from "./WrongWay.module.scss";

class WrongWay extends PureComponent {
  render() {
    return (
      <h1 className={`${styles.home} animate__animated animate__swing`}>
        Page not found :({" "}
      </h1>
    );
  }
}
export default WrongWay;
