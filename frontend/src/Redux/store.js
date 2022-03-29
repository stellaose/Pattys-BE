import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import RootReducer from "./Reducer/RootReducer";

const middleware = [logger, thunk];

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
