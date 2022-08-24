import { PureComponent } from "react";
import styles from "./ProductPage.module.scss";

class Attributes extends PureComponent {
  state = {};

  choseAttribute = (id, nameInState) => {
    this.props.setState((previousState) => ({
      ...previousState,
      [nameInState]: id,
    }));
  };

  sizeActiveStyle = {
    backgroundColor: "#1D1F22",
    color: "#ffffff",
  };
  colorActiveStyle = {
    width: 32,
    height: 32,
    padding: 0,
    border: 1,
    borderStyle: "solid",
    borderColor: "#5ECE7B",
    transform: "scale(1.1)",
    cursor: "pointer",
  };

  render() {
    return (
      <>
        {/*eslint-disable */}

        {this.props.attributes.map(({ name, items }) => {
          if (name === "Color") {
            const nameInState = name;
            return (
              <div className={styles.colors_block} key={name}>
                <h4>{name.toLocaleUpperCase()}:</h4>
                <ul className={styles.colors}>
                  {items.map((item) => (
                    <li
                      className={styles.color}
                      key={item.id}
                      aria-label={item.id + " color"}
                    >
                      <div
                        className={styles.color_link}
                        style={
                          this.props.chozenAttributes[nameInState] ===
                            item.id ||
                          (!this.state[nameInState] && item.id === items[0].id)
                            ? {
                                ...this.colorActiveStyle,
                                backgroundColor: item.value,
                              }
                            : { backgroundColor: item.value }
                        }
                        onClick={() => {
                          this.setState((previousState) => ({
                            ...previousState,
                            [nameInState]: true,
                          }));
                          this.choseAttribute(item.id, nameInState);
                        }}
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else {
            const nameInState = name.includes(" ")
              ? name
                  .split("")
                  .filter((el) => el !== " ")
                  .join("")
              : name;
            return (
              <div className={styles.sizes_block} key={name}>
                <h4>{name.toLocaleUpperCase()}:</h4>
                <ul className={styles.sizes}>
                  {items.map((item) => (
                    <li
                      className={styles.size}
                      key={item.id}
                      style={
                        this.props.chozenAttributes[nameInState] === item.id ||
                        (!this.state[nameInState] && item.id === items[0].id)
                          ? this.sizeActiveStyle
                          : {}
                      }
                      onClick={() => {
                        this.setState((previousState) => ({
                          ...previousState,
                          [nameInState]: true,
                        }));
                        this.choseAttribute(item.id, nameInState);
                      }}
                      aria-label={item.id + " " + name}
                    >
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}
      </>
    );
  }
}
export default Attributes;
