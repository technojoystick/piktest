import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import consoleResults from "./consoleResults";
import SimpleForm from "./App";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Отправить сообщение</h2>
      <p>Анонимные сообщения рассматриваются</p>
      <SimpleForm onSubmit={consoleResults} />
    </div>
  </Provider>,
  rootEl
);