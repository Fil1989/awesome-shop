import { Component } from "react";
import { Link } from "react-router-dom";
import { withParams, withQueryCategory } from "../../hocs";
import Price from "./Price";
import { Routes, Route } from "react-router-dom";
import WrongWay from "../WrongWay";
import AddToCart from "./AddToCart";
import styles from "./ProductList.module.scss";

class ProductsList extends Component {
  componentDidMount() {}
  render() {
    const { title } = this.props.params;
    const { loading, error, data } = this.props.query;
    if (loading) {
      return <div className="loader">Loading...</div>;
    } else if (error) {
      return <p>Error :(</p>;
    } else {
      if (!data.category) {
        return (
          <Routes>
            <Route path="*" element={<WrongWay />} />
          </Routes>
        );
      }
      return (
        <section className="container">
          <h1>
            {title[0].toLocaleUpperCase() + title.split("").slice(1).join("")}
          </h1>

          <ul className={styles.list_of_products}>
            {data.category.products.map(
              ({ id, name, inStock, brand, gallery, prices, attributes }) => (
                <li
                  className={styles.product_item}
                  style={inStock ? {} : { opacity: 0.5 }}
                  aria-label={name}
                  key={id}
                >
                  <Link
                    to={{
                      pathname: `/${title}/${id}`,
                    }}
                  >
                    <div className={styles.out_of_stock_center}>
                      <img
                        src={gallery[0]}
                        alt={name}
                        className={styles.product_img}
                      />
                    </div>
                  </Link>
                  <Link
                    to={{
                      pathname: `/${title}/${id}`,
                    }}
                    className={styles.product_name}
                  >
                    {brand} {name}
                  </Link>
                  <Price prices={prices} />
                  {!inStock && (
                    <span className={styles.out_of_stock}>OUT OF STOCK</span>
                  )}
                  <AddToCart
                    product={{
                      id,
                      name,
                      inStock,
                      brand,
                      gallery,
                      prices,
                      attributes,
                    }}
                  />
                </li>
              )
            )}
          </ul>
        </section>
      );
    }
  }
}

export default withParams(withQueryCategory(ProductsList));
