const initialState = {
    videos: [],
    selectedVideo: null,
    //nameTitle: "My app",
    selectedCV: null,
    search: null
};


export  default function (state =initialState, action){

    switch (action.type) {
        // case "MOD_CHECK_BTN":
        //     return {
        //         ...state,
        //         checkBtn: true
        //     }
        case "SELECT_VIDEO":
            console.log(action.payload);
            return {
                ...state,
                selectedVideo: action.payload
            }
        case "GET_REQUEST_SEARCH":
            //console.log("REQ",action.payload)
            return {
                ...state,
                videos: action.payload.data.items,

            }
        case "GET_REQUEST_VIDEOS":
            //console.log("REQ",action.payload)
            return {
                ...state,
                selectedVideo: null,
                selectedCV: action.payload.data.items
            }
        case "HANDLE_SUBMIT_INIT":
            return {
                ...state,
                //nameTitle: action.payload1,
                //channelId: action.payload2,
                search: action.payload1
            };

        default:
            return state;
    }
}
