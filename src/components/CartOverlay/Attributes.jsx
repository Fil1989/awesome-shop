import { Component } from "react";
import styles from "./CartOverlay.module.scss";
import AttributesInCart from "../CartPage/Attributes";

class Attributes extends Component {
  render() {
    return <AttributesInCart {...this.props} newStyle={styles} />;
  }
}
export default Attributes;
