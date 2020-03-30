const initialState = {
    channelId: null,
    bannerChannel: null
}


export default function (state =initialState, action){

    switch (action.type) {
        case "SELECT_CHANNEL":
            return {
                ...state,
                channelId: action.payload.snippet.channelId
            }
        case "HANDLE_SUBMIT_INIT":
            return {
                ...state,
                channelId: action.payload2,
                bannerChannel: action.payload2
            };
        case "GET_BANNER_CHANNELS":
            return {
                ...state,
                bannerChannel: action.payload
            }

        default:
            return state;
    }
}