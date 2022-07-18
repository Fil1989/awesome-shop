import { Component } from "react";
import style from "./CartPage.module.scss";
class Attributes extends Component {
  state = {};
  componentDidMount() {
    this.setState(this.props.chozenAttributes);
  }

  sizeActiveStyle = {
    backgroundColor: "#1D1F22",
    color: "#ffffff",
  };
  colorActiveStyle = {
    border: 1,
    borderStyle: "solid",
    borderColor: "#5ECE7B",
    transform: "scale(1.2)",
  };

  render() {
    const styles = this.props.newStyle || style;

    return (
      <>
        {/*eslint-disable */}
        {this.props.attributes.map(({ name, items }) => {
          const nameInState = name.includes(" ")
            ? name
                .split("")
                .filter((el) => el !== " ")
                .join("")
            : name;
          return (
            <div className={styles.in_cart_sizes_block} key={name}>
              <h4>{name}:</h4>
              <ul className={styles.in_cart_sizes}>
                {name === "Color"
                  ? items.map((item) => (
                      <li
                        className={styles.in_cart_color}
                        key={item.id}
                        aria-label={`${item.id} ${name}`}
                      >
                        <div
                          className={styles.in_cart_color_link}
                          style={
                            this.state[name] === item.id
                              ? {
                                  ...this.colorActiveStyle,
                                  backgroundColor: item.value,
                                }
                              : { backgroundColor: item.value }
                          }
                        ></div>
                      </li>
                    ))
                  : items.map((item) => (
                      <li
                        className={styles.in_cart_size}
                        key={item.id}
                        style={
                          this.state[nameInState] === item.id
                            ? this.sizeActiveStyle
                            : {}
                        }
                        aria-label={`${item.id} ${name}`}
                      >
                        <span>{item.value}</span>
                      </li>
                    ))}
              </ul>
            </div>
          );
        })}
      </>
    );
  }
}
export default Attributes;
