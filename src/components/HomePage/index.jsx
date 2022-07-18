import { Component } from "react";
import styles from "./HomePage.module.scss";

class HomePage extends Component {
  render() {
    return (
      <h1 className={`${styles.home} animate__animated animate__heartBeat`}>
        Hi! This is the Home Page :)
      </h1>
    );
  }
}
export default HomePage;
