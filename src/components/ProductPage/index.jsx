import { Component } from "react";
import { withParams } from "../../hocs";
import parse from "html-react-parser";
import { connect } from "react-redux";
import Attributes from "./Attributes";
import Price from "./Price";
import { withQueryProduct } from "../../hocs";
import ProductImages from "./ProductImages";
import { addProductToCart, ChangeQuantityInCart } from "../../redux/actions";
import uuid from "react-uuid";
import styles from "./ProductPage.module.scss";
import { Routes, Route } from "react-router-dom";
import WrongWay from "../WrongWay";

class ProductPage extends Component {
  state = {};

  render() {
    const { loading, error, data } = this.props.query;
    if (loading) {
      return <div className="loader">Loading...</div>;
    } else if (error) {
      return <p>Error :(</p>;
    } else {
      if (!data.product) {
        return (
          <Routes>
            <Route path="*" element={<WrongWay />} />
          </Routes>
        );
      }
      const {
        id,
        name,
        inStock,
        gallery,
        description,
        brand,
        attributes,
        prices,
      } = data.product;
      return (
        <section className="container">
          <div className={styles.product_page}>
            <ProductImages gallery={gallery} name={name} inStock={inStock} />
            <section className={styles.description_block}>
              <h2>{brand}</h2>
              <h3>{name}</h3>
              <div className={styles.attributes}>
                <Attributes
                  attributes={attributes}
                  chozenAttributes={this.state}
                  setState={(callback) => this.setState(callback)}
                />
              </div>
              <div className={styles.price_block}>
                <h4>PRICE:</h4>
                <Price prices={prices} />
                {inStock ? (
                  <button
                    className={styles.add_to_cart}
                    type="button"
                    onClick={() => {
                      let idInCart = uuid();
                      const defaultAttribute = attributes.reduce(
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
                      const chozenAttributes = {
                        ...defaultAttribute,
                        ...this.state,
                      };
                      const alreadyInCart = this.props.cart.find(
                        (product) =>
                          product.id === id &&
                          Object.keys(product.chozenAttributes).reduce(
                            (accum, key) => {
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
                            },
                            0
                          ) === Object.keys(chozenAttributes).length
                      );
                      if (alreadyInCart) {
                        this.props.onChangeQuantityInCart(
                          alreadyInCart.idInCart
                        );
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
                        return (
                          inStock && this.props.onAddProductToCart(product)
                        );
                      }
                    }}
                    aria-label="Add to cart button"
                  >
                    <span className={styles.add_to_cart__text}>
                      ADD TO CART
                    </span>
                  </button>
                ) : (
                  <button className={styles.add_to_cart} disabled>
                    <span className={styles.add_to_cart__text}>
                      ADD TO CART
                    </span>
                  </button>
                )}

                <div className={styles.product_description}>
                  {parse(description)}
                </div>
              </div>
            </section>
          </div>
        </section>
      );
    }
  }
}

const mapState = (state) => ({
  cart: state.cart,
});

const mapDispatch = {
  onAddProductToCart: (product) => addProductToCart(product),
  onChangeQuantityInCart: (idInCart) => ChangeQuantityInCart(idInCart),
};

const connector = connect(mapState, mapDispatch);

export default connector(withParams(withQueryProduct(ProductPage)));
