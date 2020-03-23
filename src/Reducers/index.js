
import { routerReducer } from 'react-router-redux';
import {combineReducers} from "redux";
import tokens from "./tokens";
import videos from "./videos";

export default combineReducers({
    tokens,
    videos,
    routing: routerReducer
})