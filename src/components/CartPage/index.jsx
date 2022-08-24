import { PureComponent } from "react";
import { connect } from "react-redux";

import Attributes from "./Attributes";
import Price from "./Price";
import AddRemove from "./AddRemove";
import PhotosSlider from "./PhotosSlider";
import Total from "./Total";
import styles from "./CartPage.module.scss";

class CartPage extends PureComponent {
  render() {
    return (
      <section className="container">
        <h1>CART</h1>
        {this.props.cart.length === 0 && <h2>The cart is empty :(</h2>}
        {this.props.cart.length > 0 && (
          <>
            <ul className={styles.products_in_cart}>
              {this.props.cart.map(
                ({
                  idInCart,
                  name,
                  brand,
                  attributes,
                  gallery,
                  prices,
                  chozenAttributes,
                  numberOfProducts,
                }) => (
                  <li className={styles.product_in_cart} key={idInCart}>
                    <section className={styles.descriptions}>
                      <h2>{brand}</h2>
                      <h3> {name}</h3>
                      <Price prices={prices} />

                      <Attributes
                        attributes={attributes}
                        chozenAttributes={chozenAttributes}
                      />
                    </section>
                    <section className={styles.cart_right_block}>
                      <AddRemove
                        numberOfProducts={numberOfProducts}
                        idInCart={idInCart}
                      />
                      <PhotosSlider gallery={gallery} name={name} />
                    </section>
                  </li>
                )
              )}
            </ul>
            <Total />
          </>
        )}
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

const connector = connect(mapState);

export default connector(CartPage);
