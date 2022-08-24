import { PureComponent } from "react";
import styles from "./ProductPage.module.scss";

class ProductImages extends PureComponent {
  state = {
    mainImage: this.props.gallery[0],
  };
  mainImageChange = (image) => {
    this.setState({ ...this.state, mainImage: image });
  };
  render() {
    let num = 0;

    return (
      <>
        <section className={styles.product_images}>
          {this.props.gallery.map((imageUrl) => {
            num += 1;
            return (
              <li
                className={styles.product_image}
                key={num}
                aria-label={`${this.props.name} ${num}`}
                onClick={() => this.mainImageChange(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt={this.props.name + `${num}`}
                  className={styles.img_in_list}
                  style={
                    this.state.mainImage === imageUrl
                      ? {
                          top: -1,
                          left: -1,
                          borderWidth: 1,
                          borderColor: "#5ECE7B",
                          borderStyle: "solid",
                          boxSizing: "content-box",
                        }
                      : {}
                  }
                />
              </li>
            );
          })}
        </section>
        <section className={styles.out_of_stock_center}>
          <img
            src={this.state.mainImage}
            alt={this.props.name}
            className={styles.main_image}
          />
          {!this.props.inStock && (
            <span className={styles.out_of_stock}>OUT OF STOCK</span>
          )}
        </section>
      </>
    );
  }
}
export default ProductImages;
