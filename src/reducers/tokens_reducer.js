import {types} from "../constants";

const initialState = {
    nextPageToken: null,
    prevPageToken: null,
    pageToken: null,
};

export default function (state =initialState, action){

    switch (action.type) {
        case types.get.GET_REQUEST_SEARCH:
            console.log("REQ",action.payload)
            return {
                ...state,
                nextPageToken: action.payload.nextPageToken,
                prevPageToken: action.payload.prevPageToken
            }

        default:
            return state;
    }
}
