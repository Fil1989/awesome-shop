import { PureComponent } from "react";
import styles from "./CartOverlay.module.scss";
import AttributesInCart from "../CartPage/Attributes";

class Attributes extends PureComponent {
  render() {
    return <AttributesInCart {...this.props} newStyle={styles} />;
  }
}
export default Attributes;
