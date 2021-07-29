import Landing from "components/Landing";
import PlaylistDisplay from "components/PlaylistDisplay";
import PlaylistPhone from "components/PlaylistPhone";
import { SocketContext, socket } from "context/sockets";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "sass/_index.scss";
import store from "store";

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route
                  path="/playlists/:playlistId/display"
                  component={PlaylistDisplay}
                />
                <Route
                  path="/playlists/:playlistId/phone"
                  component={PlaylistPhone}
                />
              </Switch>
            </div>
          </Router>
        </SocketContext.Provider>
      </Provider>
    );
  };
}

export default App;
