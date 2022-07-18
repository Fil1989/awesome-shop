import { Component } from "react";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/actions";
import { withQueryCurrencies } from "../../hocs";
import styles from "./Header.module.scss";

class CurrencyComponent extends Component {
  onCurrencyClick = (sign) => {
    this.props.onChangeCurrency(sign);
    this.props.currencyOpenClose();
  };
  render() {
    const { data, loading, error } = this.props.query;
    if (loading) {
      return <p className="loader">Loading…</p>;
    } else if (error) {
      return <p>Error :(</p>;
    } else {
      return (
        <>
          <div
            className={styles.currency_backdrop}
            onClick={this.props.currencyOpenClose}
            aria-label="Close currencies modal"
          ></div>
          <ul className={styles.currency_modal}>
            {data.currencies.map(({ label, symbol }) => (
              <li
                className={styles.currency_value}
                aria-label={`currency ${label}`}
                onClick={() => this.onCurrencyClick(symbol)}
                key={label}
              >
                <span>
                  {symbol} {label}
                </span>
              </li>
            ))}
          </ul>
        </>
      );
    }
  }
}

const mapDispatchToProps = {
  onChangeCurrency: (currency) => changeCurrency(currency),
};

const connector = connect(null, mapDispatchToProps);
export default connector(withQueryCurrencies(CurrencyComponent));
