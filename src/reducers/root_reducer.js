
import { routerReducer } from 'react-router-redux';
import {combineReducers} from "redux";
import tokensReducer from "./tokens_reducer";
import videosReducer from "./videos_reducer";
import channelsReducer from "./channels_reducer";
import errorsReducer from "./errors_reducer";

export default combineReducers({
    tokensReducer,
    videosReducer,
    channelsReducer,
    errorsReducer,
    routing: routerReducer,
})


