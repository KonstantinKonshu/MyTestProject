const initialState = {
    isOpenChannel: false,
    // nameTitle: "My app",
    channelId: null,
    nameTitle: "My app",
    // checkBtn: false,
    // selectedCV: null,
    bannerChannel: null
};


export default function (state =initialState, action){

    switch (action.type) {
        case "HANDLE_SUBMIT":
            return {
                ...state,
                nameTitle: action.payload1,
                channelId: action.payload2,
                isOpenChannel: action.payload3
            };

        default:
            return state;
    }
}
