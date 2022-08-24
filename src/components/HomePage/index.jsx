import { PureComponent } from "react";
import styles from "./HomePage.module.scss";

class HomePage extends PureComponent {
  render() {
    return (
      <h1 className={`${styles.home} animate__animated animate__jello`}>
        Hi! This is the Home Page :)
      </h1>
    );
  }
}
export default HomePage;
