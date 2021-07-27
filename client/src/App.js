import Landing from "components/Landing";
import PlaylistDisplay from "components/PlaylistDisplay";
import PlaylistPhone from "components/PlaylistPhone";
import Index from "components/index";
import { SocketContext, socket } from "context/socket";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "sass/_index.scss";
import store from "store";

if (localStorage.user) {
  setAuthToken(localStorage.user);
  try {
    store.dispatch(
      setCurrentUser({
        user: jwt_decode(localStorage.jwtToken),
        jwt: localStorage.jwtToken,
      })
    );
  } catch (e) {
    delete localStorage.jwtToken;
  }
}

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
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
              </Switch>
            </div>
          </Router>
        </SocketContext.Provider>
      </Provider>
    );
  };
}

export default App;
