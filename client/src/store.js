import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import rootReducer from "./reducers"

const middleware = [thunk]
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export default createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
)
