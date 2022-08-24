import { PureComponent } from "react";
import uuid from "react-uuid";
import styles from "./ProductList.module.scss";
import { connect } from "react-redux";
import { addProductToCart, ChangeQuantityInCart } from "../../redux/actions";

class AddToCart extends PureComponent {
  render() {
    const { id, name, inStock, brand, gallery, prices, attributes } =
      this.props.product;
    return (
      <>
        {inStock ? (
          <button
            className={styles.cart_in_list}
            aria-label="Add to cart button"
            onClick={() => {
              const idInCart = uuid();
              const chozenAttributes = attributes.reduce(
                (accum, { name, items }) => {
                  const nameInState = name.includes(" ")
                    ? name
                        .split("")
                        .filter((el) => el !== " ")
                        .join("")
                    : name;
                  accum[nameInState] = items[0].id;
                  return accum;
                },
                {}
              );
              const alreadyInCart = this.props.cart.find(
                (product) =>
                  product.id === id &&
                  Object.keys(product.chozenAttributes).reduce((accum, key) => {
                    for (const attribute in chozenAttributes) {
                      if (
                        key === attribute &&
                        product.chozenAttributes[key] ===
                          chozenAttributes[attribute]
                      ) {
                        accum += 1;
                      }
                    }
                    return accum;
                  }, 0) === Object.keys(chozenAttributes).length
              );
              if (alreadyInCart) {
                this.props.onChangeQuantityInCart(alreadyInCart.idInCart);
              } else {
                const product = {
                  id,
                  idInCart,
                  name,
                  inStock,
                  brand,
                  gallery,
                  prices,
                  attributes,
                  chozenAttributes,
                  numberOfProducts: 1,
                };
                inStock && this.props.onAddProductToCart(product);
              }
            }}
          ></button>
        ) : (
          <button className={`${styles.cart_in_list} disabled`}></button>
        )}
      </>
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
  onAddProductToCart: (product) => addProductToCart(product),
  onChangeQuantityInCart: (idInCart) => ChangeQuantityInCart(idInCart),
};

const connector = connect(mapState, mapDispatch);
export default connector(AddToCart);
