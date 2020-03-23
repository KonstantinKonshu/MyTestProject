const initialState = {
    videos: [],
    selectedVideo: null,
    //nameTitle: "My app",
    checkBtn: false,
    selectedCV: null
};


export  default function (state =initialState, action){

    switch (action.type) {
        case "MOD_CHECK_BTN":
            return {
                ...state,
                checkBtn: true
            }
        case "SELECT_VIDEO":
            return {
                ...state,
                selectedVideo: action.payload
            }
        case "GET_REQUEST":
            console.log("REQ",action.payload.data.items)
            return {
                ...state,
                videos: action.payload.data.items
            }

        default:
            return state;
    }
    // if(action.type === "LOAD_VIDEOS")
    //     return {
    //         ...state,
    //         videos: [...state.videos, action.payload]
    //     }
    // if(action.type === "MOD_CHECK_BTN")
    //     return {
    //         ...state,
    //         checkBtn: true
    //     }
    // if(action.type === "VIDEO_SELECTED")
    //     return action.payload;
    // //пока пусть будет так
    // return state;
}
