
import { routerReducer } from 'react-router-redux';
import {combineReducers} from "redux";
import tokens from "./tokens";
import videos from "./videos";
import channels from "./channels";
import errors from "./errors";

export default combineReducers({
    tokens,
    videos,
    channels,
    errors,
    routing: routerReducer,

    //error: reducerForError
})


