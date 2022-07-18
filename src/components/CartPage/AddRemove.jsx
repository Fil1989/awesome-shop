import { Component } from "react";
import { connect } from "react-redux";
import {
  addNextProduct,
  removeOneProduct,
  removeFromCart,
} from "../../redux/actions";
import style from "./CartPage.module.scss";

class AddRemove extends Component {
  state = {
    numberOfProducts: 1,
  };
  addProduct = () => {
    this.setState((previousState) => ({
      ...previousState,
      numberOfProducts: previousState.numberOfProducts + 1,
    }));
    this.props.onAddNextProduct(this.props.idInCart);
  };
  removeProduct = () => {
    this.setState((previousState) => {
      if (this.props.numberOfProducts > 1) {
        return {
          ...previousState,
          numberOfProducts: previousState.numberOfProducts - 1,
        };
      } else if (this.props.numberOfProducts === 1) {
        this.props.onRemoveFromCart(this.props.idInCart);
      }
    });
    this.props.onRemoveOneProduct(this.props.idInCart);
  };
  render() {
    const styles = this.props.newStyles || style;
    return (
      <div className={styles.add_remove_product}>
        <div
          className={styles.changeAmount}
          onClick={this.addProduct}
          aria-label="Add same product"
        >
          <span>+</span>
        </div>
        <div className={styles.theAmount}>
          <span>{this.props.numberOfProducts}</span>
        </div>
        <div
          className={styles.changeAmount}
          onClick={this.removeProduct}
          aria-label="Remove 1 product"
        >
          <span>-</span>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  onAddNextProduct: (idInCart) => addNextProduct(idInCart),
  onRemoveOneProduct: (idInCart) => removeOneProduct(idInCart),
  onRemoveFromCart: (idInCart) => removeFromCart(idInCart),
};

const connector = connect(null, mapDispatch);

export default connector(AddRemove);
