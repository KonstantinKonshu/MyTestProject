const initialState = {
    isOpenChannel: false,
    channelId: null,
    bannerChannel: null
}


export default function (state =initialState, action){

    switch (action.type) {
        case "SELECT_CHANNEL":
            //console.log("REQ",action.payload)
            return {
                ...state,
                channelId: action.payload1,
                isOpenChannel: action.payload2
            }
        case "HANDLE_SUBMIT_INIT":
            return {
                ...state,
                //nameTitle: action.payload1,
                channelId: action.payload2,
                //search: action.payload1
            };
        case "GET_REQUEST_CHANNELS":
            return {
                ...state,
                bannerChannel: action.payload1,
                isOpenChannel: action.payload2
            }

        default:
            return state;
    }
}