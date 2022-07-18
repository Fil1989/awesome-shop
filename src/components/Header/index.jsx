import { Component } from "react";
import logo from "../../assets/brand_icon.svg";
import errowDown from "../../assets/errow.svg";
import errowUp from "../../assets/errow-up.svg";
import cart from "../../assets/cart.svg";
import CurrencyComponent from "./CurrencyComponent";
import CartOverlay from "../CartOverlay";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withQueryCategories } from "../../hocs";
import styles from "./Header.module.scss";

class Header extends Component {
  state = {
    currencyModal: false,
    cartModal: false,
  };
  activeClassName = styles.active_link;
  normalClassName = styles.normal_link;

  currencyOpenClose = () => {
    this.setState((previousState) => ({
      ...previousState,
      currencyModal: !previousState.currencyModal,
    }));
  };
  render() {
    const { data, loading, error } = this.props.queryCategories;
    if (loading) {
      return <p className="loader">Loading…</p>;
    } else if (error) {
      return <p>Error :(</p>;
    } else {
      const categories = data.categories.map((category) => category.name);
      return (
        <header className={styles.Amazing_header}>
          <nav className={styles.menu_container}>
            {categories.map((name) => (
              <li aria-label={name} className={styles.head_menu} key={name}>
                <NavLink
                  to={{ pathname: `/${name}` }}
                  title={name}
                  className={({ isActive }) =>
                    isActive ? this.activeClassName : this.normalClassName
                  }
                >
                  {name.toLocaleUpperCase()}
                </NavLink>
              </li>
            ))}
          </nav>
          <NavLink to="/" className={styles.logo_link} aria-label="Logo">
            <img src={logo} alt="Amazing logo" className={styles.logo} />
          </NavLink>
          <ul className={styles.side_container}>
            <li
              aria-label="Choose the currency"
              className={styles.side_menu}
              onClick={() => {
                this.currencyOpenClose();
              }}
            >
              <span className={styles.currency_sign}>
                {this.props.appCurrency}
              </span>
              <span
                className={styles.errow}
                style={{
                  backgroundImage: this.state.currencyModal
                    ? `url(${errowUp})`
                    : `url(${errowDown})`,
                }}
              ></span>
            </li>
            {this.state.currencyModal && (
              <CurrencyComponent currencyOpenClose={this.currencyOpenClose} />
            )}
            <li
              aria-label="Cart Overlay open"
              className={styles.side_menu}
              onClick={() => {
                this.setState((previousState) => ({
                  ...previousState,
                  cartModal: !previousState.cartModal,
                }));
                document.getElementById("body").classList.add("overlay");
              }}
            >
              <img src={cart} alt="Cart" />
              {this.props.quantity !== 0 && (
                <span className={styles.if_product_added}>
                  {this.props.quantity}
                </span>
              )}
            </li>
            {this.state.cartModal && (
              <CartOverlay
                quantity={this.props.quantity}
                setState={(callback) => this.setState(callback)}
              />
            )}
          </ul>
        </header>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const quantity = state.cart.reduce((accum, product) => {
    accum += product.numberOfProducts;
    return accum;
  }, 0);
  return {
    appCurrency: state.appCurrency,
    quantity,
  };
};

const connector = connect(mapStateToProps);
export default connector(withQueryCategories(Header));
