import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import TokenReducer from './TokenReducer'


const RootReducer = combineReducers({
    login: LoginReducer,
    token: TokenReducer

});

export default RootReducer;
