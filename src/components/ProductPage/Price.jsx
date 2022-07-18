import { Component } from "react";
import { connect } from "react-redux";
import style from "./ProductPage.module.scss";
import { service } from "../../services";

class Price extends Component {
  render() {
    service.setPrice(this.props.prices);
    service.setAppCurrency(this.props.appCurrency);
    const price = service.priceSearching();
    const styles = this.props.newStyles || style;
    return (
      <div className={styles.price}>
        <span className={styles.price_currency}>{this.props.appCurrency}</span>
        <span className={styles.price_value}>{price}</span>
      </div>
    );
  }
}

const mapState = (state) => {
  return { appCurrency: state.appCurrency };
};
const connector = connect(mapState);

export default connector(Price);
