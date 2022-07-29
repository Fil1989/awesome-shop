import React, { Component } from "react";
import Header from "./components/Header";
import Routing from "./components/Routing.js";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <Routing />
        </main>
      </>
    );
  }
}

export default App;
