import { Component } from "react";
import logo from "../../assets/brand_icon.svg";
import errowDown from "../../assets/errow.svg";
import errowUp from "../../assets/errow-up.svg";
import cart from "../../assets/cart.svg";
import CurrencyComponent from "./CurrencyComponent";
import CartOverlay from "../CartOverlay";
import { NavLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { withQueryCategories } from "../../hocs";
import styles from "./Header.module.scss";
import {
  IHeaderState,
  ISetHeaderState,
  ICategory,
  IQueryCategories,
} from "./interfaces";
import { IAppState } from "../../redux/interfaces";

interface IHeaderProps extends PropsFromRedux {
  queryCategories: IQueryCategories;
}

class Header extends Component<IHeaderProps, IHeaderState> {
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
      const categories = data.categories.map(({ name }: ICategory) => name);
      return (
        <header className={styles.Amazing_header}>
          <nav className={styles.menu_container}>
            {categories.map((name: string) => (
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
            <img
              src={logo}
              alt="Amazing logo"
              className={styles.logo}
              id="logologo"
            />
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
                const body = document.getElementById("body") as HTMLElement;
                body.classList.add("overlay");
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
                setState={(callback: ISetHeaderState) =>
                  this.setState(callback)
                }
              />
            )}
          </ul>
        </header>
      );
    }
  }
}

const mapStateToProps = (state: IAppState) => {
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

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withQueryCategories(Header));
