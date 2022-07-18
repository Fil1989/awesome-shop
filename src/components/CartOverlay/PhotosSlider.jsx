import { Component } from "react";
import styles from "./CartOverlay.module.scss";

class PhotosSlider extends Component {
  render() {
    return (
      <div className={styles.pictures}>
        <img
          src={this.props.gallery[0]}
          alt={this.props.name}
          className={styles.picture_in_cart}
        />
      </div>
    );
  }
}
export default PhotosSlider;
