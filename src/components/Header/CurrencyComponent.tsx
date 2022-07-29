import { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { changeCurrency } from "../../redux/actions";
import { withQueryCurrencies } from "../../hocs";
import styles from "./Header.module.scss";
import { IQueryCurrency } from "./interfaces";

interface ICurrencyProps extends PropsFromRedux {
  currencyOpenClose: () => void;
  query: IQueryCurrency;
}

class CurrencyComponent extends Component<ICurrencyProps> {
  onCurrencyClick = (sign: string) => {
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
            {data.currencies.map(
              ({ label, symbol }: { label: string; symbol: string }) => (
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
              )
            )}
          </ul>
        </>
      );
    }
  }
}

const mapDispatchToProps = {
  onChangeCurrency: (currency: string) => changeCurrency(currency),
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withQueryCurrencies(CurrencyComponent));
