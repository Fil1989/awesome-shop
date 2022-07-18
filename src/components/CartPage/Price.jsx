import { Component } from "react";
import styles from "./CartPage.module.scss";
import PriceProductPage from "../ProductPage/Price";

class Price extends Component {
  render() {
    return <PriceProductPage {...this.props} newStyles={styles} />;
  }
}

export default Price;
