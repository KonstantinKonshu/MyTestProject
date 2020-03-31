import {types} from "../constants";
const initialState = {
    handleError: null
}


export default function (state =initialState, action){
    switch (action.type) {
        case types.set.SET_ERROR:
            return {
                ...state,
                handleError: action.payload
            }
        case types.HANDLE_SUBMIT_INIT:
            return {
                ...state,
                handleError: action.payload3
            };

        default:
            return state;
    }
}