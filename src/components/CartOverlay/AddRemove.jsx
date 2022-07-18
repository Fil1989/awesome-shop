import { Component } from "react";
import styles from "./CartOverlay.module.scss";
import AddRemoveCartPage from "../CartPage/AddRemove";

class AddRemove extends Component {
  render() {
    return <AddRemoveCartPage {...this.props} newStyles={styles} />;
  }
}

export default AddRemove;
