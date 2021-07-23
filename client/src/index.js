import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";

import "@eastdesire/jscolor";
import "@fortawesome/fontawesome-free/js/all.js";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
