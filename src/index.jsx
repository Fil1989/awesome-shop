import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "animate.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";

const client = new ApolloClient({
  uri: "https://graphq-shop.herokuapp.com/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={<p>loading...</p>} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
