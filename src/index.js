import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
// import { ThemeProvider } from "@material-ui/core/styles";
// import theme from "./theme";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <ThemeProvider theme={theme}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </ThemeProvider> */}
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
