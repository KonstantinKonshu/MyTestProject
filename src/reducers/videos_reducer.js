import {types} from "../constants";

const initialState = {
    videos: [],
    selectedVideo: null,
    search: null
};


export  default function (state =initialState, action){

    switch (action.type) {

        case types.set.SET_SELECT_VIDEO:
            console.log(action.payload);
            return {
                ...state,
                selectedVideo: action.payload
            }
        case types.get.GET_REQUEST_SEARCH:
            return {
                ...state,
                videos: action.payload.items,

            }
        case types.HANDLE_SUBMIT_INIT:
            return {
                ...state,
                search: action.payload1
            };

        case types.SELECT_CHANNEL:
            return {
                ...state,
                selectedVideo: action.payload,
            }

        default:
            return state;
    }
}
