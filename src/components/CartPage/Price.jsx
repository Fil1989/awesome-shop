import { PureComponent } from "react";
import styles from "./CartPage.module.scss";
import PriceProductPage from "../ProductPage/Price";

class Price extends PureComponent {
  render() {
    return <PriceProductPage {...this.props} newStyles={styles} />;
  }
}

export default Price;
