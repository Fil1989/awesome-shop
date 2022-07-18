import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cleanCart } from "../../redux/actions";

import styles from "./CartOverlay.module.scss";
import { service } from "../../services";

class Total extends Component {
  render() {
    service.setCart(this.props.cart);
    service.setAppCurrency(this.props.appCurrency);
    const total = service.totalPrice();

    return (
      <section>
        <table className={styles.total} width={"100%"}>
          <tbody>
            <tr className={styles.calculation}>
              <td>Total: </td>
              <td>
                <span className={styles.price}>{this.props.appCurrency}</span>
                <span className={styles.price}>{total}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to={{ pathname: "/cart" }} onClick={this.props.closeCartOverlay}>
          <button className={styles.view_cart} aria-label="Go to cart button">
            VIEW BAG
          </button>
        </Link>
        <Link
          to={{ pathname: "/order" }}
          onClick={() => {
            this.props.onCleanCart();
            this.props.closeCartOverlay();
          }}
        >
          <button className={styles.checkout} aria-label="Make an order button">
            CHECK OUT
          </button>
        </Link>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    appCurrency: state.appCurrency,
    cart: state.cart,
  };
};
const mapDispatch = {
  onCleanCart: cleanCart,
};

const connector = connect(mapState, mapDispatch);

export default connector(Total);
