import { PureComponent } from "react";
import { connect } from "react-redux";

import Attributes from "./Attributes";
import Price from "./Price";
import AddRemove from "./AddRemove";
import PhotosSlider from "./PhotosSlider";
import Total from "./Total";
import styles from "./CartOverlay.module.scss";

class CartOverlay extends PureComponent {
  closeCartOverlay = () => {
    this.props.setState((previousState) => ({
      ...previousState,
      cartModal: false,
    }));
    document.getElementById("body").classList.remove("overlay");
  };
  render() {
    return (
      <>
        <div
          className={styles.backdrop}
          onClick={this.closeCartOverlay}
          aria-label="Overlay"
        ></div>
        <section className={styles.cart_modal}>
          <h5>
            My Bag, <span>{this.props.quantity} Items</span>
          </h5>
          {this.props.cart.length === 0 && <h2>The cart is empty :(</h2>}

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
                    <p>{brand}</p>
                    <p> {name}</p>
                    <Price
                      prices={prices}
                      numberOfProducts={numberOfProducts}
                    />
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
          {this.props.cart.length > 0 && (
            <Total closeCartOverlay={this.closeCartOverlay} />
          )}
        </section>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const connector = connect(mapState);

export default connector(CartOverlay);
