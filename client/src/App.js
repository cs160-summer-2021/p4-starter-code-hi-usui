import Landing from "components/Landing";
import PlaylistDisplay from "components/PlaylistDisplay";
import PlaylistPhone from "components/PlaylistDisplay";
import PlaylistNew from "components/PlaylistNew";
import Index from "components/index";
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
              <Route exact path="/" component={Landing} />
              <Route exact path="/draw" component={Index} />
              <Route
                path="/playlists/:playlistId/display"
                component={PlaylistDisplay}
              />
              <Route
                path="/playlists/:playlistId/phone"
                component={PlaylistPhone}
              />
              <Route exact path="/newPlaylist" component={PlaylistNew} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
