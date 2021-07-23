import Index from "components";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "sass/_index.scss";
import store from "store";

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/draw" component={Index} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
