
import { routerReducer } from 'react-router-redux';
import {combineReducers} from "redux";
import tokens from "./tokens";
import videos from "./videos";
import channels from "./channels"

export default combineReducers({
    tokens,
    videos,
    channels,
    routing: routerReducer
})