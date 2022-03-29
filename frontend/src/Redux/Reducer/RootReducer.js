import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";


const RootReducer = combineReducers({
    login: LoginReducer

});

export default RootReducer;
