import { PureComponent } from "react";
import { connect } from "react-redux";
import styles from "./CartPage.module.scss";
import { Link } from "react-router-dom";
import { cleanCart } from "../../redux/actions";
import { service } from "../../services";

class Total extends PureComponent {
  render() {
    service.setCart(this.props.cart);
    service.setAppCurrency(this.props.appCurrency);
    const total = service.totalPrice();
    service.setTax();
    let tax = service.getTax();
    let quantity = this.props.cart.reduce((accum, product) => {
      accum += product.numberOfProducts;
      return accum;
    }, 0);
    return (
      <section>
        <table className={styles.total}>
          <tbody>
            <tr className={styles.calculation}>
              <td>Tax 21%: </td>
              <td>
                <span className={styles.price}>{this.props.appCurrency}</span>
                <span className={styles.price}>{tax}</span>
              </td>
            </tr>
            <tr className={styles.calculation}>
              <td>Quantity: </td>
              <td>
                <span className={styles.price}>{quantity}</span>
              </td>
            </tr>
            <tr className={styles.calculation}>
              <td>Total: </td>
              <td>
                <span className={styles.price}>{this.props.appCurrency}</span>
                <span className={styles.price}>{total}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <Link
          to={{
            pathname: "/order",
          }}
          onClick={() => {
            this.props.onCleanCart();
            window.scrollTo(0, 0);
          }}
        >
          <div className={styles.add_to_cart}>
            <span className={styles.add_to_cart__text}>ORDER</span>
          </div>
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
