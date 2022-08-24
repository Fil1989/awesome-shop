import { PureComponent } from "react";
import nextArrow from "../../assets/arrow-next.svg";
import previousArrow from "../../assets/arrow-previous.svg";
import styles from "./CartPage.module.scss";

class PhotosSlider extends PureComponent {
  state = {
    num: 0,
  };
  componentDidUpdate() {
    if (this.state.num === this.props.gallery.length) {
      this.setState({ num: 0 });
    }
    if (this.state.num === -1) {
      this.setState({ num: this.props.gallery.length - 1 });
    }
  }
  nextPhoto = () => {
    this.setState((previousState) => {
      return {
        ...previousState,
        num: previousState.num + 1,
      };
    });
  };
  previousPhoto = () => {
    this.setState((previousState) => {
      return {
        ...previousState,
        num: previousState.num - 1,
      };
    });
  };
  render() {
    return (
      <div className={styles.pictures}>
        <img
          src={this.props.gallery[this.state.num]}
          alt={this.props.name}
          className={styles.picture_in_cart}
        />
        {this.props.gallery.length > 2 && (
          <ul className={styles.arrow_block}>
            <li
              className={styles.arrow_other}
              onClick={this.previousPhoto}
              aria-label="previous picture"
            >
              <img src={previousArrow} alt="previous" />
            </li>
            <li
              className={styles.arrow_other}
              onClick={this.nextPhoto}
              aria-label="next picture"
            >
              <img src={nextArrow} alt="next" />
            </li>
          </ul>
        )}
      </div>
    );
  }
}
export default PhotosSlider;
